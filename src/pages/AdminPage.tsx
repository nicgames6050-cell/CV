import { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type ApprovalStatus = 'approved' | 'denied';

interface PersonStatus {
  [key: string]: ApprovalStatus;
}

function AdminPage() {
  const [cookieSet, setCookieSet] = useState(false);
  const [cookieRemoved, setCookieRemoved] = useState(false);
  const [approvalCookieSet, setApprovalCookieSet] = useState(false);
  const [approvalCookieRemoved, setApprovalCookieRemoved] = useState(false);
  const [personStatuses, setPersonStatuses] = useState<PersonStatus>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccessControl();
  }, []);

  const loadAccessControl = async () => {
    try {
      const { data, error } = await supabase
        .from('access_control')
        .select('person_name, status')
        .order('person_name');

      if (error) throw error;

      if (data) {
        const statusMap: PersonStatus = {};
        data.forEach(item => {
          statusMap[item.person_name] = item.status as ApprovalStatus;
        });
        setPersonStatuses(statusMap);
      }
    } catch (error) {
      console.error('Error loading access control:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetAdminCookie = () => {
    const adminToken = crypto.randomUUID();
    document.cookie = `admin_token=${adminToken}; path=/; max-age=31536000; SameSite=Strict`;
    setCookieSet(true);

    setTimeout(() => {
      setCookieSet(false);
    }, 3000);
  };

  const handleRemoveAdminCookie = () => {
    document.cookie = 'admin_token=; path=/; max-age=0; SameSite=Strict';
    setCookieRemoved(true);

    setTimeout(() => {
      setCookieRemoved(false);
    }, 3000);
  };

  const handleSetApprovalCookie = () => {
    const approvalToken = crypto.randomUUID();
    document.cookie = `approval_token=${approvalToken}; path=/; max-age=31536000; SameSite=Strict`;
    setApprovalCookieSet(true);

    setTimeout(() => {
      setApprovalCookieSet(false);
    }, 3000);
  };

  const handleRemoveApprovalCookie = () => {
    document.cookie = 'approval_token=; path=/; max-age=0; SameSite=Strict';
    setApprovalCookieRemoved(true);

    setTimeout(() => {
      setApprovalCookieRemoved(false);
    }, 3000);
  };

  const togglePersonStatus = async (name: string) => {
    const newStatus = personStatuses[name] === 'approved' ? 'denied' : 'approved';

    try {
      const { error } = await supabase
        .from('access_control')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('person_name', name);

      if (error) throw error;

      setPersonStatuses(prev => ({
        ...prev,
        [name]: newStatus
      }));
    } catch (error) {
      console.error('Error updating access control:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6">
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

          <div className="space-y-3">
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

            <button
              onClick={handleRemoveAdminCookie}
              disabled={cookieRemoved}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {cookieRemoved ? (
                <>
                  <XCircle className="w-5 h-5" />
                  Admin Cookie Removed
                </>
              ) : (
                'Remove Admin Cookie'
              )}
            </button>
          </div>

          {cookieSet && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm text-center font-medium">
                Admin cookie has been successfully set for this browser
              </p>
            </div>
          )}

          {cookieRemoved && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm text-center font-medium">
                Admin cookie has been successfully removed from this browser
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

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Approval System
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Enable approval-based redirects for subdirectories
          </p>

          <div className="space-y-3">
            <button
              onClick={handleSetApprovalCookie}
              disabled={approvalCookieSet}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {approvalCookieSet ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Approval Cookie Set
                </>
              ) : (
                'Set Approval Cookie'
              )}
            </button>

            <button
              onClick={handleRemoveApprovalCookie}
              disabled={approvalCookieRemoved}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {approvalCookieRemoved ? (
                <>
                  <XCircle className="w-5 h-5" />
                  Approval Cookie Removed
                </>
              ) : (
                'Remove Approval Cookie'
              )}
            </button>
          </div>

          {approvalCookieSet && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm text-center font-medium">
                Approval cookie has been successfully set. Person pages will now redirect based on approval status.
              </p>
            </div>
          )}

          {approvalCookieRemoved && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800 text-sm text-center font-medium">
                Approval cookie has been successfully removed. Person pages will display normally.
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600 text-center leading-relaxed">
              When the approval cookie is active, visiting person subdirectories will redirect to /approved or /denied based on their status in the database.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Access Control</h2>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-slate-600">Loading...</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(personStatuses).map((name) => (
              <div key={name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-medium text-slate-700">{name}</span>
                <button
                  onClick={() => togglePersonStatus(name)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                    personStatuses[name] === 'approved'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {personStatuses[name] === 'approved' ? 'Approved' : 'Denied'}
                </button>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
