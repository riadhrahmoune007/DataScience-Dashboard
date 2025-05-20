import React, { useState, useRef } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from '@/components/ui/use-toast';
import { Upload, FileUp, File } from 'lucide-react';
import { processUploadedFile } from '@/services/dataProcessingService';
import { useData } from '@/context/DataContext';
// UploadData.jsx


const UploadData1 = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:5000/api/datasets/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('Uploaded:', data);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};


const UploadData = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const { updateDataFromUpload } = useData();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Validate file format
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (!['csv', 'json', 'xlsx', 'xls'].includes(fileType || '')) {
        toast({
          title: "Unsupported File Format",
          description: "Please upload CSV, Excel, or JSON files only.",
          variant: "destructive",
        });
        setSelectedFile(null);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      setSelectedFile(file);

      // Validate file format
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (!['csv', 'json', 'xlsx', 'xls'].includes(fileType || '')) {
        toast({
          title: "Unsupported File Format",
          description: "Please upload CSV, Excel, or JSON files only.",
          variant: "destructive",
        });
        setSelectedFile(null);
      }
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Process the file
      const processedData = await processUploadedFile(selectedFile);

      // Complete the upload
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Update application data
      updateDataFromUpload(processedData);

      // Reset state
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setSelectedFile(null);

        toast({
          title: "Upload Complete",
          description: "Your data has been processed and the dashboard updated.",
        });
      }, 1000);

    } catch (error) {
      console.error("Upload error:", error);
      setIsUploading(false);
      setUploadProgress(0);

      toast({
        title: "Upload Failed",
        description: typeof error === 'string' ? error : "Failed to process the file. Please check the format and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader
            title="Upload Data"
            className="mb-6"
          />

          <Card className="bg-white p-6 rounded-lg shadow">
            <div
              className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg ${
                selectedFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv,.json,.xlsx,.xls"
                className="hidden"
              />

              {selectedFile ? (
                <div className="w-full">
                  <div className="mb-4 flex items-center justify-center">
                    <FileUp
                      className="mx-auto h-12 w-12 text-blue-500"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-center text-sm font-medium">
                    Selected File: {selectedFile.name}
                  </p>
                  <p className="mt-1 text-center text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {isUploading && (
                    <div className="mt-4">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="mt-1 text-center text-xs text-gray-500">
                        Processing... {uploadProgress}%
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFile(null)}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? "Processing..." : "Process Data"}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <Upload
                      className="mx-auto h-12 w-12 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    <span
                      className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                      onClick={openFileSelector}
                    >
                      Click to upload
                    </span> or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    CSV, Excel, or JSON up to 10MB
                  </p>
                </>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Upload Requirements</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>File must be in CSV, Excel, or JSON format</li>
                <li>Maximum file size is 10MB</li>
                <li>First row must contain column headers</li>
                <li>Date columns should be in YYYY-MM-DD format</li>
                <li>Numeric data should not contain special characters</li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-medium text-blue-800 mb-2">Sample JSON Format</h4>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap bg-white p-3 rounded border border-gray-200">
{`
{
  "kpiData": [
    {"title": "Total Patients", "value": "1,245", "change": 12.5, "isPositive": true},
    {"title": "New Cases", "value": "45", "change": -3.2, "isPositive": false}
  ],
  "treatmentTypeData": [
    {"name": "Medication", "value": 45},
    {"name": "Surgery", "value": 22}
  ],
  "monthlyTrendData": [
    {"name": "Jan", "value": 25},
    {"name": "Feb", "value": 30}
  ]
}`}
                </pre>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadData;
export { UploadData1 };