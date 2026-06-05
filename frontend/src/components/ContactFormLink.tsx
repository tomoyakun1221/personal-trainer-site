import { Link } from "react-router-dom";
import { contactPagePath, type ContactInquiryType } from "../constants/contactForm";

interface ContactFormLinkProps {
  label: string;
  inquiryType?: ContactInquiryType;
  className?: string;
}

export function ContactFormLink({
  label,
  inquiryType,
  className = "btn btn-primary",
}: ContactFormLinkProps) {
  return (
    <Link to={contactPagePath(inquiryType)} className={className}>
      {label}
    </Link>
  );
}
