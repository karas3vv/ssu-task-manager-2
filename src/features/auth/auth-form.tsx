"use client";

import type * as React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { Locale } from "@shared/config/i18n";
import { useRootStore } from "@shared/providers/store-provider";
import { messages } from "@i18n/messages";

type AuthFormMode = "login" | "register";

type AuthFormProps = {
  locale: Locale;
  mode: AuthFormMode;
};

export const AuthForm = observer(function AuthForm({ locale, mode }: AuthFormProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authStore } = useRootStore();
  const [name, setName] = useState<string>("Карас");
  const [email, setEmail] = useState<string>("demo@taskflow.local");
  const [password, setPassword] = useState<string>("password");
  const t = messages[locale];
  const isRegister = mode === "register";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (isRegister) {
      await authStore.register({ name, email, password });
    } else {
      await authStore.login({ email, password });
    }

    if (authStore.error === null) {
      router.push(searchParams.get("next") ?? `/${locale}/dashboard`);
      router.refresh();
    }
  }

  return (
    <main className="auth-screen">
      <form className="panel form" onSubmit={handleSubmit}>
        <Link className="brand" href={`/${locale}`}>
          {t.common.appName}
        </Link>
        <h1>{isRegister ? t.auth.registerTitle : t.auth.loginTitle}</h1>
        {isRegister ? (
          <label className="field">
            {t.auth.name}
            <input className="input" value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
        ) : null}
        <label className="field">
          {t.auth.email}
          <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="field">
          {t.auth.password}
          <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {authStore.error ? <p className="muted">{authStore.error}</p> : null}
        <button className="button primary" type="submit" disabled={authStore.status === "loading"}>
          {authStore.status === "loading" ? "..." : isRegister ? t.common.signUp : t.common.signIn}
        </button>
        <Link className="button" href={`/${locale}/auth/${isRegister ? "login" : "register"}`}>
          {isRegister ? t.common.signIn : t.common.signUp}
        </Link>
      </form>
    </main>
  );
});
