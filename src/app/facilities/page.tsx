import { api } from "@/_generated/api"
import LevelDistribution from "@/app/facilities/_components/level-distribution"
import { fetchQuery } from "convex/nextjs"
import React from 'react'


export default async function page() {
  const facilitiesByLevel = await fetchQuery(api.facilities.facilitiesByLevel)

  const facilitiesByCountyAndLevel = await fetchQuery(api.facilities.facilitiesByCountyAndLevel)



  const data = Object.entries(facilitiesByLevel).map(([level, count]) => ({
    level,
    count
  }));

  const dataCountyLevel = Object.entries(facilitiesByCountyAndLevel).map(([county, levels]) => ({
    county,
    levels
  }));
  console.log(dataCountyLevel)
  return (
    <div>
      <LevelDistribution data={data} />
    </div>
  )
}
