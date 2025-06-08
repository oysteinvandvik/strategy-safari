// src/lib/utils/dataAdapter.ts
import type { EnhancedSchoolData, RadarSchoolData } from '$lib/types';

/**
 * Adapter for converting between enhanced school data and radar data formats
 */
export class SchoolDataAdapter {
  
  /**
   * Convert enhanced school data to radar format for chart compatibility
   */
  static toRadarFormat(schools: EnhancedSchoolData[]): RadarSchoolData[] {
    return schools.map(school => ({
      school: school.name,
      group: school.group,
      values: school.values
    }));
  }

  /**
   * Convert radar data back to enhanced format (with limited data)
   */
  static fromRadarFormat(radarData: RadarSchoolData[]): Partial<EnhancedSchoolData>[] {
    return radarData.map(data => ({
      id: data.school.toLowerCase().replace(/\s+/g, '-'),
      name: data.school,
      shortName: data.school.replace(' School', ''),
      group: data.group,
      description: `The ${data.school} approach to strategy formation`,
      longDescription: '',
      keyFigures: [],
      originPeriod: '',
      coreBeliefs: [],
      strengths: [],
      weaknesses: [],
      values: data.values,
      pApproaches: {
        plan: { emphasis: data.values[0], description: '', characteristics: [] },
        pattern: { emphasis: data.values[1], description: '', characteristics: [] },
        position: { emphasis: data.values[2], description: '', characteristics: [] },
        perspective: { emphasis: data.values[3], description: '', characteristics: [] },
        ploy: { emphasis: data.values[4], description: '', characteristics: [] }
      }
    }));
  }

  /**
   * Merge enhanced school data with radar data for complete information
   */
  static mergeSchoolData(
    enhancedData: EnhancedSchoolData[], 
    radarData: RadarSchoolData[]
  ): EnhancedSchoolData[] {
    return enhancedData.map(school => {
      const radarMatch = radarData.find(r => 
        r.school.toLowerCase().includes(school.shortName.toLowerCase()) ||
        school.name.toLowerCase().includes(r.school.toLowerCase())
      );
      
      if (radarMatch) {
        return {
          ...school,
          values: radarMatch.values
        };
      }
      
      return school;
    });
  }

  /**
   * Extract school names from various data formats
   */
  static extractSchoolNames(data: EnhancedSchoolData[] | RadarSchoolData[]): string[] {
    return data.map(item => 'school' in item ? item.school : item.name);
  }

  /**
   * Find school by name with fuzzy matching
   */
  static findSchoolByName(
    schools: EnhancedSchoolData[], 
    searchName: string
  ): EnhancedSchoolData | undefined {
    const lowerSearch = searchName.toLowerCase();
    
    // Exact match first
    let match = schools.find(s => s.name.toLowerCase() === lowerSearch);
    if (match) return match;
    
    // Short name match
    match = schools.find(s => s.shortName.toLowerCase() === lowerSearch);
    if (match) return match;
    
    // Partial match
    match = schools.find(s => 
      s.name.toLowerCase().includes(lowerSearch) ||
      lowerSearch.includes(s.shortName.toLowerCase())
    );
    
    return match;
  }

  /**
   * Calculate school statistics
   */
  static calculateSchoolStats(school: EnhancedSchoolData | RadarSchoolData) {
    const values = 'values' in school ? school.values : [];
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = values.length > 0 ? total / values.length : 0;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const maxIndex = values.indexOf(max);
    const minIndex = values.indexOf(min);
    
    const pLabels = ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'];
    
    return {
      total,
      average: Math.round(average * 10) / 10,
      strongest: {
        p: pLabels[maxIndex],
        value: max,
        index: maxIndex
      },
      weakest: {
        p: pLabels[minIndex],
        value: min,
        index: minIndex
      },
      balance: max - min, // Lower means more balanced
      profile: this.getSchoolProfile(values)
    };
  }

  /**
   * Determine school strategic profile
   */
  private static getSchoolProfile(values: number[]): 'balanced' | 'focused' | 'specialized' {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;
    
    if (range <= 1) return 'balanced';
    if (range <= 2) return 'focused';
    return 'specialized';
  }

  /**
   * Group schools by their strategic emphasis
   */
  static groupSchoolsByEmphasis(schools: (EnhancedSchoolData | RadarSchoolData)[]) {
    const pLabels = ['plan', 'pattern', 'position', 'perspective', 'ploy'];
    const groups: Record<string, (EnhancedSchoolData | RadarSchoolData)[]> = {};
    
    pLabels.forEach(p => {
      groups[p] = [];
    });
    
    schools.forEach(school => {
      const values = 'values' in school ? school.values : [];
      const maxIndex = values.indexOf(Math.max(...values));
      const strongestP = pLabels[maxIndex];
      
      if (strongestP && groups[strongestP]) {
        groups[strongestP].push(school);
      }
    });
    
    return groups;
  }

  /**
   * Filter schools by P emphasis threshold
   */
  static filterByPEmphasis(
    schools: (EnhancedSchoolData | RadarSchoolData)[], 
    pIndex: number, 
    minValue: number
  ) {
    return schools.filter(school => {
      const values = 'values' in school ? school.values : [];
      return values[pIndex] >= minValue;
    });
  }

  /**
   * Sort schools by specific P value
   */
  static sortByPValue(
    schools: (EnhancedSchoolData | RadarSchoolData)[], 
    pIndex: number, 
    ascending = false
  ) {
    return [...schools].sort((a, b) => {
      const aValues = 'values' in a ? a.values : [];
      const bValues = 'values' in b ? b.values : [];
      const aVal = aValues[pIndex] || 0;
      const bVal = bValues[pIndex] || 0;
      
      return ascending ? aVal - bVal : bVal - aVal;
    });
  }

  /**
   * Calculate correlation between two P's across all schools
   */
  static calculatePCorrelation(
    schools: (EnhancedSchoolData | RadarSchoolData)[], 
    pIndex1: number, 
    pIndex2: number
  ): number {
    if (schools.length === 0) return 0;
    
    const pairs = schools.map(school => {
      const values = 'values' in school ? school.values : [];
      return [values[pIndex1] || 0, values[pIndex2] || 0];
    });
    
    const n = pairs.length;
    const sum1 = pairs.reduce((sum, [x]) => sum + x, 0);
    const sum2 = pairs.reduce((sum, [, y]) => sum + y, 0);
    const sum1Sq = pairs.reduce((sum, [x]) => sum + x * x, 0);
    const sum2Sq = pairs.reduce((sum, [, y]) => sum + y * y, 0);
    const pSum = pairs.reduce((sum, [x, y]) => sum + x * y, 0);
    
    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));
    
    return den === 0 ? 0 : num / den;
  }
}