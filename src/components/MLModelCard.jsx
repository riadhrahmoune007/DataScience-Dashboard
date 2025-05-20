import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit } from "lucide-react";

const formatMetricValue = (value) => {
  // Format percentage metrics to 1 decimal place
  if (value < 1) return `${(value * 100).toFixed(1)}%`;
  // Format other metrics to 2 decimal places
  return value.toFixed(2);
};

const getMetricLabel = (key) => {
  const labels = {
    rmse: 'RMSE',
    r2: 'R²',
    mape: 'MAPE',
    accuracy: 'Accuracy',
    precision: 'Precision',
    recall: 'Recall',
    f1Score: 'F1 Score'
  };
  
  return labels[key] || key;
};

const MLModelCard = ({ title, target, metrics, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <BrainCircuit size={18} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Target Variable:</span>
            <span className="text-sm">{target}</span>
          </div>

          <Separator />

          {Object.entries(metrics).map(([key, value], index) => (
            <React.Fragment key={key}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{getMetricLabel(key)}:</span>
                <span className="text-sm">{formatMetricValue(value)}</span>
              </div>
              {index < Object.entries(metrics).length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MLModelCard;
