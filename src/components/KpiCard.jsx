import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from '@/lib/utils';

const KpiCard = ({ title, value, change, isPositive, className }) => {
  return (
    <Card className={cn("overflow-hidden bg-white", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            <div className={cn(
              "flex items-center text-sm",
              isPositive ? "text-green-600" : "text-red-600"
            )}>
              {isPositive ? (
                <ArrowUp size={16} className="mr-1" />
              ) : (
                <ArrowDown size={16} className="mr-1" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
