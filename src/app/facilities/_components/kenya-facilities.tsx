"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp } from "lucide-react"

const rawData = {
  'BARINGO - LEVEL 2': 24,
  'BARINGO - LEVEL 3A': 15,
  'BARINGO - LEVEL 3B': 2,
  'BARINGO - LEVEL 4': 8,
  'BOMET - LEVEL 2': 19,
  'BOMET - LEVEL 3A': 8,
  'BOMET - LEVEL 3B': 2,
  'BOMET - LEVEL 4': 1,
  'BUNGOMA - LEVEL 2': 109,
  'BUNGOMA - LEVEL 3A': 69,
  'BUNGOMA - LEVEL 3B': 20,
  'BUNGOMA - LEVEL 4': 19,
  'BUNGOMA - LEVEL 5': 3,
}

const processData = (data: Record<string, number>) => {
  const counties: Record<string, number> = {}
  Object.entries(data).forEach(([key, value]) => {
    const [county, level] = key.split(' - ')
    if (!counties[county]) {
      counties[county] = { County: county }
    }
    counties[county][level] = value
  })
  return Object.values(counties)
}

const data = processData(rawData)

const columns = [
  { key: "County", label: "County" },
  { key: "LEVEL 2", label: "Level 2" },
  { key: "LEVEL 3A", label: "Level 3A" },
  { key: "LEVEL 3B", label: "Level 3B" },
  { key: "LEVEL 4", label: "Level 4" },
  { key: "LEVEL 4B", label: "Level 4B" },
  { key: "LEVEL 5", label: "Level 5" },
  { key: "LEVEL 6A", label: "Level 6A" },
  { key: "LEVEL 6B", label: "Level 6B" },
]

export default function HealthcareFacilitiesTable() {
  const [sorting, setSorting] = useState({ column: "County", direction: "asc" })
  const [visibleColumns, setVisibleColumns] = useState(columns.map(col => col.key))
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 10

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sorting.column] || 0
    const bValue = b[sorting.column] || 0
    return sorting.direction === "asc" ? aValue - bValue : bValue - aValue
  })

  const filteredData = sortedData.filter(item =>
    item.County.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleSort = (column) => {
    setSorting(prev => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc"
    }))
  }

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev =>
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search counties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                checked={visibleColumns.includes(column.key)}
                onCheckedChange={() => toggleColumn(column.key)}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.filter(col => visibleColumns.includes(col.key)).map((column) => (
                <TableHead key={column.key} className="font-medium">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(column.key)}
                    className="font-medium"
                  >
                    {column.label}
                    {sorting.column === column.key && (
                      sorting.direction === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                {columns.filter(col => visibleColumns.includes(col.key)).map((column) => (
                  <TableCell key={column.key}>{row[column.key] || 0}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}