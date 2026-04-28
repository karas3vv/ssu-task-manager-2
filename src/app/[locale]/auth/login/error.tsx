"use client";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>Ошибка входа</h1>
        <button className="button primary" type="button" onClick={reset}>
          Повторить вход
        </button>
      </div>
    </main>
  );
}
