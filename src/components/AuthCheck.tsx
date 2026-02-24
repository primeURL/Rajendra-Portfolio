import { useEffect, useState } from 'react';

/**
 * AuthCheck component - Redirects authenticated users to dashboard
 * This runs client-side to check for authentication and redirect if needed
 */
export default function AuthCheck() {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const userId = localStorage.getItem('user_id');
    
    if (userId) {
      // User is authenticated, redirect to dashboard
      // Get the dashboard URL from environment or default to localhost
      const dashboardUrl = import.meta.env.PUBLIC_DASHBOARD_URL || 'http://localhost:3000';
      window.location.href = `${dashboardUrl}/dashboard`;
    } else {
      // User is not authenticated, show landing page
      setIsChecking(false);
    }
  }, []);

  // Show nothing while checking (prevents flash of landing page)
  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Return null when not authenticated (landing page will show)
  return null;
}
