"use client";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps): JSX.Element {
  return (
    <main className="not-found">
      <button className="button primary" type="button" onClick={reset}>
        Повторить регистрацию
      </button>
    </main>
  );
}
