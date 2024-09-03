import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  customerInsight: defineTable({
    targetingCustomers: v.string(),
    personalizedSales: v.string(),
    aiSuggestions: v.string(),
    advancedSegmentation: v.string(),
    featurePreferences: v.string(),
    performanceTracking: v.string(),
    crossSiteLearning: v.string(),
  }),
});