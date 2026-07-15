"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  answerOptions,
  dimensions,
  questions,
  type AnswerValue,
} from "@/data/questions";

type Answers = Record<number, AnswerValue>;

export default function QuestionnairePage() {
  const router = useRouter();

  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentDimension = dimensions[currentDimensionIndex];

  const currentQuestions = useMemo(() => {
    return questions.filter(
      (question) => question.dimension === currentDimension.id,
    );
  }, [currentDimension.id]);

  useEffect(() => {
    const participantData = localStorage.getItem("istp-participant-data");

    if (!participantData) {
      router.replace("/evaluacion");
      return;
    }

    const savedAnswers = localStorage.getItem("istp-answers");
    const savedDimension = localStorage.getItem("istp-current-dimension");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers) as Answers);
      } catch {
        localStorage.removeItem("istp-answers");
      }
    }

    if (savedDimension) {
      const parsedDimension = Number(savedDimension);

      if (
        Number.isInteger(parsedDimension) &&
        parsedDimension >= 0 &&
        parsedDimension < dimensions.length
      ) {
        setCurrentDimensionIndex(parsedDimension);
      }
    }

    setIsLoaded(true);
  }, [router]);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("istp-answers", JSON.stringify(answers));
    localStorage.setItem(
      "istp-current-dimension",
      String(currentDimensionIndex),
    );
  }, [answers, currentDimensionIndex, isLoaded]);

  const answeredCurrentQuestions = currentQuestions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;

  const answeredTotal = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;

  const questionnaireProgress = Math.round(
    (answeredTotal / questions.length) * 100,
  );

  const currentDimensionScore = currentQuestions.reduce((total, question) => {
    return total + (answers[question.id] ?? 0);
  }, 0);

  function selectAnswer(questionId: number, value: AnswerValue) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));

    setShowErrors(false);
  }

  function validateCurrentDimension() {
    return currentQuestions.every(
      (question) => answers[question.id] !== undefined,
    );
  }

  function handleContinue() {
    if (!validateCurrentDimension()) {
      setShowErrors(true);

      window.setTimeout(() => {
        const unansweredQuestion = document.querySelector(
          "[data-unanswered='true']",
        );

        unansweredQuestion?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);

      return;
    }

    if (currentDimensionIndex < dimensions.length - 1) {
      setCurrentDimensionIndex((current) => current + 1);
      setShowErrors(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    localStorage.setItem("istp-answers", JSON.stringify(answers));
    router.push("/evaluacion/resultado");
  }

  function handleBack() {
    if (currentDimensionIndex === 0) {
      router.push("/evaluacion");
      return;
    }

    setCurrentDimensionIndex((current) => current - 1);
    setShowErrors(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3]">
        <p className="text-sm text-black/50">Cargando cuestionario...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <header className="border-b border-white/10 bg-black text-white">
  <div className="mx-auto flex min-h-[96px] max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
    <Link href="/">
      <Image
        src="/images/logo-olave-echenique.jpeg"
        alt="Olave Echenique Abogados y Consultores"
        width={280}
        height={96}
        priority
        className="h-auto w-[210px] sm:w-[240px] lg:w-[270px]"
      />
    </Link>

          <Link
            href="/"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Salir de la evaluación
          </Link>
        </div>
      </header>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#ed741f]">
                Cuestionario ISTP
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {currentDimension.name}
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-black/55">
                {currentDimension.description}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm font-medium text-black/65">
                Paso 2 de 4
              </p>

              <p className="mt-1 text-xs text-black/40">
                {questionnaireProgress}% del cuestionario respondido
              </p>
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[#f37521] transition-all duration-300"
              style={{ width: `${questionnaireProgress}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-10 lg:py-14">
        <div className="space-y-5">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#e76718]">
                  Dimensión {currentDimension.id} de 3
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Responde según la realidad actual de tu empresa
                </h2>
              </div>

              <div className="rounded-xl bg-[#f37521]/10 px-4 py-3 text-sm">
                <span className="font-semibold text-[#d65f13]">
                  {answeredCurrentQuestions}
                </span>

                <span className="text-black/45">
                  {" "}
                  de {currentQuestions.length} respondidas
                </span>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              {currentQuestions.map((question) => {
                const selectedAnswer = answers[question.id];
                const isUnanswered = selectedAnswer === undefined;
                const hasError = showErrors && isUnanswered;

                return (
                  <article
                    key={question.id}
                    data-unanswered={hasError ? "true" : "false"}
                    className={`rounded-2xl border p-5 transition sm:p-6 ${
                      hasError
                        ? "border-red-400 bg-red-50"
                        : "border-black/10 bg-[#fafafa]"
                    }`}
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f37521]/10 text-sm font-semibold text-[#e76718]">
                        {question.id}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold leading-6 text-black/80 sm:text-base">
                          {question.text}
                        </h3>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          {answerOptions.map((option) => {
                            const isSelected =
                              selectedAnswer === option.value;

                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() =>
                                  selectAnswer(question.id, option.value)
                                }
                                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                                  isSelected
                                    ? "border-[#f37521] bg-[#f37521] text-white shadow-sm"
                                    : "border-black/15 bg-white text-black/65 hover:border-[#f37521] hover:text-[#d65f13]"
                                }`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>

                        {hasError && (
                          <p className="mt-3 text-sm text-red-600">
                            Selecciona una respuesta para continuar.
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center rounded-xl border border-black/15 px-6 py-3.5 text-sm font-semibold transition hover:bg-black/5"
              >
                ← Volver
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex items-center justify-center rounded-xl bg-[#f37521] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#dc6415] focus:outline-none focus:ring-2 focus:ring-[#f37521] focus:ring-offset-2"
              >
                {currentDimensionIndex === dimensions.length - 1
                  ? "Ver mi resultado"
                  : "Continuar"}

                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-black/10 bg-[#111111] p-7 text-white shadow-sm">
            <p className="text-sm font-semibold text-[#f58a45]">
              Avance de la evaluación
            </p>

            <div className="mt-5 flex items-end gap-2">
              <span className="text-4xl font-semibold">
                {answeredTotal}
              </span>

              <span className="pb-1 text-sm text-white/45">
                de {questions.length} preguntas
              </span>
            </div>

            <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
              {dimensions.map((dimension, index) => {
                const dimensionQuestions = questions.filter(
                  (question) => question.dimension === dimension.id,
                );

                const dimensionAnswered = dimensionQuestions.filter(
                  (question) => answers[question.id] !== undefined,
                ).length;

                const isCurrent = index === currentDimensionIndex;
                const isCompleted =
                  dimensionAnswered === dimensionQuestions.length;

                return (
                  <div key={dimension.id} className="flex gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        isCompleted
                          ? "bg-[#f37521] text-white"
                          : isCurrent
                            ? "border border-[#f37521] text-[#f58a45]"
                            : "border border-white/15 text-white/40"
                      }`}
                    >
                      {isCompleted ? "✓" : dimension.id}
                    </span>

                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          isCurrent ? "text-white" : "text-white/60"
                        }`}
                      >
                        {dimension.name}
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        {dimensionAnswered} de {dimensionQuestions.length}{" "}
                        respondidas
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-[#f37521]/20 bg-[#fff7f1] p-6">
            <p className="text-sm font-semibold text-[#d65f13]">
              Puntaje provisional
            </p>

            <div className="mt-3 flex items-end gap-2">
              <span className="text-3xl font-semibold">
                {currentDimensionScore}
              </span>

              <span className="pb-1 text-sm text-black/45">
                de {currentDimension.maxScore} puntos en esta dimensión
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-black/55">
              Responde con honestidad. El objetivo es identificar las brechas
              reales de la empresa, no obtener artificialmente un puntaje alto.
            </p>
          </div>
        </aside>
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