'use client'
import React, { useEffect, useState } from 'react';
import GetRecent from './components/GetRecent';
import Checkin from './components/Checkin';
import Checkout from './components/Checkout';
import { endpoints } from '@/GlobalConstants';

const Page = () => {
  const [status, setStatus] = useState(false);
  const [apiError, setApiError] = useState("");
  const [data, setData] = useState({});
  const [mile, setMile] = useState('0');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch status and recent mileage data
  useEffect(() => {
    const getStatus = async () => {
      try {
        const url = endpoints.mileage.status;
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch status');
        }
        const info = await response.json();
        setStatus(info);
      } catch (error) {
        console.error('Error fetching status:', error);
        setApiError('Failed to load status');
      }
    };

    const getRecent = async () => {
      try {
        const url = endpoints.mileage.recents;
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Failed to fetch recent mileage data from ${url}`);
        }
        const json = await response.json();
        setData(json); // Update the state with the new data
        if (json.from) {
          setMile(json.from.toString()); // Ensure this is set correctly based on the data structure
        }
      } catch (error) {
        console.error('Error fetching recent mileage:', error);
        setApiError('Failed to load recent mileage data');
      } finally {
        setIsLoading(false); // Update loading status
      }
    };

    getStatus();
    getRecent();
  }, []); // Empty dependency array to prevent re-running these fetches

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (apiError) {
    return <div>Error: {apiError}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <GetRecent status={status} data={data} />
      {!status ? (
        <Checkin />
      ) : (
        <Checkout preMile={mile} />
      )}
    </div>
  );
}

export default Page;
