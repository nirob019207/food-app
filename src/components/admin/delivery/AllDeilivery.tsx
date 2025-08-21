/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCreateDeliveryMutation, useDeleteDeliveryMutation, useGetDeliveryQuery, useUpdateDeliveryMutation } from '@/redux/api/deliveryApi';
import React, { useState } from 'react';
;

export default function AllDelivery() {
  const { data: charges, isLoading } = useGetDeliveryQuery({});
  const [createCharge] = useCreateDeliveryMutation();
  const [updateCharge] = useUpdateDeliveryMutation();
  const [deleteCharge] = useDeleteDeliveryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCharge, setCurrentCharge] = useState({ id: null, minAmount: '', maxAmount: '', charge: '' });
  const [error, setError] = useState('');

  const handleOpenModal = (charge = { id: null, minAmount: '', maxAmount: '', charge: '' }) => {
    setCurrentCharge(charge);
    setIsEditMode(!!charge.id);
    setIsModalOpen(true);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCharge({ id: null, minAmount: '', maxAmount: '', charge: '' });
    setError('');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!currentCharge.minAmount || !currentCharge.maxAmount || !currentCharge.charge) {
      setError('All fields are required');
      return;
    }

    try {
      const payload = {
        minAmount: Number(currentCharge.minAmount),
        maxAmount: Number(currentCharge.maxAmount),
        charge: Number(currentCharge.charge)
      };
      
      if (isEditMode) {
        await updateCharge({ id: currentCharge.id, data: payload }).unwrap();
      } else {
        await createCharge(payload).unwrap();
      }
      handleCloseModal();
    } catch (err) {
      setError('Failed to save delivery charge');
    }
  };

  const handleDelete = async (id: any) => {
    if (window.confirm('Are you sure you want to delete this delivery charge?')) {
      try {
        await deleteCharge(id).unwrap();
      } catch (err) {
        setError('Failed to delete delivery charge');
      }
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Delivery Charges</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Delivery Charge
        </button>
      </div>

      {/* Delivery Charge List */}
      <div className="grid gap-4">
        {charges?.data?.map((charge: any) => (
          <div 
            key={charge.id} 
            className="flex justify-between items-center p-4 bg-gray-100 rounded"
          >
            <span>
              Min: {charge.minAmount} | Max: {charge.maxAmount} | Charge: {charge.charge}
            </span>
            <div className="space-x-2">
              <button 
                onClick={() => handleOpenModal(charge)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(charge.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {isEditMode ? 'Edit Delivery Charge' : 'Add Delivery Charge'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                <input
                  type="number"
                  value={currentCharge.minAmount}
                  onChange={(e) => setCurrentCharge({ ...currentCharge, minAmount: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter min amount"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                <input
                  type="number"
                  value={currentCharge.maxAmount}
                  onChange={(e) => setCurrentCharge({ ...currentCharge, maxAmount: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter max amount"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Charge</label>
                <input
                  type="number"
                  value={currentCharge.charge}
                  onChange={(e) => setCurrentCharge({ ...currentCharge, charge: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter charge"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isEditMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
