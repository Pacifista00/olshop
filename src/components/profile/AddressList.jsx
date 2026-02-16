import { useEffect, useState } from "react";
import api from "../../services/Api";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

const AddressList = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await api.get("/addresses");
        setAddresses(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;

    setDeleting(true);
    try {
      await api.delete(`/addresses/delete/${selectedId}`);

      setAddresses((prev) =>
        prev.filter((address) => address.id !== selectedId),
      );

      setShowConfirm(false);
      setSelectedId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus alamat");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Memuat alamat...</p>;

  return (
    <>
      <div className="space-y-4">
        {/* Tombol selalu tampil */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/addresses/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            + Tambah Alamat
          </button>
        </div>

        {/* Empty State */}
        {addresses.length === 0 ? (
          <div className="text-center text-gray-500 py-10 rounded-xl bg-white">
            Belum ada alamat
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white p-5 rounded-xl border transition ${
                address.is_default
                  ? "border-blue-500 ring-1 ring-blue-200"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800">
                      {address.recipient_name}
                    </h4>

                    {address.is_default && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                        Alamat Utama
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">{address.phone}</p>

                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {address.street_address}, {address.city}, {address.province}{" "}
                    {address.postal_code}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Ditambahkan: {address.created_at}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/addresses/${address.id}/edit`)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedId(address.id);
                      setShowConfirm(true);
                    }}
                    className="text-red-600 hover:text-red-700"
                    title="Hapus alamat"
                  >
                    <Icon path={mdiTrashCanOutline} size={0.9} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL KONFIRMASI */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Hapus Alamat
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Apakah kamu yakin ingin menghapus alamat ini?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm rounded-lg border"
                disabled={deleting}
              >
                Batal
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressList;
