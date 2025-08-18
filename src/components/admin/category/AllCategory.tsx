/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react';
import { 
  useGetCategoryQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation 
} from '@/redux/api/categoryApi';

export default function AllCategory() {
  const { data: categories, isLoading } = useGetCategoryQuery({});
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '' });
  const [error, setError] = useState('');

  const handleOpenModal = (category = { id: null, name: '' }) => {
    setCurrentCategory(category);
    setIsEditMode(!!category.id);
    setIsModalOpen(true);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory({ id: null, name: '' });
    setError('');
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!currentCategory.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      if (isEditMode) {
        await updateCategory({ 
          id: currentCategory.id, 
          data: { name: currentCategory.name }
        }).unwrap();
      } else {
        await createCategory({ name: currentCategory.name }).unwrap();
      }
      handleCloseModal();
    } catch (err) {
      setError('Failed to save category');
    }
  };

  const handleDelete = async (id:any) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {/* Category List */}
      <div className="grid gap-4">
        {categories?.data?.map((category:any) => (
          <div 
            key={category.id} 
            className="flex justify-between items-center p-4 bg-gray-100 rounded"
          >
            <span>{category.name}</span>
            <div className="space-x-2">
              <button 
                onClick={() => handleOpenModal(category)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(category.id)}
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
              {isEditMode ? 'Edit Category' : 'Add Category'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={currentCategory.name}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
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