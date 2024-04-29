import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

const GetRecent = (props: any) => {
  const [statusMessage, setStatusMessage] = useState("Loading...");
  const [mileage, setMileage] = useState(null);
  useEffect(() => {
    if (props.data) {
      if (props.status) {
        setStatusMessage("Someone is using the car now.");
        setMileage(props.data.from); // Fetch the "from" value
      } else {
        setStatusMessage("The car is available now.");
        setMileage(props.data.to); // Fetch the "to" value
      }
    }
  }, [props.data, props.data.from, props.data.to, props.status]); // Use `data` and `status` in dependency array for correct re-rendering


  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h2 className="text-lg font-bold text-gray-800">Mileage Info</h2>
      <div className="mt-2 text-gray-700">Total Mileage: {mileage}</div>
      <div className="text-gray-700">{statusMessage}</div>
      {props.status && (
        <div className="mt-2 text-gray-700">
          Start Date and Time: {format(parseISO(props.data.startDate), 'MM/dd HH:mm')}
        </div>
      )}
    </div>
  );
};

export default GetRecent;
