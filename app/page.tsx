import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Image
            src="/images/logo-olave-echenique.jpeg"
            alt="OlaveEchenique Abogados y Consultores"
            width={260}
            height={90}
            priority
            className="h-auto w-[155px] sm:w-[230px] md:w-[260px]"
          />

          <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-6">
  <Link
    href="/admin/login"
    className="text-sm text-white/70 transition hover:text-[#f37521]"
  >
    <span className="sm:hidden">Admin</span>
    <span className="hidden sm:inline">Administrador</span>
  </Link>

  <Link
    href="https://www.olaveechenique.cl/"
    className="text-sm text-white/70 transition hover:text-white"
  >
    <span className="sm:hidden">Sitio principal</span>
    <span className="hidden sm:inline">
      Volver al sitio principal
    </span>
  </Link>
</div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -right-24 top-16 h-[420px] w-[420px] rounded-full bg-[#f37521]/15 blur-[130px]" />
          <div className="absolute bottom-0 left-10 h-[300px] w-[300px] rounded-full bg-white/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-113px)] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div>
            <span className="mb-5 inline-flex rounded-full border border-[#f37521]/40 bg-[#f37521]/10 px-4 py-2 text-sm font-semibold tracking-wide text-[#f58a45]">
              Autoevaluación tributaria para pymes
            </span>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Índice de Sostenibilidad Tributaria Pyme
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
              Conoce qué tan preparada está tu empresa en materia de
              sostenibilidad tributaria mediante una evaluación de 20
              preguntas.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center rounded-xl bg-[#f37521] px-7 py-4 font-semibold text-white transition hover:bg-[#db6114] focus:outline-none focus:ring-2 focus:ring-[#f37521] focus:ring-offset-2 focus:ring-offset-black"
              >
                Comenzar evaluación
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </Link>

              <a
                href="#informacion"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Conocer el ISTP
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50">
              <span>20 preguntas</span>
              <span>Resultado inmediato</span>
              <span>Informe personalizado</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/45">Evaluación ISTP</p>
                  <h2 className="mt-1 text-xl font-semibold">
                    ¿Qué obtendrás?
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f37521]/15 text-2xl text-[#f37521]">
                  100
                </div>
              </div>

              <div className="space-y-4">
                <InfoCard
                  number="01"
                  title="Diagnóstico confidencial"
                  description="Tus respuestas serán utilizadas para calcular el nivel actual de tu empresa."
                />

                <InfoCard
                  number="02"
                  title="Resultado por dimensiones"
                  description="Estrategia, cumplimiento, control y relación con el SII."
                />

                <InfoCard
                  number="03"
                  title="Informe con próximos pasos"
                  description="Recibirás recomendaciones según el puntaje alcanzado."
                />
              </div>

              <div className="mt-8 rounded-2xl border border-[#f37521]/20 bg-[#f37521]/10 p-5">
                <p className="text-sm leading-6 text-white/70">
                  La evaluación toma aproximadamente 10 minutos y entrega un
                  resultado entre 0 y 100 puntos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="informacion"
        className="border-t border-white/10 bg-white text-[#171717]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e86c1b]">
              Sobre el instrumento
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Una fotografía del estado tributario de tu empresa
            </h2>

            <p className="mt-6 text-lg leading-8 text-black/60">
              El ISTP evalúa el nivel de preparación de una pyme en estrategia,
              transparencia, control, riesgos, cumplimiento y relación
              cooperativa con el Servicio de Impuestos Internos.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <DimensionCard
              number="01"
              title="Estrategia y transparencia"
              points="30 puntos"
            />

            <DimensionCard
              number="02"
              title="Control, riesgos y cumplimiento"
              points="40 puntos"
            />

            <DimensionCard
              number="03"
              title="Cooperación y relación con el SII"
              points="30 puntos"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#050505]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-7 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>OlaveEchenique Abogados | Consultores</p>
          <p>Puerto Montt · Puerto Varas · Valdivia</p>
        </div>
      </footer>
    </main>
  );
}

type InfoCardProps = {
  number: string;
  title: string;
  description: string;
};

function InfoCard({ number, title, description }: InfoCardProps) {
  return (
    <article className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
      <span className="text-sm font-semibold text-[#f37521]">{number}</span>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">{description}</p>
      </div>
    </article>
  );
}

type DimensionCardProps = {
  number: string;
  title: string;
  points: string;
};

function DimensionCard({ number, title, points }: DimensionCardProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-[#fafafa] p-7">
      <span className="text-sm font-semibold text-[#e86c1b]">{number}</span>
      <h3 className="mt-8 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-black/50">{points}</p>
    </article>
  );
}