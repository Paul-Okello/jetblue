import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

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