# **App Name**: Dublin AI Leasing

## Core Features:

- Lead Acquisition Landing Page: A high-converting, professional landing page tailored for Dublin Property Managers, featuring the headline: 'Stop Losing Rental Leads. Automate Your Inbox with Dublin's First 24/7 AI Leasing Assistant.'
- AI Audit Request Submission: A form on the landing page for prospects to 'Request AI Audit,' collecting their name, email, and raw inquiry, and securely storing it.
- Automated Lead Qualification & Response: A Firebase Cloud Function using the Gemini 3 Flash model that acts as a tool to process incoming inquiries. It qualifies leads by checking for keywords like 'budget' or 'move-in date,' and generates a professional response suggesting a viewing for this Friday at 10 AM.
- Secure Agency Leads Dashboard: A protected, internal web dashboard for 'Dublin AI Systems' staff to view, filter, and manage all captured leads.
- Google-based Staff Authentication: Secure sign-in for agency staff to access the Leads Dashboard using Firebase Authentication with Google accounts.
- Individual Lead Detail View: Provides a comprehensive view of each lead within the dashboard, displaying the original inquiry, qualification status determined by AI, and the AI-generated professional response.

## Style Guidelines:

- Primary color: A sophisticated, mid-tone slate grey (#6E7783) for main UI elements and contrast on the dark background.
- Background color: A very dark, subtle slate blue-grey (#1E1F23) to establish the 'Elite' dark theme.
- Accent color: A rich, vibrant gold (#DCA939) used for highlights, calls-to-action, and key information, fulfilling the 'Gold accents' requirement.
- Body and headline font: 'Inter' (sans-serif) for its modern, neutral, and highly legible characteristics, fitting a professional and efficient agency.
- Utilize modern, crisp line icons that convey efficiency and technology, maintaining a professional and elite aesthetic.
- Adopt a spacious, grid-based layout with clear hierarchy and generous negative space to enhance readability and a premium feel, especially for the dashboard.
- Subtle, professional micro-animations for form submissions, content loading, and dashboard navigation, enhancing user experience without being distracting.