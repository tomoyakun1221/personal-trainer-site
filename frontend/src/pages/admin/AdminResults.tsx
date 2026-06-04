import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Transformation } from "../../types";

export function AdminResults() {
  const [items, setItems] = useState<Transformation[]>([]);
  const [title, setTitle] = useState("");
  const [clientLabel, setClientLabel] = useState("");
  const [description, setDescription] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(12);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => api.adminGetTransformations().then(setItems);
  useEffect(() => {
    load();
  }, []);

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("transformation[title]", title);
    fd.append("transformation[client_label]", clientLabel);
    fd.append("transformation[description]", description);
    fd.append("transformation[duration_weeks]", String(durationWeeks));
    fd.append("transformation[published]", "true");
    if (beforeFile) fd.append("before_image", beforeFile);
    if (afterFile) fd.append("after_image", afterFile);
    return fd;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.adminSaveTransformation(buildFormData(), editId ?? undefined);
    setTitle("");
    setClientLabel("");
    setDescription("");
    setEditId(null);
    setBeforeFile(null);
    setAfterFile(null);
    load();
  };

  return (
    <div>
      <h1>ビフォーアフター管理</h1>
      <form className="card admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>タイトル</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>クライアント表示名</label>
          <input value={clientLabel} onChange={(e) => setClientLabel(e.target.value)} />
        </div>
        <div className="form-group">
          <label>説明</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>
        <div className="form-group">
          <label>期間（週）</label>
          <input
            type="number"
            value={durationWeeks}
            onChange={(e) => setDurationWeeks(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Before画像</label>
          <input type="file" accept="image/*" onChange={(e) => setBeforeFile(e.target.files?.[0] || null)} />
        </div>
        <div className="form-group">
          <label>After画像</label>
          <input type="file" accept="image/*" onChange={(e) => setAfterFile(e.target.files?.[0] || null)} />
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? "更新" : "追加"}
        </button>
      </form>
      <ul className="admin-list">
        {items.map((item) => (
          <li key={item.id} className="card">
            <strong>{item.title}</strong> — {item.client_label}
            <div className="admin-list-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setEditId(item.id);
                  setTitle(item.title);
                  setClientLabel(item.client_label || "");
                  setDescription(item.description || "");
                  setDurationWeeks(item.duration_weeks || 12);
                }}
              >
                編集
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => api.adminDeleteTransformation(item.id).then(load)}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
