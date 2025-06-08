// src/routes/schools/[slug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
  const { slug } = params;
  
  try {
    const res = await fetch('/data/schools.json');
    if (!res.ok) {
      throw error(404, 'Could not load schools data');
    }
    
    const schoolsData = await res.json();
    const school = schoolsData.schools.find((s: any) => s.id === slug);
    
    if (!school) {
      throw error(404, `Strategy school "${slug}" not found`);
    }
    
    return {
      school,
      allSchools: schoolsData.schools
    };
  } catch (err) {
    throw error(500, 'Failed to load schools data');
  }
};