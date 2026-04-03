import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Modal from "../components/Modal";
import SkeletonCard from "../components/SkeletonCard";
import { useToast } from "../components/Toast";

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { addToast } = useToast();

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/products");
      setProducts(data);
    } catch (error) {
      addToast("Failed to load products.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/api/products/${deleteTarget.id}`);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      addToast("Product deleted successfully.", "success");
    } catch (error) {
      addToast("Failed to delete product.", "error");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-100">
              My Products
            </h1>
            <p className="text-navy-400 mt-1">
              {loading
                ? "Loading..."
                : `${products.length} product${products.length !== 1 ? "s" : ""} total`}
            </p>
          </div>
          <Link to="/products/new">
            <Button>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-navy-800 border border-navy-700 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-navy-300 mb-2">
              No products yet
            </h2>
            <p className="text-navy-500 text-center max-w-sm mb-6">
              Get started by creating your first product. It only takes a minute.
            </p>
            <Link to="/products/new">
              <Button>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Product
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group bg-navy-800/50 border border-navy-700 rounded-2xl p-6 hover:border-navy-600
                  hover:shadow-xl hover:shadow-navy-900/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-navy-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <span
                    className={`shrink-0 ml-2 px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.stock > 10
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : product.stock > 0
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>

                <p className="text-navy-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-navy-700/50">
                  <span className="text-xl font-bold text-indigo-400">
                    {formatPrice(product.price)}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link to={`/products/edit/${product.id}`}>
                      <button className="p-2 rounded-lg hover:bg-navy-700 text-navy-400 hover:text-indigo-400 transition-colors cursor-pointer">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="p-2 rounded-lg hover:bg-red-600/10 text-navy-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Product"
      >
        <p className="text-navy-300 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-navy-100">
            {deleteTarget?.name}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setDeleteTarget(null)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            loading={deleting}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
