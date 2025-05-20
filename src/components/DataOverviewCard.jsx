import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Database, Table, AlertCircle, CheckCircle } from "lucide-react";

const DataOverviewCard = ({
  totalRows,
  totalColumns,
  missingValues,
  duplicates,
  numericColumns,
  categoricalColumns,
  className
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Database size={18} />
          Data Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <Table size={16} className="text-slate-500" />
              <span className="font-medium">Total Records:</span>
            </div>
            <span className="font-medium text-sm">{totalRows.toLocaleString()}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <Table size={16} className="text-slate-500" />
              <span className="font-medium">Total Features:</span>
            </div>
            <span className="font-medium text-sm">{totalColumns}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle size={16} className="text-amber-500" />
              <span className="font-medium">Missing Values:</span>
            </div>
            <span className="font-medium text-sm">
              {missingValues} ({(missingValues / (totalRows * totalColumns) * 100).toFixed(2)}%)
            </span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-green-500" />
              <span className="font-medium">Duplicates:</span>
            </div>
            <span className="font-medium text-sm">
              {duplicates} ({(duplicates / totalRows * 100).toFixed(2)}%)
            </span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Column Types:</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">{numericColumns} Numeric, {categoricalColumns} Categorical</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataOverviewCard;