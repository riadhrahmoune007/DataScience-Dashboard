import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Download } from "lucide-react";

const DashboardHeader = ({ title, subtitle, className }) => {
  // Get current date in a nice format
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <div className={`flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 ${className}`}>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <Badge variant="outline" className="ml-2">Beta</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Updated on {formattedDate} • Last sync: 2 min ago
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Calendar size={16} />
          <span>May 1 to Sept 18</span>
        </Button>
        
        <Button variant="outline" size="sm" className="gap-1">
          <Filter size={16} />
          <span>Filters</span>
        </Button>
        
        <Button variant="outline" size="sm" className="gap-1">
          <Download size={16} />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;