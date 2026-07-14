"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

      if (error) {
        setErrorMessage(
          "Correo o contraseña incorrectos.",
        );
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error iniciando sesión:", error);

      setErrorMessage(
        "No fue posible iniciar sesión.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/">
            <Image
              src="/images/logo-olave-echenique.jpeg"
              alt="OlaveEchenique"
              width={260}
              height={90}
              priority
              className="h-auto w-[190px] sm:w-[230px]"
            />
          </Link>

          <Link
            href="/"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Volver al sitio
          </Link>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-110px)] max-w-7xl items-center justify-center px-6 py-12 lg:px-10">
        <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-7 shadow-sm sm:p-9">
          <p className="text-sm font-semibold text-[#ed741f]">
            Administración ISTP
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Iniciar sesión
          </h1>

          <p className="mt-3 text-sm leading-6 text-black/55">
            Acceso exclusivo para usuarios
            administradores autorizados.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3.5 outline-none transition focus:border-[#f37521] focus:ring-2 focus:ring-[#f37521]/20"
                placeholder="administrador@empresa.cl"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
                className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3.5 outline-none transition focus:border-[#f37521] focus:ring-2 focus:ring-[#f37521]/20"
                placeholder="••••••••"
              />
            </div>

            {errorMessage && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#f37521] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#dc6415] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Ingresando..."
                : "Ingresar al panel"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}