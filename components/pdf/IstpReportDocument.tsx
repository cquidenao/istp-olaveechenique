import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

export type PdfDimensionResult = {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
};

export type PdfReportData = {
  companyName: string;
  fullName: string;
  email: string;
  city: string;
  totalScore: number;
  levelName: string;
  headline: string;
  introduction: string;
  risk: string;
  meaning: string;
  nextStep: string;
  service: string;
  dimensionResults: PdfDimensionResult[];
  logoUrl: string;
  evaluationDate: string;
};

type Props = {
  data: PdfReportData;
};

Font.registerHyphenationCallback((word) => [word]);

const colors = {
  black: "#090909",
  dark: "#151515",
  orange: "#F47321",
  orangeDark: "#D95F12",
  orangeSoft: "#FFF3EA",
  white: "#FFFFFF",
  grayBackground: "#F4F4F2",
  grayBorder: "#DDDDDA",
  grayText: "#686868",
  lightText: "#A4A4A4",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.grayBackground,
    color: colors.black,
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingBottom: 52,
  },

  header: {
    height: 108,
    backgroundColor: colors.black,
    paddingHorizontal: 40,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 180,
    height: 64,
    objectFit: "contain",
  },

  headerRight: {
    maxWidth: 280,
    alignItems: "flex-end",
  },

  headerEyebrow: {
    color: colors.orange,
    fontSize: 9,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },

  headerTitle: {
    color: colors.white,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },

  content: {
    paddingHorizontal: 40,
    paddingTop: 27,
  },

  compactContent: {
    paddingHorizontal: 40,
    paddingTop: 22,
  },

  eyebrow: {
    color: colors.orangeDark,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 7,
  },

  mainTitle: {
    fontSize: 25,
    lineHeight: 1.15,
    fontFamily: "Helvetica-Bold",
    marginBottom: 7,
  },

  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    marginBottom: 6,
  },

  subtitle: {
    color: colors.grayText,
    fontSize: 9.5,
    lineHeight: 1.55,
  },

  sectionDescription: {
    color: colors.grayText,
    fontSize: 9.5,
    lineHeight: 1.55,
    marginBottom: 14,
  },

  divider: {
    height: 3,
    backgroundColor: colors.orange,
    borderRadius: 2,
    marginTop: 19,
    marginBottom: 20,
  },

  metadataRow: {
    flexDirection: "row",
    gap: 9,
  },

  metadataBox: {
    flex: 1,
    minHeight: 56,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 8,
    padding: 11,
  },

  metadataLabel: {
    color: colors.grayText,
    fontSize: 7.5,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },

  metadataValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },

  resultGrid: {
    flexDirection: "row",
    gap: 16,
    marginTop: 19,
  },

  scoreCard: {
    width: "35%",
    minHeight: 245,
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 20,
  },

  scoreLabel: {
    color: colors.orange,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 12,
  },

  scoreRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  scoreNumber: {
    color: colors.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 48,
    lineHeight: 1,
  },

  scoreMaximum: {
    color: colors.lightText,
    fontSize: 11,
    marginBottom: 6,
    marginLeft: 5,
  },

  scoreDivider: {
    height: 1,
    backgroundColor: "#353535",
    marginVertical: 16,
  },

  levelLabel: {
    color: colors.lightText,
    fontSize: 8,
    marginBottom: 6,
  },

  levelName: {
    color: colors.orange,
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    marginBottom: 10,
  },

  levelHeadline: {
    color: "#D7D7D7",
    fontSize: 8.7,
    lineHeight: 1.55,
  },

  nextStepCard: {
    flex: 1,
    minHeight: 245,
    backgroundColor: colors.orangeSoft,
    borderWidth: 1,
    borderColor: "#F7C9A8",
    borderRadius: 12,
    padding: 20,
  },

  highlightedTitle: {
    color: colors.orangeDark,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 8,
  },

  highlightedService: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15.5,
    lineHeight: 1.18,
    marginBottom: 9,
  },

  highlightedText: {
    fontSize: 9.5,
    lineHeight: 1.55,
  },

  whiteCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
  },

  dimensionItem: {
    marginBottom: 16,
  },

  dimensionItemLast: {
    marginBottom: 0,
  },

  dimensionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 5,
  },

  dimensionName: {
    maxWidth: "78%",
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },

  dimensionScore: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },

  percentageText: {
    color: colors.grayText,
    fontSize: 7.5,
    marginBottom: 6,
  },

  progressBackground: {
    height: 7,
    backgroundColor: "#E3E3E1",
    borderRadius: 4,
    overflow: "hidden",
  },

  progressBar: {
    height: 7,
    backgroundColor: colors.orange,
    borderRadius: 4,
  },

  reportBlock: {
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    paddingLeft: 13,
    marginBottom: 15,
  },

  reportBlockLast: {
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    paddingLeft: 13,
    marginBottom: 0,
  },

  reportBlockTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    marginBottom: 6,
  },

  reportBlockText: {
    color: "#4F4F4F",
    fontSize: 9.2,
    lineHeight: 1.55,
    textAlign: "justify",
  },

  insightGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  insightCard: {
    flex: 1,
    backgroundColor: colors.orangeSoft,
    borderWidth: 1,
    borderColor: "#F7C9A8",
    borderRadius: 10,
    padding: 14,
  },

  insightLabel: {
    color: colors.orangeDark,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    marginBottom: 6,
    textTransform: "uppercase",
  },

  insightName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    lineHeight: 1.35,
  },

  insightValue: {
    color: colors.grayText,
    fontSize: 8.5,
    marginTop: 5,
  },

  serviceCard: {
    backgroundColor: colors.orangeSoft,
    borderWidth: 1,
    borderColor: "#F7C9A8",
    borderRadius: 12,
    padding: 17,
    marginBottom: 14,
  },

  serviceTitle: {
    color: colors.orangeDark,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 7,
  },

  serviceText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    lineHeight: 1.3,
  },

  ctaCard: {
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 17,
    marginTop: 2,
  },

  ctaEyebrow: {
    color: colors.orange,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    marginBottom: 7,
  },

  ctaTitle: {
    color: colors.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    marginBottom: 8,
  },

  ctaText: {
    color: "#C8C8C8",
    fontSize: 8.8,
    lineHeight: 1.55,
    marginBottom: 10,
  },

  contactText: {
    color: colors.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
  },

  disclaimer: {
    color: colors.grayText,
    fontSize: 7,
    lineHeight: 1.45,
    marginTop: 11,
  },

  footer: {
    position: "absolute",
    bottom: 18,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: colors.grayBorder,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    color: colors.grayText,
    fontSize: 7,
  },
});

