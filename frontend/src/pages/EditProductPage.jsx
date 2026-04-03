import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { useToast } from "../components/Toast";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setForm({
          name: data.name,
          description: data.description,
          price: String(data.price),
          stock: String(data.stock),
        });
      } catch (error) {
        addToast("Product not found.", "error");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Product name is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    if (form.stock === "") {
      newErrors.stock = "Stock is required.";
    } else if (isNaN(Number(form.stock)) || Number(form.stock) < 0 || !Number.isInteger(Number(form.stock))) {
      newErrors.stock = "Stock must be a non-negative integer.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await api.put(`/api/products/${id}`, {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
      });
      addToast("Product updated successfully!", "success");
      navigate("/dashboard");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update product.";
      addToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fade-in">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-navy-400 hover:text-navy-200 transition-colors mb-6 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-navy-100 mb-2">
            Edit Product
          </h1>
          <p className="text-navy-400 mb-8">
            Update the product details below.
          </p>

          <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                id="edit-product-name"
                label="Product Name"
                name="name"
                placeholder="e.g. Wireless Headphones"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              <div className="space-y-1.5">
                <label
                  htmlFor="edit-product-description"
                  className="block text-sm font-medium text-navy-300"
                >
                  Description
                </label>
                <textarea
                  id="edit-product-description"
                  name="description"
                  rows={4}
                  placeholder="Describe your product..."
                  value={form.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-navy-800/60 border rounded-xl text-navy-100 placeholder-navy-500
                    transition-all duration-200 outline-none resize-none
                    ${
                      errors.description
                        ? "border-danger focus:ring-2 focus:ring-danger/30 focus:border-danger"
                        : "border-navy-700 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                    }`}
                />
                {errors.description && (
                  <p className="text-sm text-danger flex items-center gap-1 animate-slide-down">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  id="edit-product-price"
                  label="Price ($)"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  error={errors.price}
                />
                <Input
                  id="edit-product-stock"
                  label="Stock Quantity"
                  name="stock"
                  type="number"
                  step="1"
                  min="0"
                  placeholder="0"
                  value={form.stock}
                  onChange={handleChange}
                  error={errors.stock}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-700/50">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={submitting}>
                  Update Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
