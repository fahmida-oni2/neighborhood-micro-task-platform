import CategoriesSection from "@/components/CategoriesSection";
import FeaturedTasksSection from "@/components/FeaturedTasksSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#edffe3] font-sans dark:bg-black">
      <main className="w-11/12 mx-auto">
       <HeroSection></HeroSection>
       <HowItWorksSection></HowItWorksSection>
       <FeaturedTasksSection></FeaturedTasksSection>
       <CategoriesSection></CategoriesSection>
      </main>
    </div>
  );
}
