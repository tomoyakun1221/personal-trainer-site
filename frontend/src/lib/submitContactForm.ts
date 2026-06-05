import { CONTACT_EMAIL } from "../constants/contact";
import { inquiryTypeLabel, type ContactInquiryType } from "../constants/contactForm";

export interface ContactFormPayload {
  name: string;
  phone: string;
  email: string;
  inquiryType: ContactInquiryType;
  message: string;
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function buildMessageBody(payload: ContactFormPayload): string {
  const lines = [
    `お申込み内容: ${inquiryTypeLabel(payload.inquiryType)}`,
    `お名前: ${payload.name}`,
    `電話番号: ${payload.phone}`,
    `メール: ${payload.email}`,
  ];
  if (payload.message.trim()) {
    lines.push("", "その他・ご質問:", payload.message.trim());
  }
  return lines.join("\n");
}

/** Web3Forms 未設定時はメールアプリを開く */
function submitViaMailto(payload: ContactFormPayload): void {
  const subject = `【TSP】${inquiryTypeLabel(payload.inquiryType)}`;
  const body = buildMessageBody(payload);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContactForm(payload: ContactFormPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey) {
    submitViaMailto(payload);
    return { ok: true };
  }

  const subject = `【TSP】${inquiryTypeLabel(payload.inquiryType)} — ${payload.name} 様`;

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: payload.name,
        email: payload.email,
        replyto: payload.email,
        phone: payload.phone,
        message: buildMessageBody(payload),
        botcheck: "",
      }),
    });

    const data = (await res.json()) as { success?: boolean; message?: string };

    if (!res.ok || !data.success) {
      return { ok: false, error: data.message ?? "送信に失敗しました。しばらくしてから再度お試しください。" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "通信エラーが発生しました。ネットワークを確認して再度お試しください。" };
  }
}

export function usesWeb3Forms(): boolean {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim());
}
