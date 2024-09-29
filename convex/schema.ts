import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  customerInsight: defineTable({
    currentSolutions: v.string(),
    existingGaps: v.array(v.string()),
    desiredEfficiencies: v.array(v.string()),
    futureBudgetConsiderations: v.string(),
    willingnessToPayNow: v.string(),
    dataSecurityConcerns: v.array(v.string()),
  }),
});