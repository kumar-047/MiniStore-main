import React from 'react'
import {   useFetchCustomersQuery } from '../Slice/AdminApiSlice'

const CustomerTable = () => {
    const { data: customers, error, isLoading } =   useFetchCustomersQuery();
    if (isLoading) return <p>Loading customers...</p>;
     if (error) return <p>Error loading customers</p>;
  return (
    <div>
        <h1 className='text-black font-bold text-2xl mb-5 underline'>Customer Table</h1>
        

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Address
                </th>
                <th scope="col" class="px-6 py-3">
                    Mobile Number
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
            </tr>
        </thead>
        <tbody>
        {customers?.map((customer) => (
              <tr key={customer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {customer.name} {/* Replace with actual customer property */}
                </th>
                <td className="px-6 py-4">
                  {customer.address} {/* Replace with actual customer property */}
                </td>
                <td className="px-6 py-4">
                  {customer.phone} {/* Replace with actual customer property */}
                </td>
                <td className="px-6 py-4">
                  {customer.email} {/* Replace with actual customer property */}
                </td>
              </tr>
            ))}
           
            
        </tbody>
    </table>
</div>

      
    </div>
  )
}

export default CustomerTable
