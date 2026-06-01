// School types

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
	values: number[]; // [plan, pattern, position, perspective, ploy]
	pApproaches: SchoolPApproaches;
}

export interface RadarSchoolData {
	school: string;
	group: 'Prescriptive' | 'Descriptive';
	values: number[];
}

export type StrategyP = 'plan' | 'pattern' | 'position' | 'perspective' | 'ploy';

// Landscape / paradox types

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
	position: number; // 0-100, where 0 = left pole, 100 = right pole
	timestamp?: Date;
	reflection?: string;
}

export interface LandscapeProfile {
	userId?: string;
	positions: ParadoxPosition[];
	lastUpdated: Date;
}
