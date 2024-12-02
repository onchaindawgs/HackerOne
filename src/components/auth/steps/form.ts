import * as z from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  profilePicture: z.string().refine((val) => val !== "", {
    message: "Please upload a profile picture.",
  }),
});

export const professionalDetailsSchema = z.object({
  githubProfile: z.string().url("Please enter a valid URL."), // Required
  twitterHandle: z.optional(z.string().regex(/^@?(\w){1,15}$/, "Please enter a valid Twitter handle.")), // Optional
  telegramUsername: z.optional(z.string().regex(/^@?(\w){5,32}$/, "Please enter a valid Telegram username.")), // Optional
  personalWebsite: z.optional(z.string().url("Please enter a valid URL.")), // Optional
});

export const skillsSchema = z.object({
  primarySkills: z.string().min(2, "Please enter at least one skill."),
  yearsOfExperience: z.number().min(0, "Years of experience must be a positive number."),
  learningGoals: z.string(),
});

export const preferencesSchema = z.object({
  preferredRole: z.string().min(2, "Preferred role is required."),
  availability: z.enum(["Yes", "No"]),
  preferredWorkStyle: z.enum(["Solo", "Small Team", "Large Team"]),
});

export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  professionalDetails: professionalDetailsSchema,
  skills: skillsSchema,
  preferences: preferencesSchema,
});

export type FormData = z.infer<typeof formSchema>;
