/** お申込み内容（SKIP GYM 形式に準拠） */
export const CONTACT_INQUIRY_OPTIONS = [
  { value: "trial", label: "無料カウンセリング希望" },
  { value: "visit", label: "見学・体験を希望" },
  { value: "other", label: "その他" },
] as const;

export type ContactInquiryType = (typeof CONTACT_INQUIRY_OPTIONS)[number]["value"];

export function inquiryTypeLabel(value: ContactInquiryType): string {
  return CONTACT_INQUIRY_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
