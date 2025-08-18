/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useGetOrderQuery, useOrderStatusMutation } from '@/redux/api/orderApi';
import React from 'react';

// Mock hook for user role; replace with your actual auth logic
const useUser = () => ({
  role: 'ADMIN', // Replace with actual user role from your auth system (e.g., USER, ADMIN, SUPERADMIN)
});

export default function AllOrders() {
  const { data, error, isLoading } = useGetOrderQuery({});
  const [updateOrderStatus, { isLoading: isUpdating }] = useOrderStatusMutation();
  const { role } = useUser();

  const handleStatusChange = async (orderId: number, status: 'PENDING' | 'DELIVERED') => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      // The invalidatesTags: ["User"] in the mutation will automatically refetch the orders
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error fetching orders</div>;
  if (!data?.data || data.data.length === 0) return <div className="text-center py-4">No orders found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Customer Name</th>
              <th className="py-2 px-4 border-b text-left">Phone Number</th>
              <th className="py-2 px-4 border-b text-left">Address</th>
              <th className="py-2 px-4 border-b text-left">Total Amount</th>
              <th className="py-2 px-4 border-b text-left">Order Date</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
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
                <td className="py-2 px-4 border-b">৳ {order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  {role === 'ADMIN' || role === 'SUPERADMIN' ? (
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as 'PENDING' | 'DELIVERED')}
                      disabled={isUpdating}
                      className="border rounded p-1"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="DELIVERED">Delivered</option>
                    </select>
                  ) : (
                    <span>{order.status}</span>
                  )}
                </td>
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