"use client";
import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { dimensions, questions, type AnswerValue } from "@/data/questions";
import { getResultReport } from "@/data/reports";

type Answers = Record<number, AnswerValue>;

type ParticipantData = {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  position: string;
  city: string;
  privacyAccepted: boolean;
};

type DimensionResult = {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
};


const PdfDownloadButton = dynamic(
  () => import("@/components/pdf/PdfDownloadButton"),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        disabled
        className="rounded-xl bg-[#f37521]/60 px-6 py-3.5 text-sm font-semibold text-white"
      >
        Preparando PDF...
      </button>
    ),
  },
);


export default function ResultPage() {
  const router = useRouter();

  const [answers, setAnswers] = useState<Answers | null>(null);
  const [participant, setParticipant] =
    useState<ParticipantData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [saveStatus, setSaveStatus] = useState<
  "idle" | "saving" | "saved" | "error"
>("idle");

const [savedEvaluationId, setSavedEvaluationId] = useState<string | null>(
  null,
);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("istp-answers");
    const savedParticipant = localStorage.getItem(
      "istp-participant-data",
    );

    if (!savedAnswers || !savedParticipant) {
      router.replace("/evaluacion");
      return;
    }

    try {
      const parsedAnswers = JSON.parse(savedAnswers) as Answers;
      const parsedParticipant = JSON.parse(
        savedParticipant,
      ) as ParticipantData;

      const allAnswered = questions.every(
        (question) => parsedAnswers[question.id] !== undefined,
      );

      if (!allAnswered) {
        router.replace("/evaluacion/cuestionario");
        return;
      }

      setAnswers(parsedAnswers);
setParticipant(parsedParticipant);
setIsLoaded(true);

void saveEvaluation(parsedParticipant, parsedAnswers);
    } catch {
      localStorage.removeItem("istp-answers");
      localStorage.removeItem("istp-participant-data");
      router.replace("/evaluacion");
    }
  }, [router]);

  const totalScore = useMemo(() => {
    if (!answers) return 0;

    return questions.reduce((total, question) => {
      return total + (answers[question.id] ?? 0);
    }, 0);
  }, [answers]);

  const dimensionResults = useMemo<DimensionResult[]>(() => {
  if (!answers) return [];

  return dimensions.map((dimension) => {
    const dimensionQuestions = questions.filter(
      (question) => question.dimension === dimension.id,
    );

    const score = dimensionQuestions.reduce((total, question) => {
      return total + (answers[question.id] ?? 0);
    }, 0);

    return {
      id: dimension.id,
      name: dimension.name,
      score,
      maxScore: dimension.maxScore,
      percentage: Math.round(
        (score / dimension.maxScore) * 100,
      ),
    };
  });
}, [answers]);

const report = getResultReport(totalScore);

async function saveEvaluation(
  participantData: ParticipantData,
  evaluationAnswers: Answers,
) {
  const existingEvaluationId = localStorage.getItem(
    "istp-saved-evaluation-id",
  );

  if (existingEvaluationId) {
    setSavedEvaluationId(existingEvaluationId);
    setSaveStatus("saved");
    return;
  }

  setSaveStatus("saving");

  try {
    const response = await fetch("/api/evaluations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participant: participantData,
        answers: evaluationAnswers,
      }),
    });

    const result = (await response.json()) as {
      ok: boolean;
      evaluation?: {
        id: string;
        total_score: number;
        result_level: string;
        created_at: string;
      };
      error?: string;
    };

    if (!response.ok || !result.ok || !result.evaluation) {
      throw new Error(
        result.error ?? "No fue posible guardar la evaluación.",
      );
    }

    localStorage.setItem(
      "istp-saved-evaluation-id",
      result.evaluation.id,
    );

    setSavedEvaluationId(result.evaluation.id);
    setSaveStatus("saved");
  } catch (error) {
    console.error("Error guardando la evaluación:", error);
    setSaveStatus("error");
  }
}

function restartEvaluation() {
  localStorage.removeItem("istp-answers");
  localStorage.removeItem("istp-current-dimension");
  localStorage.removeItem("istp-saved-evaluation-id");

  router.push("/evaluacion/cuestionario");
}

