import { CONTACT_EMAIL, INSTAGRAM_URL, mailtoLink } from "../constants/contact";
import { ContactFormLink } from "./ContactFormLink";

interface ContactCtaProps {
  label?: string;
  subject?: string;
  className?: string;
}

/** mailto リンク（レガシー・管理画面外の簡易用途） */
export function ContactCta({
  label = "メールでお問い合わせ",
  subject,
  className = "btn btn-primary",
}: ContactCtaProps) {
  return (
    <a href={mailtoLink(subject)} className={className}>
      {label}
    </a>
  );
}

export function TrialCta({
  className = "btn btn-primary",
  label = "体験・カウンセリングを申し込む",
}: {
  className?: string;
  label?: string;
}) {
  return <ContactFormLink label={label} inquiryType="counseling" className={className} />;
}

export { INSTAGRAM_URL, CONTACT_EMAIL };
