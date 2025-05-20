import supabase from './supabaseClient';
import { toast } from '@/components/ui/use-toast';

// Define mock data imports (used as fallbacks or examples)
import { ChartData, LineChartData, HeatmapData } from '@/data/mockData';

const getKpiData = async () => {
  try {
    const { data, error } = await supabase
      .from('kpi_data')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    toast({
      title: 'Error fetching KPI data',
      description: 'There was an error loading dashboard data',
      variant: 'destructive',
    });
    return [];
  }
};

const getTreatmentTypeData = async () => {
  try {
    const { data, error } = await supabase
      .from('treatment_type_data')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching treatment data:', error);
    return [];
  }
};

const getMonthlyTrendData = async () => {
  try {
    const { data, error } = await supabase
      .from('monthly_trend_data')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching monthly trend data:', error);
    return [];
  }
};

const getRiskMatrixData = async () => {
  try {
    const { data, error } = await supabase
      .from('risk_matrix_data')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching risk matrix data:', error);
    return [];
  }
};

const getTrafficHeatmapData = async () => {
  try {
    const { data, error } = await supabase
      .from('traffic_heatmap_data')
      .select('*');
    
    if (error) throw error;
    // Transform the data to match the expected format [x, y, value]
    return data?.map(item => [item.x, item.y, item.value]) || [];
  } catch (error) {
    console.error('Error fetching traffic heatmap data:', error);
    return [];
  }
};

const getDataOverview = async () => {
  try {
    const { data, error } = await supabase
      .from('data_overview')
      .select('*')
      .single();
    
    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error('Error fetching data overview:', error);
    return null;
  }
};

const getMlModelMetrics = async () => {
  try {
    const { data, error } = await supabase
      .from('ml_model_metrics')
      .select('*')
      .single();
    
    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error('Error fetching ML model metrics:', error);
    return null;
  }
};

const saveUploadedData = async (data) => {
  try {
    // Start a transaction to save data to multiple tables
    if (data.kpiData) {
      const { error } = await supabase
        .from('kpi_data')
        .upsert(data.kpiData, { onConflict: 'id' });
      
      if (error) throw error;
    }
    
    // Save other data types similarly
    if (data.chartData?.treatmentTypeData) {
      const { error } = await supabase
        .from('treatment_type_data')
        .upsert(data.chartData.treatmentTypeData, { onConflict: 'name' });
      
      if (error) throw error;
    }
    
    // Save more data...

    toast({
      title: 'Data saved to database',
      description: 'Your data has been successfully saved to Supabase',
    });
    
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    toast({
      title: 'Error saving data',
      description: 'There was an error saving data to the database',
      variant: 'destructive',
    });
    return false;
  }
};

export default {
  getKpiData,
  getTreatmentTypeData,
  getMonthlyTrendData,
  getRiskMatrixData,
  getTrafficHeatmapData,
  getDataOverview,
  getMlModelMetrics,
  saveUploadedData
};