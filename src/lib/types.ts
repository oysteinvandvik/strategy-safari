// src/lib/types.ts - Oppdaterte typer for utvidede data

// Enhanced School Data Structure
export interface SchoolPEmphasis {
	emphasis: number; // 1-5 scale
	description: string;
	characteristics: string[];
	example?: string;
  }
  
  export interface SchoolPApproaches {
	plan: SchoolPEmphasis;
	pattern: SchoolPEmphasis;
	position: SchoolPEmphasis;
	perspective: SchoolPEmphasis;
	ploy: SchoolPEmphasis;
  }
  
  export interface EnhancedSchoolData {
	id: string;
	name: string;
	shortName: string;
	group: 'Prescriptive' | 'Descriptive';
	description: string;
	longDescription: string;
	keyFigures: string[];
	originPeriod: string;
	coreBeliefs: string[];
	strengths: string[];
	weaknesses: string[];
	values: number[]; // [plan, pattern, position, perspective, ploy] - for kompatibilitet
	pApproaches: SchoolPApproaches;
  }
  
  // Enhanced P's Data Structure
  export interface PSCharacteristic {
	emphasis: number;
	description: string;
	characteristics: string[];
	example: string;
  }
  
  export interface EnhancedPData {
	id: string;
	label: string;
	description: string;
	color: string;
  }
  
  // Legacy types for backward compatibility
  export interface StrategySchool {
	name: string;
	group: 'Prescriptive' | 'Descriptive';
	values: number[]; // [plan, pattern, position, perspective, ploy]
  }
  
  export interface RadarSchoolData {
	school: string;
	group: 'Prescriptive' | 'Descriptive';
	values: number[];
  }
  
  export interface SchoolInfo {
	id: string;
	name: string;
	description: string;
	group: 'Prescriptive' | 'Descriptive';
  }
  
  // Simple P data for backward compatibility
  export interface PSItem {
	id: string;
	label: string;
	description: string;
	color: string;
  }
  
  // Utility types for working with the data
  export type StrategyP = 'plan' | 'pattern' | 'position' | 'perspective' | 'ploy';
  
  export interface SchoolAnalysis {
	school: EnhancedSchoolData;
	strongestP: {
	  p: StrategyP;
	  score: number;
	  description: string;
	};
	weakestP: {
	  p: StrategyP;
	  score: number;
	  description: string;
	};
	averageScore: number;
	profile: 'balanced' | 'focused' | 'specialized';
  }

  // Tillegg til src/lib/types.ts for Landscapes modul

export interface StrategicParadox {
	id: string;
	group: 'Process' | 'Content' | 'Context';
	name: string;
	left_label: string;
	right_label: string;
	description: string;
	reflection_question: string;
	shadow_hint: string;
	example_books: {
	  left: string;
	  right: string;
	};
  }
  
  export interface ParadoxPosition {
	paradoxId: string;
	position: number; // 0-100, hvor 0 = left pole, 100 = right pole
	timestamp?: Date;
	reflection?: string;
  }
  
  export interface LandscapeProfile {
	userId?: string;
	positions: ParadoxPosition[];
	lastUpdated: Date;
  }