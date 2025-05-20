import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import BarChartComponent from '@/components/BarChartComponent';
import LineChartComponent from '@/components/LineChartComponent';
import HeatmapComponent from '@/components/HeatmapComponent';
import TrafficHeatmap from '@/components/TrafficHeatmap';
import FilterBar from '@/components/FilterBar';
import { 
  treatmentTypeData, 
  monthlyTrendData,
  riskMatrixData,
  trafficHeatmapData
} from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';
import HotelDataset from '@/components/HotelDataset';

const Visualizations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const [datasets, setDatasets] = useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/datasets')
      .then((res) => res.json())
      .then((data) => {
        console.log('Available datasets:', data);
        setDatasets(data);
      })
      .catch((error) => {
        console.error('Error fetching datasets:', error);
      });
  }, []);

const filterOptions = [
  {
    id: 'chartType',
    label: 'Chart Type',
    type: 'select',
    options: ['Bar Charts', 'Line Charts', 'Heatmaps', 'All']
  },
  {
    id: 'timeRange',
    label: 'Time Range',
    type: 'select',
    options: ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last Year', 'All Time']
  },
  {
    id: 'dataPoints',
    label: 'Data Points',
    type: 'range',
    range: [10, 100]
  }
];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (Object.keys(newFilters).length > 0) {
      toast({
        title: "Visualization filters applied",
        description: `Applied ${Object.keys(newFilters).length} filters to charts.`,
      });
    }
  };

  // Determine which charts to show based on filters
  const showChart = (type) => {
    if (!filters.chartType || filters.chartType === 'All') return true;
    
    if (type === 'bar' && filters.chartType === 'Bar Charts') return true;
    if (type === 'line' && filters.chartType === 'Line Charts') return true;
    if (type === 'heatmap' && filters.chartType === 'Heatmaps') return true;
    
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Data Visualizations" 
            className="mb-6"
          />
          
          <FilterBar 
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
            className="mb-6"
          />
          
          {/* Main Charts Grid */}
          {(showChart('bar') || showChart('line')) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {showChart('bar') && (
                <BarChartComponent 
                  title="Treatment Types" 
                  data={treatmentTypeData} 
                />
              )}
              {showChart('line') && (
                <LineChartComponent 
                  title="2022 Monthly Trends" 
                  data={monthlyTrendData}
                />
              )}
            </div>
          )}
          
          {/* Heatmaps Grid */}
          {showChart('heatmap') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HeatmapComponent 
                title="Risk Matrix" 
                data={riskMatrixData}
              />
              <TrafficHeatmap 
                title="Traffic Channels" 
                data={trafficHeatmapData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizations;