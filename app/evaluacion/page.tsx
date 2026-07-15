"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function EvaluationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    position: "",
    city: "",
    privacyAccepted: false,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.companyName ||
      !form.position ||
      !form.city ||
      !form.privacyAccepted
    ) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    // Inicia una evaluación completamente nueva.
localStorage.removeItem("istp-answers");
localStorage.removeItem("istp-current-dimension");
localStorage.removeItem("istp-saved-evaluation-id");

localStorage.setItem(
  "istp-participant-data",
  JSON.stringify(form),
);

router.push("/evaluacion/cuestionario");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <header className="border-b border-white/10 bg-[#050505]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
  <Link href="/">
    <Image
      src="/images/logo-olave-echenique.jpeg"
      alt="Olave Echenique Abogados y Consultores"
      width={360}
      height={125}
      className="h-auto w-[240px] sm:w-[300px] md:w-[360px]"
      priority
    />
  </Link>

          <Link
            href="/"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Salir de la evaluación
          </Link>
        </div>
      </header>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-7">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-[#f37521]">
                Evaluación ISTP
              </p>

              <h1 className="mt-2 text-3xl font-semibold">
                Información de la persona y empresa
              </h1>

              <p className="mt-3 text-sm text-black/55">
                Completa tus datos antes de comenzar el cuestionario.
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">Paso 1 de 4</p>
              <p className="mt-1 text-xs text-black/45">25% completado</p>
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/10">
            <div className="h-full w-1/4 rounded-full bg-[#f37521]" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_330px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm"
        >
          <h2 className="text-xl font-semibold">Datos de contacto</h2>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <Field label="Nombre completo">
              <input
                type="text"
                value={form.fullName}
                onChange={(event) =>
                  setForm({ ...form, fullName: event.target.value })
                }
                placeholder="Ejemplo: María Pérez"
                className={inputClass}
              />
            </Field>

            <Field label="Correo electrónico">
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="correo@empresa.cl"
                className={inputClass}
              />
            </Field>

            <Field label="Teléfono">
              <input
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
                placeholder="+56 9 1234 5678"
                className={inputClass}
              />
            </Field>

            <Field label="Cargo o función">
              <input
                type="text"
                value={form.position}
                onChange={(event) =>
                  setForm({ ...form, position: event.target.value })
                }
                placeholder="Ejemplo: Gerente general"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-10 border-t border-black/10 pt-8">
            <h2 className="text-xl font-semibold">
              Información de la empresa
            </h2>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <Field label="Nombre o razón social">
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(event) =>
                    setForm({ ...form, companyName: event.target.value })
                  }
                  placeholder="Ejemplo: Empresa del Sur SpA"
                  className={inputClass}
                />
              </Field>

              <Field label="Ciudad">
                <select
                  value={form.city}
                  onChange={(event) =>
                    setForm({ ...form, city: event.target.value })
                  }
                  className={inputClass}
                >
                  <option value="">Selecciona una ciudad</option>
                  <option value="Puerto Montt">Puerto Montt</option>
                  <option value="Puerto Varas">Puerto Varas</option>
                  <option value="Valdivia">Valdivia</option>
                  <option value="Osorno">Osorno</option>
                  <option value="Otra">Otra</option>
                </select>
              </Field>
            </div>
          </div>

          <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-[#fafafa] p-5">
            <input
              type="checkbox"
              checked={form.privacyAccepted}
              onChange={(event) =>
                setForm({
                  ...form,
                  privacyAccepted: event.target.checked,
                })
              }
              className="mt-1 h-4 w-4 accent-[#f37521]"
            />

            <span className="text-sm leading-6 text-black/65">
              Acepto que la información entregada sea utilizada para generar
              el resultado de la autoevaluación y gestionar un eventual
              contacto de OlaveEchenique.
            </span>
          </label>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
  <Link
    href="/"
    className="inline-flex w-full items-center justify-center rounded-xl border border-black/15 px-6 py-4 text-base font-semibold transition hover:bg-black/5 sm:w-auto sm:py-3"
  >
    Volver
  </Link>

  <button
    type="submit"
    className="inline-flex w-full items-center justify-center rounded-xl bg-[#f37521] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#dc6415] sm:w-auto sm:py-3"
  >
    Continuar al cuestionario
    <span className="ml-2" aria-hidden="true">
      →
    </span>
  </button>
</div>
        </form>

        <aside className="rounded-3xl bg-[#111111] p-7 text-white">
          <p className="text-sm font-semibold text-[#f58a45]">
            Tu información
          </p>

          <h2 className="mt-3 text-xl font-semibold">
            ¿Por qué solicitamos estos datos?
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/60">
            Los datos permitirán identificar la evaluación, personalizar el
            informe y facilitar el contacto con la empresa.
          </p>

          <div className="mt-7 space-y-5 border-t border-white/10 pt-6">
            <Info title="Uso confidencial" />
            <Info title="Resultado personalizado" />
            <Info title="Evaluación referencial" />
          </div>
        </aside>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-black/75">
        {label} <span className="text-[#f37521]">*</span>
      </label>

      {children}
    </div>
  );
}

function Info({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f37521]/15 text-xs text-[#f58a45]">
        ✓
      </span>

      <p className="text-sm text-white/70">{title}</p>
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-[#f37521] focus:ring-4 focus:ring-[#f37521]/10";