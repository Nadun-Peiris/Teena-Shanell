import IntroAnimation from "@/components/IntroAnimation";
import HeroVogueFull from "@/components/Hero";
import Digitals from "@/components/Digitals";
import PortfolioGrid from "@/components/PortfolioGrid";
import ScreenWork from "@/components/ScreenWork";
import Press from "@/components/Press";
import About from "@/components/About";

export default function Home() {
  return (
    <main>
      <IntroAnimation />
      <HeroVogueFull />
      <Digitals />
      <PortfolioGrid />
      <ScreenWork />
      <Press />
      <About />
    </main>
  );
}