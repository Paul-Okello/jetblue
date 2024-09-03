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
      "How effective do you believe our current system is at prioritizing customers who don’t already own our products (e.g., airline credit cards)?",
    options: [
      { value: "very-effective", label: "Very Effective" },
      { value: "somewhat-effective", label: "Somewhat Effective" },
      { value: "neutral", label: "Neutral" },
      { value: "somewhat-ineffective", label: "Somewhat Ineffective" },
      { value: "very-ineffective", label: "Very Ineffective" },
    ],
  },
  personalizedSales: {
    question:
      "How valuable would it be for sales representatives to have access to personalized dashboards showing their historical customer interaction data?",
    options: [
      { value: "extremely-valuable", label: "Extremely Valuable" },
      { value: "very-valuable", label: "Very Valuable" },
      { value: "moderately-valuable", label: "Moderately Valuable" },
      { value: "slightly-valuable", label: "Slightly Valuable" },
      { value: "not-valuable", label: "Not Valuable" },
    ],
  },
  aiSuggestions: {
    question:
      "Do you think real-time AI-driven suggestions for sales pitch adjustments would enhance our representatives' ability to close sales?",
    options: [
      { value: "absolutely", label: "Absolutely" },
      { value: "probably", label: "Probably" },
      { value: "maybe", label: "Maybe" },
      { value: "probably-not", label: "Probably Not" },
      { value: "definitely-not", label: "Definitely Not" },
    ],
  },
  advancedSegmentation: {
    question:
      "How critical is it to expand our customer segmentation beyond product ownership to include factors like demographics and travel patterns?",
    options: [
      { value: "critical", label: "Critical" },
      { value: "very-important", label: "Very Important" },
      { value: "moderately-important", label: "Moderately Important" },
      { value: "slightly-important", label: "Slightly Important" },
      { value: "not-important", label: "Not Important" },
    ],
  },
  performanceTracking: {
    question:
      "Would regular, detailed performance reports that highlight strengths, weaknesses, and growth opportunities improve our sales team's effectiveness?",
    options: [
      { value: "significantly-improve", label: "Significantly Improve" },
      { value: "improve", label: "Improve" },
      { value: "neutral", label: "Neutral" },
      { value: "slightly-improve", label: "Slightly Improve" },
      { value: "not-improve", label: "Not Improve" },
    ],
  },
  crossSiteLearning: {
    question:
      "How beneficial would it be to implement a centralized platform to share best practices across all our customer service sites?",
    options: [
      { value: "extremely-beneficial", label: "Extremely Beneficial" },
      { value: "very-beneficial", label: "Very Beneficial" },
      { value: "moderately-beneficial", label: "Moderately Beneficial" },
      { value: "slightly-beneficial", label: "Slightly Beneficial" },
      { value: "not-beneficial", label: "Not Beneficial" },
    ],
  },
  predictiveAnalytics: {
    question:
      "To what extent do you believe predictive analytics could help our sales representatives prioritize high-probability leads?",
    options: [
      { value: "great-extent", label: "To a Great Extent" },
      { value: "moderate-extent", label: "To a Moderate Extent" },
      { value: "small-extent", label: "To a Small Extent" },
      { value: "not-at-all", label: "Not at All" },
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
        predictiveAnalytics: data.predictiveAnalytics,
      });
      toast.success(
        "Thank you! Your insights are already helping us take flight"
      );
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      form.reset();
    }
  }

  return (
    <div className="container my-4 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center select-none text-2xl">
            Sales Strategy Survey
          </CardTitle>
          <CardDescription>
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
