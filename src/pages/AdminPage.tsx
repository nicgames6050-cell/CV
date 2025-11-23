import { useState } from 'react';
import { Shield, CheckCircle } from 'lucide-react';

function AdminPage() {
  const [cookieSet, setCookieSet] = useState(false);

  const handleSetAdminCookie = () => {
    const adminToken = crypto.randomUUID();
    document.cookie = `admin_token=${adminToken}; path=/; max-age=31536000; SameSite=Strict`;
    setCookieSet(true);

    setTimeout(() => {
      setCookieSet(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-slate-100 p-4 rounded-full">
              <Shield className="w-12 h-12 text-slate-700" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
            Admin Access
          </h1>
          <p className="text-slate-600 text-center mb-8">
            Grant administrative privileges to this browser
          </p>

          <button
            onClick={handleSetAdminCookie}
            disabled={cookieSet}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {cookieSet ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Admin Cookie Set
              </>
            ) : (
              'Set Admin Cookie'
            )}
          </button>

          {cookieSet && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm text-center font-medium">
                Admin cookie has been successfully set for this browser
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600 text-center leading-relaxed">
              This sets a secure cookie that identifies this browser as having admin privileges.
              The cookie is valid for one year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
