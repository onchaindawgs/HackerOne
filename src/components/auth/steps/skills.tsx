import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "./form";

interface SkillsStepProps {
  form: UseFormReturn<FormData>;
}

export function SkillsStep({ form }: SkillsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Skills & Experience</h2>
        <p className="text-muted-foreground">Tell us about your skills and experience.</p>
      </div>
      <FormField
        control={form.control}
        name="skills.primarySkills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Skills</FormLabel>
            <FormControl>
              <Input placeholder="e.g. React, Node.js, TypeScript" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="skills.yearsOfExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g. 5"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="skills.learningGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Learning Goals</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Machine Learning, Cloud Computing" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default SkillsStep;
