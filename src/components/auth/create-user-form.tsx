"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StepNav } from "./step-nav";
import { PersonalInfoStep, ProfessionalDetailsStep, SkillsStep, PreferencesStep } from "./steps";
import {
  FormData,
  formSchema,
  personalInfoSchema,
  preferencesSchema,
  professionalDetailsSchema,
  skillsSchema,
} from "./steps/form";
import { useAppStore } from "@/store/store";
import { uploadImageToExaDrive } from "@/utils/UploadImageToExadrive";
import { uploadJSONToExaDrive } from "@/utils/UploadJSONToExadrive";
import { useOkto } from "okto-sdk-react";
import { GenerateDevScore } from "@/utils/GenerateDevScore";

export default function CreateUserForm() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const { setIsUserProfileCompleted, wallets } = useAppStore((state) => state);
  const oktoContext = useOkto();
  const createWallet = oktoContext?.createWallet;

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
        preferredWorkStyle: "Small Team",
      },
    },
    mode: "onChange",
  });

  async function onSubmit() {
    const data = form.getValues();
    console.log({ data });
    alert("Profile created successfully!");
    const walletAddress = wallets?.wallets?.[0]?.address || "";
    debugger;
    if (file) {
      const res = await uploadImageToExaDrive(file, walletAddress);
      const imageExaUrl = res?.trx_data?.url;

      const userData = {
        ...data,
        personalInfo: {
          ...data.personalInfo,
          profilePicture: imageExaUrl,
        },
      };

      debugger;

      const resp = uploadJSONToExaDrive(userData, walletAddress).then((res) => {
        console.log("User data uploaded to ExaDrive res", res);
        setIsUserProfileCompleted(true);
      });
      const devScore = await GenerateDevScore(data)
      console.log("User data uploaded to ExaDrive resp", resp, devScore);
    }
  }

  const steps = [
    <PersonalInfoStep key="personal" form={form} file={file} setFile={setFile} />,
    <ProfessionalDetailsStep key="professional" form={form} />,
    <SkillsStep key="skills" form={form} />,
    <PreferencesStep key="preferences" form={form} />,
  ];

  const checkIfNextEnabled = (step: number) => {
    switch (step) {
      case 1:
        return personalInfoSchema.safeParse(form.getValues("personalInfo")).success;
      case 2:
        const professionalDetails = form.getValues("professionalDetails");
        // Ensure `githubProfile` is required and valid
        const isGitHubProfileValid =
          !!professionalDetails.githubProfile &&
          professionalDetailsSchema.shape.githubProfile.safeParse(professionalDetails.githubProfile).success;

        return isGitHubProfileValid;
      case 3:
        return skillsSchema.safeParse(form.getValues("skills")).success;
      case 4:
        return preferencesSchema.safeParse(form.getValues("preferences")).success;
      default:
        return false;
    }
  };

  const handleNext = async (step: number) => {
    if (!checkIfNextEnabled(step)) {
      return;
    }
    setStep((prev) => prev + 1);
  };

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
                {step === steps.length ? (
                  <Button type="button" onClick={() => onSubmit()}>
                    Confirm
                  </Button>
                ) : (
                  <Button type="button" onClick={() => handleNext(step)} disabled={!checkIfNextEnabled(step)}>
                    Next Step
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
