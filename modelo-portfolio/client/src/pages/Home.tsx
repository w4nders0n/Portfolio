/*
Design Philosophy: Neo-Glamour Cinematográfico
- Layout fluido com seções de altura variável
- Imagens em tamanhos variados (portrait, landscape) com ritmo sincopado
- Vinhetas sutis e degradês radiais
- Animações fade + scale com cubic-bezier(0.16, 1, 0.3, 1)
- Tipografia: Playfair Display (títulos) + Lato (body)
*/

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Instagram, Phone } from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Full viewport com imagem principal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
        
        {/* Hero content */}
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          <div
            id="hero-text"
            data-animate
            className={`space-y-6 transition-all duration-1000 ${
              isVisible["hero-text"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <h1 className="text-foreground">
              Portfólio
              <br />
              <span className="italic text-primary">Profissional</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Modelo iniciante com experiência em editoriais de moda, campanhas comerciais e trabalhos artísticos. Disponível para projetos criativos e colaborações.
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
                onClick={() => {
                  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Entre em Contato
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 hover:border-foreground/40 transition-all duration-300"
                onClick={() => {
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver Portfólio
              </Button>
            </div>
          </div>

          {/* Hero image */}
          <div
            id="hero-image"
            data-animate
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible["hero-image"]
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/model1.jpg"
                alt="Modelo profissional"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
              {/* Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-foreground/30 pointer-events-none" />
            </div>
            {/* Decorative golden line */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r border-b border-primary/20 rounded-br-lg" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div
            id="about"
            data-animate
            className={`max-w-3xl mx-auto text-center space-y-6 transition-all duration-1000 ${
              isVisible["about"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <h2 className="text-foreground">Sobre Mim</h2>
            <div className="w-24 h-px bg-primary mx-auto" />
            <p className="text-muted-foreground leading-relaxed">
              Sou um modelo profissional em início de carreira, apaixonado por moda e expressão artística. Com experiência em trabalhos editoriais e comerciais, busco constantemente expandir meu portfólio e colaborar com fotógrafos, designers e marcas que valorizam criatividade e autenticidade.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Meu objetivo é trazer versatilidade e profissionalismo a cada projeto, adaptando-me a diferentes estilos e conceitos visuais. Estou disponível para ensaios fotográficos, desfiles, campanhas publicitárias e projetos editoriais.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="portfolio" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">Portfólio</h2>
            <div className="w-24 h-px bg-primary mx-auto" />
          </div>

          {/* Gallery Grid - Asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Image 2 - Portrait large */}
            <div
              id="gallery-1"
              data-animate
              className={`lg:col-span-2 lg:row-span-2 transition-all duration-1000 ${
                isVisible["gallery-1"]
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl group">
                <img
                  src="/images/model2.jpg"
                  alt="Editorial de moda"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-foreground/40 pointer-events-none" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-600 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-600">
                    <h3 className="text-background text-2xl font-display font-bold drop-shadow-lg">Editorial de Moda</h3>
                    <p className="text-background/90 drop-shadow-md">Conceito minimalista</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 3 - Square */}
            <div
              id="gallery-2"
              data-animate
              className={`transition-all duration-1000 delay-100 ${
                isVisible["gallery-2"]
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl group">
                <img
                  src="/images/model3.jpg"
                  alt="Retrato artístico"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-foreground/40 pointer-events-none" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-600 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-600">
                    <h3 className="text-background text-xl font-display font-bold drop-shadow-lg">Retrato Artístico</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 4 - Portrait */}
            <div
              id="gallery-3"
              data-animate
              className={`transition-all duration-1000 delay-200 ${
                isVisible["gallery-3"]
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl group">
                <img
                  src="/images/model4.jpg"
                  alt="Campanha comercial"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-foreground/40 pointer-events-none" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-600 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-600">
                    <h3 className="text-background text-xl font-display font-bold drop-shadow-lg">Campanha Comercial</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 5 - Landscape */}
            <div
              id="gallery-4"
              data-animate
              className={`lg:col-span-2 transition-all duration-1000 delay-300 ${
                isVisible["gallery-4"]
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl group">
                <img
                  src="/images/model5.jpg"
                  alt="Trabalho editorial"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-foreground/40 pointer-events-none" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-600 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-600">
                    <h3 className="text-background text-2xl font-display font-bold drop-shadow-lg">Trabalho Editorial</h3>
                    <p className="text-background/90 drop-shadow-md">Conceito contemporâneo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 bg-gradient-to-b from-background via-muted/30 to-foreground/5">
        <div className="container">
          <div
            id="contact"
            data-animate
            className={`max-w-2xl mx-auto text-center space-y-8 transition-all duration-1000 ${
              isVisible["contact"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <h2 className="text-foreground">Entre em Contato</h2>
            <div className="w-24 h-px bg-primary mx-auto" />
            <p className="text-muted-foreground text-lg">
              Interessado em colaborar? Estou disponível para projetos e sempre aberto a novas oportunidades criativas.
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <a
                href="mailto:contato@modelo.com"
                className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <span className="font-display text-sm">Email</span>
                <span className="text-xs text-muted-foreground">contato@modelo.com</span>
              </a>

              <a
                href="tel:+5511999999999"
                className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span className="font-display text-sm">Telefone</span>
                <span className="text-xs text-muted-foreground">+55 11 99999-9999</span>
              </a>

              <a
                href="https://instagram.com/modelo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <span className="font-display text-sm">Instagram</span>
                <span className="text-xs text-muted-foreground">@modelo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/70">
              © 2026 Portfólio Modelo. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-background/70 hover:text-background transition-colors duration-300"
              >
                Privacidade
              </a>
              <a
                href="#"
                className="text-sm text-background/70 hover:text-background transition-colors duration-300"
              >
                Termos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
