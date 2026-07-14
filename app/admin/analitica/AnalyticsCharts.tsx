"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LevelData = {
  name: string;
  value: number;
};

type DimensionData = {
  name: string;
  promedio: number;
};

type CityData = {
  name: string;
  value: number;
};

type Props = {
  levelData: LevelData[];
  dimensionData: DimensionData[];
  cityData: CityData[];
};

const LEVEL_COLORS: Record<string, string> = {
  Inicial: "#dc2626",
  Básico: "#f59e0b",
  "En camino": "#f37521",
  Preparado: "#16a34a",
};

function EmptyChart({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex h-[300px] items-center justify-center rounded-2xl bg-black/[0.025] px-6 text-center text-sm text-black/45">
      {message}
    </div>
  );
}

export default function AnalyticsCharts({
  levelData,
  dimensionData,
  cityData,
}: Props) {
  const totalLevels = levelData.reduce(
    (total, item) => total + item.value,
    0,
  );

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-sm font-semibold text-[#ed741f]">
          Distribución general
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          Evaluaciones por nivel
        </h2>

        <p className="mt-2 text-sm text-black/45">
          Cantidad de empresas clasificadas en cada nivel ISTP.
        </p>

        <div className="mt-6 h-[320px]">
          {totalLevels === 0 ? (
            <EmptyChart message="Todavía no existen evaluaciones para construir este gráfico." />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={levelData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={105}
                  paddingAngle={3}
                >
                  {levelData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        LEVEL_COLORS[entry.name] ??
                        "#737373"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${value} evaluación${
                      Number(value) === 1 ? "" : "es"
                    }`,
                    "Cantidad",
                  ]}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>

      <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-sm font-semibold text-[#ed741f]">
          Desempeño promedio
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          Promedio por dimensión
        </h2>

        <p className="mt-2 text-sm text-black/45">
          Permite identificar la dimensión con mayor brecha.
        </p>

        <div className="mt-6 h-[320px]">
          {dimensionData.every(
            (dimension) => dimension.promedio === 0,
          ) ? (
            <EmptyChart message="Se necesitan evaluaciones para calcular los promedios por dimensión." />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dimensionData}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 20,
                  bottom: 10,
                  left: 20,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={125}
                  tick={{
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Promedio",
                  ]}
                />

                <Bar
                  dataKey="promedio"
                  fill="#f37521"
                  radius={[0, 8, 8, 0]}
                  maxBarSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>

      <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7 lg:col-span-2">
        <p className="text-sm font-semibold text-[#ed741f]">
          Distribución territorial
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          Evaluaciones por ciudad
        </h2>

        <p className="mt-2 text-sm text-black/45">
          Ciudades con mayor participación en la autoevaluación.
        </p>

        <div className="mt-6 h-[340px]">
          {cityData.length === 0 ? (
            <EmptyChart message="Todavía no hay información suficiente para mostrar ciudades." />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cityData}
                margin={{
                  top: 10,
                  right: 20,
                  bottom: 30,
                  left: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={70}
                  tick={{
                    fontSize: 12,
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  width={35}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value} evaluación${
                      Number(value) === 1 ? "" : "es"
                    }`,
                    "Cantidad",
                  ]}
                />

                <Bar
                  dataKey="value"
                  fill="#111111"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={58}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>
    </div>
  );
}