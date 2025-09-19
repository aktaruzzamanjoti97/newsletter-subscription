import NewsletterSection from '@/components/NewsletterSection';

export const metadata = {
	title: 'Newsletter Subscription',
	description: 'Subscribe to get the finest curated weeklys to your inbox',
};

export default function NewsletterPage() {
	return (
		<main className='min-h-screen'>
			<NewsletterSection />
		</main>
	);
}
