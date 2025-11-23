import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface RedirectPageProps {
  withoutCookie: string;
  withCookie: string;
}

function RedirectPage({ withoutCookie, withCookie }: RedirectPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAndRedirect = async () => {
      const hasAdminCookie = document.cookie
        .split('; ')
        .some(cookie => cookie.startsWith('admin_token='));

      const hasApprovalCookie = document.cookie
        .split('; ')
        .some(cookie => cookie.startsWith('approval_token='));

      if (hasApprovalCookie) {
        const personName = location.pathname.substring(1);
        const capitalizedName = personName.charAt(0).toUpperCase() + personName.slice(1);

        try {
          const { data, error } = await supabase
            .from('access_control')
            .select('status')
            .eq('person_name', capitalizedName)
            .maybeSingle();

          if (error) throw error;

          if (data) {
            navigate(`/${data.status}`);
            return;
          }
        } catch (error) {
          console.error('Error checking approval status:', error);
        }
      }

      if (hasAdminCookie) {
        window.location.href = withCookie;
      } else {
        window.location.href = withoutCookie;
      }

      setChecking(false);
    };

    checkAndRedirect();
  }, [withCookie, withoutCookie, location.pathname, navigate]);

  if (!checking) {
    return null;
  }

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
