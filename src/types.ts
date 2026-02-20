
export enum NodeType {
  SKILL = 'SKILL',
  EXPERIENCE = 'EXPERIENCE',
  CERTIFICATION = 'CERTIFICATION',
  EDUCATION = 'EDUCATION'
}

export interface ResumeNode {
  id: string;
  label: string;
  type: NodeType;
  description?: string;
  val: number; // For node sizing
}

export interface ResumeLink {
  source: string;
  target: string;
  value: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  skills: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}
