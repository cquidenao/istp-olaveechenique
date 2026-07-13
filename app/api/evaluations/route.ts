import { NextResponse } from "next/server";
import { questions, type AnswerValue } from "@/data/questions";
import { getResultReport } from "@/data/reports";
import { supabaseAdmin } from "../../../lib/supabase-admin";

type ParticipantPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  companyTaxId?: string;
  position?: string;
  city?: string;
  employeeRange?: string;
  privacyAccepted?: boolean;
};

type EvaluationPayload = {
  participant?: ParticipantPayload;
  answers?: Record<string, unknown>;
};

const VALID_ANSWERS = new Set<AnswerValue>([0, 3, 5]);

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EvaluationPayload;
    const participant = body.participant;
    const rawAnswers = body.answers;

    if (!participant || !rawAnswers) {
      return NextResponse.json(
        {
          ok: false,
          error: "Faltan los datos de la evaluación.",
        },
        { status: 400 },
      );
    }

    const fullName = cleanText(participant.fullName);
    const email = cleanText(participant.email).toLowerCase();
    const phone = cleanText(participant.phone);
    const companyName = cleanText(participant.companyName);
    const companyTaxId = cleanText(participant.companyTaxId);
    const position = cleanText(participant.position);
    const city = cleanText(participant.city);
    const employeeRange = cleanText(participant.employeeRange);

    if (
      !fullName ||
      !email ||
      !phone ||
      !companyName ||
      !position ||
      !city
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Completa todos los datos obligatorios.",
        },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "El correo electrónico no es válido.",
        },
        { status: 400 },
      );
    }

    if (participant.privacyAccepted !== true) {
      return NextResponse.json(
        {
          ok: false,
          error: "Debes aceptar el tratamiento de los datos.",
        },
        { status: 400 },
      );
    }

    const answers: Record<number, AnswerValue> = {};

    for (const question of questions) {
      const rawValue = rawAnswers[String(question.id)];
      const numericValue = Number(rawValue);

      if (!VALID_ANSWERS.has(numericValue as AnswerValue)) {
        return NextResponse.json(
          {
            ok: false,
            error: `La pregunta ${question.id} no tiene una respuesta válida.`,
          },
          { status: 400 },
        );
      }

      answers[question.id] = numericValue as AnswerValue;
    }

    const strategyScore = questions
      .filter((question) => question.dimension === 1)
      .reduce((total, question) => total + answers[question.id], 0);

    const complianceScore = questions
      .filter((question) => question.dimension === 2)
      .reduce((total, question) => total + answers[question.id], 0);

    const cooperationScore = questions
      .filter((question) => question.dimension === 3)
      .reduce((total, question) => total + answers[question.id], 0);

    const totalScore =
      strategyScore + complianceScore + cooperationScore;

    const report = getResultReport(totalScore);

    const { data, error } = await supabaseAdmin
      .from("istp_evaluations")
      .insert({
        full_name: fullName,
        email,
        phone,
        company_name: companyName,
        company_tax_id: companyTaxId || null,
        position,
        city,
        employee_range: employeeRange || null,
        privacy_accepted: true,
        answers,
        strategy_score: strategyScore,
        compliance_score: complianceScore,
        cooperation_score: cooperationScore,
        total_score: totalScore,
        result_level: report.name,
        source: "web",
      })
      .select("id, total_score, result_level, created_at")
      .single();

    if (error) {
      console.error("Error guardando evaluación:", error);

      return NextResponse.json(
        {
          ok: false,
          error: "No fue posible guardar la evaluación.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        evaluation: data,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error inesperado en POST /api/evaluations:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "La solicitud no pudo ser procesada.",
      },
      { status: 500 },
    );
  }
}