import { useAuth } from "../../auth/AuthContext";
import getInitials from "../../utils/getInitials";

const UserProfileCard = () => {
  const { user, loading } = useAuth();

  const userData = user?.user || user;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        {/* SKELETON */}
        {loading ? (
          <div className="flex flex-col items-center animate-pulse w-full">
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
        ) : !userData ? null : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
