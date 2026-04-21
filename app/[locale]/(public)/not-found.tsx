import Link from "next/link";

export default function PublicNotFound(): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>404</h1>
        <Link className="button primary" href="/ru">
          На главную
        </Link>
      </div>
    </main>
  );
}
