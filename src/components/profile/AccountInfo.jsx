import { useAuth } from "../../auth/AuthContext";

const AccountInfo = ({ loading = false }) => {
  const { user } = useAuth();

  const userData = user?.user || user;

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      {/* SKELETON */}
      {loading ? (
        <>
          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>

          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-52"></div>
          </div>

          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-36"></div>
          </div>
        </>
      ) : !userData ? null : (
        <>
          <div>
            <p className="text-sm text-gray-500">Nama Lengkap</p>
            <p className="font-medium">{userData.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{userData.email}</p>
          </div>

          {userData.phone && (
            <div>
              <p className="text-sm text-gray-500">No. Telepon</p>
              <p className="font-medium">{userData.phone}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AccountInfo;
