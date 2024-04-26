import React, { useEffect, useState } from 'react';
import { endpoints } from '@/GlobalConstants';
import { format, parseISO } from 'date-fns';

const GetRecent = () => {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Loading...");
  const [mileage, setMileage] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = endpoints.mileage.recents;
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error(`Network response was not ok in ${url}`);
        }

        const json = await response.json();
        setData(json); // Update the state with the new data
      } catch (error: any) {
        setApiError(error.message); // Handle errors
      } finally {
        setIsLoading(false); // Update loading status
      }
    };

    const getStatus = async () => {
      try {
        const url = endpoints.mileage.status;
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error(`Network response was not ok in ${url}`);
        }

        const json = await response.json();
        setStatus(json); // Set the status in state
      } catch (error: any) {
        setApiError(error.message);
      }
    };

    getStatus();
    getData();
  }, []); // Empty dependency array to avoid unnecessary re-renders

  // After fetching data, set additional state values based on `status`
  useEffect(() => {
    if (data) {
      if (status) {
        setStatusMessage("Someone is using the car now.");
        setMileage(data.from); // Fetch the "from" value
      } else {
        setStatusMessage("The car is available now.");
        setMileage(data.to); // Fetch the "to" value
      }
    }
  }, [data, status]); // Use `data` and `status` in dependency array for correct re-rendering

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (apiError) {
    return <div>Error: {apiError}</div>;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h2 className="text-lg font-bold text-gray-800">Mileage Info</h2>
      <div className="mt-2 text-gray-700">Total Mileage: {mileage}</div>
      <div className="text-gray-700">{statusMessage}</div>
      {status && (
        <div className="mt-2 text-gray-700">
          Start Date and Time: {format(parseISO(data.startDate), 'MM/dd HH:mm')}
        </div>
      )}
    </div>
  );
};

export default GetRecent;
