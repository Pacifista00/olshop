// src/components/UserProfileCard.jsx
import React from "react";

const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 flex flex-col items-center">
      {/* Gambar Profil */}
      <img
        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 mb-4"
        src={user.avatarUrl} // Ganti dengan URL gambar profil nyata
        alt={`Foto profil ${user.name}`}
      />

      {/* Nama dan Email */}
      <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
      <p className="text-gray-500 mb-4">{user.email}</p>

      {/* Tombol Edit Profil */}
      <button
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150"
        onClick={() => alert("Mengedit Profil...")}
      >
        Edit Profil
      </button>
    </div>
  );
};

export default UserProfileCard;
