import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import databaseService from '@/services/databaseService';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

// Create the context with default values
const DataContext = createContext(undefined);

// Import default data
import { 
  kpiData, 
  treatmentTypeData, 
  monthlyTrendData,
  riskMatrixData,
  trafficHeatmapData,
  dataOverview as defaultDataOverview,
  mlModelMetrics as defaultMlModelMetrics
} from '@/data/mockData';

export const DataProvider = ({ children }) => {
  const [chartData, setChartData] = useState({
    kpiData,
    treatmentTypeData,
    monthlyTrendData,
    riskMatrixData,
    trafficHeatmapData
  });
  const [dataOverview, setDataOverview] = useState(defaultDataOverview);
  const [mlModelMetrics, setMlModelMetrics] = useState(defaultMlModelMetrics);
  const [isUsingDefaultData, setIsUsingDefaultData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [supbaseConnected, setSupabaseConnected] = useState(false);

  // Check Supabase connection
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from('kpi_data').select('count').limit(1);
        if (!error) {
          setSupabaseConnected(true);
          console.log('Supabase connection successful');
        } else {
          console.error('Supabase connection error:', error);
          toast({
            title: "Database Connection Error",
            description: "Using fallback data. Check Supabase configuration.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error('Failed to check Supabase connection:', err);
      }
    };
    
    checkSupabaseConnection();
  }, []);

  // Fetch data from database
  const fetchDataFromDatabase = async () => {
    try {
      setIsLoading(true);
      
      if (supbaseConnected) {
        const kpiDataFromDb = await databaseService.getKpiData();
        if (kpiDataFromDb && kpiDataFromDb.length > 0) {
          setChartData(prevData => ({ ...prevData, kpiData: kpiDataFromDb }));
        }
        
        const treatmentTypeDataFromDb = await databaseService.getTreatmentTypeData();
        if (treatmentTypeDataFromDb && treatmentTypeDataFromDb.length > 0) {
          setChartData(prevData => ({ 
            ...prevData, 
            treatmentTypeData: treatmentTypeDataFromDb
          }));
        }
        
        const monthlyTrendDataFromDb = await databaseService.getMonthlyTrendData();
        if (monthlyTrendDataFromDb && monthlyTrendDataFromDb.length > 0) {
          setChartData(prevData => ({ 
            ...prevData, 
            monthlyTrendData: monthlyTrendDataFromDb
          }));
        }
        
        const riskMatrixDataFromDb = await databaseService.getRiskMatrixData();
        if (riskMatrixDataFromDb && riskMatrixDataFromDb.length > 0) {
          setChartData(prevData => ({ 
            ...prevData, 
            riskMatrixData: riskMatrixDataFromDb
          }));
        }
        
        const trafficHeatmapDataFromDb = await databaseService.getTrafficHeatmapData();
        if (trafficHeatmapDataFromDb && trafficHeatmapDataFromDb.length > 0) {
          setChartData(prevData => ({ 
            ...prevData, 
            trafficHeatmapData: trafficHeatmapDataFromDb
          }));
        }
        
        const dataOverviewFromDb = await databaseService.getDataOverview();
        if (dataOverviewFromDb) {
          setDataOverview(dataOverviewFromDb);
        }
        
        const mlModelMetricsFromDb = await databaseService.getMlModelMetrics();
        if (mlModelMetricsFromDb) {
          setMlModelMetrics(mlModelMetricsFromDb);
        }
        
        if (
          kpiDataFromDb?.length > 0 ||
          treatmentTypeDataFromDb?.length > 0 ||
          monthlyTrendDataFromDb?.length > 0 ||
          riskMatrixDataFromDb?.length > 0 ||
          trafficHeatmapDataFromDb?.length > 0 ||
          dataOverviewFromDb ||
          mlModelMetricsFromDb
        ) {
          setIsUsingDefaultData(false);
          toast({
            title: "Data loaded from database",
            description: "Your dashboard has been updated with data from Supabase",
          });
        }
      } else {
        console.log('Using default data (Supabase not connected)');
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data from database:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDataFromDatabase();
  }, [supbaseConnected]);

  const updateDataFromUpload = async (fileData) => {
    try {
      console.log("Processing uploaded data:", fileData);
      
      if (fileData.kpiData && Array.isArray(fileData.kpiData)) {
        setChartData(prevData => ({ ...prevData, kpiData: fileData.kpiData }));
      }
      
      if (fileData.chartData) {
        const newChartData = { ...chartData };
        
        if (fileData.chartData.treatmentTypeData) {
          newChartData.treatmentTypeData = fileData.chartData.treatmentTypeData;
        }
        if (fileData.chartData.monthlyTrendData) {
          newChartData.monthlyTrendData = fileData.chartData.monthlyTrendData;
        }
        if (fileData.chartData.riskMatrixData) {
          newChartData.riskMatrixData = fileData.chartData.riskMatrixData;
        }
        if (fileData.chartData.trafficHeatmapData) {
          newChartData.trafficHeatmapData = fileData.chartData.trafficHeatmapData;
        }
        
        setChartData(newChartData);
      }
      
      if (fileData.dataOverview) {
        setDataOverview(fileData.dataOverview);
      }
      
      if (fileData.mlModelMetrics) {
        setMlModelMetrics(fileData.mlModelMetrics);
      }
      
      setIsUsingDefaultData(false);
      
      await databaseService.saveUploadedData(fileData);
      
      toast({
        title: "Data updated successfully",
        description: "Dashboard has been updated with your uploaded data and saved to database",
      });
    } catch (error) {
      console.error("Error processing data:", error);
      toast({
        title: "Error processing data",
        description: "There was an error processing your data. Please check the format and try again.",
        variant: "destructive",
      });
    }
  };

  const value = {
    chartData,
    dataOverview,
    mlModelMetrics,
    updateDataFromUpload,
    isUsingDefaultData,
    isLoading,
    error,
    supbaseConnected
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};