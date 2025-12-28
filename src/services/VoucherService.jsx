import api from "./Api";

export const previewVoucher = async (code) => {
  const res = await api.post("/voucher/preview", {
    code,
  });

  return res.data;
};
