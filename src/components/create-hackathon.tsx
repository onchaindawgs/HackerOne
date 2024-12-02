"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Hackathon name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  prizePool: z.number().min(1, {
    message: "Prize pool must be at least 1.",
  }),
});

interface CreateHackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateHackathonModal({ isOpen, onClose }: CreateHackathonModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRawTransaction } = useOkto() as OktoContextType;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      prizePool: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const { name, description, prizePool } = values;

    const rawData = {
      network_name: "APTOS_TESTNET", // Replace with actual network if dynamic
      transaction: {
        transactions: [
          {
            function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::HackerOneCore::CreateHackathon`,
            typeArguments: [],
            functionArguments: [name, description, prizePool],
          },
        ],
      },
    };

    try {
      if (!executeRawTransaction) {
        throw new Error("Transaction execution function is not available.");
      }

      const response = await executeRawTransaction(rawData);

      console.log("Transaction response: ", response);
      toast({
        title: "Success",
        description: "Your hackathon has been successfully created!",
        variant: "default",
      });

      form.reset();
      onClose();
    } catch (error) {
      console.error("Transaction error: ", error);
      toast({
        title: "Error",
        description: `Failed to create hackathon:`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Create a New Hackathon
              </DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Hackathon Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter hackathon name"
                            {...field}
                            className="text-white placeholder-gray-400 bg-gray-700 border-gray-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your hackathon"
                            className="text-white placeholder-gray-400 bg-gray-700 border-gray-600 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prizePool"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Prize Pool</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter prize pool amount"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="text-white placeholder-gray-400 bg-gray-700 border-gray-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 font-bold text-white transition duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:-translate-y-1 hover:scale-105"
                  >
                    {isSubmitting ? "Creating..." : "Create Hackathon"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