if (!isLoaded || !participant || !answers) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3]">
      <p className="text-sm text-black/50">
        Calculando tu resultado...
      </p>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <header className="border-b border-white/10 bg-[#050505] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/">
            <Image
              src="/images/logo-olave-echenique.jpeg"
              alt="OlaveEchenique Abogados y Consultores"
              width={220}
              height={72}
              priority
              className="h-auto w-[210px] md:w-[260px]"
            />
          </Link>

          <Link
            href="/"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#ed741f]">
                Resultado ISTP
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Resultado de {participant.companyName}
              </h1>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Evaluación completada por {participant.fullName}.
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm font-medium text-black/65">
                Paso 4 de 4
              </p>
              <p className="mt-1 text-xs text-black/40">
                Evaluación completada
              </p>
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/10">
            <div className="h-full w-full rounded-full bg-[#f37521]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <div className="rounded-3xl bg-[#111111] p-8 text-white shadow-sm">
              <p className="text-sm font-semibold text-[#f58a45]">
                Puntaje total
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-7xl font-semibold tracking-tight">
                  {totalScore}
                </span>

                <span className="pb-2 text-lg text-white/40">
                  /100
                </span>
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-sm text-white/45">
                  Nivel alcanzado
                </p>

                <h2 className="mt-2 text-3xl font-semibold text-[#f37521]">
                  {report.name}
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/60">
                  {report.headline}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#f37521]/20 bg-[#fff7f1] p-6">
              <p className="text-sm font-semibold text-[#d65f13]">
                Próximo paso sugerido
              </p>

              <p className="mt-3 text-sm leading-6 text-black/65">
                {report.service}
              </p>
            </div>
          </aside>

          <div className="space-y-7">
            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold text-[#e76718]">
                Resultado por dimensión
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Desglose de la evaluación
              </h2>

              <div className="mt-8 space-y-7">
                {dimensionResults.map((dimension) => (
                  <DimensionScore
                    key={dimension.id}
                    result={dimension}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold text-[#e76718]">
                Informe de resultado
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                ¿Qué significa tu puntaje?
              </h2>

              <div className="mt-8 space-y-9">
  <ReportBlock
    title="Diagnóstico general"
    text={report.introduction}
  />

  <ReportBlock
    title="Riesgos e implicancias"
    text={report.risk}
  />

  <ReportBlock
    title="Qué significa para tu empresa"
    text={report.meaning}
  />

  <ReportBlock
    title="Por dónde seguir"
    text={report.nextStep}
  />
</div>
            </section>

            <section className="rounded-3xl border border-black/10 bg-[#111111] p-6 text-white shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold text-[#f58a45]">
                    Da el siguiente paso
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    Convierte este resultado en un plan de acción
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-white/60">
                    OlaveEchenique Abogados | Consultores puede
                    acompañarte en la implementación de las mejoras
                    identificadas.
                  </p>
                </div>

                <a
                  href="mailto:contacto@olaveechenique.cl"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#f37521] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#dc6415]"
                >
                  Solicitar orientación
                </a>
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={restartEvaluation}
                className="inline-flex items-center justify-center rounded-xl border border-black/15 bg-white px-6 py-3.5 text-sm font-semibold transition hover:bg-black/5"
              >
                Repetir evaluación
              </button>

              <PdfDownloadButton
  data={{
    companyName: participant.companyName,
    fullName: participant.fullName,
    email: participant.email,
    city: participant.city,
    totalScore,
    levelName: report.name,
    headline: report.headline,
    introduction: report.introduction,
    risk: report.risk,
    meaning: report.meaning,
    nextStep: report.nextStep,
    service: report.service,
    dimensionResults,
  }}
/>
              
            </div>

            <p className="rounded-2xl border border-black/10 bg-white p-5 text-xs leading-5 text-black/45">
              Este resultado es de carácter referencial y orientador.
              No constituye una certificación oficial de sostenibilidad
              tributaria ni una evaluación del Servicio de Impuestos
              Internos.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-black/45 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>OlaveEchenique Abogados | Consultores</p>
          <p>Puerto Montt · Puerto Varas · Valdivia</p>
        </div>
      </footer>
    </main>
  );
}

function DimensionScore({
  result,
}: {
  result: DimensionResult;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-black/80">
            {result.id}. {result.name}
          </h3>

          <p className="mt-1 text-sm text-black/45">
            {result.percentage}% del máximo de la dimensión
          </p>
        </div>

        <p className="shrink-0 font-semibold">
          {result.score}/{result.maxScore}
        </p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-[#f37521]"
          style={{ width: `${result.percentage}%` }}
        />
      </div>
    </div>
  );
}

function ReportBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-l-4 border-[#f37521] pl-5">
      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-black/60">
        {text}
      </p>
    </div>
  );
}