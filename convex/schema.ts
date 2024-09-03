import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  customerInsight: defineTable({
    targetingCustomers: v.string(),
    personalizedSales: v.string(),
    aiSuggestions: v.string(),
    advancedSegmentation: v.string(),
    performanceTracking: v.string(),
    crossSiteLearning: v.string(),
    predictiveAnalytics: v.string(),
  }).index("by_targetingCustomers", ["targetingCustomers"]).index("by_personalizedSales", ["personalizedSales"]).index("by_aiSuggestions", ["aiSuggestions"]).index("by_advancedSegmentation", ["advancedSegmentation"]).index("by_performanceTracking", ["performanceTracking"]).index("by_crossSiteLearning", ["crossSiteLearning"]).index("by_predictiveAnalytics", ["predictiveAnalytics"]),
});