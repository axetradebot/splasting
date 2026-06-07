"use client";

import { useState, type ComponentProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ServicePopup, { type ServicePopupData } from "./ServicePopup";

type ServicePreview = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  popup: ServicePopupData;
};

const epoxiImages = [
  "/images/Epoxibehandling/IMG-20260510-WA0006.jpg",
  "/images/Epoxibehandling/IMG-20260510-WA0007.jpg",
  "/images/Epoxibehandling/IMG-20260510-WA0008.jpg",
  "/images/Epoxibehandling/IMG-20260510-WA0009.jpg",
  "/images/Epoxibehandling/IMG-20260510-WA0010.jpg",
  "/images/Epoxibehandling/IMG-20260510-WA0011.jpg",
  "/images/Epoxibehandling/IMG-20260607-WA0015.jpg",
];

const gelcoatImages = [
  "/images/Gelcoat-reparation/IMG-20260607-WA0000.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0001.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0002.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0003.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0004.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0005.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0006.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0007.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0008.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0009.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0010.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0011.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0012.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0013.jpg",
  "/images/Gelcoat-reparation/IMG-20260607-WA0014.jpg",
];

const poleringImages = [
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0019.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0020.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0021.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0022.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0023.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0024.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0025.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0026.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0027.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0028.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0029.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0030.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0031.jpg",
  "/images/Polering%20%26%20vaxning/IMG-20260607-WA0032.jpg",
];

const teakImages = [
  "/images/Teaktv%C3%A4tt/IMG-20260607-WA0034.jpg",
  "/images/Teaktv%C3%A4tt/IMG-20260607-WA0035.jpg",
  "/images/Teaktv%C3%A4tt/IMG-20260607-WA0036.jpg",
];

const specialarbetenImages = [
  "/images/Specialarbeten/IMG-20260511-WA0002.jpg",
  "/images/Specialarbeten/IMG-20260511-WA0003.jpg",
  "/images/Specialarbeten/IMG-20260511-WA0004.jpg",
  "/images/Specialarbeten/IMG-20260511-WA0005.jpg",
  "/images/Specialarbeten/IMG-20260511-WA0006.jpg",
  "/images/Specialarbeten/IMG-20260511-WA0007.jpg",
  "/images/Specialarbeten/IMG-20260511-WA0008.jpg",
];

const primaryServices: ServicePreview[] = [
  {
    title: "Epoxibehandling",
    description:
      "Skydda din båtbotten med en hållbar och professionell epoxibehandling som hjälper till att förebygga fukt och slitage samtidigt som båten får en fräsch och välbehandlad yta.",
    tags: ["Epoxi", "Bottenfärg", "Skrovskydd"],
    image: epoxiImages[0],
    popup: {
      title: "Epoxibehandling",
      images: epoxiImages,
      included: [
        "Slipning av ytan för att kontrollera skicket ordentligt",
        "Rengöring med aceton",
        "Epoxispackling vid behov",
        "Slipning för jämn och fin yta",
        "Maskering av ny vattenlinje",
        "Applicering av 2 lager epoxifärg (grundskydd)",
        "Applicering av 2 lager bottenfärg",
        "Flytt av lättillgängliga bockar för att kunna slipa och måla hela ytan ordentligt",
      ],
      note: "Botten­sanering av gammal bottenfärg ingår ej. Pris för blästring eller skrapning lämnas separat vid förfrågan.",
    },
  },
  {
    title: "Polering & vaxning",
    description:
      "Ge båten tillbaka sin glans med en noggrann flerstegs behandling som tar bort oxidation, återställer lyster och skyddar ytan under säsongen.",
    tags: ["3-stegspolering", "Vaxning", "Glans"],
    image: poleringImages[0],
    popup: {
      title: "Polering & vaxning",
      images: poleringImages,
      included: [
        "3-stegspolering",
        "Rubbing med roterande polermaskin för att avlägsna oxidation",
        "Finpolering med oscillerande maskin",
        "Vaxning med oscillerande maskin för långvarigt skydd",
        "Polering av rostfria detaljer",
        "Rengöring runt luckor och kanaler",
      ],
    },
  },
  {
    title: "Gelcoat-reparation",
    description:
      "Har båten fått en skada ovan eller under vattenlinjen? Vi återställer ytan med fokus på hållbarhet, finish och noggrann färgmatchning för ett resultat som smälter in naturligt.",
    tags: ["Gelcoat", "Färgmatchning", "Skrovreparation"],
    image: gelcoatImages[0],
    popup: {
      title: "Gelcoat-reparation",
      images: gelcoatImages,
      included: [
        "Inspektion och bedömning av skadan",
        "Slipning och förberedelse av området",
        "Reparation med gelcoat och filler vid behov",
        "Färgmatchning för bästa möjliga resultat",
        "Våtslipning och polering av den reparerade ytan",
        "Finisharbete för jämn övergång mot originalyta",
      ],
    },
  },
];

