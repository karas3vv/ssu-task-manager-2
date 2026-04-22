export default function GlobalNotFound(): JSX.Element {
  return (
    <html lang="ru">
      <body>
        <main
          style={{
            minHeight: "100vh",
            margin: 0,
            display: "grid",
            placeItems: "center",
            background: "#f7f2e8",
            color: "#17231f",
            fontFamily: "Arial, Helvetica, sans-serif",
            textAlign: "center",
            padding: 24
          }}
        >
          <div
            style={{
              width: "min(420px, 100%)",
              border: "1px solid #ded5c5",
              borderRadius: 8,
              background: "#fffaf1",
              boxShadow: "0 18px 50px rgba(35, 45, 42, 0.12)",
              padding: 24
            }}
          >
            <h1 style={{ margin: "0 0 12px", fontSize: 40 }}>404</h1>
            <p style={{ margin: "0 0 18px", color: "#66736d" }}>Страница не найдена.</p>
            <a
              href="/ru"
              style={{
                minHeight: 42,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #206a5d",
                borderRadius: 8,
                background: "#206a5d",
                color: "#fff",
                fontWeight: 700,
                padding: "10px 16px",
                textDecoration: "none"
              }}
            >
              На главную
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
