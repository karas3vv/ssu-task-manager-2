import { BackButton } from "@shared/ui/back-button";

export default function DashboardNotFound(): JSX.Element {
  return (
    <main className="not-found">
      <div className="panel">
        <h1>Раздел не найден</h1>
        <BackButton className="button primary">Вернуться назад</BackButton>
      </div>
    </main>
  );
}
