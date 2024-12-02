import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "./form";

interface PreferencesStepProps {
  form: UseFormReturn<FormData>;
}

export function PreferencesStep({ form }: PreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Work Preferences</h2>
        <p className="text-muted-foreground">Tell us about your preferred work style and availability.</p>
      </div>
      <FormField
        control={form.control}
        name="preferences.preferredRole"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Role</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Frontend Developer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="preferences.availability"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Available for Work</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferences.preferredWorkStyle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Work Style</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select work style" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Solo">Solo</SelectItem>
                <SelectItem value="Small Team">Small Team</SelectItem>
                <SelectItem value="Large Team">Large Team</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default PreferencesStep;
