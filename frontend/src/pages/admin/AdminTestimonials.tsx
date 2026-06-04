import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Testimonial } from "../../types";

export function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({
    client_name: "",
    client_age: "",
    content: "",
    rating: 5,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => api.adminGetTestimonials().then(setItems);
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.adminSaveTestimonial(form, editId ?? undefined);
    setForm({ client_name: "", client_age: "", content: "", rating: 5 });
    setEditId(null);
    load();
  };

  return (
    <div>
      <h1>お客様の声管理</h1>
      <form className="card admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>お名前（表示用）</label>
          <input
            required
            value={form.client_name}
            onChange={(e) => setForm({ ...form, client_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>年代</label>
          <input value={form.client_age} onChange={(e) => setForm({ ...form, client_age: e.target.value })} />
        </div>
        <div className="form-group">
          <label>内容</label>
          <textarea
            required
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>評価（1-5）</label>
          <input
            type="number"
            min={1}
            max={5}
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? "更新" : "追加"}
        </button>
      </form>
      <ul className="admin-list">
        {items.map((item) => (
          <li key={item.id} className="card">
            <strong>{item.client_name}</strong>
            <p>{item.content}</p>
            <div className="admin-list-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setEditId(item.id);
                  setForm({
                    client_name: item.client_name,
                    client_age: item.client_age || "",
                    content: item.content,
                    rating: item.rating,
                  });
                }}
              >
                編集
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => api.adminDeleteTestimonial(item.id).then(load)}
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
