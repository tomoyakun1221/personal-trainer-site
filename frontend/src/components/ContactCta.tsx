import { CONTACT_EMAIL, INSTAGRAM_URL, mailtoLink } from "../constants/contact";

interface ContactCtaProps {
  label?: string;
  subject?: string;
  className?: string;
}

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
  subject = "体験・カウンセリングの申込",
}: {
  className?: string;
  label?: string;
  subject?: string;
}) {
  return <ContactCta label={label} subject={subject} className={className} />;
}

export { INSTAGRAM_URL, CONTACT_EMAIL };
