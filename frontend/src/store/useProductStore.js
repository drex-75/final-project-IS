import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
    // products state
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    // form state
    formData: {
        name: "",
        price: "",
        image: "",
    },

    setFormData: (formData) => set({ formData }),
    resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({ products: response.data.data, error: null });
        } catch (err) {
            if (err.status == 429) set({ error: "Rate limit exceeded", products: [] });
            else set({ error: "Something went wrong", products: [] });
        } finally {
            set({ loading: false });
        }
    },

    fetchProduct: async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            set({
                currentProduct: response.data.data,
                formData: response.data.data, // pre-fill form with current product data
                error: null,
            });
        } catch (error) {
            console.log("Error in fetchProduct function", error);
            set({ error: "Something went wrong", currentProduct: null });
        } finally {
            set({ loading: false });
        }
    },
}));