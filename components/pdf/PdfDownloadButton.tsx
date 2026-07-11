"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import IstpReportDocument, {
  type PdfReportData,
} from "./IstpReportDocument";

type Props = {
  data: Omit<PdfReportData, "logoUrl" | "evaluationDate">;
};

function createFileName(companyName: string) {
  const cleanCompanyName = companyName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  const date = new Date().toISOString().slice(0, 10);

  return `informe-istp-${cleanCompanyName || "empresa"}-${date}.pdf`;
}

export default function PdfDownloadButton({ data }: Props) {
  const logoUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/images/logo-olave-echenique.jpeg`
      : "";

  const evaluationDate = new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const completeData: PdfReportData = {
    ...data,
    logoUrl,
    evaluationDate,
  };

  return (
    <PDFDownloadLink
      document={<IstpReportDocument data={completeData} />}
      fileName={createFileName(data.companyName)}
      className="inline-flex items-center justify-center rounded-xl bg-[#f37521] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#dc6415]"
    >
      {({ loading }) =>
        loading ? "Preparando informe..." : "Descargar informe PDF"
      }
    </PDFDownloadLink>
  );
}