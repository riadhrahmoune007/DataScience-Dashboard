// Mock healthcare data for the dashboard
export const kpiData = [
  { 
    title: 'Patients', 
    value: '14,443', 
    change: 12.5, 
    isPositive: true 
  },
  { 
    title: 'Admissions', 
    value: '7,456', 
    change: 5.2, 
    isPositive: true 
  },
  { 
    title: 'Treatments', 
    value: '18,869', 
    change: 8.7, 
    isPositive: true 
  },
  { 
    title: 'Readmission Rate', 
    value: '0.0%', 
    change: -2.1, 
    isPositive: true 
  },
  { 
    title: 'Satisfaction', 
    value: '61.8%', 
    change: 4.3, 
    isPositive: true 
  },
  { 
    title: 'Avg. Cost', 
    value: '134.2K', 
    change: 2.8, 
    isPositive: false 
  },
  { 
    title: 'Insurance Coverage', 
    value: '234.02K', 
    change: 6.9, 
    isPositive: true 
  },
];

// Bar chart data for treatment types
export const treatmentTypeData = [
  { name: 'Cardiology', value: 245, fill: '#1a73e8' },
  { name: 'Oncology', value: 147, fill: '#1a73e8' },
  { name: 'Neurology', value: 112, fill: '#1a73e8' },
  { name: 'Orthopedic', value: 189, fill: '#1a73e8' },
  { name: 'General', value: 237, fill: '#1a73e8' },
];

// Monthly trend data for 2022
export const monthlyTrendData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 81 },
  { name: 'May', value: 75 },
  { name: 'Jun', value: 87 },
  { name: 'Jul', value: 65 },
  { name: 'Aug', value: 72 },
  { name: 'Sep', value: 83 },
  { name: 'Oct', value: 78 },
  { name: 'Nov', value: 94 },
  { name: 'Dec', value: 89 },
];

// Satisfaction scores data
export const satisfactionScoreData = [
  { name: '1-20', value: 23, fill: '#d3e3fd' },
  { name: '21-40', value: 45, fill: '#a8c7fa' },
  { name: '41-60', value: 67, fill: '#7cacf8' },
  { name: '61-80', value: 125, fill: '#4285f4' },
  { name: '81-100', value: 178, fill: '#1967d2' },
];

// Traffic channels data
export const trafficChannelsData = [
  { name: 'Direct', value: 120 },
  { name: 'Referral', value: 87 },
  { name: 'Social', value: 45 },
  { name: 'Organic', value: 95 },
  { name: 'Email', value: 62 },
];

// Risk matrix heatmap data
export const riskMatrixData = [
  { name: '1', riskLevel: 'Rare', impact: 'Insignificance', count: 0 },
  { name: '2', riskLevel: 'Rare', impact: 'Minor', count: 0 },
  { name: '3', riskLevel: 'Rare', impact: 'Moderate', count: 5 },
  { name: '4', riskLevel: 'Rare', impact: 'Major', count: 0 },
  { name: '5', riskLevel: 'Rare', impact: 'Extreme', count: 0 },
  
  { name: '6', riskLevel: 'Unlikely', impact: 'Insignificance', count: 0 },
  { name: '7', riskLevel: 'Unlikely', impact: 'Minor', count: 1 },
  { name: '8', riskLevel: 'Unlikely', impact: 'Moderate', count: 0 },
  { name: '9', riskLevel: 'Unlikely', impact: 'Major', count: 0 },
  { name: '10', riskLevel: 'Unlikely', impact: 'Extreme', count: 0 },
  
  { name: '11', riskLevel: 'Possible', impact: 'Insignificance', count: 0 },
  { name: '12', riskLevel: 'Possible', impact: 'Minor', count: 1 },
  { name: '13', riskLevel: 'Possible', impact: 'Moderate', count: 0 },
  { name: '14', riskLevel: 'Possible', impact: 'Major', count: 0 },
  { name: '15', riskLevel: 'Possible', impact: 'Extreme', count: 0 },
  
  { name: '16', riskLevel: 'Likely', impact: 'Insignificance', count: 0 },
  { name: '17', riskLevel: 'Likely', impact: 'Minor', count: 0 },
  { name: '18', riskLevel: 'Likely', impact: 'Moderate', count: 0 },
  { name: '19', riskLevel: 'Likely', impact: 'Major', count: 0 },
  { name: '20', riskLevel: 'Likely', impact: 'Extreme', count: 0 },
  
  { name: '21', riskLevel: 'Almost Certain', impact: 'Insignificance', count: 0 },
  { name: '22', riskLevel: 'Almost Certain', impact: 'Minor', count: 0 },
  { name: '23', riskLevel: 'Almost Certain', impact: 'Moderate', count: 0 },
  { name: '24', riskLevel: 'Almost Certain', impact: 'Major', count: 0 },
  { name: '25', riskLevel: 'Almost Certain', impact: 'Extreme', count: 0 },
];

