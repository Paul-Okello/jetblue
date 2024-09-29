// @ts-nocheck

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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { TypographyH2 } from "./ui/typography";
import { RadioGroupField } from "./radio-group-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";

const formFields = {
  currentSolutions: {
    question:
      "How do you currently manage patient records and other healthcare data?",
    multipleChoice: false,
    options: [
      { value: "paper-only", label: "Paper-Based Only" },
      {
        value: "digital-tools",
        label: "Use of Basic Digital Tools (e.g., Excel)",
      },
      { value: "hybrid", label: "Combination of Paper and Digital Tools" },
      { value: "emr-system", label: "Electronic Medical Record (EMR) System" },
    ],
  },
  existingGaps: {
    question:
      "What challenges do you face with your current method of record-keeping? (You can select multiple)",
    multipleChoice: true,
    options: [
      { value: "time-consuming", label: "Time-Consuming" },
      { value: "high-error-rate", label: "Prone to Errors" },
      { value: "data-loss", label: "Data Loss or Misplacement" },
      { value: "difficult-to-access", label: "Difficult to Access" },
      { value: "privacy-concerns", label: "Lack of Data Privacy" },
    ],
  },
  desiredEfficiencies: {
    question:
      "Which of the following would most improve your efficiency in managing health records? (You can select multiple)",
    multipleChoice: true,
    options: [
      { value: "automated-data-entry", label: "Automated Data Entry" },
      { value: "real-time-access", label: "Real-Time Access to Records" },
      {
        value: "faster-retrieval",
        label: "Faster Retrieval of Patient Histories",
      },
      {
        value: "scalable-system",
        label: "Scalability to Handle Large Data Volumes",
      },
    ],
  },
  futureBudgetConsiderations: {
    question:
      "If you see a clear return on investment, would you consider investing in a digital health record system in the future?",
    multipleChoice: false,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  willingnessToPayNow: {
    question:
      "What will you be willing to invest in for a digital health record system?",
    multipleChoice: false,
    options: [
      { value: "one-time-payment", label: "One-Time Payment" },
      { value: "monthly-subscription", label: "Monthly Subscription" },
      { value: "not-sure", label: "Not Sure at the Moment" },
    ],
  },
  dataSecurityConcerns: {
    question:
      "What concerns do you have regarding the security of patient data in digital systems? (You can select multiple)",
    multipleChoice: true,
    options: [
      { value: "data-breach", label: "Data Breach" },
      { value: "unauthorized-access", label: "Unauthorized Access" },
      { value: "data-loss", label: "Data Loss" },
      { value: "no-concerns", label: "No Concerns" },
    ],
  },
};

// Form Schema: Adjust types for multiple-choice fields to be arrays
// Explicit Zod Schema Creation
const FormSchema = z.object({
  currentSolutions: z.enum([
    "paper-only",
    "digital-tools",
    "hybrid",
    "emr-system",
  ]),

  existingGaps: z
    .array(
      z.enum([
        "time-consuming",
        "high-error-rate",
        "data-loss",
        "difficult-to-access",
        "privacy-concerns",
      ])
    )
    .optional(),

  desiredEfficiencies: z
    .array(
      z.enum([
        "automated-data-entry",
        "real-time-access",
        "faster-retrieval",
        "scalable-system",
      ])
    )
    .optional(),

  futureBudgetConsiderations: z.enum(["yes", "no"]),

  willingnessToPayNow: z.enum([
    "one-time-payment",
    "monthly-subscription",
    "not-sure",
  ]),

  dataSecurityConcerns: z
    .array(
      z.enum(["data-breach", "unauthorized-access", "data-loss", "no-concerns"])
    )
    .optional(),
});

export default function Quiz() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: Object.fromEntries(
      Object.entries(formFields).map(([key, field]) => [
        key,
        field.multipleChoice ? [] : "",
      ])
    ),
  });

  const addInsight = useMutation(api.insight.addCustomerInsight);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await addInsight({
        currentSolutions: data.currentSolutions,
        dataSecurityConcerns: data.dataSecurityConcerns as string[],
        desiredEfficiencies: data.desiredEfficiencies as string[],
        existingGaps: data.existingGaps as string[],
        futureBudgetConsiderations: data.futureBudgetConsiderations,
        willingnessToPayNow: data.willingnessToPayNow,
      });
      toast.success(
        "🥂 To a future where patient care is boundless and limitless! 🚀🩺✨"
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
          <CardDescription className="">
            Your insights are crucial in shaping a more efficient and secure
            digital health record system. By sharing your experiences and
            challenges with current methods, you will help us understand the key
            areas that need improvement and guide the development of features
            that address these needs. Your responses will remain completely
            anonymous and will be used solely to inform design decisions and
            ensure that the final solution meets the requirements of healthcare
            providers like you. Join us in this important effort to enhance
            patient outcomes and improve the future of healthcare!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 select-none">
                {Object.entries(formFields).map(
                  ([fieldMain, { question, options, multipleChoice }]) => (
                    <div key={fieldMain} className="space-y-4">
                      <h3 className="font-medium">{question}</h3>
                      {multipleChoice ? (
                        <FormField
                          control={form.control}
                          name={fieldMain}
                          render={({ field }) => (
                            <FormItem>
                              <div className="mb-4 grid grid-cols-2 gap-4">
                                {options.map((option) => (
                                  <FormItem
                                    key={option.value}
                                    className="space-x-3"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          option.value
                                        )}
                                        onCheckedChange={(checked) => {
                                          const newValue = checked
                                            ? [...field.value, option.value]
                                            : field.value.filter(
                                                (val) => val !== option.value
                                              );
                                          field.onChange(newValue);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <FormField
                          control={form.control}
                          name={fieldMain}
                          render={({ field: radioField }) => (
                            <FormItem className="flex items-center justify-start">
                              <FormControl>
                                <RadioGroup
                                  onValueChange={radioField.onChange}
                                  value={radioField.value}
                                >
                                  {options.map((option) => (
                                    <FormItem
                                      className="flex items-center space-x-3"
                                      key={option.value}
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option.value} />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  )
                )}
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
