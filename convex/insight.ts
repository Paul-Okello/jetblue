import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const addCustomerInsight = mutation({
  args: {
    targetingCustomers: v.string(),
    dataAccessibility: v.string(),
    trainingImportance: v.string(),
    dataSecurityConcerns: v.string(),
    featurePreferences: v.string(),
    feedbackMechanism: v.string(),
    patientEngagement: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("customerInsight", {
      ...args,
    });
  },
});