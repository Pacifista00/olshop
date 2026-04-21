import { useEffect, useState } from "react";
import api from "../services/Api";
import SubHeading from "../components/SubHeading";

export default function MyVoucherList() {
  const [vouchers, setVouchers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchVouchers = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/vouchers?page=${pageNumber}`);

      setVouchers(res.data.data);
      setMeta(res.data.meta);
    } catch (err) {
      setError("Gagal mengambil voucher");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers(page);
  }, [page]);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Kode voucher disalin!");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <SubHeading>Voucher Saya</SubHeading>

        <div className="bg-indigo-100 my-text-primary px-4 py-2 rounded-full text-sm font-medium">
          {meta.total || 0} Voucher
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* LOADING */}
        {loading &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-44 bg-white rounded-2xl animate-pulse shadow-sm"
            />
          ))}

        {/* DATA */}
        {!loading &&
          vouchers.map((voucher) => {
            const now = new Date();

            // ===== PARSE DATE =====
            let expiredAt = null;
            try {
              if (voucher.expires_at) {
                expiredAt = new Date(voucher.expires_at);
              }
            } catch {}

            // ===== SAFE VARIABLE =====
            const usageLimit = voucher.usage_limit;
            const usageCount = voucher.usage_count;

            // ===== LOGIC STATUS =====
            const isExpired = expiredAt && expiredAt < now;

            const isUsedUp =
              usageLimit !== null && usageLimit !== undefined
                ? usageCount >= usageLimit
                : false;

            const isInactive = voucher.is_active === false;

            const isDisabled = isExpired || isUsedUp || isInactive;

            // ===== STATUS LABEL =====
            let statusLabel = "";
            if (isExpired) statusLabel = "Kadaluarsa";
            else if (isUsedUp) statusLabel = "Habis";
            else if (isInactive) statusLabel = "Tidak Aktif";

            const isDiscount = voucher.type === "percentage";

            return (
              <div
                key={voucher.id}
                className={`flex h-44 rounded-2xl overflow-hidden bg-white shadow-sm border transition group
                  ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-xl"
                  }
                `}
              >
                {/* LEFT */}
                <div className="w-1/3 flex flex-col justify-center items-center text-white relative my-bg-primary">
                  {/* efek bolong */}
                  <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-2">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-white rounded-full -mr-2"
                      />
                    ))}
                  </div>

                  <span className="text-xs uppercase opacity-80">
                    {isDiscount ? "Diskon" : "Potongan"}
                  </span>

                  <span className="text-2xl font-bold">
                    {isDiscount
                      ? `${voucher.value}%`
                      : formatRupiah(voucher.value)}
                  </span>
                </div>

                {/* RIGHT */}
                <div className="w-2/3 p-4 flex flex-col justify-between relative">
                  {/* BADGE */}
                  {isDisabled && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded">
                      {statusLabel}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {voucher.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {voucher.description}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="space-y-2">
                    {/* CODE */}
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-center bg-indigo-50 my-text-primary px-2 py-1 rounded text-sm font-semibold">
                        {voucher.code}
                      </code>

                      <button
                        disabled={isDisabled}
                        onClick={() => {
                          if (isDisabled) return;
                          copyCode(voucher.code);
                        }}
                        className={`text-xs px-2 py-1 rounded text-white
                          ${
                            isDisabled
                              ? "bg-gray-400 cursor-not-allowed"
                              : "my-bg-primary"
                          }
                        `}
                      >
                        Copy
                      </button>
                    </div>

                    {/* EXPIRE */}
                    {voucher.expires_at && (
                      <p
                        className={`text-[11px] ${
                          isExpired
                            ? "text-red-500 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {isExpired
                          ? "Voucher sudah kadaluarsa"
                          : `Berlaku sampai ${new Date(
                              voucher.expires_at,
                            ).toLocaleDateString("id-ID")}`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* EMPTY */}
      {!loading && vouchers.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-3">🎟️</div>
          <p className="text-gray-500">Belum ada voucher</p>
        </div>
      )}

      {/* PAGINATION */}
      {!loading && meta.last_page > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Prev
          </button>

          <span className="px-4 py-2 text-sm text-gray-600">
            {meta.current_page} / {meta.last_page}
          </span>

          <button
            disabled={page === meta.last_page}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
