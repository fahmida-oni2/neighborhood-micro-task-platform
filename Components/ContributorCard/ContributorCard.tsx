"use client"; 

import Image from 'next/image';
import { Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Person {
  id: number;
  name: string;
  role: string;
  contribution: string;
  email: string;
  github: string;
  linkedin: string;
  imageUrl: string;
}

export default function ContributorCard({ person, index }: { person: Person; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-secondary rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-200 flex flex-col h-full"
    >
      <div className="p-8 flex-grow">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="relative w-24 h-24 mx-auto mb-4"
        >
          <Image
            src={person.imageUrl}
            alt={person.name}
            fill
            sizes='96px'
            className="rounded-full object-cover ring-4 ring-indigo-50 border-2 border-white shadow-sm"
          />
        </motion.div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-[#1A3609]">{person.name}</h3>
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-tight">{person.role}</p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
            className="mt-4 rounded-lg p-4 italic text-slate-600 text-sm leading-relaxed"
          >
            "{person.contribution}"
          </motion.div>
        </div>
      </div>

      <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-around rounded-b-2xl">
        <SocialLink href={`mailto:${person.email}`} icon={<Mail size={18} />} title="Email" color="hover:text-indigo-600" />
        <SocialLink href={`https://github.com/${person.github}`} icon={<Github size={18} />} title="GitHub" color="hover:text-slate-900" isExternal />
        <SocialLink href={`https://linkedin.com/in/${person.linkedin}`} icon={<Linkedin size={18} />} title="LinkedIn" color="hover:text-blue-600" isExternal />
      </div>
    </motion.div>
  );
}


function SocialLink({ href, icon, title, color, isExternal = false }: any) {
  return (
    <motion.a
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`p-2 hover:bg-white rounded-full transition-colors text-slate-500 ${color}`}
      title={title}
    >
      {icon}
    </motion.a>
  );
}