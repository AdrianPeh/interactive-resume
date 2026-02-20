
import { NodeType, Experience, Certification, Education, ResumeNode, ResumeLink } from './types';

export const EXPERIENCES: Experience[] = [
  {
    company: "Avanade",
    role: "Solutions Architect & Team Lead",
    period: "May 2025 – Present",
    bullets: [
      "Acted as a strategic partner to customers, from analyzing as-is business processes to conducting collaborative on-site UATs.",
      "Selected and led cross-functional teams of up to 8 members.",
      "Designed and conducted training for automation tools such as Power Automate and Copilot Studio.",
      "Developed RPA workflows and Power Platform solutions across maritime, hospitality, and healthcare."
    ],
    skills: ["Solution Architecture", "AI Automation", "Project Management", "Power Platform", "RPA"]
  },
  {
    company: "Teeny Weeny Wizard",
    role: "Technical Project Manager",
    period: "January 2024 – May 2025",
    bullets: [
      "Led cross-functional teams (8–10 members) to develop and deliver 2D and 3D RPG games.",
      "Featured at Singapore Comic Con 2025.",
      "Contributed as a developer coding core features in C++/Python and ensuring quality through testing frameworks."
    ],
    skills: ["Project Management", "Software Engineering", "Python", "C++", "Quality Assurance"]
  },
  {
    company: "Sanmina",
    role: "Quality Assurance (QA) Engineer",
    period: "March 2019 – October 2020",
    bullets: [
      "Automated QA processes, improving Turnaround Time (TAT) by 50%.",
      "Designed and implemented process improvements aligned with Lean Six Sigma framework.",
      "Managed the 360° Virtual Plant Tour project end-to-end."
    ],
    skills: ["Quality Assurance", "Software Engineering", "Solution Architecture", "AutoCAD"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Google Project Management Professional", issuer: "Google", skills: ["Project Management"] },
  { name: "Six Sigma Yellow Belt", issuer: "IASSC", skills: ["Quality Assurance", "Solution Architecture"] },
  { name: "Registered Scrum Basics", issuer: "Dr. Jeff Sutherland", skills: ["Project Management"] },
  { name: "Configure Atlassian Tools (Jira/Confluence)", issuer: "Atlassian", skills: ["Project Management", "Solution Architecture"] },
  { name: "Understanding Cisco Network Automation", issuer: "Cisco", skills: ["AI Automation", "Software Engineering"] }
];

export const EDUCATIONS: Education[] = [
  { school: "Singapore Institute of Technology", degree: "Bachelor of Technology - Computer Science", period: "2022 – 2026" },
  { school: "Singapore Polytechnic", degree: "Diploma in Electrical & Electronic Engineering (ICT)", period: "2017 – 2020" }
];

// Graph Visualization Data Preparation
export const SKILLS_LIST = [
  "Project Management",
  "Solution Architecture",
  "AI Automation",
  "Software Engineering",
  "Quality Assurance"
];

const nodes: ResumeNode[] = [
  ...SKILLS_LIST.map(s => ({ id: s, label: s, type: NodeType.SKILL, val: 30 })),
  ...EXPERIENCES.map(e => ({ id: e.company, label: e.company, type: NodeType.EXPERIENCE, val: 20 })),
  ...CERTIFICATIONS.map(c => ({ id: c.name, label: c.name, type: NodeType.CERTIFICATION, val: 15 })),
];

const links: ResumeLink[] = [];

// Create links from Skills to Experiences and Certifications
SKILLS_LIST.forEach(skill => {
  EXPERIENCES.forEach(exp => {
    if (exp.skills.includes(skill)) {
      links.push({ source: skill, target: exp.company, value: 2 });
    }
  });
  CERTIFICATIONS.forEach(cert => {
    if (cert.skills.includes(skill)) {
      links.push({ source: skill, target: cert.name, value: 1 });
    }
  });
});

export const GRAPH_DATA = { nodes, links };