const additionalServices: ServicePreview[] = [
  {
    title: "Teaktvätt",
    description:
      "Vi tvättar och återställer din teak med en effektiv 2-stegsbehandling som rengör på djupet och fräschar upp träets naturliga färg.",
    tags: ["Teak", "2-stegs", "Rengöring"],
    image: teakImages[0],
    popup: {
      title: "Teaktvätt",
      images: teakImages,
      included: [
        "Skydd av aluminiumdetaljer mot blekningsmedel",
        "Steg 1 – rengöring av smuts och missfärgningar",
        "Steg 2 – blekning för att återställa teakens färg",
        "Noggrann avsköljning och rengöring av ytan",
      ],
      optional: [
        "Oljning av teak",
        "Impregnering för extra skydd och längre hållbarhet",
      ],
    },
  },
  {
    title: "Specialarbeten",
    description:
      "Behöver du hjälp med något utöver våra vanliga tjänster? Vi tar oss an de flesta typer av arbeten inom båtservice och specialprojekt.",
    tags: ["Skräddarsytt", "Specialprojekt", "Båtservice"],
    image: specialarbetenImages[0],
    popup: {
      title: "Specialarbeten",
      images: specialarbetenImages,
      intro:
        "Behöver du hjälp med något utöver våra vanliga tjänster? Vi tar oss an de flesta typer av arbeten inom båtservice och specialprojekt.",
      includedTitle: "Exempel på specialarbeten",
      included: [
        "Mindre reparationer",
        "Montering och demontering",
        "Anpassade lösningar",
        "Service och underhåll",
        "Böldpestbehandlingar",
        "Byte och reparation av teakdeck",
        "Swimmingpool-arbeten och reparationer",
      ],
      closing:
        "Hör av dig med dina önskemål så tar vi fram en lösning som passar just din båt.",
    },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function ServiceCardContent({
  service,
  onOpen,
}: {
  service: ServicePreview;
  onOpen: (service: ServicePreview) => void;
}) {
  return (
    <button
        type="button"
        onClick={() => onOpen(service)}
        className="block group w-full text-left cursor-pointer"
      >
        <div className="glass-card rounded-2xl overflow-hidden h-full">
          <div className="relative h-48 md:h-56 overflow-hidden bg-slate-100">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-accent-primary transition-colors">
              {service.title}
            </h3>
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              {service.description}
            </p>
            <span className="inline-flex items-center gap-1 text-accent-primary text-base font-medium group-hover:gap-2 transition-all">
              Läs Mer{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </div>
        </div>
      </button>
  );
}

function ServiceCard({
  service,
  onOpen,
  motionProps,
}: {
  service: ServicePreview;
  onOpen: (service: ServicePreview) => void;
  motionProps?: ComponentProps<typeof motion.div>;
}) {
  return (
    <motion.div {...motionProps}>
      <ServiceCardContent service={service} onOpen={onOpen} />
    </motion.div>
  );
}

export default function ServicesPreview() {
  const [showMore, setShowMore] = useState(false);
  const [activeService, setActiveService] = useState<ServicePopupData | null>(
    null,
  );
  const [imageIndex, setImageIndex] = useState(0);

  const openPopup = (service: ServicePreview) => {
    setActiveService(service.popup);
    setImageIndex(0);
  };

  const closePopup = () => {
    setActiveService(null);
    setImageIndex(0);
  };

  return (
    <>
      <section className="py-20 md:py-28 px-6 bg-bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Professionell Restaurering För Varje Båt"
            highlight="Varje Båt"
            subtitle="Från köl till mast levererar vi heltäckande restaureringstjänster som överträffar förväntningarna."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {primaryServices.map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
                onOpen={openPopup}
                motionProps={{ variants: cardVariants }}
              />
            ))}

            <AnimatePresence>
              {showMore &&
                additionalServices.map((service, i) => (
                  <ServiceCard
                    key={service.title}
                    service={service}
                    onOpen={openPopup}
                    motionProps={{
                      initial: { opacity: 0, y: 30 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: i * 0.12, duration: 0.5 },
                    }}
                  />
                ))}
            </AnimatePresence>
          </motion.div>

          {!showMore && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mt-10"
            >
              <button
                type="button"
                onClick={() => setShowMore(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-accent-primary font-medium text-base hover:bg-accent-primary/5 border border-accent-primary/20 transition-colors"
              >
                Mer
                <ChevronDown size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <ServicePopup
        service={activeService}
        imageIndex={imageIndex}
        onClose={closePopup}
        onImageIndexChange={setImageIndex}
      />
    </>
  );
}
