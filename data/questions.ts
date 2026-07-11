export type AnswerValue = 0 | 3 | 5;

export type DimensionId = 1 | 2 | 3;

export type Question = {
  id: number;
  dimension: DimensionId;
  text: string;
};

export const answerOptions: {
  label: string;
  value: AnswerValue;
}[] = [
  {
    label: "No",
    value: 0,
  },
  {
    label: "En parte",
    value: 3,
  },
  {
    label: "Sí",
    value: 5,
  },
];

export const dimensions = [
  {
    id: 1 as DimensionId,
    name: "Estrategia y transparencia",
    description:
      "Evalúa si existe una política tributaria clara, respaldada y demostrable.",
    maxScore: 30,
  },
  {
    id: 2 as DimensionId,
    name: "Control, riesgos y cumplimiento",
    description:
      "Evalúa el cumplimiento de obligaciones, los controles internos y la gestión de riesgos.",
    maxScore: 40,
  },
  {
    id: 3 as DimensionId,
    name: "Cooperación y relación con el SII",
    description:
      "Evalúa la relación preventiva, proactiva y transparente con la autoridad tributaria.",
    maxScore: 30,
  },
];

export const questions: Question[] = [
  {
    id: 1,
    dimension: 1,
    text: "¿Tu empresa tiene lineamientos o una política tributaria escrita sobre cómo decide y cumple sus obligaciones?",
  },
  {
    id: 2,
    dimension: 1,
    text: "¿Está claro quién es responsable de las decisiones tributarias, como el dueño, gerente o contador?",
  },
  {
    id: 3,
    dimension: 1,
    text: "¿Puedes explicar por qué tu empresa paga los impuestos que paga, en línea con su negocio?",
  },
  {
    id: 4,
    dimension: 1,
    text: "¿Estarías dispuesto a mostrar tu compromiso tributario a clientes, bancos o públicamente?",
  },
  {
    id: 5,
    dimension: 1,
    text: "¿Tus planificaciones o economías de opción están documentadas y cuentan con respaldo profesional?",
  },
  {
    id: 6,
    dimension: 1,
    text: "¿Llevas un registro ordenado y accesible de tus decisiones tributarias relevantes?",
  },
  {
    id: 7,
    dimension: 2,
    text: "¿Estás al día con tus declaraciones de IVA, F29, y renta, F22, sin atrasos reiterados?",
  },
  {
    id: 8,
    dimension: 2,
    text: "¿Emites boletas o facturas electrónicas por todas tus operaciones?",
  },
  {
    id: 9,
    dimension: 2,
    text: "¿Tienes identificados los principales riesgos tributarios de tu negocio?",
  },
  {
    id: 10,
    dimension: 2,
    text: "¿Existe algún control que verifique que lo declarado coincide con lo real, mediante revisión o conciliación?",
  },
  {
    id: 11,
    dimension: 2,
    text: "¿Conservas ordenada y respaldada tu documentación tributaria, como libros, contratos y respaldos?",
  },
  {
    id: 12,
    dimension: 2,
    text: "¿Tu contabilidad la lleva un profesional y la revisas durante el año, no solamente en abril?",
  },
  {
    id: 13,
    dimension: 2,
    text: "¿Has revisado tus operaciones con personas o empresas relacionadas, si las tienes?",
  },
  {
    id: 14,
    dimension: 2,
    text: "¿Sabes qué harías si el SII te observa o te requiere información mañana?",
  },
  {
    id: 15,
    dimension: 3,
    text: "¿Mantienes tus datos de contacto actualizados en el SII y revisas sus notificaciones?",
  },
  {
    id: 16,
    dimension: 3,
    text: "¿Respondes a tiempo los avisos o requerimientos del SII?",
  },
  {
    id: 17,
    dimension: 3,
    text: "¿Conoces los beneficios del cumplimiento cooperativo o la sostenibilidad tributaria para pymes?",
  },
  {
    id: 18,
    dimension: 3,
    text: "¿Usas los canales formales del SII ante dudas, como consultas o asistencia, en vez de improvisar?",
  },
  {
    id: 19,
    dimension: 3,
    text: "¿Cuentas con asesoría tributaria externa a la que recurrir de forma preventiva?",
  },
  {
    id: 20,
    dimension: 3,
    text: "¿Estarías dispuesto a certificar tu sostenibilidad tributaria o firmar un acuerdo cooperativo cuando esté disponible para pymes?",
  },
];