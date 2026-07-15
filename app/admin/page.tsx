import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import LogoutButton from "./LogoutButton";
import EvaluationsTable from "./EvaluationsTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Evaluation = {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  city: string;
  total_score: number;
  result_level: string;
  created_at: string;
};

function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export default async function AdminPage() {
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

  const { data: evaluations, error } = await supabaseAdmin
    .from("istp_evaluations")
    .select(
      `
        id,
        full_name,
        email,
        company_name,
        city,
        total_score,
        result_level,
        created_at
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando evaluaciones:", error);
  }

  const rows = (evaluations ?? []) as Evaluation[];

  const totalEvaluations = rows.length;

  const averageScore =
    totalEvaluations > 0
      ? Math.round(
          rows.reduce(
            (sum, evaluation) => sum + evaluation.total_score,
            0,
          ) / totalEvaluations,
        )
      : 0;

  const latestEvaluation = rows[0];

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <header className="border-b border-white/10 bg-black text-white">
  <div className="mx-auto flex min-h-[130px] max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
    <Link href="/">
      <Image
        src="/images/logo-olave-echenique.jpeg"
        alt="Olave Echenique"
        width={360}
        height={125}
        priority
        className="h-auto w-[280px] object-contain sm:w-[340px]"
      />
    </Link>

          <div className="flex items-center gap-5">
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

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
  <nav className="flex w-full rounded-2xl border border-black/10 bg-white p-1 shadow-sm sm:w-fit">
    <Link
      href="/admin"
      className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white"
    >
      Resumen
    </Link>

    <Link
      href="/admin/analitica"
      className="rounded-xl px-5 py-2.5 text-sm font-semibold text-black/55 transition hover:text-black"
    >
      Analítica
    </Link>
  </nav>

  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#ed741f]">
              Administración ISTP
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Evaluaciones registradas
            </h1>

            <p className="mt-3 text-sm text-black/55">
              Consulta los resultados almacenados en Supabase.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
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
              Última evaluación
            </p>

            <p className="mt-3 text-lg font-semibold">
              {latestEvaluation
                ? latestEvaluation.company_name
                : "Sin registros"}
            </p>

            {latestEvaluation && (
              <p className="mt-2 text-sm text-black/45">
                {new Intl.DateTimeFormat("es-CL", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(
                  new Date(latestEvaluation.created_at),
                )}
              </p>
            )}
          </article>
        </div>

        <EvaluationsTable evaluations={rows} />
      </section>
    </main>
  );
}