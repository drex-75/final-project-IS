import { z } from "zod";

export const productDtoSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required"),
    price: z.coerce
        .number()
        .positive("Price must be a positive number"),
    image: z
        .string()
        .trim()
        .url("Image must be a valid URL"),
});

export const validateProductDto = (payload) => {
    return productDtoSchema.safeParse(payload);
};
