import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { PricingPlan } from "../../types";

const empty = (): Partial<PricingPlan> & { featuresText: string } => ({
  name: "",
  price: 0,
  period: "月",
  description: "",
  featuresText: "",
  featured: false,
  position: 0,
});

export function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [form, setForm] = useState(empty());
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => api.adminGetPlans().then(setPlans);
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.adminSavePlan(
      {
        name: form.name,
        price: form.price,
        period: form.period,
        description: form.description,
        features: form.featuresText,
        featured: form.featured,
        position: form.position,
      },
      editId ?? undefined
    );
    setForm(empty());
    setEditId(null);
    load();
  };

  const startEdit = (p: PricingPlan) => {
    setEditId(p.id);
    setForm({
      ...p,
      featuresText: p.features.join("\n"),
    });
  };

  return (
    <div>
      <h1>料金プラン管理</h1>
      <form className="card admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>プラン名</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label>価格（円）</label>
            <input
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label>単位</label>
            <input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label>説明</label>
          <input value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="form-group">
          <label>特徴（改行区切り）</label>
          <textarea
            rows={4}
            value={form.featuresText}
            onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />{" "}
          人気プラン
        </label>
        <button type="submit" className="btn btn-primary">
          {editId ? "更新" : "追加"}
        </button>
      </form>
      <ul className="admin-list">
        {plans.map((p) => (
          <li key={p.id} className="card">
            <strong>{p.name}</strong> — ¥{p.price.toLocaleString()}/{p.period}
            <div className="admin-list-actions">
              <button type="button" className="btn btn-outline" onClick={() => startEdit(p)}>
                編集
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => api.adminDeletePlan(p.id).then(load)}
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
