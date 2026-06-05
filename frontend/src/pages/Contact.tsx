import { FormEvent, useState } from "react";
import { BrandHeading } from "../components/BrandHeading";
import { InstagramLink } from "../components/InstagramLink";
import { CONTACT_INQUIRY_OPTIONS, type ContactInquiryType } from "../constants/contactForm";
import { submitContactForm, usesWeb3Forms } from "../lib/submitContactForm";
import "./Contact.css";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  inquiryType: "trial" as ContactInquiryType,
  message: "",
  spamCheck: false,
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.spamCheck) {
      setStatus("error");
      setErrorMessage("送信前にチェックボックスにチェックを入れてください。");
      return;
    }

    setStatus("sending");

    const result = await submitContactForm({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      inquiryType: form.inquiryType,
      message: form.message.trim(),
    });

    if (result.ok) {
      setStatus("success");
      setForm(initialForm);
      return;
    }

    setStatus("error");
    setErrorMessage(result.error);
  };

  const web3forms = usesWeb3Forms();

  return (
    <section className="section contact-page">
      <div className="container contact-page-inner">
        <BrandHeading align="center" />
        <header className="contact-page-header">
          <h1 className="section-title">予約・お問い合わせ</h1>
          <p className="contact-page-lead">
            無料カウンセリング・見学・体験のご予約、その他のお問い合わせは下記フォームよりお送りください。
          </p>
        </header>

        {status === "success" && (
          <div className="alert alert-success contact-alert" role="status">
            {web3forms ? (
              <>
                お問い合わせを送信しました。確認のため自動返信メールをお送りする場合があります。
                <br />
                2〜3営業日以内にご連絡いたします。しばらくお待ちください。
              </>
            ) : (
              <>
                メールアプリが開きました。内容をご確認のうえ、送信を完了してください。
                <br />
                開かない場合は tomoyakun.1221@gmail.com まで直接ご連絡ください。
              </>
            )}
          </div>
        )}

        {status === "error" && errorMessage && (
          <div className="alert alert-error contact-alert" role="alert">
            {errorMessage}
          </div>
        )}

        <form className="contact-form card" onSubmit={handleSubmit} noValidate>
          <p className="contact-form-note">
            <span className="contact-required">必須</span> は入力必須項目です
          </p>

          <div className="form-group">
            <label htmlFor="contact-name">
              <span className="contact-required">必須</span> お名前
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-phone">
              <span className="contact-required">必須</span> 電話番号
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="090-1234-5678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">
              <span className="contact-required">必須</span> メールアドレス
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <fieldset className="form-group contact-fieldset">
            <legend>
              <span className="contact-required">必須</span> お申込み内容
            </legend>
            <ul className="contact-inquiry-options">
              {CONTACT_INQUIRY_OPTIONS.map((option) => (
                <li key={option.value}>
                  <label className="contact-radio">
                    <input
                      type="radio"
                      name="inquiryType"
                      value={option.value}
                      checked={form.inquiryType === option.value}
                      onChange={() => setForm({ ...form, inquiryType: option.value })}
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <div className="form-group">
            <label htmlFor="contact-message">
              <span className="contact-optional">任意</span> その他・ご質問
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="ご希望の日時、ご質問などがあればご記入ください"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {/* Web3Forms スパム対策（人間には非表示） */}
          <input
            type="checkbox"
            name="botcheck"
            className="contact-honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          <div className="form-group contact-spam-check">
            <label className="contact-checkbox">
              <input
                type="checkbox"
                checked={form.spamCheck}
                onChange={(e) => setForm({ ...form, spamCheck: e.target.checked })}
                required
              />
              <span>スパムメール防止のため、こちらのボックスにチェックを入れてから送信してください。</span>
            </label>
          </div>

          <div className="contact-form-actions">
            <button type="submit" className="btn btn-primary contact-submit" disabled={status === "sending"}>
              {status === "sending" ? "送信中…" : "送信する"}
            </button>
          </div>
        </form>

        <div className="contact-page-aside">
          <p>Instagramでもお気軽にどうぞ</p>
          <InstagramLink size="lg" />
        </div>
      </div>
    </section>
  );
}
