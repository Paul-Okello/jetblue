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

// Form schema and field configurations
const formFields = {
  targetingCustomers: {
    question:
      "How effective is our system at prioritizing customers who don’t already own our products?",
    options: [
      { value: "effective", label: "Effective" },
      { value: "needs-improvement", label: "Needs Improvement" },
      { value: "ineffective", label: "Ineffective" },
    ],
  },
  personalizedSales: {
    question:
      "How valuable would personalized dashboards showing past customer interactions be for our sales reps?",
    options: [
      { value: "high-value", label: "High Value" },
      { value: "some-value", label: "Some Value" },
      { value: "low-value", label: "Low Value" },
    ],
  },
  aiSuggestions: {
    question:
      "Would real-time AI suggestions for sales pitch adjustments help our reps close more deals?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "maybe", label: "Maybe" },
      { value: "no", label: "No" },
    ],
  },
  advancedSegmentation: {
    question:
      "How important is expanding customer segmentation to include demographics and travel patterns?",
    options: [
      { value: "important", label: "Important" },
      { value: "somewhat-important", label: "Somewhat Important" },
      { value: "not-important", label: "Not Important" },
    ],
  },
  featurePreference: {
    question:
      "Which feature would you prioritize first for our sales strategy improvement?",
    options: [
      { value: "personalized-dashboards", label: "Personalized Dashboards" },
      { value: "ai-pitch-suggestions", label: "AI Pitch Suggestions" },
      { value: "expanded-segmentation", label: "Expanded Segmentation" },
    ],
  },
  performanceTracking: {
    question:
      "Would regular performance reports highlighting strengths and growth opportunities improve our sales team?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "maybe", label: "Maybe" },
      { value: "no", label: "No" },
    ],
  },
  crossSiteLearning: {
    question:
      "How beneficial would a platform for sharing best practices across all customer service sites be?",
    options: [
      { value: "high-benefit", label: "High Benefit" },
      { value: "some-benefit", label: "Some Benefit" },
      { value: "low-benefit", label: "Low Benefit" },
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
        personalizedSales: data.personalizedSales,
        aiSuggestions: data.aiSuggestions,
        advancedSegmentation: data.advancedSegmentation,
        performanceTracking: data.performanceTracking,
        crossSiteLearning: data.crossSiteLearning,
        featurePreferences: data.featurePreference,
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
            Sales Strategy Survey
          </CardTitle>
          <CardDescription className="text-lg">
            Your perspective is invaluable. With just a few clicks, you&apos;re
            guiding us toward simpler, smarter sales strategies that make a
            difference. Let&apos;s streamline our approach together and elevate
            every customer experience.
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
