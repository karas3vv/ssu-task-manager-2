import Link from "next/link";

export default function DashboardNotFound(): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>Раздел не найден</h1>
        <Link className="button primary" href="/ru/dashboard">
          Вернуться в кабинет
        </Link>
      </div>
    </main>
  );
}