function PdfHeader({
  logoUrl,
  title,
}: {
  logoUrl: string;
  title: string;
}) {
  return (
    <View style={styles.header} fixed>
      <Image src={logoUrl} style={styles.logo} />

      <View style={styles.headerRight}>
        <Text style={styles.headerEyebrow}>OlaveEchenique</Text>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
}

function PdfFooter() {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        OlaveEchenique Abogados | Consultores
      </Text>

      <Text
        style={styles.footerText}
        render={({ pageNumber, totalPages }) =>
          `Página ${pageNumber} de ${totalPages}`
        }
      />
    </View>
  );
}

function ReportBlock({
  title,
  text,
  last = false,
}: {
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <View style={last ? styles.reportBlockLast : styles.reportBlock}>
      <Text style={styles.reportBlockTitle}>{title}</Text>
      <Text style={styles.reportBlockText}>{text}</Text>
    </View>
  );
}

export default function IstpReportDocument({ data }: Props) {
  const orderedDimensions = [...data.dimensionResults].sort(
    (a, b) => b.percentage - a.percentage,
  );

  const strongestDimension = orderedDimensions[0];
  const weakestDimension = orderedDimensions[orderedDimensions.length - 1];

  return (
    <Document
      title={`Informe ISTP - ${data.companyName}`}
      author="OlaveEchenique Abogados | Consultores"
      subject="Resultado de autoevaluación ISTP"
    >
      {/* PÁGINA 1: RESUMEN EJECUTIVO */}
      <Page size="A4" style={styles.page}>
        <PdfHeader
          logoUrl={data.logoUrl}
          title="Informe de autoevaluación ISTP"
        />

        <View style={styles.content}>
          <Text style={styles.eyebrow}>
            Índice de Sostenibilidad Tributaria Pyme
          </Text>

          <Text style={styles.mainTitle}>
            Resultado de {data.companyName}
          </Text>

          <Text style={styles.subtitle}>
            Este informe presenta el resultado de la autoevaluación realizada
            por {data.fullName}.
          </Text>

          <View style={styles.divider} />

          <View style={styles.metadataRow} wrap={false}>
            <View style={styles.metadataBox}>
              <Text style={styles.metadataLabel}>Empresa</Text>
              <Text style={styles.metadataValue}>{data.companyName}</Text>
            </View>

            <View style={styles.metadataBox}>
              <Text style={styles.metadataLabel}>Responsable</Text>
              <Text style={styles.metadataValue}>{data.fullName}</Text>
            </View>

            <View style={styles.metadataBox}>
              <Text style={styles.metadataLabel}>Fecha</Text>
              <Text style={styles.metadataValue}>{data.evaluationDate}</Text>
            </View>
          </View>

          <View style={styles.resultGrid} wrap={false}>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreLabel}>Puntaje total ISTP</Text>

              <View style={styles.scoreRow}>
                <Text style={styles.scoreNumber}>{data.totalScore}</Text>
                <Text style={styles.scoreMaximum}>/100</Text>
              </View>

              <View style={styles.scoreDivider} />

              <Text style={styles.levelLabel}>Nivel alcanzado</Text>
              <Text style={styles.levelName}>{data.levelName}</Text>
              <Text style={styles.levelHeadline}>{data.headline}</Text>
            </View>

            <View style={styles.nextStepCard}>
              <Text style={styles.highlightedTitle}>
                Próximo paso sugerido
              </Text>

              <Text style={styles.highlightedService}>{data.service}</Text>
              <Text style={styles.highlightedText}>{data.nextStep}</Text>
            </View>
          </View>
        </View>

        <PdfFooter />
      </Page>

      {/* PÁGINA 2: DIMENSIONES E INTERPRETACIÓN */}
      <Page size="A4" style={styles.page}>
        <PdfHeader
          logoUrl={data.logoUrl}
          title="Resultados por dimensión"
        />

        <View style={styles.compactContent}>
          <Text style={styles.eyebrow}>Desglose ISTP</Text>

          <Text style={styles.sectionTitle}>
            Resultado de las tres dimensiones
          </Text>

          <Text style={styles.sectionDescription}>
            El puntaje total se construye a partir de estrategia y
            transparencia, control, riesgos y cumplimiento, y cooperación con
            el Servicio de Impuestos Internos.
          </Text>

          <View style={styles.whiteCard} wrap={false}>
            {data.dimensionResults.map((dimension, index) => (
              <View
                key={dimension.id}
                style={
                  index === data.dimensionResults.length - 1
                    ? styles.dimensionItemLast
                    : styles.dimensionItem
                }
              >
                <View style={styles.dimensionHeader}>
                  <Text style={styles.dimensionName}>
                    {dimension.id}. {dimension.name}
                  </Text>

                  <Text style={styles.dimensionScore}>
                    {dimension.score}/{dimension.maxScore}
                  </Text>
                </View>

                <Text style={styles.percentageText}>
                  {dimension.percentage}% del máximo de la dimensión
                </Text>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${dimension.percentage}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.insightGrid} wrap={false}>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>Fortaleza principal</Text>
              <Text style={styles.insightName}>
                {strongestDimension.name}
              </Text>
              <Text style={styles.insightValue}>
                {strongestDimension.percentage}% del puntaje máximo
              </Text>
            </View>

            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>Brecha prioritaria</Text>
              <Text style={styles.insightName}>{weakestDimension.name}</Text>
              <Text style={styles.insightValue}>
                {weakestDimension.percentage}% del puntaje máximo
              </Text>
            </View>
          </View>

          <View style={[styles.whiteCard, { marginTop: 14 }]} wrap={false}>
            <Text style={styles.eyebrow}>Interpretación</Text>

            <Text style={styles.sectionTitle}>
              ¿Qué significa para tu empresa?
            </Text>

            <ReportBlock
              title="Situación actual"
              text={data.meaning}
            />

            <ReportBlock
              title="Recomendación prioritaria"
              text={data.nextStep}
              last
            />
          </View>
        </View>

        <PdfFooter />
      </Page>

      {/* PÁGINA 3: DIAGNÓSTICO COMPLETO */}
      <Page size="A4" style={styles.page}>
        <PdfHeader
          logoUrl={data.logoUrl}
          title="Informe personalizado"
        />

        <View style={styles.compactContent}>
          <Text style={styles.eyebrow}>Lectura del resultado</Text>

          <Text style={styles.mainTitle}>Diagnóstico tributario</Text>

          <Text style={styles.sectionDescription}>
            Esta sección desarrolla el significado del nivel obtenido y las
            principales implicancias para la empresa.
          </Text>

          <View style={styles.whiteCard} wrap={false}>
            <ReportBlock
              title="Diagnóstico general"
              text={data.introduction}
            />

            <ReportBlock
              title="Riesgos e implicancias"
              text={data.risk}
              last
            />
          </View>

          <View style={styles.serviceCard} wrap={false}>
            <Text style={styles.serviceTitle}>
              Servicio recomendado
            </Text>

            <Text style={styles.serviceText}>{data.service}</Text>
          </View>
        </View>

        <PdfFooter />
      </Page>

      {/* PÁGINA 4: PLAN DE ACCIÓN Y CONTACTO */}
      <Page size="A4" style={styles.page}>
        <PdfHeader
          logoUrl={data.logoUrl}
          title="Plan de acción sugerido"
        />

        <View style={styles.compactContent}>
          <Text style={styles.eyebrow}>Siguiente etapa</Text>

          <Text style={styles.mainTitle}>Da el siguiente paso</Text>

          <Text style={styles.sectionDescription}>
            El resultado debe entenderse como una fotografía del estado actual
            de la gestión tributaria y como una guía para priorizar mejoras.
          </Text>

          <View style={styles.whiteCard} wrap={false}>
            <ReportBlock
              title="Qué significa para tu empresa"
              text={data.meaning}
            />

            <ReportBlock
              title="Por dónde seguir"
              text={data.nextStep}
              last
            />
          </View>

          <View style={styles.ctaCard} wrap={false}>
            <Text style={styles.ctaEyebrow}>
              OlaveEchenique Abogados | Consultores
            </Text>

            <Text style={styles.ctaTitle}>
              Convierte el resultado en un plan de acción
            </Text>

            <Text style={styles.ctaText}>
              Nuestro equipo puede acompañarte en el diagnóstico,
              formalización, implementación y seguimiento de la gobernanza
              tributaria de tu empresa.
            </Text>

            <Text style={styles.contactText}>
              contacto@olaveechenique.cl
            </Text>

            <Text style={[styles.contactText, { marginTop: 4 }]}>
              www.olaveechenique.cl
            </Text>
          </View>

          <Text style={styles.disclaimer}>
            Este informe es de carácter referencial y orientador, y se basa
            exclusivamente en las respuestas entregadas durante la
            autoevaluación. No constituye una certificación oficial de
            sostenibilidad tributaria, una asesoría legal o tributaria formal,
            ni una evaluación del Servicio de Impuestos Internos.
          </Text>
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}
