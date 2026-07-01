import { Layout, Server, Code, Wrench } from "lucide-react";

export const SKILLS = [
  {
    title: "FRONTEND_DEVELOPMENT",
    icon: Layout,
    color: "#FF2D2D",
    serialCode: "M-PERF-FT",
    specs: [
      { name: "React", value: 96 },
      { name: "HTML", value: 98 },
      { name: "CSS", value: 94 },
      { name: "JavaScript", value: 95 }
    ],
    efficiencyLabel: "RENDER RATE",
    efficiencyValue: "98 FPS"
  },
  {
    title: "BACKEND_SYSTEMS",
    icon: Server,
    color: "#1c69d4",
    serialCode: "M-PERF-BK",
    specs: [
      { name: "Node.js", value: 92 },
      { name: "Express.js", value: 94 },
      { name: "MongoDB", value: 90 }
    ],
    efficiencyLabel: "DB PING",
    efficiencyValue: "8ms"
  },
  {
    title: "LANGUAGES",
    icon: Code,
    color: "#00A3C4",
    serialCode: "M-PERF-LN",
    specs: [
      { name: "JavaScript", value: 95 },
      { name: "Python", value: 88 }
    ],
    efficiencyLabel: "COMPILER",
    efficiencyValue: "V8_ENGINE"
  },
  {
    title: "DEVELOPER_TOOLS",
    icon: Wrench,
    color: "#888888",
    serialCode: "M-PERF-TL",
    specs: [
      { name: "Git Version Control", value: 94 },
      { name: "VS Code", value: 96 },
      { name: "AI Coding Assistants", value: 95 }
    ],
    efficiencyLabel: "AUTOMATION",
    efficiencyValue: "CI_CD_READY"
  }
];
