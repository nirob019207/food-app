/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react';
import { 
  useGetProductQuery, 
  useCreateProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation 
} from '@/redux/api/productApi';
import { useGetCategoryQuery } from '@/redux/api/categoryApi';
import { useUploadMutation } from '@/redux/api/uploadApi';
import { toast } from 'sonner';

export default function AllProduct() {
  const { data: products, isLoading: isProductsLoading } = useGetProductQuery({});
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoryQuery({});
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadImage] = useUploadMutation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    categoryId: ''
  });
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleOpenModal = (product = {
    id: null,
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    categoryId: ''
  }) => {
    setCurrentProduct(product);
    setIsEditMode(!!product.id);
    setIsModalOpen(true);
    setError('');
    setImageFile(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct({
      id: null,
      name: '',
      description: '',
      price: '',
      stock: '',
      image: '',
      categoryId: ''
    });
    setError('');
    setImageFile(null);
  };

  const handleOpenDeleteModal = (id: any) => {
    setDeleteProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteProductId(null);
  };

  const handleImageChange = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // Validate required fields
    if (!currentProduct.name.trim() || !currentProduct.price || !currentProduct.stock || !currentProduct.categoryId) {
      setError('Name, price, stock, and category are required');
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = currentProduct.image;
      
      // Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResult = await uploadImage(formData).unwrap();
        imageUrl = uploadResult?.url; // Assuming the upload API returns { data: { url: string } }
      }

      const productData = {
        name: currentProduct.name,
        description: currentProduct.description,
        price: parseFloat(currentProduct.price),
        stock: parseInt(currentProduct.stock),
        image: imageUrl,
        categoryId: parseInt(currentProduct.categoryId)
      };

      if (isEditMode) {
        await updateProduct({ 
          id: currentProduct.id, 
          data: productData 
        }).unwrap();
        toast.success('Product updated successfully');
      } else {
        await createProduct(productData).unwrap();
        toast.success('Product created successfully');
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product');
      toast.error('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteProduct(deleteProductId).unwrap();
      toast.success('Product deleted successfully');
      handleCloseDeleteModal();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
      toast.error('Failed to delete product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isProductsLoading || isCategoriesLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }



  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Stock</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.map((product: any) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{product.id}</td>
                <td className="py-2 px-4 border-b">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded" 
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">৳ {product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">
                  {categories?.data?.find((cat: any) => cat.id === product.categoryId)?.name || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleOpenModal(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleOpenDeleteModal(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex z-50 items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {isEditMode ? 'Edit Product' : 'Add Product'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={currentProduct.name}
                  onChange={(e: any) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={currentProduct.description}
                  onChange={(e: any) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e: any) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e: any) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stock quantity"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={currentProduct.categoryId}
                  onChange={(e: any) => setCurrentProduct({ ...currentProduct, categoryId: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories?.data?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {currentProduct.image && (
                  <img src={currentProduct.image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />
                )}
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
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
                  {isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}