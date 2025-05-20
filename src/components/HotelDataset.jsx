import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const HotelDataset = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('http://localhost:5000/uploads/hotel_booking.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Hotel Booking Dataset Preview</h2>
      <div className="overflow-auto max-h-[400px] border">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              {data[0] && Object.keys(data[0]).slice(0, 6).map((key) => (
                <th key={key} className="px-4 py-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row, i) => (
              <tr key={i} className="border-b">
                {Object.values(row).slice(0, 6).map((value, idx) => (
                  <td key={idx} className="px-4 py-2">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelDataset;
