"use client";

type DashboardErrorProps = {
  reset: () => void;
};

export default function DashboardError({ reset }: DashboardErrorProps): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>Критическая ошибка</h1>
        <p className="muted">Не удалось загрузить кабинет.</p>
        <button className="button primary" type="button" onClick={reset}>
          Повторить
        </button>
      </div>
    </main>
  );
}
