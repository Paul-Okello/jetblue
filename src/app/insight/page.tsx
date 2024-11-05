import React from 'react'
import { fetchQuery } from "convex/nextjs";
import { api } from "@/_generated/api";
import InsightCharts from "./_components/data-charts";
import EMRSystemCharts from "@/app/insight/_components/emr-charts";

export default async function InsightHome() {
  const insight = await fetchQuery(api.insight.getAllInsights)
  console.log(insight)
  return (
    <div>
      <EMRSystemCharts />
      <InsightCharts data={insight} />
    </div>
  )
}
