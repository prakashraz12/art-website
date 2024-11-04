import AboutComponent from "@/components/about-section/about-section.component";
import AchievementsSection from "@/components/achivements/page";
import AnimatedGallery from "@/components/gallery/gallery.component";
import HeroComponent from "@/components/hero/hero-section.component";
import LatestArtwork from "@/components/latest-works/latest-works.component";
import ContactSection from "@/components/order-potrait/order-potrait";
import VideoGallery from "@/components/videos/timelapse-video.component";

export default function Home() {
  return (
    <main className="bg-[#f5f7f7]">
      <HeroComponent />
      <AchievementsSection />
      <AboutComponent />
      <LatestArtwork />
      <AnimatedGallery />
      <VideoGallery />
      <ContactSection/>
    </main>
  );
}
