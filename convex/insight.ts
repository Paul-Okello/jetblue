import { Doc } from "./_generated/dataModel";
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Define types for the data structure
interface Entry {
  currentSolutions: string;
  dataSecurityConcerns: string[];
  existingGaps: string[];
  desiredEfficiencies: string[];
  willingnessToPayNow: string;
}

// Helper function to calculate frequency of each element in an array
function countOccurrences(arr: string[]): Record<string, number> {
  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

// Function to get insights based on current solutions and data security concerns
function getCurrentSolutionsByDataSecurityConcerns(data: Doc<"customerInsight">[]): Record<string, Record<string, number>> {
  const solutionsSecurityConcerns: Record<string, string[]> = {};

  data.forEach(entry => {
    const { currentSolutions, dataSecurityConcerns } = entry;
    if (!solutionsSecurityConcerns[currentSolutions]) {
      solutionsSecurityConcerns[currentSolutions] = [];
    }
    solutionsSecurityConcerns[currentSolutions].push(...dataSecurityConcerns);
  });

  // Count occurrences of security concerns for each solution
  const result: Record<string, Record<string, number>> = {};
  Object.keys(solutionsSecurityConcerns).forEach(solution => {
    result[solution] = countOccurrences(solutionsSecurityConcerns[solution]);
  });

  return result;
}

// Function to get insights based on existing gaps and desired efficiencies
function getGapsByEfficiencies(data: Doc<"customerInsight">[]): Record<string, Record<string, number>> {
  const gapsEfficiencies: Record<string, string[]> = {};

  data.forEach(entry => {
    const { existingGaps, desiredEfficiencies } = entry;
    desiredEfficiencies.forEach(efficiency => {
      if (!gapsEfficiencies[efficiency]) {
        gapsEfficiencies[efficiency] = [];
      }
      gapsEfficiencies[efficiency].push(...existingGaps);
    });
  });

  // Count occurrences of gaps for each efficiency
  const result: Record<string, Record<string, number>> = {};
  Object.keys(gapsEfficiencies).forEach(efficiency => {
    result[efficiency] = countOccurrences(gapsEfficiencies[efficiency]);
  });

  return result;
}

// Function to get insights based on willingness to pay and data security concerns
function getPaymentBySecurityConcerns(data: Doc<"customerInsight">[]): Record<string, Record<string, number>> {
  const paymentSecurityConcerns: Record<string, string[]> = {};

  data.forEach(entry => {
    const { willingnessToPayNow, dataSecurityConcerns } = entry;
    if (!paymentSecurityConcerns[willingnessToPayNow]) {
      paymentSecurityConcerns[willingnessToPayNow] = [];
    }
    paymentSecurityConcerns[willingnessToPayNow].push(...dataSecurityConcerns);
  });

  // Count occurrences of security concerns for each payment method
  const result: Record<string, Record<string, number>> = {};
  Object.keys(paymentSecurityConcerns).forEach(payment => {
    result[payment] = countOccurrences(paymentSecurityConcerns[payment]);
  });

  return result;
}

// Function to get insights based on current solutions and willingness to pay
function getSolutionByPayment(data: Doc<"customerInsight">[]): Record<string, Record<string, number>> {
  const solutionPayment: Record<string, string[]> = {};

  data.forEach(entry => {
    const { currentSolutions, willingnessToPayNow } = entry;
    if (!solutionPayment[currentSolutions]) {
      solutionPayment[currentSolutions] = [];
    }
    solutionPayment[currentSolutions].push(willingnessToPayNow);
  });

  // Count occurrences of payment methods for each solution
  const result: Record<string, Record<string, number>> = {};
  Object.keys(solutionPayment).forEach(solution => {
    result[solution] = countOccurrences(solutionPayment[solution]);
  });

  return result;
}

// Function to get common desired efficiencies for each solution type
function getEfficienciesBySolution(data: Doc<"customerInsight">[]): Record<string, Record<string, number>> {
  const solutionEfficiencies: Record<string, string[]> = {};

  data.forEach(entry => {
    const { currentSolutions, desiredEfficiencies } = entry;
    if (!solutionEfficiencies[currentSolutions]) {
      solutionEfficiencies[currentSolutions] = [];
    }
    solutionEfficiencies[currentSolutions].push(...desiredEfficiencies);
  });

  // Count occurrences of efficiencies for each solution
  const result: Record<string, Record<string, number>> = {};
  Object.keys(solutionEfficiencies).forEach(solution => {
    result[solution] = countOccurrences(solutionEfficiencies[solution]);
  });

  return result;
}



export const addCustomerInsight = mutation({
  args: {
    currentSolutions: v.string(),
    existingGaps: v.array(v.string()),
    desiredEfficiencies: v.array(v.string()),
    futureBudgetConsiderations: v.string(),
    willingnessToPayNow: v.string(),
    dataSecurityConcerns: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("customerInsight", {
      ...args,
    });
  },
});

export const getAllInsight = query({
  handler: async (ctx) => {
    return await ctx.db.query("customerInsight").collect()
  },
});

// New query to get all insights
export const getAllInsights = query({
  handler: async (ctx) => {
    const data = await ctx.db.query("customerInsight").collect();

    return {
      currentSolutionsByDataSecurity: getCurrentSolutionsByDataSecurityConcerns(data),
      gapsByEfficiencies: getGapsByEfficiencies(data),
      paymentBySecurityConcerns: getPaymentBySecurityConcerns(data),
      solutionByPayment: getSolutionByPayment(data),
      efficienciesBySolution: getEfficienciesBySolution(data),
    };
  },
});
