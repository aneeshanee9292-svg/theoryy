import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Upload, Image, Plus, Trash2, Edit3, RefreshCw, Tag, Percent,
  LogOut, Loader2, CheckCircle2, X, Save, ShoppingBag, BarChart3,
  ImagePlus, DollarSign, Hash, FileText, AlertCircle, ToggleLeft, ToggleRight,
} from "lucide-react";

const API_BASE = "http://localhost:8081";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

type TabKey = "products" | "upload" | "coupons" | "discounts";

const AdminDashboard: React.FC = () => {
  const token = localStorage.getItem("jwt");

  /* ── Product State ── */
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productForm, setProductForm] = useState({
    name: "", description: "", price: "", stock: "", imageUrl: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /* ── Image Upload State ── */
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState("products");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [lastUploadedUrl, setLastUploadedUrl] = useState("");

  /* ── Coupon State ── */
  const [couponForm, setCouponForm] = useState({
    code: "", discountType: "PERCENTAGE", discountValue: "", minOrderAmount: "", maxDiscount: "", active: true,
  });
  const [coupons, setCoupons] = useState<any[]>([]);
  const [editingCouponId, setEditingCouponId] = useState<number | null>(null);

  /* ── Discount State ── */
  const [discountForm, setDiscountForm] = useState({
    productId: "", discountType: "PERCENTAGE", discountValue: "", active: true,
  });
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [editingDiscountId, setEditingDiscountId] = useState<number | null>(null);

  /* ── Tab State ── */
  const [activeTab, setActiveTab] = useState<TabKey>("products");

  /* ── Stock edit ── */
  const [stockEditing, setStockEditing] = useState<number | null>(null);
  const [stockValue, setStockValue] = useState("");

  /* ── Toast ── */
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const authHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  }), [token]);

  /* ── Fetch All Data ── */
  const refreshProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data.data || []);
    } catch { showToast("Failed to fetch products", "error"); }
    finally { setLoading(false); }
  }, [token]);

  const refreshUploadedImages = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/files/list/${uploadFolder}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      setUploadedUrls(data.data || []);
    } catch { /* silent */ }
  }, [token, uploadFolder]);

  const refreshCoupons = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/coupon`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      setCoupons(Array.isArray(data) ? data : []);
    } catch { /* silent */ }
  }, [token]);

  const refreshDiscounts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/discount`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      setDiscounts(Array.isArray(data) ? data : []);
    } catch { /* silent */ }
  }, [token]);

  useEffect(() => {
    if (!token) { window.location.href = "/admin"; return; }
    refreshProducts();
    refreshUploadedImages();
    refreshCoupons();
    refreshDiscounts();
  }, [token, refreshProducts, refreshUploadedImages, refreshCoupons, refreshDiscounts]);

  /* ── Product CRUD ── */
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const saveProduct = async () => {
    if (!productForm.name || !productForm.price) {
      showToast("Name and price are required", "error");
      return;
    }
    setLoading(true);
    try {
      const body = {
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        imageUrl: productForm.imageUrl,
      };

      const url = editingId ? `${API_BASE}/products/${editingId}` : `${API_BASE}/products`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed");

      showToast(editingId ? "Product updated!" : "Product added!");
      setProductForm({ name: "", description: "", price: "", stock: "", imageUrl: "" });
      setEditingId(null);
      refreshProducts();
    } catch {
      showToast("Failed to save product", "error");
    } finally { setLoading(false); }
  };

  const editProduct = (p: ProductType) => {
    setEditingId(p.id);
    setProductForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      stock: String(p.stock),
      imageUrl: p.imageUrl || "",
    });
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      showToast("Product deleted");
      refreshProducts();
    } catch { showToast("Failed to delete", "error"); }
  };

  const updateStock = async (id: number) => {
    try {
      await fetch(`${API_BASE}/products/${id}/stock?stock=${stockValue}`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}` },
      });
      showToast("Stock updated");
      setStockEditing(null);
      refreshProducts();
    } catch { showToast("Failed to update stock", "error"); }
  };

  /* ── Image Upload ── */
  const handleUpload = async () => {
    if (!uploadFile) { showToast("Select a file first", "error"); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      const res = await fetch(`${API_BASE}/files/upload/${uploadFolder}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setLastUploadedUrl(data.data);
        showToast("Image uploaded successfully!");
        setUploadFile(null);
        refreshUploadedImages();
      } else {
        showToast(data.message || "Upload failed", "error");
      }
    } catch { showToast("Upload failed", "error"); }
    finally { setUploading(false); }
  };

  /* ── Image Delete ── */
  const deleteImage = async (url: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      // Extract filename from URL: http://localhost:8081/uploads/products/filename.png
      const parts = url.split("/");
      const filename = parts[parts.length - 1];
      const folder = parts[parts.length - 2];

      const res = await fetch(`${API_BASE}/files/${folder}/${filename}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        showToast("Image deleted!");
        refreshUploadedImages();
      } else {
        showToast(data.message || "Delete failed", "error");
      }
    } catch { showToast("Failed to delete image", "error"); }
  };

  /* ── Coupon CRUD ── */
  const saveCoupon = async () => {
    if (!couponForm.code || !couponForm.discountValue) {
      showToast("Code and value are required", "error");
      return;
    }
    try {
      const body: any = {
        code: couponForm.code,
        discountType: couponForm.discountType,
        discountValue: Number(couponForm.discountValue),
        minOrderAmount: Number(couponForm.minOrderAmount) || 0,
        active: couponForm.active,
      };
      // Only include maxDiscount for PERCENTAGE type
      if (couponForm.discountType === "PERCENTAGE" && couponForm.maxDiscount) {
        body.maxDiscount = Number(couponForm.maxDiscount);
      } else {
        body.maxDiscount = null;
      }

      const url = editingCouponId
        ? `${API_BASE}/admin/coupon/${editingCouponId}`
        : `${API_BASE}/admin/coupon`;
      const method = editingCouponId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed");

      showToast(editingCouponId ? "Coupon updated!" : "Coupon added!");
      resetCouponForm();
      refreshCoupons();
    } catch { showToast("Failed to save coupon", "error"); }
  };

  const editCoupon = (c: any) => {
    setEditingCouponId(c.id);
    setCouponForm({
      code: c.code || "",
      discountType: c.discountType || "PERCENTAGE",
      discountValue: String(c.discountValue || ""),
      minOrderAmount: String(c.minOrderAmount || ""),
      maxDiscount: String(c.maxDiscount || ""),
      active: c.active ?? true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCoupon = async (id: number) => {
    if (!confirm("Delete this coupon?")) return;
    try {
      const res = await fetch(`${API_BASE}/admin/coupon/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      showToast("Coupon deleted");
      refreshCoupons();
    } catch { showToast("Failed to delete coupon", "error"); }
  };

  const toggleCoupon = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/admin/coupon/${id}/toggle`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      showToast("Coupon status toggled");
      refreshCoupons();
    } catch { showToast("Failed to toggle coupon", "error"); }
  };

  const resetCouponForm = () => {
    setEditingCouponId(null);
    setCouponForm({ code: "", discountType: "PERCENTAGE", discountValue: "", minOrderAmount: "", maxDiscount: "", active: true });
  };

  /* ── Discount CRUD ── */
  const saveDiscount = async () => {
    if (!discountForm.productId || !discountForm.discountValue) {
      showToast("Product ID and value are required", "error");
      return;
    }
    try {
      const body = {
        productId: Number(discountForm.productId),
        discountType: discountForm.discountType,
        discountValue: Number(discountForm.discountValue),
        active: discountForm.active,
      };

      const url = editingDiscountId
        ? `${API_BASE}/admin/discount/${editingDiscountId}`
        : `${API_BASE}/admin/discount`;
      const method = editingDiscountId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed");

      showToast(editingDiscountId ? "Discount updated!" : "Discount added!");
      resetDiscountForm();
      refreshDiscounts();
    } catch { showToast("Failed to save discount", "error"); }
  };

  const editDiscount = (d: any) => {
    setEditingDiscountId(d.id);
    setDiscountForm({
      productId: String(d.productId || ""),
      discountType: d.discountType || "PERCENTAGE",
      discountValue: String(d.discountValue || ""),
      active: d.active ?? true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteDiscount = async (id: number) => {
    if (!confirm("Delete this discount?")) return;
    try {
      const res = await fetch(`${API_BASE}/admin/discount/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      showToast("Discount deleted");
      refreshDiscounts();
    } catch { showToast("Failed to delete discount", "error"); }
  };

  const toggleDiscount = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/admin/discount/${id}/toggle`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      showToast("Discount status toggled");
      refreshDiscounts();
    } catch { showToast("Failed to toggle discount", "error"); }
  };

  const resetDiscountForm = () => {
    setEditingDiscountId(null);
    setDiscountForm({ productId: "", discountType: "PERCENTAGE", discountValue: "", active: true });
  };

  /* ── Logout ── */
  const logout = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/admin";
  };

  /* ── Tab Config ── */
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "products", label: "Products", icon: <Package className="w-4 h-4" /> },
    { key: "upload", label: "Images", icon: <Image className="w-4 h-4" /> },
    { key: "coupons", label: "Coupons", icon: <Tag className="w-4 h-4" /> },
    { key: "discounts", label: "Discounts", icon: <Percent className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -40, x: "-50%" }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-full shadow-lg text-sm font-semibold ${toast.type === "success"
              ? "bg-green-500/90 text-white"
              : "bg-destructive/90 text-white"
              }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-40 glass-surface border-b border-border/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-heading text-xl uppercase">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Manage your store</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 pb-12">
          <AnimatePresence mode="wait">
            {/* ── PRODUCTS TAB ── */}
            {activeTab === "products" && (
              <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form */}
                  <div className="lg:col-span-1">
                    <div className="bg-card rounded-2xl border border-border p-6 sticky top-28">
                      <h2 className="font-heading text-lg uppercase mb-6 flex items-center gap-2">
                        {editingId ? <Edit3 className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                        {editingId ? "Edit Product" : "Add Product"}
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium mb-1 text-foreground/70">Product Name</label>
                          <div className="relative">
                            <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input name="name" value={productForm.name} onChange={handleProductChange}
                              placeholder="e.g. Chocolate Whey Protein"
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1 text-foreground/70">Description</label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <textarea name="description" value={productForm.description} onChange={handleProductChange}
                              placeholder="Product description..." rows={2}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1 text-foreground/70">Price (₹)</label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input name="price" type="number" value={productForm.price} onChange={handleProductChange}
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1 text-foreground/70">Stock</label>
                            <div className="relative">
                              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input name="stock" type="number" value={productForm.stock} onChange={handleProductChange}
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1 text-foreground/70">Image URL</label>
                          <div className="relative">
                            <ImagePlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input name="imageUrl" value={productForm.imageUrl} onChange={handleProductChange}
                              placeholder="Upload image first, then paste URL"
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                          </div>
                          {productForm.imageUrl && (
                            <div className="mt-2 p-2 rounded-xl bg-muted/30 border border-border">
                              <img src={productForm.imageUrl} alt="Preview" className="w-full h-32 object-contain rounded-lg" />
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <motion.button whileTap={{ scale: 0.97 }} onClick={saveProduct} disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs cta-glow hover:brightness-110 transition-all disabled:opacity-60">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {editingId ? "Update" : "Add Product"}
                          </motion.button>
                          {editingId && (
                            <button onClick={() => { setEditingId(null); setProductForm({ name: "", description: "", price: "", stock: "", imageUrl: "" }); }}
                              className="px-4 py-3 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase hover:bg-muted/80 transition-all">
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-heading text-lg uppercase flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        All Products ({products.length})
                      </h2>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={refreshProducts}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-all">
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                      </motion.button>
                    </div>

                    {loading && products.length === 0 ? (
                      <div className="flex items-center justify-center py-20 text-muted-foreground">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading products...
                      </div>
                    ) : products.length === 0 ? (
                      <div className="text-center py-20 text-muted-foreground">
                        <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No products yet</p>
                        <p className="text-sm">Add your first product using the form</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map(p => (
                          <motion.div key={p.id} layout
                            className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all">
                            {/* Image */}
                            {p.imageUrl && (
                              <div className="aspect-[16/10] bg-muted/30 flex items-center justify-center overflow-hidden">
                                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain p-4" />
                              </div>
                            )}
                            <div className="p-4 space-y-3">
                              <div>
                                <h3 className="font-heading text-base uppercase">{p.name}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-primary">₹{p.price}</span>

                                {/* Stock */}
                                {stockEditing === p.id ? (
                                  <div className="flex items-center gap-1">
                                    <input type="number" value={stockValue}
                                      onChange={e => setStockValue(e.target.value)}
                                      className="w-16 px-2 py-1 rounded-lg bg-muted/50 border border-border text-xs text-center focus:border-primary outline-none" />
                                    <button onClick={() => updateStock(p.id)}
                                      className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => setStockEditing(null)}
                                      className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all">
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <button onClick={() => { setStockEditing(p.id); setStockValue(String(p.stock)); }}
                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${p.stock > 0
                                      ? "bg-green-500/10 text-green-500"
                                      : "bg-destructive/10 text-destructive"
                                      }`}>
                                    Stock: {p.stock}
                                  </button>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <button onClick={() => editProduct(p)}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all">
                                  <Edit3 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button onClick={() => deleteProduct(p.id)}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 transition-all">
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              </div>
                              <p className="text-[10px] text-muted-foreground text-center">ID: {p.id}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── IMAGES TAB ── */}
            {activeTab === "upload" && (
              <motion.div key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-heading text-lg uppercase mb-6 flex items-center gap-2">
                      <Upload className="w-5 h-5 text-primary" /> Upload Image
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-foreground/70">Folder</label>
                        <select value={uploadFolder} onChange={e => { setUploadFolder(e.target.value); }}
                          className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm">
                          <option value="products">Products</option>
                          <option value="banners">Banners</option>
                          <option value="profile">Profile</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1 text-foreground/70">Select Image</label>
                        <div className="relative">
                          <input type="file" accept="image/*" onChange={e => setUploadFile(e.target.files?.[0] || null)}
                            className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm file:mr-3 file:px-3 file:py-1 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary file:text-xs file:font-semibold" />
                        </div>
                      </div>

                      <motion.button whileTap={{ scale: 0.97 }} onClick={handleUpload} disabled={uploading || !uploadFile}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs cta-glow hover:brightness-110 transition-all disabled:opacity-60">
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploading ? "Uploading..." : "Upload"}
                      </motion.button>

                      {lastUploadedUrl && (
                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 space-y-2">
                          <p className="text-xs font-semibold text-green-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded Successfully
                          </p>
                          <div className="flex items-center gap-2">
                            <input readOnly value={lastUploadedUrl}
                              className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border text-xs font-mono" />
                            <button onClick={() => { navigator.clipboard.writeText(lastUploadedUrl); showToast("URL copied!"); }}
                              className="px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all">
                              Copy
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-heading text-lg uppercase flex items-center gap-2">
                        <Image className="w-5 h-5 text-primary" /> Uploaded Images
                      </h2>
                      <button onClick={refreshUploadedImages}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-all">
                        <RefreshCw className="w-3.5 h-3.5" /> Refresh
                      </button>
                    </div>

                    {uploadedUrls.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Image className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No images found in "{uploadFolder}"</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
                        {uploadedUrls.map((url, i) => (
                          <div key={i} className="group relative rounded-xl overflow-hidden bg-muted/30 border border-border aspect-square">
                            <img src={url} alt={`img-${i}`} className="w-full h-full object-contain p-2" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                              <button onClick={() => { navigator.clipboard.writeText(url); showToast("URL copied!"); }}
                                className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold">
                                Copy URL
                              </button>
                              <button onClick={() => deleteImage(url)}
                                className="px-3 py-1.5 rounded-full bg-destructive text-white text-xs font-semibold flex items-center gap-1">
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── COUPONS TAB ── */}
            {activeTab === "coupons" && (
              <motion.div key="coupons" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-heading text-lg uppercase mb-6 flex items-center gap-2">
                      {editingCouponId ? <Edit3 className="w-5 h-5 text-primary" /> : <Tag className="w-5 h-5 text-primary" />}
                      {editingCouponId ? "Edit Coupon" : "Add Coupon"}
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-foreground/70">Coupon Code</label>
                        <input value={couponForm.code} onChange={e => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                          placeholder="e.g. SAVE20"
                          className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm uppercase tracking-wider font-mono" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium mb-1 text-foreground/70">Type</label>
                          <select value={couponForm.discountType} onChange={e => setCouponForm({ ...couponForm, discountType: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none text-sm">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="FLAT">Flat</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-foreground/70">Value</label>
                          <input type="number" value={couponForm.discountValue}
                            onChange={e => setCouponForm({ ...couponForm, discountValue: e.target.value })}
                            placeholder="e.g. 20"
                            className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-foreground/70">Min Order Amount (₹)</label>
                        <input type="number" value={couponForm.minOrderAmount}
                          onChange={e => setCouponForm({ ...couponForm, minOrderAmount: e.target.value })}
                          placeholder="0"
                          className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                      </div>

                      {/* Max Discount (Upto) - only for PERCENTAGE */}
                      {couponForm.discountType === "PERCENTAGE" && (
                        <div>
                          <label className="block text-xs font-medium mb-1 text-foreground/70">
                            Max Discount / Upto (₹)
                            <span className="text-muted-foreground ml-1 font-normal">— optional cap</span>
                          </label>
                          <input type="number" value={couponForm.maxDiscount}
                            onChange={e => setCouponForm({ ...couponForm, maxDiscount: e.target.value })}
                            placeholder="e.g. 100 (50% off upto ₹100)"
                            className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                        </div>
                      )}

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={couponForm.active}
                          onChange={e => setCouponForm({ ...couponForm, active: e.target.checked })}
                          className="w-4 h-4 rounded accent-primary" />
                        <span className="text-sm">Active</span>
                      </label>

                      <div className="flex gap-2">
                        <motion.button whileTap={{ scale: 0.97 }} onClick={saveCoupon}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs cta-glow hover:brightness-110 transition-all">
                          {editingCouponId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          {editingCouponId ? "Update Coupon" : "Add Coupon"}
                        </motion.button>
                        {editingCouponId && (
                          <button onClick={resetCouponForm}
                            className="px-4 py-3 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase hover:bg-muted/80 transition-all">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* List */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-heading text-lg uppercase flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary" /> All Coupons ({coupons.length})
                      </h2>
                      <button onClick={refreshCoupons}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-all">
                        <RefreshCw className="w-3.5 h-3.5" /> Refresh
                      </button>
                    </div>
                    {coupons.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No coupons created yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {coupons.map((c) => (
                          <div key={c.id} className="p-4 rounded-xl bg-muted/20 border border-border space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-mono font-bold text-sm tracking-wider">{c.code}</p>
                                <p className="text-xs text-muted-foreground">
                                  {c.discountType === "PERCENTAGE"
                                    ? `${c.discountValue}% off${c.maxDiscount ? ` (upto ₹${c.maxDiscount})` : ""}`
                                    : `₹${c.discountValue} flat`}
                                  {c.minOrderAmount > 0 && ` · Min ₹${c.minOrderAmount}`}
                                </p>
                              </div>

                              {/* Toggle Button */}
                              <button
                                onClick={() => toggleCoupon(c.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${c.active
                                  ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                                  }`}
                              >
                                {c.active
                                  ? <><ToggleRight className="w-4 h-4" /> Active</>
                                  : <><ToggleLeft className="w-4 h-4" /> Inactive</>
                                }
                              </button>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <button onClick={() => editCoupon(c)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all">
                                <Edit3 className="w-3.5 h-3.5" /> Edit
                              </button>
                              <button onClick={() => deleteCoupon(c.id)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 transition-all">
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── DISCOUNTS TAB ── */}
            {activeTab === "discounts" && (
              <motion.div key="discounts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-heading text-lg uppercase mb-6 flex items-center gap-2">
                      {editingDiscountId ? <Edit3 className="w-5 h-5 text-primary" /> : <Percent className="w-5 h-5 text-primary" />}
                      {editingDiscountId ? "Edit Discount" : "Add Product Discount"}
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-foreground/70">Product ID</label>
                        <select value={discountForm.productId}
                          onChange={e => setDiscountForm({ ...discountForm, productId: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none text-sm">
                          <option value="">Select product...</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium mb-1 text-foreground/70">Type</label>
                          <select value={discountForm.discountType}
                            onChange={e => setDiscountForm({ ...discountForm, discountType: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none text-sm">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="FLAT">Flat</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-foreground/70">Value</label>
                          <input type="number" value={discountForm.discountValue}
                            onChange={e => setDiscountForm({ ...discountForm, discountValue: e.target.value })}
                            placeholder="e.g. 10"
                            className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={discountForm.active}
                          onChange={e => setDiscountForm({ ...discountForm, active: e.target.checked })}
                          className="w-4 h-4 rounded accent-primary" />
                        <span className="text-sm">Active</span>
                      </label>

                      <div className="flex gap-2">
                        <motion.button whileTap={{ scale: 0.97 }} onClick={saveDiscount}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs cta-glow hover:brightness-110 transition-all">
                          {editingDiscountId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          {editingDiscountId ? "Update Discount" : "Add Discount"}
                        </motion.button>
                        {editingDiscountId && (
                          <button onClick={resetDiscountForm}
                            className="px-4 py-3 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase hover:bg-muted/80 transition-all">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* List */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-heading text-lg uppercase flex items-center gap-2">
                        <Percent className="w-5 h-5 text-primary" /> All Discounts ({discounts.length})
                      </h2>
                      <button onClick={refreshDiscounts}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-all">
                        <RefreshCw className="w-3.5 h-3.5" /> Refresh
                      </button>
                    </div>
                    {discounts.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Percent className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No discounts created yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {discounts.map((d) => {
                          const product = products.find(p => p.id === d.productId);
                          return (
                            <div key={d.id} className="p-4 rounded-xl bg-muted/20 border border-border space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-sm">{product?.name || `Product #${d.productId}`}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {d.discountType === "PERCENTAGE" ? `${d.discountValue}% off` : `₹${d.discountValue} flat`}
                                  </p>
                                </div>

                                {/* Toggle Button */}
                                <button
                                  onClick={() => toggleDiscount(d.id)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${d.active
                                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                                >
                                  {d.active
                                    ? <><ToggleRight className="w-4 h-4" /> Active</>
                                    : <><ToggleLeft className="w-4 h-4" /> Inactive</>
                                  }
                                </button>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <button onClick={() => editDiscount(d)}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all">
                                  <Edit3 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button onClick={() => deleteDiscount(d.id)}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 transition-all">
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
