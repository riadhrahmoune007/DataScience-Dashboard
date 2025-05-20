import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';

const Help = () => {
  const faqs = [
    {
      question: "How do I upload a dataset?",
      answer: "Go to the Upload Data section, then drag and drop your CSV or Excel file into the upload area, or click to browse your files. The system will validate and process your data automatically."
    },
    {
      question: "Can I export visualizations?",
      answer: "Yes, all visualizations can be exported as PNG, SVG, or PDF. Click on the three-dot menu in the top-right corner of any chart and select 'Export'."
    },
    {
      question: "How do I interpret the ML model metrics?",
      answer: "The ML Models section provides performance metrics like accuracy, precision, recall, and F1-score for classification models, or RMSE, MAE, and R² for regression models. Higher values indicate better performance for accuracy metrics, while lower values are better for error metrics."
    },
    {
      question: "How often is the data refreshed?",
      answer: "By default, data is refreshed every 15 minutes. You can change this interval in the Settings page under 'Data Processing Settings'."
    },
    {
      question: "Can I create custom dashboards?",
      answer: "Yes, you can customize your dashboard by clicking the 'Customize' button on the Dashboard page. You can add, remove, and rearrange widgets to suit your needs."
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Help & Support" 
            className="mb-6"
          />
          
          <div className="space-y-6">
            {/* Getting Started */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-medium mb-4">Getting Started</h2>
              <div className="prose max-w-none">
                <p>
                  Welcome to the DataViz Hub dashboard! This platform helps you analyze healthcare 
                  data through interactive visualizations and machine learning models.
                </p>
                <p className="mt-3">
                  To get started, upload your dataset in the Upload Data section or explore our pre-loaded 
                  sample healthcare datasets. Navigate through different sections using the sidebar menu.
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    View Tutorial
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Documentation
                  </button>
                </div>
              </div>
            </div>
            
            {/* FAQs */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-medium mb-4">Frequently Asked Questions</h2>
              <div className="divide-y divide-gray-200">
                {faqs.map((faq, index) => (
                  <div key={index} className="py-4">
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span>{faq.question}</span>
                        <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>
                      <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {faq.answer}
                      </p>
                    </details>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Support */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-medium mb-4">Contact Support</h2>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Contact our support team.
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Brief description of your issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea 
                    rows="4" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Describe your issue in detail"
                  />
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
