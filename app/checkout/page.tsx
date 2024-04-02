'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CheckoutForm = () => {
  const [to, setMileage] = useState('');
  const [gas, setFilledGas] = useState(false);
  const [cost, setGasAmount] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const base = "https://api-car-history-nu.vercel.app/";
  const router = useRouter();

  useEffect(() => {
    async function status() {
      setIsLoading(true);
      try {
        const endpoint = "mileage/status";
        const response = await fetch(`${base}${endpoint}`, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const info = await response.json();
        console.log(info);
        setIsCheckedIn(info);
        if (!isCheckedIn) {
          router.push('/checkin')
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Optionally, handle the error in UI as well
      } finally {
        setIsLoading(false);
      }
    }
    status();
  }, [isCheckedIn, router, data])

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Construct the payload based on the state
    let payload = {}
    if(gas)
    {
      payload = {
        to: parseInt(to, 10),
        gas,
        cost: parseFloat(cost)
      };
    }
    else
    {
      payload = {
        to: parseInt(to, 10),
        gas,
      };
    }

    try {
      console.log(JSON.stringify(payload));
      const endpoint = "mileage/checkout";
      console.log(`URL is ${base}${endpoint}`);
      const response = await fetch(`${base}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to checkout');
      }

      const jsonData = await response.json();
      setData(jsonData);
      console.log('Checkout successful:', data);
      // Handle success (e.g., show a message or redirect)
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow-md rounded-lg">
      <div>
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage:</label>
        <input
          id="mileage"
          type="text"
          value={to}
          onChange={(e) => setMileage(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex items-center">
        <input
          id="filledGas"
          type="checkbox"
          checked={gas}
          onChange={(e) => setFilledGas(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="filledGas" className="ml-2 block text-sm font-medium text-gray-700">Filled Gas</label>
      </div>
      {gas && (
        <div>
          <label htmlFor="gasAmount" className="block text-sm font-medium text-gray-700">Gas Amount ($):</label>
          <input
            id="gasAmount"
            type="text"
            value={cost}
            onChange={(e) => setGasAmount(e.target.value)}
            required={gas}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      )}
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Check Out
      </button>
    </form>
  );

};

export default CheckoutForm;
