/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMyOrderQuery } from '@/redux/api/orderApi';
import React from 'react';

export default function MyOrders() {
  const { data, error, isLoading } = useMyOrderQuery({});

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error fetching orders</div>;
  if (!data?.data || data.data.length === 0) return <div className="text-center py-4">No orders found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Customer Name</th>
              <th className="py-2 px-4 border-b text-left">Phone Number</th>
              <th className="py-2 px-4 border-b text-left">Address</th>
                                          <th className="py-2 px-4 border-b text-left">Status</th>

              <th className="py-2 px-4 border-b text-left">Total Amount</th>
              <th className="py-2 px-4 border-b text-left">Order Date</th>
              <th className="py-2 px-4 border-b text-left">Order Items</th>

            </tr>
          </thead>
          <tbody>
            {data.data.map((order: any) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.fullName}</td>
                <td className="py-2 px-4 border-b">{order.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{order.address}</td>
                                <td className="py-2 px-4 border-b">{order.status}</td>

                <td className="py-2 px-4 border-b">৳ {order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-5">
                    {order.orderItems.map((item: any) => (
                      <li key={item.id}>
                        {item.product.name} (Qty: {item.quantity}, Price: ৳ {item.price.toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}