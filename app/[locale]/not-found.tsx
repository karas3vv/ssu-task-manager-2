import { BackButton } from "@shared/ui/back-button";

export default function NotFound(): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>404</h1>
        <p className="muted">Страница не найдена.</p>
        <BackButton className="button primary">Вернуться назад</BackButton>
      </div>
    </main>
  );
}
