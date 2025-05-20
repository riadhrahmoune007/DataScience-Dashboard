import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  SlidersHorizontal, 
  X,
  Calendar,
  CheckCircle
} from "lucide-react";

const FilterBar = ({ 
  onFilterChange, 
  filterOptions, 
  className 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = (id, value) => {
    const newFilters = { ...activeFilters, [id]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilter = (id) => {
    const newFilters = { ...activeFilters };
    delete newFilters[id];
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange({ ...activeFilters, search: searchQuery });
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="flex items-center gap-2 overflow-x-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {Object.keys(activeFilters).length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {Object.keys(activeFilters).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  {Object.keys(activeFilters).length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {filterOptions.map((filter) => (
                    <div key={filter.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">
                          {filter.label}
                        </label>
                        {activeFilters[filter.id] !== undefined && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => clearFilter(filter.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      
                      {filter.type === 'select' && (
                        <Select 
                          onValueChange={(value) => handleFilterChange(filter.id, value)}
                          value={activeFilters[filter.id] || ''}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {filter.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      {filter.type === 'range' && filter.range && (
                        <div className="pt-2 px-1">
                          <Slider
                            defaultValue={[filter.range[0]]}
                            min={filter.range[0]}
                            max={filter.range[1]}
                            step={1}
                            onValueChange={(value) => handleFilterChange(filter.id, value[0])}
                          />
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">{filter.range[0]}</span>
                            <span className="text-xs text-gray-500">
                              {activeFilters[filter.id] || filter.range[0]}
                            </span>
                            <span className="text-xs text-gray-500">{filter.range[1]}</span>
                          </div>
                        </div>
                      )}
                      
                      {filter.type === 'date' && (
                        <div className="flex items-center border rounded-md p-2">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-500">Date picker placeholder</span>
                        </div>
                      )}
                      
                      {filter.type === 'boolean' && (
                        <Button 
                          variant={activeFilters[filter.id] ? "default" : "outline"} 
                          size="sm"
                          className="w-full"
                          onClick={() => handleFilterChange(
                            filter.id, 
                            activeFilters[filter.id] ? undefined : true
                          )}
                        >
                          {activeFilters[filter.id] && (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          )}
                          {filter.label}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Active filter badges */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              const filterOption = filterOptions.find(f => f.id === key);
              if (!filterOption || key === 'search') return null;
              
              let displayValue = value;
              if (typeof value === 'boolean') {
                displayValue = filterOption.label;
              }
              
              return (
                <Badge key={key} variant="outline" className="flex items-center gap-1">
                  <span>{filterOption.label}: {displayValue}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => clearFilter(key)}
                  />
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;