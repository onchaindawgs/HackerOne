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
import { OktoContextType, useOkto } from "okto-sdk-react";

const publisherAddr = process.env.NEXT_PUBLIC_PUBLISHER_ADDRESS;
export default function CreateUserForm() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const { setIsUserProfileCompleted, wallets } = useAppStore((state) => state);
  const { getWallets } = useOkto() as OktoContextType;
  const oktoContext = useOkto();
  const executeRawTransaction = oktoContext?.executeRawTransaction;
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
  const handleRawTxnExecute = async () => {
    try {
      const rawData = {
        //@ts-expect-error not known
        network_name: wallets?.[1]?.network_name || "APTOS_TESTNET",
        transaction: {
          transactions: [
            {
              function: `${publisherAddr}::HackerOneCore::createHackerProfile`,
              typeArguments: [],
              functionArguments: [
                "https://hackerone.exadrivecdn.com/userData/walletAddress/0x298e51b0b1e15e9d8ed37f5d6d27fa8a2a1286bd786a9b6d7941031225757061/data.json",
                "200",
              ],
            },
          ],
        },
      };
      console.log("rawdata: ", rawData);
      if (executeRawTransaction) {
        const response = await executeRawTransaction(rawData);
        console.log("response: ", response);
        // setTransferResponse(response);
        // setActiveSection("transferResponse");
      }
      console.log("execting: ");
    } catch (error) {
      console.error("error: ", error);
    }
  };
  async function onSubmit() {
    const data = form.getValues();
    const wallets = await getWallets();
    const walletAddress = wallets?.wallets?.[0]?.address || "";

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

      const resp = uploadJSONToExaDrive(userData, walletAddress).then((res) => {
        setIsUserProfileCompleted(true);
        handleRawTxnExecute();
      });
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
