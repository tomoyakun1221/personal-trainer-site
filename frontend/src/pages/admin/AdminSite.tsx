import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { SiteSetting } from "../../types";

export function AdminSite() {
  const [setting, setSetting] = useState<SiteSetting | null>(null);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [heroImage, setHeroImage] = useState<File | null>(null);

  useEffect(() => {
    api.getSiteSetting().then(setSetting);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!setting) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (profileImage) fd.append("profile_image", profileImage);
    if (heroImage) fd.append("hero_image", heroImage);
    try {
      const updated = await api.adminUpdateSiteSetting(fd);
      setSetting(updated);
      setMessage("保存しました");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "保存に失敗しました");
    }
  };

  if (!setting) return <div className="loading">読み込み中...</div>;

  const fields: { key: keyof SiteSetting; label: string; rows?: number }[] = [
    { key: "trainer_name", label: "トレーナー名" },
    { key: "tagline", label: "キャッチコピー" },
    { key: "hero_description", label: "ヒーロー説明", rows: 3 },
    { key: "profile_title", label: "トレーナー紹介見出し" },
    { key: "profile_body", label: "トレーナー紹介本文", rows: 5 },
    { key: "qualifications", label: "資格（改行区切り）", rows: 4 },
    { key: "specialties", label: "得意分野（改行区切り）", rows: 4 },
    { key: "instagram_url", label: "Instagram URL" },
    { key: "email", label: "メール" },
    { key: "phone", label: "電話" },
    { key: "location", label: "所在地" },
  ];

  return (
    <div>
      <h1>サイト設定</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <form className="card admin-form" onSubmit={handleSubmit}>
        {fields.map((f) => (
          <div className="form-group" key={f.key}>
            <label>{f.label}</label>
            {f.rows ? (
              <textarea name={`site_setting[${f.key}]`} rows={f.rows} defaultValue={String(setting[f.key] ?? "")} />
            ) : (
              <input name={`site_setting[${f.key}]`} defaultValue={String(setting[f.key] ?? "")} />
            )}
          </div>
        ))}
        <div className="form-group">
          <label>トレーナー紹介画像</label>
          <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />
        </div>
        <div className="form-group">
          <label>ヒーロー画像</label>
          <input type="file" accept="image/*" onChange={(e) => setHeroImage(e.target.files?.[0] || null)} />
        </div>
        <button type="submit" className="btn btn-primary">
          保存
        </button>
      </form>
    </div>
  );
}
