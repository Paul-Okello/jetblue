import React, { ElementType } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

function Typography({
  as: Component = "p",
  className,
  children,
  ...rest
}: TypographyProps) {
  const baseClassName = "scroll-m-20";

  return (
    <Component className={cn(baseClassName, className)} {...rest}>
      {children}
    </Component>
  );
}

function createTypographyComponent(tag: ElementType, baseClass: string) {
  return function TypographyComponent({
    children,
    className = "",
    ...props
  }: TypographyProps) {
    return (
      <Typography as={tag} className={cn(baseClass, className)} {...props}>
        {children}
      </Typography>
    );
  };
}

export const TypographyH1 = createTypographyComponent(
  "h1",
  "text-4xl font-extrabold tracking-tight lg:text-5xl"
);
export const TypographyH2 = createTypographyComponent(
  "h2",
  "border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
);
export const TypographyH3 = createTypographyComponent(
  "h3",
  "text-2xl font-semibold tracking-tight"
);
export const TypographyH4 = createTypographyComponent(
  "h4",
  "text-xl font-semibold tracking-tight"
);
export const TypographyP = createTypographyComponent(
  "p",
  "leading-7 [&:not(:first-child)]:mt-6"
);
export const TypographyBlockquote = createTypographyComponent(
  "blockquote",
  "mt-6 border-l-2 pl-6 italic"
);
export const TypographyInlineCode = createTypographyComponent(
  "code",
  "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
);
export const TypographyLead = createTypographyComponent(
  "p",
  "text-xl text-muted-foreground"
);
export const TypographyLarge = createTypographyComponent(
  "div",
  "text-lg font-semibold"
);
export const TypographySmall = createTypographyComponent(
  "small",
  "text-sm font-medium leading-none"
);
export const TypographyMuted = createTypographyComponent(
  "p",
  "text-sm text-muted-foreground"
);
