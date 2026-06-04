import type { Testimonial } from "../types";
import "./TestimonialCard.css";

function contentLines(content: string) {
  return content.split("\n").map((line) => line.trim()).filter(Boolean);
}

export function TestimonialCard({ item }: { item: Testimonial }) {
  const lines = contentLines(item.content);
  const isMale = item.guest_type === "male";

  return (
    <article className={`voice-card ${isMale ? "voice-card--male" : "voice-card--female"}`}>
      <div className="voice-card-slash" aria-hidden />
      <h3 className="voice-card-title">{item.client_name}</h3>
      <div className="voice-card-body">
        {lines.map((line, index) => (
          <p key={`${item.id}-${index}`} className={isMale && index === 0 ? "voice-card-highlight" : undefined}>
            {line}
          </p>
        ))}
      </div>
    </article>
  );
}
