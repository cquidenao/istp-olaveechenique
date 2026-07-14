import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { questions } from "@/data/questions";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type EvaluationDetail = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  company_tax_id: string | null;
  position: string;
  city: string;
  employee_range: string | null;
  privacy_accepted: boolean;
  answers: Record<string, number>;
  strategy_score: number;
  compliance_score: number;
  cooperation_score: number;
  total_score: number;
  result_level: string;
  source: string;
  created_at: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type DimensionSummary = {
  id: number;
  name: string;
  score: number;
  maxScore: number;
};

function getAllowedAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function getAnswerLabel(value: number | undefined): string {
  if (value === 5) return "Sí";
  if (value === 3) return "En parte";
  if (value === 0) return "No";

  return "Sin respuesta";
}

function getAnswerStyles(value: number | undefined): string {
  if (value === 5) {
    return "bg-[#f37521] text-white";
  }

  if (value === 3) {
    return "bg-amber-50 text-amber-700";
  }

  if (value === 0) {
    return "bg-black/[0.05] text-black/65";
  }

  return "bg-red-50 text-red-700";
}

function getLevelStyles(level: string): string {
  switch (level) {
    case "Preparado":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "En camino":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "Básico":
      return "border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border-red-200 bg-red-50 text-red-700";
  }
}

