import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const addCustomerInsight = mutation({
  args: {
    targetingCustomers: v.string(),
    personalizedSales: v.string(),
    aiSuggestions: v.string(),
    advancedSegmentation: v.string(),
    performanceTracking: v.string(),
    crossSiteLearning: v.string(),
    predictiveAnalytics: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("customerInsight", {
      ...args,
    })
  }
});