export type ResultLevel =
  | "initial"
  | "basic"
  | "onTrack"
  | "prepared";

export type ResultReport = {
  level: ResultLevel;
  name: string;
  minScore: number;
  maxScore: number;
  headline: string;
  summary: string;
  meaning: string;
  nextStep: string;
  service: string;
};

export const resultReports: ResultReport[] = [
  {
    level: "initial",
    name: "Inicial",
    minScore: 0,
    maxScore: 40,
    headline:
      "Tu empresa está expuesta. Hay brechas básicas que conviene cerrar cuanto antes.",
    summary:
      "El cumplimiento tributario depende actualmente más de la memoria y de rutinas informales que de una estructura ordenada y demostrable.",
    meaning:
      "Estás en el punto de partida. Lo más valioso es que ahora puedes identificar las brechas y comenzar a construir un sistema de cumplimiento más sólido.",
    nextStep:
      "Lo prioritario es ponerse al día con las obligaciones, ordenar declaraciones, respaldos y documentación, y definir quién toma las decisiones tributarias y cómo se controla lo declarado.",
    service:
      "Diagnóstico e implementación de una gobernanza fiscal mínima.",
  },
  {
    level: "basic",
    name: "Básico",
    minScore: 41,
    maxScore: 60,
    headline:
      "Cumples lo esencial, pero todavía falta orden y respaldo formal.",
    summary:
      "Tu empresa realiza las obligaciones principales, pero el cumplimiento depende de personas, rutinas y conocimientos que todavía no están formalizados.",
    meaning:
      "Tienes una base sana sobre la cual construir. Lo que falta no es necesariamente más esfuerzo, sino incorporar método y procesos.",
    nextStep:
      "Conviene formalizar lo que ya se hace bien mediante un plan de mejora, revisiones periódicas, alertas normativas y controles que permitan anticiparse a los problemas.",
    service:
      "Acompañamiento mensual, plan de mejora y revisión periódica.",
  },
  {
    level: "onTrack",
    name: "En camino",
    minScore: 61,
    maxScore: 80,
    headline:
      "Tienes una buena base de gobernanza fiscal; falta formalizarla.",
    summary:
      "Gran parte de los elementos necesarios ya existe, pero algunos controles, criterios y riesgos todavía no están completamente documentados.",
    meaning:
      "Estás cerca de poder demostrar con respaldo que tu empresa cuenta con una gestión tributaria sostenible.",
    nextStep:
      "El paso siguiente es formalizar una política tributaria, un marco de control fiscal y una matriz de riesgos.",
    service:
      "Implementación de los documentos fundamentales de gobernanza fiscal.",
  },
  {
    level: "prepared",
    name: "Preparado",
    minScore: 81,
    maxScore: 100,
    headline:
      "Tu empresa está en condiciones de avanzar hacia una certificación o acuerdo.",
    summary:
      "La gestión tributaria forma parte de la administración de la empresa, con estrategia, controles, riesgos identificados y una relación proactiva con la autoridad.",
    meaning:
      "Tienes una ventaja competitiva real. El desafío es mantener el estándar y convertirlo en un reconocimiento visible.",
    nextStep:
      "Conviene preparar la evidencia de la gobernanza fiscal, mantener revisiones periódicas y avanzar hacia una certificación cuando el mecanismo correspondiente esté disponible.",
    service:
      "Preparación de expediente, acompañamiento y monitoreo anual.",
  },
];

export function getResultReport(score: number): ResultReport {
  const report = resultReports.find(
    (item) => score >= item.minScore && score <= item.maxScore,
  );

  if (!report) {
    throw new Error("El puntaje está fuera del rango permitido.");
  }

  return report;
}