export default async function EvaluationDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

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
        full_name,
        email,
        phone,
        company_name,
        company_tax_id,
        position,
        city,
        employee_range,
        privacy_accepted,
        answers,
        strategy_score,
        compliance_score,
        cooperation_score,
        total_score,
        result_level,
        source,
        created_at
      `,
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Error cargando evaluación:", error);
    notFound();
  }

  const evaluation = data as EvaluationDetail;

  const formattedDate = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date(evaluation.created_at));

  const dimensions: DimensionSummary[] = [
    {
      id: 1,
      name: "Estrategia y transparencia",
      score: evaluation.strategy_score,
      maxScore: 30,
    },
    {
      id: 2,
      name: "Control, riesgos y cumplimiento",
      score: evaluation.compliance_score,
      maxScore: 40,
    },
    {
      id: 3,
      name: "Cooperación y relación con el SII",
      score: evaluation.cooperation_score,
      maxScore: 30,
    },
  ];

  const questionGroups = dimensions.map((dimension) => ({
    ...dimension,
    questions: questions.filter(
      (question) => question.dimension === dimension.id,
    ),
  }));

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

          <div className="min-w-0 text-right">
            <p className="text-sm font-medium">
              Panel administrativo
            </p>

            <p className="mt-1 hidden truncate text-xs text-white/50 sm:block">
              {user.email}
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black/55 transition hover:text-[#d95f12]"
        >
          <span aria-hidden="true">←</span>
          Volver al panel
        </Link>

        <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#ed741f]">
              Detalle de evaluación
            </p>

            <h1 className="mt-2 break-words text-3xl font-semibold tracking-tight sm:text-4xl">
              {evaluation.company_name}
            </h1>

            <p className="mt-3 text-sm text-black/50">
              Evaluación realizada el {formattedDate}
            </p>
          </div>

          <span
            className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-semibold ${getLevelStyles(
              evaluation.result_level,
            )}`}
          >
            {evaluation.result_level}
          </span>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="space-y-5">
            <article className="rounded-3xl bg-[#111111] p-7 text-white shadow-sm">
              <p className="text-sm font-semibold text-[#f37521]">
                Puntaje total
              </p>

              <div className="mt-5 flex items-end">
                <span className="text-6xl font-semibold tracking-tight">
                  {evaluation.total_score}
                </span>

                <span className="mb-2 ml-2 text-lg text-white/40">
                  /100
                </span>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <p className="text-sm text-white/45">
                Nivel alcanzado
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#f37521]">
                {evaluation.result_level}
              </p>
            </article>

            <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-[#ed741f]">
                Información del registro
              </p>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-black/45">Fecha</dt>
                  <dd className="mt-1 font-medium">
                    {formattedDate}
                  </dd>
                </div>

                <div>
                  <dt className="text-black/45">Origen</dt>
                  <dd className="mt-1 font-medium">
                    {evaluation.source || "Web"}
                  </dd>
                </div>

                <div>
                  <dt className="text-black/45">
                    Consentimiento
                  </dt>
                  <dd className="mt-1 font-medium">
                    {evaluation.privacy_accepted
                      ? "Aceptado"
                      : "No aceptado"}
                  </dd>
                </div>
              </dl>
            </article>
          </aside>

          <div className="space-y-5">
            <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-sm font-semibold text-[#ed741f]">
                Datos de contacto
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Persona y empresa
              </h2>

              <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-black/45">
                    Nombre completo
                  </dt>
                  <dd className="mt-1 break-words font-medium">
                    {evaluation.full_name}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-black/45">
                    Correo electrónico
                  </dt>
                  <dd className="mt-1 break-all font-medium">
                    {evaluation.email}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-black/45">
                    Teléfono
                  </dt>
                  <dd className="mt-1 font-medium">
                    {evaluation.phone}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-black/45">
                    Cargo o función
                  </dt>
                  <dd className="mt-1 break-words font-medium">
                    {evaluation.position}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-black/45">
                    Empresa
                  </dt>
                  <dd className="mt-1 break-words font-medium">
                    {evaluation.company_name}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-black/45">
                    Ciudad
                  </dt>
                  <dd className="mt-1 font-medium">
                    {evaluation.city}
                  </dd>
                </div>

                {evaluation.company_tax_id && (
                  <div>
                    <dt className="text-sm text-black/45">
                      RUT de empresa
                    </dt>
                    <dd className="mt-1 font-medium">
                      {evaluation.company_tax_id}
                    </dd>
                  </div>
                )}

                {evaluation.employee_range && (
                  <div>
                    <dt className="text-sm text-black/45">
                      Tamaño de empresa
                    </dt>
                    <dd className="mt-1 font-medium">
                      {evaluation.employee_range}
                    </dd>
                  </div>
                )}
              </dl>
            </article>

            <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-sm font-semibold text-[#ed741f]">
                Resultado por dimensión
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Desglose de puntajes
              </h2>

              <div className="mt-7 space-y-7">
                {dimensions.map((dimension) => {
                  const percentage = Math.round(
                    (dimension.score / dimension.maxScore) * 100,
                  );

                  return (
                    <div key={dimension.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-semibold">
                            {dimension.id}. {dimension.name}
                          </p>

                          <p className="mt-1 text-sm text-black/45">
                            {percentage}% del máximo
                          </p>
                        </div>

                        <p className="shrink-0 whitespace-nowrap font-semibold">
                          {dimension.score}/{dimension.maxScore}
                        </p>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-[#f37521]"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>
        </div>

        <section className="mt-5 rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
          <div>
            <p className="text-sm font-semibold text-[#ed741f]">
              Cuestionario respondido
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Respuestas de la evaluación
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/50">
              Selecciona una dimensión para revisar sus respuestas.
            </p>
          </div>

          <div className="mt-7 space-y-4">
            {questionGroups.map((group, groupIndex) => {
              const percentage = Math.round(
                (group.score / group.maxScore) * 100,
              );

              return (
                <details
                  key={group.id}
                  open={groupIndex === 0}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-[#fafaf9]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-5 transition hover:bg-black/[0.025] sm:px-5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#ed741f]">
                        Dimensión {group.id}
                      </p>

                      <h3 className="mt-1 text-base font-semibold sm:text-lg">
                        {group.name}
                      </h3>

                      <p className="mt-1 text-sm text-black/45">
                        {group.score}/{group.maxScore} puntos ·{" "}
                        {percentage}% del máximo
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-xl transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <div className="border-t border-black/10 bg-white">
                    {group.questions.map((question) => {
                      const value =
                        evaluation.answers[String(question.id)];

                      return (
                        <div
                          key={question.id}
                          className="border-b border-black/10 px-4 py-5 last:border-b-0 sm:px-5"
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff3ea] text-sm font-semibold text-[#d95f12]">
                              {question.id}
                            </span>

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium leading-6 sm:text-base">
                                {question.text}
                              </p>

                              <span
                                className={`mt-3 inline-flex rounded-xl px-4 py-2 text-sm font-semibold ${getAnswerStyles(
                                  value,
                                )}`}
                              >
                                {getAnswerLabel(value)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}