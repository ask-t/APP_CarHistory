'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  const base = "http://localhost:3100/"; // Include protocol
  const [status, setStatus] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const endpoint = "mileage/recents";
        const response = await fetch(`${base}${endpoint}`, { method: 'GET' });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const info = await response.json();
        setData(info); // Set data in state

      } catch (error) {
        console.error("Error in getData:", error);
        setApiError(error.message); // Set error message
      } finally {
        setIsLoading(false); // Set loading to false after try/catch
      }
    }

    async function getStatus() {
      try {
        const endpoint = "mileage/status";
        const response = await fetch(`${base}${endpoint}`, { method: 'GET' });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const info = await response.json();
        setStatus(info); // Set status in state
      } catch (error) {
        console.error("Error in getStatus:", error);
      }
    }

    getData();
    getStatus();
  }, []); // No need to include `data` or `status` in the dependency array to avoid infinite loops

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (apiError) {
    return <div>Error: {apiError}</div>;
  }

  return (
    <div>
      {data && (
        <>
          <h2>Fetched Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display data in a readable format */}
          <p>This is from: {data.from}</p>
        </>
      )}
      <div>
        <h2>Status:</h2>
        {status && <p>Status is true</p>}
      </div>
    </div>
  );
};

export default Page;
