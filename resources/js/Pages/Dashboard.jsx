import React, { useEffect, useCallback, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import axios from 'axios';

export default function Dashboard(props) {
  const [requestsToday, setRequestsToday] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(route('request.requestsToday'));
      setRequestsToday(data?.requestsToday);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      fetchData();
    }, 10000);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="xl:w-1/3 lg:w-1/3 md:w-2/4 w-2/4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 text-base font-bold text-center">
              Quantidade de pedidos diaria
            </div>
            <div className="p-6 bg-white border-b border-gray-200 text-sm font-bold text-center">
              {requestsToday}
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
