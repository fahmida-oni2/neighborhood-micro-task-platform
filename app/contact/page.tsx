"use client";

import { motion } from "framer-motion";
import ContributorCard from "@/components/ContributorCard/ContributorCard";

interface Person {
  id: number;
  name: string;
  role: string;
  contribution: string;
  email: string;
  github: string;
  linkedin: string;
  imageUrl: string;
}

const contributors: Person[] = [
  {
    id: 1,
    name: "Fahmida Rahman",
    role: "Lead Developer",
    contribution: "Manage github collaboration and solve all problems and build the browse tasks pages.",
    email: "onifahmida@gmail.com",
    github: "fahmida-oni2",
    linkedin: "fahmida--rahman/",
    imageUrl: "https://i.ibb.co.com/rGSwn3n9/Fahmida-Rahman.jpg"
  },
  {
    id: 2,
    name: "MD. Sojib Khan",
    role: "Co-leader",
    contribution: "Created the landing page and integrate authentication system.",
    email: "007shojibkhan@gmail.com",
    github: "Md-Sojib-Khan",
    linkedin: "md-sojib-khan/",
    imageUrl: "https://i.ibb.co.com/gFZCWDYt/sojib.png"
  },
  {
    id: 3,
    name: "Noushin Anika Khan",
    role: "UI Designer",
    contribution: "Design UI interface and User Dashboard.",
    email: "naushinanikakhan@gmail.com",
    github: "jsmith-cloud",
    linkedin: "jordansmith",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
  },
  {
    id: 4,
    name: "Naif adnan",
    role: "Backend Engineer",
    contribution: "Managed API versioning.",
    email: "naifadnan999@gmail.com",
    github: "jsmith-cloud",
    linkedin: "jordansmith",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
  }
];

// Animation Container Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

export default function ContributorsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto py-20">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-[#1A3609]">
            Meet the Contributors
          </h1>
          <p className="text-lg text-[#1A3609] max-w-2xl mx-auto">
            The talented individuals who made this project possible through code, design, and infrastructure.
          </p>
        </motion.header>

        {/* Animated Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {contributors.map((person, index) => (
            <ContributorCard key={person.id} person={person} index={index} />
          ))}
        </motion.div>
      </div>
    </main>
  );
}