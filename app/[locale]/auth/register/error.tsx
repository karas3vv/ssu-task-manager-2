"use client";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>Ошибка регистрации</h1>
        <button className="button primary" type="button" onClick={reset}>
          Повторить регистрацию
        </button>
      </div>
    </main>
  );
}
