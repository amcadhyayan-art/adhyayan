import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container max-w-lg text-center px-4">
        <h1 className="text-8xl font-montserrat font-bold text-primary mb-6">404</h1>
        <h2 className="text-2xl font-montserrat font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-secondary"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;