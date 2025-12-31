import CategoriesSection from "@/Components/CategoriesSection";
import FeaturedTasksSection from "@/Components/FeaturedTasksSection";
import HeroSection from "@/Components/HeroSection";
import HowItWorksSection from "@/Components/HowItWorksSection";


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