// Mock ML model performance metrics
export const mlModelMetrics = {
  regression: {
    name: 'Linear Regression',
    target: 'Treatment Cost',
    rmse: 1245.32,
    r2: 0.78,
    mape: 8.4
  },
  classification: {
    name: 'Random Forest',
    target: 'Readmission Risk',
    accuracy: 0.842,
    precision: 0.795,
    recall: 0.831,
    f1Score: 0.812
  }
};

// Data overview statistics
export const dataOverview = {
  totalRows: 15287,
  totalColumns: 12,
  missingValues: 237,
  duplicates: 0,
  numericColumns: 5,
  categoricalColumns: 7
};
export const ChartData = [
  { name: 'January', value: 40 },
  { name: 'February', value: 35 },
  { name: 'March', value: 50 },
  { name: 'April', value: 45 },
  { name: 'May', value: 60 },
  { name: 'June', value: 55 },
];
export const LineChartData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 25 },
  { name: 'Apr', value: 35 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 40 },
];


export const HeatmapData = [
  { riskLevel: 'Rare', impact: 'Insignificance', count: 0 },
  { riskLevel: 'Rare', impact: 'Minor', count: 1 },
  { riskLevel: 'Rare', impact: 'Moderate', count: 2 },
  { riskLevel: 'Rare', impact: 'Major', count: 1 },
  { riskLevel: 'Rare', impact: 'Extreme', count: 0 },

  { riskLevel: 'Unlikely', impact: 'Insignificance', count: 1 },
  { riskLevel: 'Unlikely', impact: 'Minor', count: 2 },
  { riskLevel: 'Unlikely', impact: 'Moderate', count: 3 },
  { riskLevel: 'Unlikely', impact: 'Major', count: 2 },
  { riskLevel: 'Unlikely', impact: 'Extreme', count: 1 },

  { riskLevel: 'Possible', impact: 'Insignificance', count: 0 },
  { riskLevel: 'Possible', impact: 'Minor', count: 3 },
  { riskLevel: 'Possible', impact: 'Moderate', count: 4 },
  { riskLevel: 'Possible', impact: 'Major', count: 3 },
  { riskLevel: 'Possible', impact: 'Extreme', count: 2 },

  { riskLevel: 'Likely', impact: 'Insignificance', count: 0 },
  { riskLevel: 'Likely', impact: 'Minor', count: 2 },
  { riskLevel: 'Likely', impact: 'Moderate', count: 3 },
  { riskLevel: 'Likely', impact: 'Major', count: 4 },
  { riskLevel: 'Likely', impact: 'Extreme', count: 2 },

  { riskLevel: 'Almost Certain', impact: 'Insignificance', count: 0 },
  { riskLevel: 'Almost Certain', impact: 'Minor', count: 1 },
  { riskLevel: 'Almost Certain', impact: 'Moderate', count: 2 },
  { riskLevel: 'Almost Certain', impact: 'Major', count: 3 },
  { riskLevel: 'Almost Certain', impact: 'Extreme', count: 4 },
];

// Traffic channel distribution data for the heatmap
export const trafficHeatmapData = [
  [0, 0, 5],
  [0, 1, 1],
  [0, 2, 0],
  [0, 3, 0],
  [0, 4, 0],
  [1, 0, 0],
  [1, 1, 3],
  [1, 2, 2],
  [1, 3, 1],
  [1, 4, 0],
  [2, 0, 0],
  [2, 1, 2],
  [2, 2, 4],
  [2, 3, 3],
  [2, 4, 1],
  [3, 0, 0],
  [3, 1, 1],
  [3, 2, 3],
  [3, 3, 5],
  [3, 4, 2],
  [4, 0, 0],
  [4, 1, 0],
  [4, 2, 1],
  [4, 3, 2],
  [4, 4, 4],
];