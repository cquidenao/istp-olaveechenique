import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import LogoutButton from "../LogoutButton";
import AnalyticsCharts from "./AnalyticsCharts";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type EvaluationAnalytics = {
  id: string;
  city: string;
  strategy_score: number;
  compliance_score: number;
  cooperation_score: number;
  total_score: number;
  result_level: string;
  created_at: string;
};

function getAllowedAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function calculateAverage(
  values: number[],
  maximum: number,
): number {
  if (values.length === 0) return 0;

  const average =
    values.reduce((total, value) => total + value, 0) /
    values.length;

  return Math.round((average / maximum) * 100);
}

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/admin/login");
  }

  const allowedEmails = getAllowedAdminEmails();

  if (!allowedEmails.includes(user.email.toLowerCase())) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  const { data, error } = await supabaseAdmin
    .from("istp_evaluations")
    .select(
      `
        id,
        city,
        strategy_score,
        compliance_score,
        cooperation_score,
        total_score,
        result_level,
        created_at
      `,
    )
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Error cargando datos analíticos:",
      error,
    );
  }

  const evaluations =
    (data ?? []) as EvaluationAnalytics[];

  const totalEvaluations = evaluations.length;

  const averageScore =
    totalEvaluations === 0
      ? 0
      : Math.round(
          evaluations.reduce(
            (total, evaluation) =>
              total + evaluation.total_score,
            0,
          ) / totalEvaluations,
        );

  const preparedCount = evaluations.filter(
    (evaluation) =>
      evaluation.result_level === "Preparado",
  ).length;

  const initialCount = evaluations.filter(
    (evaluation) =>
      evaluation.result_level === "Inicial",
  ).length;

  const levelNames = [
    "Inicial",
    "Básico",
    "En camino",
    "Preparado",
  ];

  const levelData = levelNames.map((name) => ({
    name,
    value: evaluations.filter(
      (evaluation) =>
        evaluation.result_level === name,
    ).length,
  }));

  const dimensionData = [
    {
      name: "Estrategia",
      promedio: calculateAverage(
        evaluations.map(
          (evaluation) =>
            evaluation.strategy_score,
        ),
        30,
      ),
    },
    {
      name: "Control",
      promedio: calculateAverage(
        evaluations.map(
          (evaluation) =>
            evaluation.compliance_score,
        ),
        40,
      ),
    },
    {
      name: "Relación SII",
      promedio: calculateAverage(
        evaluations.map(
          (evaluation) =>
            evaluation.cooperation_score,
        ),
        30,
      ),
    },
  ];

  const cityCounter = new Map<string, number>();

  evaluations.forEach((evaluation) => {
    const city =
      evaluation.city.trim() || "Sin ciudad";

    cityCounter.set(
      city,
      (cityCounter.get(city) ?? 0) + 1,
    );
  });

  const cityData = Array.from(
    cityCounter.entries(),
  )
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <header className="border-b border-white/10 bg-black text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-10">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-olave-echenique.jpeg"
              alt="OlaveEchenique"
              width={260}
              height={90}
              priority
              className="h-auto w-[160px] sm:w-[220px]"
            />
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                Panel administrativo
              </p>

              <p className="mt-1 text-xs text-white/50">
                {user.email}
              </p>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-10">
        <nav className="flex w-fit rounded-2xl border border-black/10 bg-white p-1 shadow-sm">
          <Link
            href="/admin"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-black/55 transition hover:text-black"
          >
            Resumen
          </Link>

          <Link
            href="/admin/analitica"
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white"
          >
            Analítica
          </Link>
        </nav>

        <div className="mt-8">
          <p className="text-sm font-semibold text-[#ed741f]">
            Analítica ISTP
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Indicadores y tendencias
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">
            Visualiza la distribución de resultados y las
            principales brechas detectadas en las evaluaciones.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-black/50">
              Evaluaciones totales
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {totalEvaluations}
            </p>
          </article>

          <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-black/50">
              Puntaje promedio
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {averageScore}
              <span className="ml-1 text-lg text-black/35">
                /100
              </span>
            </p>
          </article>

          <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-black/50">
              Empresas preparadas
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {preparedCount}
            </p>
          </article>

          <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-black/50">
              Nivel inicial
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {initialCount}
            </p>
          </article>
        </div>

        <div className="mt-5">
          <AnalyticsCharts
            levelData={levelData}
            dimensionData={dimensionData}
            cityData={cityData}
          />
        </div>
      </section>
    </main>
  );
}