// src/routes/landscapes/[slug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
  const { slug } = params;
  
  try {
    const res = await fetch('/data/landscapes.json');
    if (!res.ok) {
      throw error(404, 'Could not load landscapes data');
    }
    
    const paradoxes = await res.json();
    const paradox = paradoxes.find((p: any) => p.id === slug);
    
    if (!paradox) {
      throw error(404, `Strategic paradox "${slug}" not found`);
    }
    
    return {
      paradox,
      allParadoxes: paradoxes
    };
  } catch (err) {
    throw error(500, 'Failed to load landscapes data');
  }
};