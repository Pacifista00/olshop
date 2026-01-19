import { useAuth } from "../../auth/AuthContext";
import getInitials from "../../utils/getInitials";

const UserProfileCard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Memuat...</div>;
  if (!user) return null;

  const userData = user.user || user;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        {userData.avatarUrl ? (
          <img
            src={userData.avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-200 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mb-4 border-4 border-blue-200 bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {getInitials(userData.name)}
          </div>
        )}

        <h2 className="text-xl font-bold">{userData.name}</h2>
        <p className="text-sm text-gray-500">{userData.email}</p>

        {/* <button className="mt-4 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
          Edit Profil
        </button> */}
      </div>
    </div>
  );
};

export default UserProfileCard;
