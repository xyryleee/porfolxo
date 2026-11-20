import ScrollReveal from "../components/ScrollReveal";
import GradientASCII from "../components/GradientASCII";
import ProfileCard from "../components/ProfileCard";
import StrokeText from "../components/StrokeText";

export default function Home({ onAsciiComplete, heroVisible = true }) {
  return (
    <section
      id="home"
      className="section-spacing relative w-full min-h-screen flex items-center overflow-hidden pt-20 bg-black"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <GradientASCII
          colors={["#240046", "#5A189A", "#FFC300", "#FFC300"]}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
          onIntroComplete={onAsciiComplete}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="hero-layout relative z-10 max-w-container-max mx-auto px-gutter w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="hero-copy">
            <ScrollReveal>
              <p className="font-label-caps font-semibold text-primary mb-4">
                WEB DEVELOPER · CREATIVE BUILDER
              </p>
              <h1 className="font-display text-headline-lg-mobile md:text-display" aria-label="Xyryle Cator">
                <StrokeText as="span" text="Xyryle Cator" fontSize={72} fontWeight={800} letterSpacing={-2} strokeColor="#FFC300" strokeWidth={1.8} drawDuration={1.8} fillDelay={0.15} className="hero-stroke-text" enabled={heroVisible} />
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-body-lg text-on-surface-variant max-w-lg mt-6">
                I build thoughtful digital experiences where design, technology,
                and purpose meet.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="#projects"
                  className="bg-primary text-on-primary-fixed font-bold px-8 py-3 rounded-full shadow-lg hover:-translate-y-1 transition-transform"
                >
                  Read the TranspoGAPO Case Study
                </a>
                <a
                  href="#contact"
                  className="border border-primary text-primary font-semibold px-8 py-3 rounded-full"
                >
                  Let's talk
                </a>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal className="hero-portrait-wrap">
            <div className="hero-portrait">
              <ProfileCard
                name="Xyryle Adrian Cator"
                title="Computer Science Student"
                handle="xyrylecator"
                status="Available for Opportunities"
                avatarUrl={`${import.meta.env.BASE_URL}assets/xy.png`}
                contactHref="#contact"
                showUserInfo={true}
              />
            </div>
          </ScrollReveal>
      </div>
    </section>
  );
}
