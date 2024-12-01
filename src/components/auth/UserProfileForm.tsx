"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  tagline: z.string().max(100, {
    message: "Tagline must not exceed 100 characters.",
  }),
  aboutMe: z.string().min(10, {
    message: "About me must be at least 10 characters.",
  }),
  githubProfile: z.string().url({
    message: "Please enter a valid URL.",
  }),
  twitterHandle: z.string().min(1, {
    message: "Twitter handle is required.",
  }),
  telegramUsername: z.string().min(1, {
    message: "Telegram username is required.",
  }),
  personalWebsite: z.string().url({
    message: "Please enter a valid URL.",
  }),
  primarySkills: z.string().min(1, {
    message: "Please enter at least one skill.",
  }),
  yearsOfExperience: z.string().min(1, {
    message: "Years of experience is required.",
  }),
  learningGoals: z.string().min(1, {
    message: "Please enter at least one learning goal.",
  }),
  preferredRole: z.string().min(1, {
    message: "Preferred role is required.",
  }),
  availability: z.enum(["Yes", "No"], {
    required_error: "Please select your availability.",
  }),
  timeZone: z.string().min(1, {
    message: "Time zone is required.",
  }),
  preferredWorkStyle: z.string().min(1, {
    message: "Preferred work style is required.",
  }),
});

export default function UserProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      tagline: "",
      aboutMe: "",
      githubProfile: "",
      twitterHandle: "",
      telegramUsername: "",
      personalWebsite: "",
      primarySkills: "",
      yearsOfExperience: "",
      learningGoals: "",
      preferredRole: "",
      availability: "Yes",
      timeZone: "",
      preferredWorkStyle: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Profile created!",
        description: "Your profile has been successfully created.",
      });
      setIsSubmitting(false);
    }, 2000);
  }

  return (
    <div className="container p-4 mx-auto mt-24">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Developer Profile</CardTitle>
          <CardDescription>Fill in your details to create your developer profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input placeholder="Full-stack wizard with a love for blockchain" {...field} />
                    </FormControl>
                    <FormDescription>A short description or slogan about yourself.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutMe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Me</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I am a developer specializing in blockchain, smart contracts, and dApps..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Write a detailed bio about yourself and your experience.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Profile</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitterHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="@john_doe_dev" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegramUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram Username</FormLabel>
                    <FormControl>
                      <Input placeholder="@JohnDoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://johndoe.dev" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primarySkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="Solidity, Rust, Move, React, Node.js" {...field} />
                    </FormControl>
                    <FormDescription>Separate multiple skills with commas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input placeholder="3+" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Goals</FormLabel>
                    <FormControl>
                      <Input placeholder="ZK Proofs, Cairo" {...field} />
                    </FormControl>
                    <FormDescription>Technologies or skills you are learning or want to learn.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Smart Contract Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Are you open to joining new projects or hackathons?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeZone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Zone</FormLabel>
                    <FormControl>
                      <Input placeholder="UTC-5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredWorkStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Work Style</FormLabel>
                    <FormControl>
                      <Input placeholder="Small Team" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating Profile..." : "Create Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
