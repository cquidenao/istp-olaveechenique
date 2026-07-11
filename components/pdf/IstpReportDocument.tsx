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
  summary: string;
  meaning: string;
  nextStep: string;
  service: string;
  dimensionResults: PdfDimensionResult[];
  logoUrl: string;
  evaluationDate: string;
};
Font.registerHyphenationCallback((word) => [word]);
type Props = {
  data: PdfReportData;
};

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
    paddingBottom: 54,
  },

  header: {
    backgroundColor: colors.black,
    paddingHorizontal: 40,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 150,
    height: 55,
    objectFit: "contain",
  },

  headerRight: {
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
  },

  content: {
    paddingHorizontal: 40,
    paddingTop: 30,
  },

  eyebrow: {
    color: colors.orangeDark,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },

  mainTitle: {
    fontSize: 26,
    lineHeight: 1.15,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },

  subtitle: {
    color: colors.grayText,
    fontSize: 10,
    lineHeight: 1.6,
  },

  divider: {
    height: 3,
    backgroundColor: colors.orange,
    borderRadius: 2,
    marginTop: 22,
    marginBottom: 24,
  },

  metadataRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  metadataBox: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 8,
    padding: 13,
  },

  metadataLabel: {
    color: colors.grayText,
    fontSize: 8,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },

  metadataValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },

  resultGrid: {
    flexDirection: "row",
    gap: 18,
    marginTop: 22,
  },

  scoreCard: {
    width: "35%",
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 22,
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
    fontSize: 50,
    lineHeight: 1,
  },

  scoreMaximum: {
    color: colors.lightText,
    fontSize: 12,
    marginBottom: 6,
    marginLeft: 5,
  },

  scoreDivider: {
    height: 1,
    backgroundColor: "#353535",
    marginVertical: 18,
  },

  levelLabel: {
    color: colors.lightText,
    fontSize: 8,
    marginBottom: 7,
  },

  levelName: {
    color: colors.orange,
    fontFamily: "Helvetica-Bold",
    fontSize: 23,
    marginBottom: 12,
  },

  levelHeadline: {
    color: "#D7D7D7",
    fontSize: 9,
    lineHeight: 1.6,
  },

  nextStepCard: {
    flex: 1,
    backgroundColor: colors.orangeSoft,
    borderWidth: 1,
    borderColor: "#F7C9A8",
    borderRadius: 12,
    padding: 22,
  },

  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 17,
    marginBottom: 6,
  },

  sectionDescription: {
    color: colors.grayText,
    lineHeight: 1.6,
    marginBottom: 17,
  },

  highlightedTitle: {
    color: colors.orangeDark,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 10,
  },

  highlightedText: {
    fontSize: 11,
    lineHeight: 1.7,
  },

  pageSection: {
    paddingHorizontal: 40,
    paddingTop: 32,
  },

  whiteCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 12,
    padding: 22,
    marginBottom: 18,
  },

  dimensionItem: {
    marginBottom: 19,
  },

  dimensionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 6,
  },

  dimensionName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    maxWidth: "76%",
  },

  dimensionScore: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },

  percentageText: {
    color: colors.grayText,
    fontSize: 8,
    marginBottom: 7,
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E3E3E1",
    borderRadius: 4,
    overflow: "hidden",
  },

  progressBar: {
    height: 8,
    backgroundColor: colors.orange,
    borderRadius: 4,
  },

  reportBlock: {
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    paddingLeft: 15,
    marginBottom: 19,
  },

  reportBlockTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    marginBottom: 7,
  },

  reportBlockText: {
    color: "#4F4F4F",
    fontSize: 10,
    lineHeight: 1.7,
  },

  ctaCard: {
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 22,
    marginTop: 4,
  },

  ctaEyebrow: {
    color: colors.orange,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 8,
  },

  ctaTitle: {
    color: colors.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    marginBottom: 10,
  },

  ctaText: {
    color: "#C8C8C8",
    fontSize: 9,
    lineHeight: 1.7,
    marginBottom: 13,
  },

  contactText: {
    color: colors.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },

  disclaimer: {
    color: colors.grayText,
    fontSize: 8,
    lineHeight: 1.55,
    marginTop: 18,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: colors.grayBorder,
    paddingTop: 9,
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
    <View style={styles.header}>
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

export default function IstpReportDocument({ data }: Props) {
  return (
    <Document
      title={`Informe ISTP - ${data.companyName}`}
      author="OlaveEchenique Abogados | Consultores"
      subject="Resultado de autoevaluación ISTP"
    >
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

          <View style={styles.metadataRow}>
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

          <View style={styles.resultGrid}>
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

              <Text style={styles.sectionTitle}>{data.service}</Text>

              <Text style={styles.highlightedText}>{data.nextStep}</Text>
            </View>
          </View>

          <View style={[styles.whiteCard, { marginTop: 22 }]}>
            <Text style={styles.eyebrow}>Lectura del resultado</Text>
            <Text style={styles.sectionTitle}>Diagnóstico general</Text>
            <Text style={styles.sectionDescription}>{data.summary}</Text>
          </View>
        </View>

        <PdfFooter />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          logoUrl={data.logoUrl}
          title="Resultados por dimensión"
        />

        <View style={styles.pageSection}>
          <Text style={styles.eyebrow}>Desglose ISTP</Text>
          <Text style={styles.sectionTitle}>
            Resultado de las tres dimensiones
          </Text>

          <Text style={styles.sectionDescription}>
            El puntaje total se construye a partir de estrategia y
            transparencia, control y cumplimiento, y relación cooperativa con
            el Servicio de Impuestos Internos.
          </Text>

          <View style={styles.whiteCard}>
            {data.dimensionResults.map((dimension) => (
              <View key={dimension.id} style={styles.dimensionItem}>
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

          <View style={styles.whiteCard}>
            <Text style={styles.eyebrow}>Interpretación</Text>
            <Text style={styles.sectionTitle}>
              ¿Qué significa para tu empresa?
            </Text>

            <View style={styles.reportBlock}>
              <Text style={styles.reportBlockTitle}>
                Situación actual
              </Text>

              <Text style={styles.reportBlockText}>{data.meaning}</Text>
            </View>

            <View style={styles.reportBlock}>
              <Text style={styles.reportBlockTitle}>
                Recomendación prioritaria
              </Text>

              <Text style={styles.reportBlockText}>{data.nextStep}</Text>
            </View>
          </View>
        </View>

        <PdfFooter />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          logoUrl={data.logoUrl}
          title="Plan de acción sugerido"
        />

        <View style={styles.pageSection}>
          <Text style={styles.eyebrow}>Informe personalizado</Text>
          <Text style={styles.mainTitle}>
            Da el siguiente paso
          </Text>

          <Text style={styles.sectionDescription}>
            El resultado debe entenderse como una fotografía del estado actual
            de la gestión tributaria y como una guía para priorizar mejoras.
          </Text>

          <View style={styles.whiteCard}>
            <View style={styles.reportBlock}>
              <Text style={styles.reportBlockTitle}>
                Diagnóstico general
              </Text>
              <Text style={styles.reportBlockText}>{data.summary}</Text>
            </View>

            <View style={styles.reportBlock}>
              <Text style={styles.reportBlockTitle}>
                Qué significa para tu empresa
              </Text>
              <Text style={styles.reportBlockText}>{data.meaning}</Text>
            </View>

            <View style={styles.reportBlock}>
              <Text style={styles.reportBlockTitle}>
                Por dónde seguir
              </Text>
              <Text style={styles.reportBlockText}>{data.nextStep}</Text>
            </View>
          </View>

          <View style={styles.ctaCard}>
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

            <Text style={[styles.contactText, { marginTop: 5 }]}>
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