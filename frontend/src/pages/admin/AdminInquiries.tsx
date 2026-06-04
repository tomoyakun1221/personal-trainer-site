import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { ContactInquiry } from "../../types";

const statusLabels: Record<string, string> = {
  new: "未対応",
  read: "確認済",
  replied: "返信済",
};

export function AdminInquiries() {
  const [items, setItems] = useState<ContactInquiry[]>([]);

  const load = () => api.adminGetInquiries().then(setItems);
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>お問い合わせ一覧</h1>
      <ul className="admin-list">
        {items.map((item) => (
          <li key={item.id} className="card">
            <div className="inquiry-header">
              <strong>{item.name}</strong>
              <span className={`inquiry-status status-${item.status}`}>
                {statusLabels[item.status] || item.status}
              </span>
            </div>
            <p>
              <a href={`mailto:${item.email}`}>{item.email}</a>
              {item.phone && ` / ${item.phone}`}
            </p>
            <p>{item.message}</p>
            <small>{new Date(item.created_at).toLocaleString("ja-JP")}</small>
            <div className="admin-list-actions">
              {(["read", "replied"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="btn btn-outline"
                  onClick={() => api.adminUpdateInquiry(item.id, s).then(load)}
                >
                  {statusLabels[s]}
                </button>
              ))}
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => api.adminDeleteInquiry(item.id).then(load)}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p className="section-subtitle">お問い合わせはまだありません</p>}
    </div>
  );
}
