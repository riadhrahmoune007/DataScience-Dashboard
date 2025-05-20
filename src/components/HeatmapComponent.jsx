import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HeatmapData } from '@/data/mockData';

const getColor = (count) => {
  if (count === 0) return 'bg-white text-gray-400';
  if (count <= 2) return 'bg-blue-100 text-blue-800';
  if (count <= 4) return 'bg-blue-300 text-blue-900';
  return 'bg-blue-500 text-white';
};

// Function to get distinct risk levels and impacts, maintaining order
const getDistinctValues = (data) => {
  const orderRiskLevels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
  const orderImpacts = ['Insignificance', 'Minor', 'Moderate', 'Major', 'Extreme'];
  
  return {
    riskLevels: orderRiskLevels,
    impacts: orderImpacts
  };
};

const HeatmapComponent = ({ title, data, className }) => {
  const { riskLevels, impacts } = getDistinctValues(data);

  // Function to get count for a specific risk level and impact
  const getCount = (riskLevel, impact) => {
    const item = data.find(d => d.riskLevel === riskLevel && d.impact === impact);
    return item ? item.count : 0;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 overflow-x-auto">
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Risk Level</TableHead>
                {impacts.map((impact) => (
                  <TableHead key={impact}>{impact}</TableHead>
                ))}
                <TableHead>Total Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskLevels.map((riskLevel) => {
                const rowCounts = impacts.map(impact => getCount(riskLevel, impact));
                const rowTotal = rowCounts.reduce((sum, count) => sum + count, 0);
                const rowPercentage = data.length ? `${Math.round((rowTotal / data.length) * 100)}%` : '0%';
                
                return (
                  <TableRow key={riskLevel}>
                    <TableCell className="font-medium">{riskLevel}</TableCell>
                    {impacts.map((impact, idx) => {
                      const count = getCount(riskLevel, impact);
                      return (
                        <TableCell key={`${riskLevel}-${impact}`} className={getColor(count)}>
                          {count}
                        </TableCell>
                      );
                    })}
                    <TableCell>{rowTotal} - {rowPercentage}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell className="font-medium">Total Count</TableCell>
                {impacts.map((impact) => {
                  const colTotal = riskLevels.reduce((sum, risk) => sum + getCount(risk, impact), 0);
                  const colPercentage = data.length ? `${Math.round((colTotal / data.length) * 100)}%` : '0%';
                  return (
                    <TableCell key={`total-${impact}`}>
                      {colTotal} - {colPercentage}
                    </TableCell>
                  );
                })}
                <TableCell>
                  {data.reduce((sum, item) => sum + item.count, 0)} - 100%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapComponent;