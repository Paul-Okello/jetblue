import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { UseFormReturn } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupFieldProps {
  name: string;
  question: string;
  options: RadioOption[];
  form: UseFormReturn<any>;
  index: number;
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  name,
  question,
  options,
  form,
  index,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>
            <span className="mr-2">{index + 1}</span>
            {question}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-wrap gap-4"
            >
              {options.map((option) => (
                <FormItem
                  className="flex items-center space-x-1 space-y-0"
                  key={option.value}
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <Label htmlFor={option.value}>{option.label}</Label>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
