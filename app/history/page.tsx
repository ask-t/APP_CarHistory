'use client'
import React, { useEffect, useState } from 'react';
import { endpoints } from '@/GlobalConstants';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

const Page = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const url = endpoints.gasInfo.all;
      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`Network response was not ok in ${url}`);
      }

      const info = await response.json();

      // Sort by the date field in descending order to get the latest first
      const sortedHistory = info.sort((a: any, b: any) => {
        const dateA: any = new Date(a.startDate); // Parse the date
        const dateB: any = new Date(b.startDate);
        return dateB - dateA; // Descending order (latest first)
      });

      setHistory(sortedHistory); // Set sorted data in state
    };

    getHistory();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-800">History</h1>
      <ul className="space-y-4">
        {history.map((item: any) => (
          <li key={item.gasID} className="bg-white p-4 rounded-md shadow-sm hover:bg-gray-50">
            <Link href={`/history/${item.gasID}`} className="text-indigo-600 hover:underline">
              <strong>{item.gasID}</strong>
            </Link>
            <p>Total Mile: {item.totalMile}</p>
            <p>Total Cost: {item.totalCost}</p>
            <p>Start Date: {format(parseISO(item.startDate), 'MM/dd HH:mm')}</p>
            {item.endDate && (
              <p>End Date: {format(parseISO(item.endDate), 'MM/dd HH:mm')}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
