/** GitHub Pages 等のサブパス配信向けに public 配下のパスを解決 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
