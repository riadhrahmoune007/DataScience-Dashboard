// Process CSV data
export const processCSV = (content) => {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const result = {
    kpiData: [],
    chartData: {
      treatmentTypeData: [],
      monthlyTrendData: [],
      riskMatrixData: [],
      trafficHeatmapData: []
    },
    dataOverview: {
      totalRows: lines.length - 1,
      totalColumns: headers.length,
      missingValues: 0,
      duplicates: 0,
      numericColumns: 0,
      categoricalColumns: 0
    },
    mlModelMetrics: null
  };
  
  // Count column types
  let numericCount = 0;
  let categoricalCount = 0;
  
  // Process data rows
  const dataRows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      row[header] = value;
      
      // Check if value is numeric or categorical
      if (!isNaN(parseFloat(value)) && isFinite(Number(value))) {
        numericCount++;
      } else {
        categoricalCount++;
      }
      
      // Count missing values
      if (value === '' || value === undefined || value === null) {
        result.dataOverview.missingValues++;
      }
    });
    
    return row;
  });
  
  // Process treatment type data if column exists
  if (headers.includes('treatment_type') && headers.includes('count')) {
    const treatmentData = dataRows.filter(row => row.treatment_type && row.count);
    result.chartData.treatmentTypeData = treatmentData.map(row => ({
      name: row.treatment_type,
      value: parseInt(row.count)
    }));
  }
  
  // Process monthly trend data if month and value columns exist
  if (headers.includes('month') && headers.includes('value')) {
    const monthlyData = dataRows.filter(row => row.month && row.value);
    result.chartData.monthlyTrendData = monthlyData.map(row => ({
      name: row.month,
      value: parseFloat(row.value)
    }));
  }
  
  // Process risk matrix data if columns exist
  if (headers.includes('risk_level') && headers.includes('impact') && headers.includes('count')) {
    const riskData = dataRows.filter(row => row.risk_level && row.impact && row.count);
    result.chartData.riskMatrixData = riskData.map(row => ({
      riskLevel: row.risk_level,
      impact: row.impact,
      count: parseInt(row.count)
    }));
  }
  
  // Process traffic heatmap data if day, hour, and value columns exist
  if (headers.includes('day') && headers.includes('hour') && headers.includes('value')) {
    const trafficData = dataRows.filter(row => row.day !== undefined && row.hour !== undefined && row.value !== undefined);
    result.chartData.trafficHeatmapData = trafficData.map(row => {
      return [parseInt(row.day), parseInt(row.hour), parseInt(row.value)];
    });
  }
  
  // Update data overview metrics
  result.dataOverview.numericColumns = Math.round(numericCount / (result.dataOverview.totalRows || 1));
  result.dataOverview.categoricalColumns = Math.round(categoricalCount / (result.dataOverview.totalRows || 1));
  
  // Check for duplicates
  const uniqueRows = new Set(lines.slice(1).map(line => line.trim()));
  result.dataOverview.duplicates = lines.length - 1 - uniqueRows.size;
  
  // Process KPI data if relevant columns exist
  if (headers.includes('kpi_title') && headers.includes('kpi_value') && headers.includes('kpi_change')) {
    const kpiRows = dataRows.filter(row => row.kpi_title && row.kpi_value !== undefined);
    result.kpiData = kpiRows.map(row => ({
      title: row.kpi_title,
      value: row.kpi_value,
      change: parseFloat(row.kpi_change || '0'),
      isPositive: parseFloat(row.kpi_change || '0') >= 0
    }));
  }
  
  return result;
};

// Process JSON data
export const processJSON = (content) => {
  try {
    const result = {
      kpiData: content.kpiData || [],
      chartData: {
        treatmentTypeData: content.treatmentTypeData || content.chartData?.treatmentTypeData || [],
        monthlyTrendData: content.monthlyTrendData || content.chartData?.monthlyTrendData || [],
        riskMatrixData: content.riskMatrixData || content.chartData?.riskMatrixData || [],
        trafficHeatmapData: content.trafficHeatmapData || content.chartData?.trafficHeatmapData || []
      },
      dataOverview: content.dataOverview || {
        totalRows: 0,
        totalColumns: 0,
        missingValues: 0,
        duplicates: 0,
        numericColumns: 0,
        categoricalColumns: 0
      },
      mlModelMetrics: content.mlModelMetrics || null
    };
    
    return result;
  } catch (error) {
    console.error('Error processing JSON:', error);
    throw new Error('Invalid JSON format');
  }
};

// Process Excel data (requires external library, using a stub for now)
export const processExcel = (content) => {
  throw new Error('Excel processing not implemented - Please use CSV or JSON format');
};

// Main function to process uploaded files
export const processUploadedFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const fileType = file.name.split('.').pop()?.toLowerCase();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          return reject('File read error');
        }
        
        let result;
        
        switch (fileType) {
          case 'csv':
            result = processCSV(event.target.result);
            break;
          case 'json':
            { const jsonData = JSON.parse(event.target.result);
            result = processJSON(jsonData);
            break; }
          case 'xlsx':
          case 'xls':
            result = processExcel(event.target.result);
            break;
          default:
            return reject(`Unsupported file type: ${fileType}`);
        }
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject('File read error');
    };
    
    if (fileType === 'json' || fileType === 'csv' || fileType === 'txt') {
      reader.readAsText(file);
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      reader.readAsArrayBuffer(file);
    } else {
      reject(`Unsupported file type: ${fileType}`);
    }
  });
};