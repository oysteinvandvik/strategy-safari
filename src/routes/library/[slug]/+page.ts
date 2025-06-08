// src/routes/library/[slug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
  const { slug } = params;
  
  try {
    const res = await fetch('/data/books.json');
    if (!res.ok) {
      throw error(404, 'Could not load books data');
    }
    
    const data = await res.json();
    const book = data.books.find((b: any) => b.id === slug);
    
    if (!book) {
      throw error(404, `Book "${slug}" not found`);
    }
    
    return {
      book,
      allBooks: data.books,
      categories: data.categories
    };
  } catch (err) {
    throw error(500, 'Failed to load book data');
  }
};