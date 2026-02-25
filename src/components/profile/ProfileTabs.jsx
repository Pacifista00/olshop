const ProfileTabs = ({ activeTab, onChange }) => {
  const tabs = [
    { id: "account", label: "Informasi Akun" },
    { id: "orders", label: "Riwayat Pesanan" },
    { id: "address", label: "Alamat" },
  ];

  return (
    <div className="flex border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`py-3 px-4 text-sm font-medium ${
            activeTab === tab.id
              ? "border-b-4 border-blue-600 my-text-primary"
              : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
