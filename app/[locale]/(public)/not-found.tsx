import { BackButton } from "@shared/ui/back-button";

export default function PublicNotFound(): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>404</h1>
        <BackButton className="button primary" fallbackHref="/ru">
          Вернуться назад
        </BackButton>
      </div>
    </main>
  );
}
