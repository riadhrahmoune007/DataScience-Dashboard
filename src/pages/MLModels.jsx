import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import MLModelCard from '@/components/MLModelCard';
import { mlModelMetrics } from '@/data/mockData';

const MLModels = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const featureImportance = [
    { name: 'Age', value: 0.85 },
    { name: 'Blood Pressure', value: 0.72 },
    { name: 'Cholesterol', value: 0.65 },
    { name: 'Heart Rate', value: 0.58 },
    { name: 'Gender', value: 0.42 }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Machine Learning Models"
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>

          <div className="mt-6 bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Feature Importance</h2>
            <div className="space-y-3">
              {featureImportance.map((feature, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="w-32 text-sm">{feature.name}</span>
                  <div className="flex-1 bg-gray-200 h-4 rounded">
                    <div
                      className="bg-blue-500 h-4 rounded transition-all duration-500"
                      style={{ width: `${feature.value * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{feature.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLModels;
