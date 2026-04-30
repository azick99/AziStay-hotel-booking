import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="pt-20 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-6xl font-display font-bold text-gray-200">404</h1>
      <p className="text-gray-500">Page not found</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}