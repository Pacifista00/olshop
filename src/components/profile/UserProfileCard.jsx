import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import getInitials from "../../utils/getInitials";
import EditProfileModal from "./EditProfileModal";
import EditAvatarModal from "./EditAvatarModal";
import defaultAvatar from "../../../public/image/user/profile.png";

const UserProfileCard = () => {
  const { user } = useAuth();
  const userData = user?.user || user;

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!userData) return null;

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={
              userData?.photo
                ? `${baseUrl}/storage/${userData.photo}`
                : defaultAvatar
            }
            alt="Avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-200 object-cover"
          />

          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-sm">{userData.email}</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setOpenProfileModal(true)}
              className="px-4 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Edit Profil
            </button>

            <button
              onClick={() => setOpenAvatarModal(true)}
              className="px-4 py-1 text-sm bg-gray-200 rounded"
            >
              Edit Foto
            </button>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
      />

      <EditAvatarModal
        isOpen={openAvatarModal}
        onClose={() => setOpenAvatarModal(false)}
      />
    </>
  );
};

export default UserProfileCard;
