import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/layout/PageLoader";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const HotelDetailPage = lazy(() => import("./pages/HotelDetailPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ConfirmationPage = lazy(() => import("./pages/ConfermationPage"));
const AITripPlannerPage = lazy(() => import("./pages/AITripPlannerPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const BookingHistoryPage = lazy(() => import("./pages/BookingHistoryPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          {/* Public routes */}
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/search"
              element={<SearchResultsPage />}
            />
            <Route
              path="/hotel/:id"
              element={<HotelDetailPage />}
            />
            <Route
              path="/wishlist"
              element={<WishlistPage />}
            />
            <Route
              path="/sign-in/*"
              element={<SignInPage />}
            />
            <Route
              path="/sign-up/*"
              element={<SignUpPage />}
            />

            {/* Protected routes — must be signed in */}
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingHistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation"
              element={
                <ProtectedRoute>
                  <ConfirmationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ai-planner"
              element={
                <ProtectedRoute>
                  <AITripPlannerPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
