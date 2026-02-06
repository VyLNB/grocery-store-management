import { useEffect, useState, useCallback } from "react";
import { getAllProducts } from "../api/products";

export function useProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await getAllProducts();

            if (Array.isArray(result)) {
                setProducts(result);
            } else if (result?.data && Array.isArray(result.data)) {
                setProducts(result.data);
            } else {
                setProducts([]);
            }

        } catch (err) {
            console.error("Error fetching products:", err);
            setError(err instanceof Error ? err.message : "Không thể kết nối đến máy chủ");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        setProducts,
        refetch: fetchProducts,
    };
}
