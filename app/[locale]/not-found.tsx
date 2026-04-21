import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>404</h1>
        <p className="muted">Страница не найдена. Можно вернуться в корень проекта.</p>
        <Link className="button primary" href="/ru">
          На главную
        </Link>
      </div>
    </main>
  );
}
