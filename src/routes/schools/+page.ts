// src/routes/schools/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, url }) => {
  try {
    const res = await fetch('/data/schools.json');
    if (!res.ok) {
      throw error(404, 'Could not load schools data');
    }
    
    const schoolsData = await res.json();
    
    if (!schoolsData.schools || !Array.isArray(schoolsData.schools)) {
      throw error(500, 'Invalid schools data format');
    }
    
    // Extract URL parameters for initial state
    const selectedGroup = url.searchParams.get('group') || 'All';
    const searchQuery = url.searchParams.get('search') || '';
    const compareParam = url.searchParams.get('compare');
    const selectedForComparison = compareParam ? compareParam.split(',') : [];
    
    return {
      schools: schoolsData.schools,
      initialState: {
        selectedGroup,
        searchQuery,
        selectedForComparison
      }
    };
  } catch (err) {
    throw error(500, 'Failed to load schools data');
  }
};