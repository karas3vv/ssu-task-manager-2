const { spawn } = require("node:child_process");

const backendPort = process.env.BACKEND_PORT ?? "4000";
const frontendPort = process.env.PORT ?? "3000";
const backendUrl = process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:${backendPort}`;
const clientOrigin = process.env.CLIENT_ORIGIN ?? `http://localhost:${frontendPort}`;
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function runBuild() {
  return new Promise((resolve, reject) => {
    const build = spawn(npmCommand, ["run", "build"], {
      env: {
        ...process.env,
        NEXT_PUBLIC_API_URL: backendUrl
      },
      stdio: "inherit"
    });

    build.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Build failed with code ${code ?? 1}`));
    });
  });
}

function startServers() {
  const processes = [
    spawn(npmCommand, ["run", "backend"], {
      env: {
        ...process.env,
        BACKEND_PORT: backendPort,
        CLIENT_ORIGIN: clientOrigin
      },
      stdio: "inherit"
    }),
    spawn(npmCommand, ["run", "start", "--", "-p", frontendPort], {
      env: {
        ...process.env,
        NEXT_PUBLIC_API_URL: backendUrl,
        PORT: frontendPort
      },
      stdio: "inherit"
    })
  ];

  let isShuttingDown = false;

  function stopAll(exitCode = 0) {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;

    for (const childProcess of processes) {
      if (!childProcess.killed) {
        childProcess.kill("SIGINT");
      }
    }

    setTimeout(() => process.exit(exitCode), 300);
  }

  for (const childProcess of processes) {
    childProcess.on("exit", (code) => {
      stopAll(code ?? 0);
    });
  }

  process.on("SIGINT", () => stopAll(0));
  process.on("SIGTERM", () => stopAll(0));
}

runBuild()
  .then(startServers)
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
