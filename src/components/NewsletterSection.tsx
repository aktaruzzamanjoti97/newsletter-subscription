'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Zod schema for validation
const schema = z.object({
	email: z
		.string()
		.min(1, 'Email address is required.')
		.email('Please enter a valid email address.'),
});

type FormData = z.infer<typeof schema>;

export default function NewsletterSection() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [submittedEmail, setSubmittedEmail] = useState<string>('');

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true);
		setSubmitError(null);
		setIsSuccess(false);

		try {
			const response = await fetch(
				'https://www.greatfrontend.com/api/projects/challenges/newsletter',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: data.email }),
				}
			);

			if (response.ok) {
				setIsSuccess(true);
				setSubmittedEmail(data.email);
				reset();
			} else {
				const errorData = await response.json().catch(() => ({}));
				const errorMessage =
					errorData.message ||
					'Failed to subscribe. Please ensure your email is correct or try again later.';
				setSubmitError(errorMessage);
			}
		} catch (error) {
			setSubmitError('Failed to subscribe. Please try again later.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
			<section className='max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row'>
				{/* Left Content */}
				<div className='p-8 md:p-12 flex-1 flex flex-col justify-center'>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 leading-tight'>
						Get the finest curated
					</h1>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 leading-tight'>
						abstracts delivered
					</h1>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 leading-tight'>
						weekly to your inbox
					</h1>

					<ul className='space-y-3 mb-8 text-gray-700'>
						<li className='flex items-center'>
							<svg
								className='w-5 h-5 text-blue-600 mr-3'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 13l4 4L19 7'
								/>
							</svg>
							Exclusive access to new images and collections
						</li>
						<li className='flex items-center'>
							<svg
								className='w-5 h-5 text-blue-600 mr-3'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 13l4 4L19 7'
								/>
							</svg>
							Unlimited downloads for subscribers
						</li>
						<li className='flex items-center'>
							<svg
								className='w-5 h-5 text-blue-600 mr-3'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 13l4 4L19 7'
								/>
							</svg>
							Regular does of artistic inspiration
						</li>
					</ul>

					{/* Form or Success/Error States */}
					{!isSuccess ? (
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4 max-w-md'>
							<div className='relative'>
								<label htmlFor='email' className='sr-only'>
									Email address
								</label>
								<div className='grid grid-cols-4 gap-2'>
									<input
										id='email'
										type='email'
										placeholder='Enter email'
										className={`
                    w-full px-4 py-3 border rounded-lg text-base col-span-3
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-colors duration-200
                    ${
								errors.email
									? 'border-red-500 bg-red-50'
									: 'border-gray-300'
							}
                    ${isValid && !errors.email ? 'border-green-500' : ''}
                  `}
										disabled={isSubmitting}
										aria-invalid={!!errors.email}
										aria-describedby={
											errors.email ? 'email-error' : undefined
										}
										{...register('email')}
									/>
									<button
										type='submit'
										disabled={!isValid || isSubmitting}
										className={`
                  w-full py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg col-span-1
                  hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  disabled:bg-gray-400 disabled:cursor-not-allowed
                  transition-colors duration-200
                `}
										aria-label='Subscribe to newsletter'>
										{isSubmitting ? 'Subscribing...' : 'Subscribe'}
									</button>
								</div>
								{errors.email && (
									<p
										id='email-error'
										className='absolute -bottom-6 left-0 text-red-600 text-sm mt-1'>
										{errors.email.message}
									</p>
								)}
							</div>

							{submitError && (
								<p className='text-red-600 text-sm bg-red-50 p-3 rounded-lg'>
									{submitError}
								</p>
							)}
						</form>
					) : (
						<div className='bg-green-50 border border-green-200 rounded-lg p-6 text-center'>
							<h2 className='text-xl font-semibold text-green-800 mb-2'>
								Subscription successful!
							</h2>
							<p className='text-green-700 mb-4'>
								Please check your email at{' '}
								<strong>{submittedEmail}</strong> to confirm.
							</p>
							<button
								onClick={() => setIsSuccess(false)}
								className='text-purple-600 hover:underline font-medium'>
								Subscribe to another email
							</button>
						</div>
					)}

					<p className='text-xs text-gray-500 mt-6 text-center md:text-left'>
						We won&apos;t send you spam.
					</p>
				</div>

				{/* Right Image */}
				<div className='relative h-64 md:h-auto md:flex-1 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden'>
					<Image
						src='/abstract.jpg'
						alt='Abstract curated art collection'
						fill
						className='object-cover opacity-70'
						sizes='(max-width: 768px) 100vw, 50vw'
						priority
					/>
				</div>
			</section>
		</main>
	);
}
