import { error } from '@sveltejs/kit';

export interface Book {
	id: string;
	title: string;
	authors: string[];
	isbn: string;
	isbn_10: string;
	publication_year: number;
	publisher: string;
	description: string;
	category: string;
	cover_url: string;
	cover_medium?: string;
	cover_small?: string;
	openlibrary_url?: string;
	voices_emphasis: Record<string, number>;
	paradoxes_explored: string[];
	tags: string[];
	reading_level: string;
	page_count: number;
}

export type BookCategories = Record<string, { name: string; color: string }>;

export interface BooksData {
	books: Book[];
	categories: BookCategories;
}

export async function fetchBooks(fetch: typeof globalThis.fetch): Promise<BooksData> {
	const res = await fetch('/data/books.json');
	if (!res.ok) throw error(500, 'Could not load books data');
	const data = await res.json();
	return { books: data.books as Book[], categories: data.categories as BookCategories };
}

export async function fetchBook(fetch: typeof globalThis.fetch, slug: string): Promise<Book> {
	const { books } = await fetchBooks(fetch);
	const book = books.find((b) => b.id === slug);
	if (!book) throw error(404, `Book "${slug}" not found`);
	return book;
}
