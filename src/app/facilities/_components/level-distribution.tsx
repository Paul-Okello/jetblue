"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { level: 'LEVEL 2', count: 3600 },
  { level: 'LEVEL 3A', count: 1564 },
  { level: 'LEVEL 3B', count: 970 },
  { level: 'LEVEL 4', count: 563 },
  { level: 'LEVEL 4B', count: 48 },
  { level: 'LEVEL 5', count: 78 },
  { level: 'LEVEL 6A', count: 5 },
  { level: 'LEVEL 6B', count: 8 },
]

type Props ={
  data: Array<{ level: string, count: number }>,
}

export default function Component({data}: Props) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Level Distribution Chart</CardTitle>
        <CardDescription>Distribution of counts across different levels</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Count",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}