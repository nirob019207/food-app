/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react';
import { useGetOrderQuery, useGetOrderDetailsQuery, useUpdateOrderStatusMutation } from '@/redux/api/orderApi';
import { toast } from 'sonner';
import { Edit2, Eye } from 'lucide-react';

export default function AllOrder() {
  const [activeTab, setActiveTab] = useState('PENDING');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: ordersResponse, isLoading,refetch } = useGetOrderQuery({ page, limit, status: activeTab });
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    id: null as number | null,
    fullName: '',
    phoneNumber: '',
    status: 'PENDING' as 'PENDING' | 'DELIVERED' | 'DECLINED',
  });
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const { data: orderDetails, isLoading: isDetailsLoading } = useGetOrderDetailsQuery(selectedOrderId, { skip: !selectedOrderId });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const orders = ordersResponse?.data || [];
  const totalPages = ordersResponse?.meta?.totalPages || 1;

  const handleOpenStatusModal = (order: any) => {
    setCurrentOrder({
      id: order.id,
      fullName: order.fullName,
      phoneNumber: order.phoneNumber,
      status: order.status,
    });
    setIsStatusModalOpen(true);
    setError('');
  };

  const handleOpenDetailsModal = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsDetailsModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setCurrentOrder({
      id: null,
      fullName: '',
      phoneNumber: '',
      status: 'PENDING',
    });
    setError('');
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentOrder.id || !currentOrder.status) {
      setError('Order ID and status are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateOrderStatus({
        orderId: currentOrder.id,
        status: currentOrder.status,
      }).unwrap();
      toast.success('Order status updated successfully');
      refetch(); // Manually refetch the order list
      handleCloseStatusModal();
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status');
      toast.error('Failed to update order status');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Tabs */}
      <div className="flex mb-4">
        {['PENDING',  'DELEVERD', 'DECLINED'].map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`px-4 py-2 mr-2 rounded ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-400 hover:text-white`}
          >
      {tab === 'PENDING' ? 'Pending' : tab === 'DELIVERED' ? 'Confirmed' : 'Declined'}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Customer</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Address</th>
              <th className="py-2 px-4 border-b text-left">Total Amount</th>
              <th className="py-2 px-4 border-b text-left">Delivery Fee</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.fullName}</td>
                <td className="py-2 px-4 border-b">{order.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{order.address}</td>
                <td className="py-2 px-4 border-b">৳ {order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">৳ {order.delivery_fee.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => handleOpenDetailsModal(order.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                 <Eye/>
                  </button>
                  <button
                    onClick={() => handleOpenStatusModal(order)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                 <Edit2/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-sm text-gray-700">
            Showing page {page} of {totalPages}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">Items per page:</label>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex z-50 items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Order Status</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <p className="w-full p-2 border rounded bg-gray-100">
                  {currentOrder.fullName} ({currentOrder.phoneNumber})
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={currentOrder.status}
                  onChange={(e) => setCurrentOrder({ ...currentOrder, status: e.target.value as 'PENDING' |  'DELIVERED' | 'DECLINED' })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PENDING">Pending</option>
                  <option value="DELIVERED">Confirmed</option>
                  <option value="DECLINED">Declined</option>
                </select>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseStatusModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isDetailsModalOpen && (
      <div className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300 ${isDetailsModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
  <div className="bg-white rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 m-4 transform transition-all duration-300 scale-100">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h3>
    {isDetailsLoading ? (
      <div className="flex items-center justify-center py-8">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"></path>
        </svg>
        <span className="ml-3 text-gray-600">Loading details...</span>
      </div>
    ) : orderDetails.data ? (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-gray-600"><strong className="text-gray-800">Order ID:</strong> {orderDetails?.data?.id}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Customer:</strong> {orderDetails?.data?.fullName}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Phone:</strong> {orderDetails?.data?.phoneNumber}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Adress:</strong> {orderDetails?.data?.address}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Total Amount:</strong> ৳ {orderDetails?.data?.totalAmount?.toFixed(2)}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Delivery Fee:</strong> ৳ {orderDetails?.data?.delivery_fee?.toFixed(2)}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Status:</strong>
            <span className={`ml-2 px-2 py-1 rounded-full text-sm ${orderDetails?.data?.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {orderDetails?.data?.status}
            </span>
          </p>
<p className="text-gray-600">
  <strong className="text-gray-800">Order Date:</strong>{" "}
  {new Date(orderDetails?.data?.createdAt)?.toLocaleDateString()}{" "}
  {new Date(orderDetails?.data?.createdAt)?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Order Items</h4>
          <div className="space-y-4">
            {orderDetails?.data?.orderItems?.map((item: any) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-600"><strong className="text-gray-800">Product:</strong> {item.product.name}</p>
                  <p className="text-gray-600"><strong className="text-gray-800">Quantity:</strong> {item.quantity}</p>
                  <p className="text-gray-600"><strong className="text-gray-800">Price:</strong> ৳ {item.price.toFixed(2)}</p>
                  <p className="text-gray-600"><strong className="text-gray-800">Stock:</strong> {item.product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleCloseDetailsModal}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    ) : (
      <p className="text-red-500 text-center py-8">Failed to load order details</p>
    )}
  </div>
</div>
      )}
    </div>
  );
}