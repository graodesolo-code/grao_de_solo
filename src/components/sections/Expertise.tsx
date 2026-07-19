import { expertise } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Serviços especializados (consultoria técnica/legal) — bloco editorial,
 * lista numerada sem ícones decorativos, coerente com a estética Wabi-Sabi.
 */
export function Expertise() {
  return (
    <section id={expertise.id} className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={expertise.eyebrow}
          title={expertise.title}
          lead={expertise.lead}
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
          {expertise.items.map((item, i) => (
            <Reveal key={item.title} as="li" delay={i * 80} className="bg-background">
              <div className="flex h-full flex-col gap-3 p-8 md:p-10">
                <span className="font-heading text-4xl leading-none text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-xl font-medium text-balance text-foreground md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
