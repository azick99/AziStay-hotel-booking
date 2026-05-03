import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center pt-20 px-4">
      <SignIn
        routing="path"
        path="/sign-in"
        afterSignInUrl="/"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-card rounded-2xl border border-neutral-200 dark:border-neutral-800',
            headerTitle: 'font-display text-2xl',
            formButtonPrimary:
              'bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all',
            footerActionLink: 'text-brand-500 hover:text-brand-600',
          },
        }}
      />
    </div>
  );
}