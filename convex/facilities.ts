import { query } from "./_generated/server";

export const facilitiesByCounty = query({
  handler: async (ctx) => {
    const facilities = await ctx.db.query("facilities").collect();

    return facilities.reduce((counts, { County }) => {
      counts[County] = (counts[County] ?? 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  },
});

export const facilitiesByLevel = query({
  handler: async (ctx) => {
    const facilities = await ctx.db.query("facilities").collect();

    return facilities.reduce((counts, { Level }) => {
      counts[Level] = (counts[Level] ?? 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  },
});

export const facilitiesByCountyAndLevel = query({
  handler: async (ctx) => {
    const facilities = await ctx.db.query("facilities").collect();

    return facilities.reduce((counts, { County, Level }) => {
      const key = `${County} - ${Level}`;
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  },
});

export const facilitiesByStatus = query({
  handler: async (ctx) => {
    const facilities = await ctx.db.query("facilities").collect();

    return facilities.reduce((counts, { Status }) => {
      counts[Status] = (counts[Status] ?? 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  },
});

export const facilitiesByType = query({
  handler: async (ctx) => {
    const facilities = await ctx.db.query("facilities").collect();

    return facilities.reduce((counts, { FacilityType }) => {
      counts[FacilityType] = (counts[FacilityType] ?? 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  },
});