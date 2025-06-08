// src/routes/ps/[slug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
  const { slug } = params;
  
  try {
    const res = await fetch('/data/ps.json');
    if (!res.ok) {
      throw error(404, 'Could not load strategy data');
    }
    
    const psData = await res.json();
    const pItem = psData.ps.find((p: any) => p.id === slug);
    
    if (!pItem) {
      throw error(404, `Strategy perspective "${slug}" not found`);
    }
    
    return {
      pItem,
      allPs: psData.ps,
      framework: psData.framework
    };
  } catch (err) {
    throw error(500, 'Failed to load strategy data');
  }
};