"use client";
import { Code2 } from "lucide-react";

export default function Skills() {
  const skills = [
    { name: "Tailwind", icon: <Code2 size={20} /> },
    { name: "Figma", icon: <Code2 size={20} /> },
    { name: "React", icon: <Code2 size={20} /> },
    { name: "Next.js", icon: <Code2 size={20} /> },
    { name: "Node.js", icon: <Code2 size={20} /> },
  ];

  return (
    <div className="overflow-hidden relative w-full bg-white p-4">
      <div className="flex gap-20 whitespace-nowrap animate-marquee">
        {[...skills, ...skills, ...skills].map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex items-center gap-2 text-lg font-medium text-gray-800"
          >
            {skill.icon} {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}
