import { z } from "zod";

const indianPhoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(indianPhoneRegex, "Enter a valid Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  productInterest: z.string().min(1, "Select a product"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const productQuoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(indianPhoneRegex, "Enter a valid Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  product: z.string().min(1),
  message: z.string().min(5, "Please describe your requirements"),
});

export type ProductQuoteFormValues = z.infer<typeof productQuoteFormSchema>;

export const quoteFormSchema = z.object({
  products: z.array(z.string()).min(1, "Select at least one product"),
  material: z.string().min(1, "Select a material"),
  thickness: z.string().min(1, "Enter thickness"),
  quantity: z.string().optional(),
  quantityUnit: z.enum(["pcs", "kg", "sqm"]),
  deadline: z.enum(["urgent", "standard", "flexible"]),
  additionalRequirements: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(indianPhoneRegex, "Enter a valid Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  city: z.string().optional(),
  sendWhatsApp: z.boolean().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
