"use client";

type DashboardErrorProps = {
  error: Error;
  reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>Критическая ошибка</h1>
        <p className="muted">{error.message}</p>
        <button className="button primary" type="button" onClick={reset}>
          Повторить
        </button>
      </div>
    </main>
  );
}
