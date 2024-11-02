import AboutComponent from "@/components/about-section/about-section.component";
import AchievementsSection from "@/components/achivements/page";
import AnimatedGallery from "@/components/gallery/gallery.component";
import HeroComponent from "@/components/hero/hero-section.component";
import LatestArtwork from "@/components/latest-works/latest-works.component";

export default function Home() {
  return (
    <main>
      <HeroComponent />
      <AchievementsSection />
      <AboutComponent />
      <LatestArtwork />
      <AnimatedGallery/>
    </main>
  );
}
