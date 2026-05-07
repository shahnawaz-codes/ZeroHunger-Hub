import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(60),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const restaurantSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters.").max(30),
  address: z.string().min(5, "Address must be at least 5 characters.").max(100),
  cuisine: z.string().min(5, "Cuisine must be at least 5 characters.").max(30),
});
