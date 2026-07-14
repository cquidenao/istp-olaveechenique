import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

          <div className="text-right">
            <p className="text-sm font-medium">
              Panel administrativo
            </p>

            <p className="mt-1 text-xs text-white/50">
              {user.email}
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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

        <section className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-6 py-5">
            <h2 className="text-xl font-semibold">
              Historial de evaluaciones
            </h2>
          </div>

          {rows.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-black/50">
              Todavía no hay evaluaciones registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-black/[0.03] text-black/55">
                  <tr>
                    <th className="px-6 py-4 font-medium">
                      Fecha
                    </th>
                    <th className="px-6 py-4 font-medium">
                      Empresa
                    </th>
                    <th className="px-6 py-4 font-medium">
                      Responsable
                    </th>
                    <th className="px-6 py-4 font-medium">
                      Correo
                    </th>
                    <th className="px-6 py-4 font-medium">
                      Ciudad
                    </th>
                    <th className="px-6 py-4 font-medium">
                      Puntaje
                    </th>
                    <th className="px-6 py-4 font-medium">
                      Nivel
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((evaluation) => (
                    <tr
                      key={evaluation.id}
                      className="border-t border-black/10"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-black/55">
                        {new Intl.DateTimeFormat("es-CL", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(
                          new Date(evaluation.created_at),
                        )}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {evaluation.company_name}
                      </td>

                      <td className="px-6 py-4">
                        {evaluation.full_name}
                      </td>

                      <td className="px-6 py-4 text-black/60">
                        {evaluation.email}
                      </td>

                      <td className="px-6 py-4">
                        {evaluation.city}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        {evaluation.total_score}/100
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-[#fff3ea] px-3 py-1 text-xs font-semibold text-[#d95f12]">
                          {evaluation.result_level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}