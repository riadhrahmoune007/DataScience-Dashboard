import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import KpiCard from '@/components/KpiCard';
import BarChartComponent from '@/components/BarChartComponent';
import LineChartComponent from '@/components/LineChartComponent';
import HeatmapComponent from '@/components/HeatmapComponent';
import DataOverviewCard from '@/components/DataOverviewCard';
import MLModelCard from '@/components/MLModelCard';
import TrafficHeatmap from '@/components/TrafficHeatmap';
import { useData } from '@/context/DataContext';
import HotelDataset from '@/components/HotelDataset';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [datasets, setDatasets] = useState([]); // Add this if not already present
  const { chartData, dataOverview, mlModelMetrics, isUsingDefaultData } = useData();

  React.useEffect(() => {
    fetch('http://localhost:5000/api/datasets')
      .then((res) => res.json())
      .then((data) => {
        console.log('Available datasets:', data);
        setDatasets(data);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Main Key Point Indicators" 
            className="mb-6"
          />
          
          {isUsingDefaultData && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Currently displaying default demonstration data. Upload your own data in the "Upload Data" section to see customized analytics.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
            {chartData.kpiData.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                isPositive={kpi.isPositive}
              />
            ))}
          </div>
          
          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <BarChartComponent 
              title="Treatment Types" 
              data={chartData.treatmentTypeData} 
            />
            <LineChartComponent 
              title="2022 Monthly Trends" 
              data={chartData.monthlyTrendData}
            />
          </div>
          
          {/* Lower Section: Data Overview, ML Models, and Traffic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              {dataOverview && (
                <DataOverviewCard 
                  totalRows={dataOverview.totalRows}
                  totalColumns={dataOverview.totalColumns}
                  missingValues={dataOverview.missingValues}
                  duplicates={dataOverview.duplicates}
                  numericColumns={dataOverview.numericColumns}
                  categoricalColumns={dataOverview.categoricalColumns}
                />
              )}
              
              {mlModelMetrics && (
                <>
                  <MLModelCard
                    title="Regression Model"
                    target={mlModelMetrics.regression.target}
                    metrics={{
                      rmse: mlModelMetrics.regression.rmse,
                      r2: mlModelMetrics.regression.r2,
                      mape: mlModelMetrics.regression.mape
                    }}
                  />
                  
                  <MLModelCard
                    title="Classification Model"
                    target={mlModelMetrics.classification.target}
                    metrics={{
                      accuracy: mlModelMetrics.classification.accuracy,
                      precision: mlModelMetrics.classification.precision,
                      recall: mlModelMetrics.classification.recall,
                      f1Score: mlModelMetrics.classification.f1Score
                    }}
                  />
                </>
              )}
            </div>
            
            <div>
              <HeatmapComponent 
                title="Risk Matrix" 
                data={chartData.riskMatrixData}
              />
            </div>
            
            <div>
              <TrafficHeatmap 
                title="Traffic Channels" 
                data={chartData.trafficHeatmapData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;