"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StepNav } from "./step-nav";
import { PersonalInfoStep, ProfessionalDetailsStep, SkillsStep, PreferencesStep } from "./steps";
import { FormData, formSchema } from "./steps/form";
import { useAppStore } from "@/store/store";

export default function CreateUserForm() {
  const [step, setStep] = useState(1);
  const { setIsUserProfileCompleted } = useAppStore((state) => state);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        profilePicture: "",
      },
      professionalDetails: {
        githubProfile: "",
        twitterHandle: "",
        telegramUsername: "",
        personalWebsite: "",
      },
      skills: {
        primarySkills: "",
        yearsOfExperience: 0,
        learningGoals: "",
      },
      preferences: {
        preferredRole: "",
        availability: "Yes",
        timeZone: "",
        preferredWorkStyle: "Small Team",
      },
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
    alert("Profile created successfully!");
  }

  const steps = [
    <PersonalInfoStep key="personal" form={form} />,
    <ProfessionalDetailsStep key="professional" form={form} />,
    <SkillsStep key="skills" form={form} />,
    <PreferencesStep key="preferences" form={form} />,
  ];

  return (
    <div className="w-full rounded-xl max-w-[900px]">
      <div className="flex w-full bg-white rounded-lg">
        <StepNav currentStep={step} />
        <main className="p-6 lg:p-8 w-[600px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {steps[step - 1]}
              <div className="flex justify-between pt-8">
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
                  Go Back
                </Button>
                {step < steps.length ? (
                  <Button type="button" onClick={() => setStep(step + 1)}>
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" onClick={() => setIsUserProfileCompleted(true)}>
                    Confirm
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
}
