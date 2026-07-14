import Hero from "@/components/home/Hero";
import PillarsSection from "@/components/home/PillarsSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsSection />
      <CategoryGrid />
      <CtaBanner />
    </>
  );
}
