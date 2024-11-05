'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const securityConcernsData = [
  {
    name: "EMR System",
    "Data Breach": 2,
    "Data Loss": 2,
    "Unauthorized Access": 3,
  },
  {
    name: "Hybrid",
    "Data Breach": 9,
    "Data Loss": 5,
    "Unauthorized Access": 10,
    "No Concerns": 1,
  },
  {
    name: "Paper Only",
    "Data Breach": 2,
    "Data Loss": 2,
    "Unauthorized Access": 2,
    "No Concerns": 1,
  },
]

const efficienciesData = [
  {
    name: "EMR System",
    "Automated Data Entry": 3,
    "Faster Retrieval": 3,
    "Real-time Access": 1,
  },
  {
    name: "Hybrid",
    "Automated Data Entry": 8,
    "Faster Retrieval": 4,
    "Real-time Access": 6,
    "Scalable System": 5,
  },
  {
    name: "Paper Only",
    "Automated Data Entry": 1,
    "Faster Retrieval": 1,
    "Real-time Access": 2,
    "Scalable System": 2,
  },
]

export default function EMRSystemCharts() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Data Security Concerns by System Type</CardTitle>
          <CardDescription>Comparison of security concerns across different EMR systems</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              "Data Breach": {
                label: "Data Breach",
                color: "hsl(var(--chart-1))",
              },
              "Data Loss": {
                label: "Data Loss",
                color: "hsl(var(--chart-2))",
              },
              "Unauthorized Access": {
                label: "Unauthorized Access",
                color: "hsl(var(--chart-3))",
              },
              "No Concerns": {
                label: "No Concerns",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={securityConcernsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="Data Breach" fill="var(--color-Data Breach)" />
                <Bar dataKey="Data Loss" fill="var(--color-Data Loss)" />
                <Bar dataKey="Unauthorized Access" fill="var(--color-Unauthorized Access)" />
                <Bar dataKey="No Concerns" fill="var(--color-No Concerns)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Efficiencies by EMR Solution</CardTitle>
          <CardDescription>Comparison of efficiencies across different EMR systems</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              "Automated Data Entry": {
                label: "Automated Data Entry",
                color: "hsl(var(--chart-1))",
              },
              "Faster Retrieval": {
                label: "Faster Retrieval",
                color: "hsl(var(--chart-2))",
              },
              "Real-time Access": {
                label: "Real-time Access",
                color: "hsl(var(--chart-3))",
              },
              "Scalable System": {
                label: "Scalable System",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficienciesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="Automated Data Entry" fill="var(--color-Automated Data Entry)" />
                <Bar dataKey="Faster Retrieval" fill="var(--color-Faster Retrieval)" />
                <Bar dataKey="Real-time Access" fill="var(--color-Real-time Access)" />
                <Bar dataKey="Scalable System" fill="var(--color-Scalable System)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}