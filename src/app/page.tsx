import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarketBackground from "@/components/MarketBackground";
import About from "@/components/About";
import Services from "@/components/Services";
import AppliedProcesses from "@/components/AppliedProcesses";
import Team from "@/components/Team";
import IRNews from "@/components/IRNews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarketBackground />
        <About />
        <Services />
        <AppliedProcesses />
        <Team />
        <IRNews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
