"use client";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>Ошибка</h1>
        <p className="muted">Не удалось загрузить страницу.</p>
        <button className="button primary" type="button" onClick={reset}>
          Повторить
        </button>
      </div>
    </main>
  );
}
