import { z } from "zod";

const userSchema = z.object({
  id: z.uuid({ error: "not uuid" }).optional(),
  firstName: z.string(),
  lastName: z.string(),
  imageUrl: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  email: z.email(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export default userSchema;
