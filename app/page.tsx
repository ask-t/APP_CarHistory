'use client'
import React, { useEffect, useState } from 'react'
import GetRecent from './components/GetRecent'
import Checkin from './components/Checkin'
import Checkout from './components/Checkout'
import { endpoints } from '@/GlobalConstants'

const Page = () => {
  const [status, setStatus] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [data, setData] = useState<any>({});
  const [mile, setMile] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() =>
  {
    async function getStatus()
    {
      const url = endpoints.mileage.status;
      const response = await fetch(url, {method: 'GET'});
      if(!response.ok)
      {
        throw new Error('Network response was not ok')
      }
      const info = await response.json();
      setStatus(info);
    }

    const getRecent = async () => {
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
    getStatus();
    getRecent();
    setMile(data.from);
    console.log(status);
  },[data.from, status])
  return (
    <>
    <div className="container mx-auto p-4 space-y-6">
        <GetRecent status={status} data={data} />
      {!status && (
        <Checkin />
      )}
      {status && (
        <Checkout preMile={mile} />
      )}
    </div>
    </>
  )
}

export default Page