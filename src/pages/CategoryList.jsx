import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/Api";
import SubHeading from "../components/SubHeading";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories"); // endpoint API
        setCategories(res.data.data);
      } catch (error) {
        console.error("Gagal mengambil kategori", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 pt-44 pb-20">
        <p className="text-center text-gray-500">Loading kategori...</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
      <SubHeading className="text-gray-800">Daftar Kategori</SubHeading>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/produk?category=${cat.slug}`}
            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <img
                src={`${import.meta.env.VITE_API_URL}/storage/${cat.icon}`}
                alt={cat.name}
                className="w-10 h-10 object-contain"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
