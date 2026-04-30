import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/layout/PageLoader";
import './App.css';
// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const HotelDetailPage = lazy(() => import("./pages/HotelDetailPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ConfirmationPage = lazy(() => import("./pages/ConfermationPage"));
const AITripPlannerPage = lazy(() => import("./pages/AITripPlannerPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
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
              path="/booking"
              element={<BookingPage />}
            />
            <Route
              path="/confirmation"
              element={<ConfirmationPage />}
            />
            <Route
              path="/ai-planner"
              element={<AITripPlannerPage />}
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
