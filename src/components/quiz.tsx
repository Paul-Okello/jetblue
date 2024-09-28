"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TypographyH2 } from "./ui/typography";
import { RadioGroupField } from "./radio-group-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const formFields = {
  targetingCustomers: {
    question:
      "What challenges do you face with current paper-based record-keeping methods?",
    options: [
      { value: "time-consuming", label: "Time-Consuming" },
      { value: "error-prone", label: "Error-Prone" },
      { value: "difficult-to-access", label: "Difficult to Access" },
      { value: "none", label: "None" },
    ],
  },
  dataAccessibility: {
    question:
      "How often do you encounter difficulties accessing patient records when making treatment decisions?",
    options: [
      { value: "frequently", label: "Frequently" },
      { value: "sometimes", label: "Sometimes" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" },
    ],
  },
  trainingImportance: {
    question:
      "What obstacles do you anticipate in transitioning healthcare staff to digital health records?",
    options: [
      { value: "lack-of-training", label: "Lack of Training" },
      { value: "resistance-to-change", label: "Resistance to Change" },
      { value: "technical-issues", label: "Technical Issues" },
      { value: "no-obstacles", label: "No Obstacles" },
    ],
  },
  dataSecurityConcerns: {
    question:
      "What specific concerns do you have regarding the security of patient data in digital systems?",
    options: [
      { value: "data-breach", label: "Data Breach" },
      { value: "unauthorized-access", label: "Unauthorized Access" },
      { value: "data-loss", label: "Data Loss" },
      { value: "no-concerns", label: "No Concerns" },
    ],
  },
  featurePreferences: {
    question:
      "Which feature do you find lacking in current record-keeping methods that a digital system should prioritize?",
    options: [
      { value: "automated-data-entry", label: "Automated Data Entry" },
      { value: "real-time-access", label: "Real-Time Access" },
      { value: "data-backup", label: "Data Backup" },
      { value: "user-friendly-interface", label: "User-Friendly Interface" },
    ],
  },
  feedbackMechanism: {
    question:
      "How important is it for you to provide feedback for improving a digital health record system?",
    options: [
      { value: "very-important", label: "Very Important" },
      { value: "somewhat-important", label: "Somewhat Important" },
      { value: "not-important", label: "Not Important" },
    ],
  },
  patientEngagement: {
    question:
      "How do you think patient access to their own health records could improve healthcare delivery?",
    options: [
      { value: "enhance-trust", label: "Enhance Trust" },
      { value: "improve-communication", label: "Improve Communication" },
      { value: "foster-engagement", label: "Foster Engagement" },
      { value: "no-impact", label: "No Impact" },
    ],
  },
};

const FormSchema = z.object(
  Object.fromEntries(
    Object.entries(formFields).map(([key, field]) => [
      key,
      z.enum(
        field.options.map((option) => option.value) as [string, ...string[]],
        {
          required_error: `Your opinion matters—don't miss the chance to share it.`,
        }
      ),
    ])
  )
);

export default function Quiz() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const addInsight = useMutation(api.insight.addCustomerInsight);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await addInsight({
        targetingCustomers: data.targetingCustomers,
        dataAccessibility: data.dataAccessibility,
        trainingImportance: data.trainingImportance,
        dataSecurityConcerns: data.dataSecurityConcerns,
        feedbackMechanism: data.feedbackMechanism,
        patientEngagement: data.patientEngagement,
        featurePreferences: data.featurePreferences,
      });
      toast.success(
        "Thank you! Your insights are already helping us take flight"
      );
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      form.reset();
    } finally {
      form.reset();
    }
  }

  return (
    <div className="container p-8 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center select-none text-2xl">
            Help Us Transform Healthcare Record-Keeping
          </CardTitle>
          <CardDescription className="text-lg">
            Your insights are crucial in shaping a more efficient and secure
            digital health record system. By sharing your experiences and needs,
            you&apos;ll play a key role in enhancing healthcare delivery,
            ensuring better patient outcomes, and streamlining communication
            among providers. Join us in this important effort to improve the
            future of healthcare!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="gap-2 grid grid-cols-1 md:grid-cols-2  select-none">
                {Object.entries(formFields).map(([name, field]) => (
                  <RadioGroupField
                    key={name}
                    name={name}
                    question={field.question}
                    options={field.options}
                    form={form}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-3">
                <Button disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
