"use client"

import { useEffect, useState } from 'react'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface SecurityData {
  [key: string]: number;
}

interface EfficiencyData {
  [key: string]: number;
}

interface PaymentData {
  [key: string]: number;
}

interface Data {
  currentSolutionsByDataSecurity: Record<string, SecurityData>;
  efficienciesBySolution: Record<string, EfficiencyData>;
  solutionByPayment: Record<string, PaymentData>;
}

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

function aggregateSecurityConcerns(data: Record<string, SecurityData>) {
  const concerns = Object.values(data).reduce((acc, solution) => {
    Object.entries(solution).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value
    })
    return acc
  }, {} as Record<string, number>)
  return Object.entries(concerns).map(([name, value]) => ({ name, value }))
}

function calculateEfficiencyScores(data: Record<string, EfficiencyData>) {
  return Object.entries(data).map(([solution, scores]) => ({
    solution,
    score: Object.values(scores).reduce((sum, score) => sum + score, 0)
  }))
}

function aggregatePaymentPreferences(data: Record<string, PaymentData>) {
  const preferences = Object.values(data).reduce((acc, solution) => {
    Object.entries(solution).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value
    })
    return acc
  }, {} as Record<string, number>)
  return Object.entries(preferences).map(([name, value]) => ({ name, value }))
}

function getInsight(data: Array<{ name: string; value: number }>, type: string) {
  const sortedData = [...data].sort((a, b) => b.value - a.value)
  const topFactor = sortedData[0]
  const totalValue = data.reduce((sum, item) => sum + item.value, 0)
  const percentage = ((topFactor.value / totalValue) * 100).toFixed(1)

  switch (type) {
    case 'security':
      return `${topFactor.name} is the primary security concern, accounting for ${percentage}% of all reported issues. Prioritize addressing this in your EHR system design.`
    case 'efficiency':
      return `${topFactor.name} shows the highest efficiency score of ${topFactor.value}. Consider adopting its best practices across other solutions.`
    case 'payment':
      return `${topFactor.name} is the most preferred payment option at ${percentage}%. Consider prominently offering this option in your EHR system.`
    default:
      return `${topFactor.name} is the most significant factor, with a score of ${topFactor.value}.`
  }
}

export default function Component({ data }: { data: Data }) {
  const [securityData, setSecurityData] = useState(aggregateSecurityConcerns(data.currentSolutionsByDataSecurity))
  const [efficiencyData, setEfficiencyData] = useState(calculateEfficiencyScores(data.efficienciesBySolution))
  const [paymentData, setPaymentData] = useState(aggregatePaymentPreferences(data.solutionByPayment))

  useEffect(() => {
    setSecurityData(aggregateSecurityConcerns(data.currentSolutionsByDataSecurity))
    setEfficiencyData(calculateEfficiencyScores(data.efficienciesBySolution))
    setPaymentData(aggregatePaymentPreferences(data.solutionByPayment))
  }, [data])

  const insights = {
    security: {
      title: "Security Concerns",
      description: "Overview of main security issues",
      data: securityData,
      insight: getInsight(securityData, 'security')
    },
    efficiency: {
      title: "Solution Efficiency",
      description: "Comparison of solution efficiencies",
      data: efficiencyData,
      insight: getInsight(efficiencyData, 'efficiency')
    },
    payment: {
      title: "Payment Preferences",
      description: "Distribution of payment options",
      data: paymentData,
      insight: getInsight(paymentData, 'payment')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Healthcare Data Management Insights</h1>
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {Object.entries(insights).map(([key, { title }]) => (
            <TabsTrigger key={key} value={key}>{title}</TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(insights).map(([key, { title, description, data, insight }]) => (
          <TabsContent key={key} value={key}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={data.reduce((acc, item, index) => {
                    acc[item.name] = { label: item.name, color: colors[index % colors.length] }
                    return acc
                  }, {})}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    {key === 'efficiency' ? (
                      <BarChart data={data}>
                        <XAxis dataKey="solution" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score">
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`var(--color-${entry.solution})`} />
                          ))}
                        </Bar>
                      </BarChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={data}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Key Insight</AlertTitle>
                  <AlertDescription>{insight}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}