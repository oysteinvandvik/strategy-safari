// src/lib/types.ts

// Existing types (keep these)
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

// NEW: PSItem type definition based on your ps.json structure
export interface PSItem {
	id: string;          // Unique identifier (e.g., "plan", "pattern")
	label: string;       // Display name (e.g., "Plan", "Pattern")
	description: string; // Detailed description of this P
	color: string;       // Hex color code for visualization (e.g., "#3366cc")
}

// Optional: Enum for the 5 P's for type safety
export enum StrategyP {
	PLAN = 'plan',
	PATTERN = 'pattern',
	POSITION = 'position',
	PERSPECTIVE = 'perspective',
	PLOY = 'ploy'
}

// Optional: More specific PSItem with enum
export interface PSItemStrict {
	id: StrategyP;
	label: string;
	description: string;
	color: string;
}