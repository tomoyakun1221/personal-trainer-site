import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

export function AdminLayout() {
  const token = localStorage.getItem("admin_token");
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <p className="admin-brand">管理画面</p>
        <nav>
          <NavLink to="/admin" end>
            ダッシュボード
          </NavLink>
          <NavLink to="/admin/site">サイト設定</NavLink>
          <NavLink to="/admin/pricing">料金プラン</NavLink>
          <NavLink to="/admin/results">実績</NavLink>
          <NavLink to="/admin/testimonials">お客様の声</NavLink>
        </nav>
        <button type="button" className="btn btn-outline admin-logout" onClick={logout}>
          ログアウト
        </button>
        <Link to="/" className="admin-back">
          ← サイトを見る
        </Link>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
