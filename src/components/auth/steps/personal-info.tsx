import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "./form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { X } from "lucide-react";

interface PersonalInfoStepProps {
  form: UseFormReturn<FormData>;
}

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: string) => void },
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        field.onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: { onChange: (value: string) => void }) => {
    setPreviewImage(null);
    field.onChange("");
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Personal info</h2>
        <p className="text-muted-foreground">Please provide your name, email address, and phone number.</p>
      </div>
      <FormField
        control={form.control}
        name="personalInfo.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Stephen King" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalInfo.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input placeholder="e.g. stephenking@lorem.com" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalInfo.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="e.g. +1 234 567 890" type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalInfo.profilePicture"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Picture</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={previewImage || ""} alt="Profile picture" />
                  <AvatarFallback>{form.getValues("personalInfo.fullName")?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, field)}
                    className="hidden"
                    id="profile-picture-upload"
                  />
                  <label htmlFor="profile-picture-upload">
                    <Button type="button" variant="outline" asChild>
                      <span>Upload Image</span>
                    </Button>
                  </label>
                  {previewImage && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(field)}
                      className="flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default PersonalInfoStep;
