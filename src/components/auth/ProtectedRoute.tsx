import { SignIn, useAuth } from "@clerk/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Dialog as DialogPrimitive } from "radix-ui";
import PageLoader from "@/components/layout/PageLoader";
import { cn } from "@/lib/utils";

const clerkAuthAppearance = {
  elements: {
    rootBox: "mx-auto w-full",
    card: "shadow-card rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-none",
    headerTitle: "font-display text-2xl",
    formButtonPrimary:
      "bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all",
    footerActionLink: "text-brand-500 hover:text-brand-600",
  },
};

interface Props {
  children: React.ReactNode;
  /** When set, unsigned visitors see a sign-in modal; closing it sends them to `dismissPath`. */
  authModal?: {
    title: string;
    dismissPath?: string;
  };
}

export default function ProtectedRoute({ children, authModal }: Props) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isLoaded) return <PageLoader />;

  if (!isSignedIn && authModal) {
    const dismiss = authModal.dismissPath ?? "/";
    const returnTo = `${location.pathname}${location.search}`;

    return (
      <DialogPrimitive.Root
        defaultOpen
        onOpenChange={(open) => {
          if (!open) navigate(dismiss, { replace: true });
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-100 bg-black/50 backdrop-blur-sm",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            )}
          />
          <DialogPrimitive.Content
            className={cn(
              "fixed left-1/2 top-1/2 z-101 w-[min(100vw-1.5rem,28rem)] max-h-[min(90vh,40rem)] -translate-x-1/2 -translate-y-1/2",
              "overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-gray-900",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            )}
          >
            <DialogPrimitive.Title className="font-display text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {authModal.title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Sign in or create an account to continue.
            </DialogPrimitive.Description>
            <div className="mt-4">
              <SignIn
                routing="hash"
                signUpUrl="/sign-up"
                forceRedirectUrl={returnTo}
                appearance={clerkAuthAppearance}
              />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  if (!isSignedIn) {
    return (
      <Navigate
        to="/sign-in"
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
}
