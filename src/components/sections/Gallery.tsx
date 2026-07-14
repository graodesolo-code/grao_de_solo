import { gallery } from "@/data/site";
import { images } from "@/data/assets";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Galeria de trabalhos. Grid uniforme com proporção constante (aspect 4/3),
 * para que todas as linhas fechem à mesma altura e o fundo fique sempre liso,
 * sem espaços brancos. As imagens têm um leve zoom em hover; sem legendas.
 */
export function Gallery() {
  return (
    <section id={gallery.id} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          lead={gallery.lead}
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-20 lg:grid-cols-3">
          {gallery.itemKeys.map((key, i) => (
            <Reveal key={key} delay={i * 70}>
              <figure className="group relative overflow-hidden rounded-2xl ring-1 ring-border">
                <img
                  src={images[key].src}
                  alt={images[key].alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
                />
                {/* Gradiente subtil - dá peso wabi-sabi (sem legenda) */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent opacity-70"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
