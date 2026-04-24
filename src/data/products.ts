import type { Product } from '@/store/cartStore';

import { API_BASE } from '@/config';

// --- Discount type from backend ---
interface ProductDiscount {
  id: number;
  productId: number;
  discountType: string; // "PERCENTAGE" or "FLAT"
  discountValue: number;
  active: boolean;
}

// --- Backend fetch (for Shop.tsx and ProductsSection.tsx) ---
function mapBackendToFrontend(p: any, discounts: ProductDiscount[]): Product {
  const originalPrice = p.price ?? 0;
  const discount = discounts.find(d => d.productId === p.id && d.active);

  let finalPrice = originalPrice;
  if (discount) {
    if (discount.discountType === "PERCENTAGE") {
      finalPrice = originalPrice - (originalPrice * discount.discountValue / 100);
    } else {
      finalPrice = originalPrice - discount.discountValue;
    }
    finalPrice = Math.max(0, Math.round(finalPrice * 100) / 100); // never negative, round to 2 decimals
  }

  return {
    id: String(p.id),
    name: p.name ?? "",
    flavor: p.description ?? "",
    price: finalPrice,
    originalPrice: discount ? originalPrice : undefined,
    image: p.imageUrl ?? "",        // ✅ use backend URL directly
    images: [p.imageUrl ?? ""],     // ✅ same here
    theme: "red",                   // default theme
    description: p.description ?? "",
    protein: p.protein ?? "15+ gm",
    calories: p.calories ?? "200",
  };
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    // Fetch products and active discounts in parallel
    const [productsRes, discountsRes] = await Promise.all([
      fetch(`${API_BASE}/products`),
      fetch(`${API_BASE}/discounts/active`).catch(() => null),
    ]);

    if (!productsRes.ok) {
      throw new Error("Failed to fetch products");
    }

    const productsJson = await productsRes.json();
    const backendProducts = productsJson.data ?? productsJson;

    // Parse discounts (may fail if endpoint doesn't exist yet)
    let discounts: ProductDiscount[] = [];
    if (discountsRes && discountsRes.ok) {
      discounts = await discountsRes.json();
    }

    return backendProducts.map((p: any) => mapBackendToFrontend(p, discounts));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
