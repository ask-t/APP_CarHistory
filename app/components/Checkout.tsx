'use client'
import React, { useEffect, useState } from 'react';
import { endpoints } from '@/GlobalConstants';

const Checkout = (props: any) => {
  const [mileage, setMileage] = useState('');
  const [gas, setGas] = useState(false);
  const [cost, setCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');

  const checkout = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state

    let payload: any = {
      to: parseInt(mileage, 10),
      gas: gas,
      user: user,
      description: description,
    };

    if (gas && cost) {
      const parsedCost = parseFloat(cost);
      if (!isNaN(parsedCost)) {
        payload.totalCost = parsedCost;
      }
    }
    console.log("payload", payload);

    try {
      const response = await fetch(endpoints.mileage.checkout, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to checkout');
      }

      const result = await response.json(); // Handle response if needed
      console.log('Checkout successful:', result);
    } catch (error: any) {
      console.error('Error during checkout:', error);
    } finally {
      setIsLoading(false); // Reset loading state
      window.location.href = "/";
      // Redirect or perform other actions after checkout
    }
  };

  return (
    <form onSubmit={checkout} className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow-md rounded-lg">
      {/* Mileage Input */}
      <div>
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
          Mileage:
        </label>
        <input
          id="mileage"
          type="number"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          min = {`${props.preMile}`}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>{props.preMile}</div>

      {/* Gas Checkbox */}
      <div className="flex items-center">
        <input
          id="filledGas"
          type="checkbox"
          checked={gas}
          onChange={(e) => setGas(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="filledGas" className="ml-2 block text-sm font-medium text-gray-700">
          Filled Gas
        </label>
      </div>

      {/* Gas Amount Input (if gas is true) */}
      {gas && (
        <div>
          <label htmlFor="gasAmount" className="block text-sm font-medium text-gray-700">
            Gas Amount ($):
          </label>
          <input
            id="gasAmount"
            type="number"
            step="0.01"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      )}

      {/* User Input */}
      <div>
        <label htmlFor="user" className="block text-sm font-medium text-gray-700">
          User:
        </label>
        <input
          id="user"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description:
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="inline-flex justify-center py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
        Check Out
      </button>
    </form>
  );
};

export default Checkout;
