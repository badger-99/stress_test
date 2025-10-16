import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// EN+BCS Names
export function firstName(full_name: string) {
	if (!full_name) return '';

	// Normalize and clean up spaces
	const nameParts = full_name.trim().split(/\s+/).filter(Boolean);

	if (nameParts.length === 0) return '';

	// Extract the first part (e.g., "Ana-Marija")
	const first = nameParts[0].normalize('NFC');

	// Capitalize correctly (Unicode-safe)
	const formatted =
		first.charAt(0).toLocaleUpperCase('sr-Latn') + first.slice(1).toLocaleLowerCase('sr-Latn');

	return formatted;
}

// EN+BCS Names
export function getInitials(full_name: string) {
	if (!full_name) return '';

	// Normalize spaces and trim
	const nameParts = full_name.trim().split(/\s+/).filter(Boolean);

	if (nameParts.length === 0) return '';

	// Helper: get the first "visible" letter (handles hyphens etc.)
	const getFirstLetter = (word: string) => {
		const match = word.match(/[A-Za-zČčĆćĐđŠšŽž]/u);
		return match ? match[0].toUpperCase() : '';
	};

	// If only one name, take first two *valid* letters
	if (nameParts.length === 1) {
		const clean = nameParts[0].normalize('NFC');
		const letters = [...clean].filter((c) => /[A-Za-zČčĆćĐđŠšŽž]/u.test(c));
		return letters.slice(0, 2).join('').toUpperCase();
	}

	// Otherwise, take first and last valid initials
	const firstInitial = getFirstLetter(nameParts[0]);
	const lastInitial = getFirstLetter(nameParts[nameParts.length - 1]);

	return (firstInitial + lastInitial).toUpperCase();
}
