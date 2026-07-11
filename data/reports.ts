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
  introduction: string;
  risk: string;
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
    introduction:
      "Un puntaje en este rango no significa que hagas las cosas de mala fe. La enorme mayoría de las pymes que parten aquí lo hacen por desconocimiento y por falta de tiempo, no por descuido deliberado. Lo que muestra el resultado es que tu cumplimiento tributario descansa hoy más en la buena voluntad y en la memoria que en un orden real. Probablemente cumples cuando te acuerdas o cuando llega el plazo, pero no tienes una forma clara de demostrar ese cumplimiento ni de anticiparte a un problema.",
    risk:
      "El riesgo concreto es doble. Por un lado, quedas más expuesto a una fiscalización: sin registros ni controles, una diferencia menor puede transformarse en una contingencia mayor, con intereses que pueden acumularse. Por otro lado, empiezas a quedar fuera de oportunidades, porque cada vez más empresas grandes, bancos y licitaciones revisan el perfil tributario de quienes trabajan con ellos, y sin orden es difícil acreditarlo.",
    meaning:
      "Estás en el punto de partida, y lo más valioso es que ahora lo sabes. Casi cualquier acción que tomes mejora tu situación, porque todavía no existe una estructura sólida sobre la cual apoyarse.",
    nextStep:
      "Lo prioritario es ponerse al día con las obligaciones y ordenar la información básica: declaraciones, respaldos y documentación. Después conviene dar el primer paso hacia una gobernanza fiscal mínima, dejando por escrito quién decide y cómo se controla lo que se declara. No necesitas resolverlo todo de una vez; necesitas comenzar por el orden básico que después te permitirá avanzar hacia una certificación o registro.",
    service:
      "Diagnóstico a fondo e implementación de una gobernanza fiscal mínima.",
  },
  {
    level: "basic",
    name: "Básico",
    minScore: 41,
    maxScore: 60,
    headline:
      "Cumples lo esencial, pero sin orden ni respaldo formal.",
    introduction:
      "Estás en una de las bandas más comunes entre las pymes, y tiene una lectura positiva: lo importante lo haces. Declaras, emites tus documentos y, en términos generales, estás al día. El problema no es necesariamente lo que haces, sino que lo haces sin un sistema formal. Tu cumplimiento depende de personas y de rutinas informales más que de procesos, y eso lo vuelve frágil si cambia el contador, crece el volumen o aparece una operación fuera de lo habitual.",
    risk:
      "En la práctica, esto significa que cumples, pero no siempre puedes demostrarlo con facilidad, y que reaccionas a los problemas en vez de anticiparlos. Es posible que todavía no tengas identificados todos tus riesgos tributarios, que no cuentes con controles suficientes para verificar que lo declarado coincide con lo real y que tu relación con el SII sea más pasiva que preventiva.",
    meaning:
      "Tienes una base sana sobre la cual construir y estás más cerca de lo que crees de un cumplimiento sólido. Lo que falta no es necesariamente más esfuerzo, sino método.",
    nextStep:
      "El paso natural es formalizar lo que ya haces bien. Un acompañamiento que instale orden mediante un plan de mejora, alertas ante cambios normativos y revisiones periódicas permite pasar de cumplir por rutina a cumplir por diseño. Ese salto también te acerca a poder acreditar tu sostenibilidad tributaria cuando exista un mecanismo disponible para pymes.",
    service:
      "Acompañamiento mensual, plan de mejora, alertas normativas y revisión periódica.",
  },
  {
    level: "onTrack",
    name: "En camino",
    minScore: 61,
    maxScore: 80,
    headline:
      "Tienes una buena base de gobernanza fiscal; te falta formalizarla.",
    introduction:
      "Un puntaje en este rango indica que tu empresa ya se toma en serio su cumplimiento y que buena parte de las piezas está en su lugar. Probablemente sabes quién decide en materia tributaria, tienes tus obligaciones bajo control, conservas tu documentación y mantienes una relación ordenada con la autoridad. No partes de cero: partes desde una posición de ventaja frente a muchas pymes.",
    risk:
      "Lo que te separa del nivel más alto no es necesariamente hacer más cosas, sino dejarlas formalizadas y demostrables. Es probable que tengas controles, pero no escritos; que conozcas tus riesgos, pero no estén registrados en una matriz; o que tengas criterios tributarios claros, pero no estén plasmados en una política divulgable. Esa falta de documentación puede dificultar una futura certificación o revisión formal.",
    meaning:
      "Estás a un paso de poder mostrar, con respaldo, que tu empresa cuenta con una gestión tributaria sostenible. El trabajo pendiente es de consolidación, no de construcción.",
    nextStep:
      "Conviene implementar formalmente los documentos que ordenan la gobernanza fiscal: una política tributaria, un marco de control fiscal y una matriz de riesgos. Con esos elementos instalados, la empresa queda mejor preparada para avanzar hacia una certificación independiente o incorporarse a un registro cuando ese camino esté disponible.",
    service:
      "Implementación de política fiscal, marco de control y matriz de riesgos.",
  },
  {
    level: "prepared",
    name: "Preparado",
    minScore: 81,
    maxScore: 100,
    headline:
      "Tu empresa está en condiciones de certificar o de suscribir un acuerdo.",
    introduction:
      "Estás en la banda más alta, y eso muestra que tu empresa trata el cumplimiento tributario como parte de su gestión, no como un trámite de última hora. Tienes una estrategia tributaria clara y explicable, controles internos que entregan seguridad sobre lo declarado, riesgos identificados y una relación proactiva y transparente con el SII.",
    risk:
      "En este nivel, la sostenibilidad tributaria deja de ser solo una defensa y pasa a convertirse en un activo. Un perfil como el de tu empresa puede ser una carta de presentación frente a bancos, clientes corporativos y licitaciones. El principal riesgo ya no es la falta de estructura, sino perder el estándar por ausencia de seguimiento, actualización o evidencia suficiente.",
    meaning:
      "Tienes una ventaja competitiva real y estás en condiciones de formalizarla. Lo que viene ahora es convertir tu buen cumplimiento en un reconocimiento visible y demostrable.",
    nextStep:
      "El paso natural es preparar la evidencia de la gobernanza fiscal y avanzar hacia una certificación independiente o hacia un registro de sostenibilidad tributaria cuando esté disponible para pymes. Mantener el estándar mediante revisiones periódicas permitirá conservar esa ventaja en el tiempo.",
    service:
      "Preparación de expediente de evidencia, acompañamiento hacia certificación o registro y monitoreo anual.",
  },
];

export function getResultReport(score: number): ResultReport {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error("El puntaje debe estar entre 0 y 100.");
  }

  const report = resultReports.find(
    (item) => score >= item.minScore && score <= item.maxScore,
  );

  if (!report) {
    throw new Error("No se encontró un informe para el puntaje indicado.");
  }

  return report;
}