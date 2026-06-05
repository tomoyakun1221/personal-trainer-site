/** お申込み内容 */
export const CONTACT_INQUIRY_OPTIONS = [
  { value: "trial", label: "無料カウンセリング希望" },
  { value: "visit", label: "見学・体験を希望" },
  { value: "counseling", label: "体験・カウンセリングの申し込み" },
  { value: "ticket", label: "回数券コースについて" },
  { value: "bodymake", label: "ボディメイクコースについて" },
  { value: "other", label: "その他" },
] as const;

export type ContactInquiryType = (typeof CONTACT_INQUIRY_OPTIONS)[number]["value"];

const INQUIRY_VALUES = new Set<string>(CONTACT_INQUIRY_OPTIONS.map((o) => o.value));

export function inquiryTypeLabel(value: ContactInquiryType): string {
  return CONTACT_INQUIRY_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function isContactInquiryType(value: string): value is ContactInquiryType {
  return INQUIRY_VALUES.has(value);
}

export function contactPagePath(inquiryType?: ContactInquiryType): string {
  if (!inquiryType) return "/contact";
  return `/contact?inquiry=${inquiryType}`;
}

export function parseInquiryFromSearch(search: string): ContactInquiryType | null {
  const value = new URLSearchParams(search).get("inquiry");
  if (!value || !isContactInquiryType(value)) return null;
  return value;
}
