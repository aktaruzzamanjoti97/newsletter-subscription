Newsletter Subscription Component Next.js React Tailwind CSS TypeScript

A responsive newsletter subscription section built with Next.js 15,
React 19, Tailwind CSS 4, and TypeScript. This component features
client-side email validation using React Hook Form and Zod, API
submission to a mock endpoint, and full responsive design with
accessibility support. It's designed for the GreatFrontend Newsletter
Challenge.

Screenshot of Newsletter Section (Replace with actual screenshot for
your repo)

Table of Contents Introduction Features Tech Stack Installation Usage
API Integration Form Validation Responsive Design Accessibility Project
Structure License Contributing Acknowledgments Introduction This project
implements a newsletter subscription form as per the GreatFrontend
challenge requirements. Users can enter their email to subscribe, with
real-time validation, error handling, and success feedback. The design
is faithful to the provided mockup: a left-side content area with title,
benefits list, form, and footer note; a right-side abstract art image.
It stacks vertically on mobile and aligns horizontally on larger
screens.

Key goals:

Responsive layout and typography. Client-side validation for email
format and required field. Secure API submission with error/success
handling. Cross-browser compatibility (Chrome, Firefox, Safari). For
tips on structuring README files like this, check out dev.to.

Features Client-Side Validation: Real-time checks for empty fields and
invalid email formats using Zod schema. API Submission: POSTs to
https://www.greatfrontend.com/api/projects/challenges/newsletter with
success confirmation ("Subscription successful! Please check your email
to confirm.") and error messages. Interactive States: Input: Normal,
focus (blue ring), filled (green border), error (red border/background).
Button: Normal (purple), hover (darker), focus (ring), disabled (gray).
Success/Error Feedback: Shows green success box on submit; red error
messages for validation or API failures. Responsive: Fluid text sizing
(e.g., text-3xl md:text-4xl), vertical stack on mobile, horizontal on
desktop/tablet. Performance: Optimized Next.js Image component for lazy
loading and responsive sizes. Accessibility: Semantic HTML, ARIA
attributes, keyboard navigation, screen-reader friendly labels. Stretch
goals implemented: Custom error messages, WCAG-compliant accessibility,
image optimization.

Tech Stack Framework: Next.js 15 (App Router) UI Library: React 19
Styling: Tailwind CSS 4 Language: TypeScript Form Handling: React Hook
Form + Zod (for validation) Images: Next.js Image (with Unsplash
placeholder for abstract art) API: Native Fetch API Dependencies:
react-hook-form, @hookform/resolvers, zod.

Installation Clone the repository:

```bash
git clone https://github.com/yourusername/newsletter-subscription.git
cd newsletter-subscription
```

Install dependencies:

```bash
npm install
# or yarn install / pnpm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view it in your browser.

For production build:

```bash
npm run build
npm start
```

Usage As a Page: Place the component in app/newsletter/page.tsx (as
provided in the code). As a Component: Import Newsletter into any page:

```tsx
import Newsletter from '@/components/Newsletter';

export default function Home() {
	return <Newsletter />;
}
```

Customization: Replace the image src with your abstract art asset.
Adjust Tailwind classes for custom colors/spacing. Extend the Zod schema
for additional fields (e.g., name). The form auto-validates on change
and submits on button click. On success, it resets and shows
confirmation.

API Integration The form submits to the provided endpoint:

POST https://www.greatfrontend.com/api/projects/challenges/newsletter
Body: { "email": "user@example.com" } Success (200): Displays
"Subscription successful! Please check your email to confirm." with the
submitted email. Error (400/500): Catches and shows "Failed to
subscribe. Please ensure your email is correct or try again later." or
server message. Handles network errors gracefully. No auth required;
uses JSON content-type.

Form Validation Uses Zod for schema definition and React Hook Form for
management:

```ts
const schema = z.object({
	email: z
		.string()
		.min(1, 'Email address is required.')
		.email('Please enter a valid email address.'),
});
```

`z.infer<typeof schema>` automatically generates TypeScript types for
type safety. Mode: 'onChange' for immediate feedback. Errors display
below the input with ARIA-describedby.

Responsive Design Layout: flex-col md:flex-row -- Stacks on mobile
(\<768px), side-by-side on larger screens. Typography: Responsive
classes like text-3xl md:text-4xl lg:text-5xl. Images: fill with sizes
prop for fluid resizing without distortion. Spacing: Padding scales with
p-4 md:p-8 md:p-12. Tested on various viewports; uses Tailwind's
mobile-first approach.

Accessibility Semantics:

```{=html}
<form>
```

, `<label>`{=html},

```{=html}
<ul>
```

for lists. ARIA: aria-invalid, aria-describedby for errors; aria-label
on button. Keyboard: Focus states with rings; tab-navigable. Screen
Readers: sr-only for hidden labels; alt text on images. Contrast: WCAG
AA compliant (e.g., purple button on white). Stretch: Full keyboard
controls and error announcements.

Project Structure

    newsletter-subscription/
    ├── app/
    │   └── newsletter/
    │       └── page.tsx          # Main component
    ├── components/               # If modularized
    │   └── Newsletter.tsx
    ├── public/                   # Static assets (e.g., images)
    ├── tailwind.config.js        # Tailwind setup
    ├── tsconfig.json             # TypeScript config
    ├── package.json              # Dependencies
    └── README.md                 # This file

License This project is licensed under the MIT License - see the LICENSE
file for details. Feel free to use, modify, and distribute.

Contributing Contributions are welcome! Please follow these steps:

Fork the project. Create a feature branch (git checkout -b
feature/amazing-feature). Commit changes (git commit -m 'Add amazing
feature'). Push to the branch (git push origin feature/amazing-feature).
Open a Pull Request. For major changes, open an issue first to discuss.

Inspired by README generators like github.com/SeanU2022 and templates
from github.com/zer0-911.

Acknowledgments GreatFrontend for the challenge design and API. Zod and
React Hook Form teams for robust validation. Tailwind CSS for rapid
styling. Unsplash for placeholder abstract art images. Community
resources: github.com/rhea-so-archive for README structure ideas. If you
have questions, reach out via issues! 🚀
