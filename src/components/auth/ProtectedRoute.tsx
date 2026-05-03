import { useAuth } from "@clerk/react";
import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "@/components/layout/PageLoader";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  // Still loading Clerk session
  if (!isLoaded) return <PageLoader />;

  // Not signed in → redirect to /sign-in, remember where they came from
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
