"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  // const categories = [
  //   { id: "ethnic", name: "Premium White Machine" },
  //   { id: "panjabi", name: "Royal Blue Machine" },
  //   { id: "kurta", name: "Black Formal Machine" },
  //   { id: "formal", name: "VIP Machine" },
  // ]

  const sizes = ["S", "M", "L", "XL", "XXL"]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 5000])
    setSelectedCategories([])
    setSelectedSizes([])
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>৳{priceRange[0]}</span>
          <span>৳{priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label htmlFor={category.id} className="text-sm">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Sizes</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
              />
              <Label htmlFor={size} className="text-sm">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filters */}
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
