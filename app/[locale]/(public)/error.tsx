"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>Ошибка</h1>
        <p className="muted">{error.message}</p>
        <button className="button primary" type="button" onClick={reset}>
          Повторить
        </button>
      </div>
    </main>
  );
}
