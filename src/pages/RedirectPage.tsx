import { useEffect } from 'react';

interface RedirectPageProps {
  withoutCookie: string;
  withCookie: string;
}

function RedirectPage({ withoutCookie, withCookie }: RedirectPageProps) {
  useEffect(() => {
    const hasAdminCookie = document.cookie
      .split('; ')
      .some(cookie => cookie.startsWith('admin_token='));

    if (hasAdminCookie) {
      window.location.href = withCookie;
    } else {
      window.location.href = withoutCookie;
    }
  }, [withCookie, withoutCookie]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        <p className="mt-4 text-slate-600">Redirecting...</p>
      </div>
    </div>
  );
}

export default RedirectPage;
