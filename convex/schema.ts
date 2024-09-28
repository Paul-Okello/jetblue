import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  customerInsight: defineTable({
    targetingCustomers: v.string(),
    dataAccessibility: v.string(),
    trainingImportance: v.string(),
    dataSecurityConcerns: v.string(),
    featurePreferences: v.string(),
    feedbackMechanism: v.string(),
    patientEngagement: v.string(),
  }),
});