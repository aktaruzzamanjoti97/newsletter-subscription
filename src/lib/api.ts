import { NewsletterFormData } from './schema';

const API_URL =
	'https://www.greatfrontend.com/api/projects/challenges/newsletter';

export async function subscribeToNewsletter(data: NewsletterFormData) {
	try {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			if (response.status === 400) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Invalid email address');
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		return { success: true, data: result };
	} catch (error) {
		console.error('API Error:', error);
		throw error instanceof Error
			? error
			: new Error('Failed to subscribe. Please try again later.');
	}
}
