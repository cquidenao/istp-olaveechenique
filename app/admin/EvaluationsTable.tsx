"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Evaluation = {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  city: string;
  total_score: number;
  result_level: string;
  created_at: string;
};

type Props = {
  evaluations: Evaluation[];
};

const LEVELS = [
  "Todos",
  "Inicial",
  "Básico",
  "En camino",
  "Preparado",
];

export default function EvaluationsTable({
  evaluations,
}: Props) {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("Todos");

  const filteredEvaluations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return evaluations.filter((evaluation) => {
      const matchesSearch =
        !normalizedSearch ||
        evaluation.company_name
          .toLowerCase()
          .includes(normalizedSearch) ||
        evaluation.full_name
          .toLowerCase()
          .includes(normalizedSearch) ||
        evaluation.email
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesLevel =
        level === "Todos" ||
        evaluation.result_level === level;

      return matchesSearch && matchesLevel;
    });
  }, [evaluations, search, level]);

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
      <div className="border-b border-black/10 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Historial de evaluaciones
            </h2>

            <p className="mt-1 text-sm text-black/45">
              {filteredEvaluations.length} resultado
              {filteredEvaluations.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(340px,1fr)_180px]">
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Buscar empresa, nombre o correo"
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-[#f37521] focus:ring-2 focus:ring-[#f37521]/20"
            />

            <select
              value={level}
              onChange={(event) =>
                setLevel(event.target.value)
              }
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#f37521] focus:ring-2 focus:ring-[#f37521]/20"
            >
              {LEVELS.map((option) => (
                <option key={option} value={option}>
                  {option === "Todos"
                    ? "Todos los niveles"
                    : option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredEvaluations.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-black/50">
          No se encontraron evaluaciones con esos filtros.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-black/[0.03] text-black/55">
              <tr>
                <th className="px-6 py-4 font-medium">
                  Fecha
                </th>
                <th className="min-w-[180px] px-6 py-4 font-medium">
                  Empresa
                </th>
                <th className="min-w-[170px] px-6 py-4 font-medium">
                  Responsable
                </th>
                <th className="min-w-[220px] px-6 py-4 font-medium">
                  Correo
                </th>
                <th className="px-6 py-4 font-medium">
                  Ciudad
                </th>
                <th className="px-6 py-4 font-medium">
                  Puntaje
                </th>
                <th className="px-6 py-4 font-medium">
                  Nivel
                </th>
                <th className="px-6 py-4 font-medium">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEvaluations.map((evaluation) => (
                <tr
                  key={evaluation.id}
                  className="border-t border-black/10"
                >
                  <td
  suppressHydrationWarning
  className="whitespace-nowrap px-6 py-4 text-black/55"
>
  {new Intl.DateTimeFormat("es-CL", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date(evaluation.created_at))}
</td>

                  <td className="px-6 py-4 font-medium">
                    {evaluation.company_name}
                  </td>

                  <td className="px-6 py-4">
                    {evaluation.full_name}
                  </td>

                  <td className="px-6 py-4 text-black/60">
                    {evaluation.email}
                  </td>

                  <td className="px-6 py-4">
                    {evaluation.city}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {evaluation.total_score}/100
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-[#fff3ea] px-3 py-1 text-xs font-semibold text-[#d95f12]">
                      {evaluation.result_level}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/evaluaciones/${evaluation.id}`}
                      className="inline-flex whitespace-nowrap rounded-xl border border-black/15 px-4 py-2 text-xs font-semibold transition hover:border-[#f37521] hover:text-[#d95f12]"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}