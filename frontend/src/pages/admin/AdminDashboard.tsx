import { Link } from "react-router-dom";

export function AdminDashboard() {
  const links = [
    { to: "/admin/site", label: "サイト設定", desc: "トレーナー紹介・Instagram" },
    { to: "/admin/pricing", label: "料金プラン", desc: "プランの追加・編集" },
    { to: "/admin/results", label: "ビフォーアフター", desc: "実績の管理" },
    { to: "/admin/testimonials", label: "お客様の声", desc: "口コミの管理" },
  ];

  return (
    <div>
      <h1>ダッシュボード</h1>
      <p className="section-subtitle">コンテンツを管理できます</p>
      <div className="admin-cards">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="card admin-dash-card">
            <h3>{l.label}</h3>
            <p>{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
