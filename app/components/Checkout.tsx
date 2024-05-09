'use client'
import React, { useState } from 'react';
import { endpoints } from '@/GlobalConstants';

interface CheckoutProps {
  preMile: string;
}

const Checkout = ({ preMile }: CheckoutProps) => {
  const [mileage, setMileage] = useState('');
  const [gas, setGas] = useState(false);
  const [cost, setCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const checkout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let payload: any = {
      to: parseInt(mileage, 10),
      gas,
      user,
      description,
    };

    if (gas && cost) {
      const parsedCost = parseFloat(cost);
      if (!isNaN(parsedCost)) {
        payload.totalCost = parsedCost;
      }
    }

    try {
      const response = await fetch(endpoints.mileage.checkout, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to checkout: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Checkout successful:', result);
      window.location.reload();
    } catch (error: any) {
      console.error('Error during checkout:', error);
      setErrorMessage(error.message || 'Failed to perform checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={checkout} className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow-md rounded-lg">
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div>
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage:</label>
        <input id="mileage" type="number" value={mileage} onChange={(e) => setMileage(e.target.value)}
          min={preMile} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>{preMile}</div>
      <div className="flex items-center">
        <input id="filledGas" type="checkbox" checked={gas} onChange={(e) => setGas(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <label htmlFor="filledGas" className="ml-2 block text-sm font-medium text-gray-700">Filled Gas</label>
      </div>
      {gas && (
        <div>
          <label htmlFor="gasAmount" className="block text-sm font-medium text-gray-700">Gas Amount ($):</label>
          <input id="gasAmount" type="number" step="0.01" value={cost} onChange={(e) => setCost(e.target.value)}
            required={gas} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
      )}
      <div>
        <label htmlFor="user" className="block text-sm font-medium text-gray-700">User:</label>
        <input id="user" type="text" value={user} onChange={(e) => setUser(e.target.value)}
          required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
        <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}
          required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <button type="submit" disabled={isLoading} className="inline-flex justify-center py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {isLoading ? 'Processing...' : 'Check Out'}
      </button>
    </form>
  );
};

export default Checkout;
