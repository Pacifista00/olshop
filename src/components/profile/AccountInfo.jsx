import { useAuth } from "../../auth/AuthContext";

const AccountInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  const userData = user.user || user;

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <p className="text-sm text-gray-500">Nama Lengkap</p>
        <p className="font-medium text-gray-800">{userData.name}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium text-gray-800">{userData.email}</p>
      </div>

      {userData.phone && (
        <div>
          <p className="text-sm text-gray-500">No. Telepon</p>
          <p className="font-medium text-gray-800">{userData.phone}</p>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
