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
  facilities: defineTable({
    RegNo: v.union(v.string(), v.number()),
    FacilityName: v.string(),
    FacilityType: v.string(),
    FacilityAgent: v.string(),
    Level: v.string(),
    County: v.string(),
    Status: v.string(),
  }).index("by_County", ["County"]).index("by_FacilityType", ["FacilityType"]).index("by_FacilityAgent", ["FacilityAgent"]).index("by_Status", ["Status"]).index("by_Level", ["Level"]),
});