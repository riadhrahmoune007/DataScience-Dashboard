import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer } from 'recharts';

const CustomHeatmap = ({ data }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night'];
  
  return (
    <div className="w-full h-full">
      <div className="flex">
        <div className="w-20"></div>
        {hours.map((hour) => (
          <div 
            key={hour} 
            className="flex-1 text-xs text-center text-gray-500"
          >
            {hour}
          </div>
        ))}
      </div>
      
      {days.map((day, dayIndex) => (
        <div key={day} className="flex items-center h-8">
          <div className="w-20 text-xs text-gray-500">{day}</div>
          {hours.map((_, hourIndex) => {
            // Find the data point for this day and hour
            const dataPoint = data.find(
              ([d, h, _]) => d === dayIndex && h === hourIndex
            );
            
            // Get the value or default to 0
            const value = dataPoint ? dataPoint[2] : 0;
            
            // Determine the color based on the value
            let bgColor;
            if (value === 0) bgColor = 'bg-gray-100';
            else if (value === 1) bgColor = 'bg-blue-100';
            else if (value === 2) bgColor = 'bg-blue-200';
            else if (value === 3) bgColor = 'bg-blue-300';
            else if (value === 4) bgColor = 'bg-blue-400';
            else bgColor = 'bg-blue-500';
            
            return (
              <div key={hourIndex} className="flex-1 px-1">
                <div 
                  className={`${bgColor} h-6 rounded-sm flex items-center justify-center text-xs ${value >= 4 ? 'text-white' : 'text-gray-700'}`}
                >
                  {value > 0 ? value : ''}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      
      <div className="flex items-center mt-4">
        <div className="w-20 text-xs text-gray-500">Legend</div>
        <div className="flex gap-1">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-100 rounded-sm"></div>
            <span className="text-xs text-gray-500">0</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-100 rounded-sm"></div>
            <span className="text-xs text-gray-500">1</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-200 rounded-sm"></div>
            <span className="text-xs text-gray-500">2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-300 rounded-sm"></div>
            <span className="text-xs text-gray-500">3</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
            <span className="text-xs text-gray-500">4</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            <span className="text-xs text-gray-500">5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrafficHeatmap = ({ title, data, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <p className="text-xs text-gray-500">
          Level of utilization across different days and hours
        </p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-[230px]">
          <CustomHeatmap data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficHeatmap;