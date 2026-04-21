"use client";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps): JSX.Element {
  return (
    <div className="panel">
      <h1>Ошибка календаря</h1>
      <button className="button primary" type="button" onClick={reset}>
        Повторить
      </button>
    </div>
  );
}
