import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const UpdateArticles = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['article', id],
    queryFn: () => axiosSecure.get(`/articles/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [articleData, setArticleData] = useState(null);
  
  useEffect(() => {
    if (data) {
      setArticleData(data);
      setValue('title', data.title);
      setValue('content', data.content);
      setValue('status', data.status);
      setValue('description', data.description);
      setValue('image', data.image);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    const updatedArticle = new FormData();
    updatedArticle.append('title', formData.title);
    updatedArticle.append('content', formData.content);
    updatedArticle.append('status', formData.status);
    updatedArticle.append('description', formData.description);
    
    // Check if new image is uploaded
    if (formData.image && formData.image instanceof File) {
      updatedArticle.append('image', formData.image);
    }
  
    try {
      const response = await axiosSecure.patch(`/articles/${id}`, updatedArticle, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.data.message === 'Article updated successfully') {
        Swal.fire('Success', 'Article updated successfully!', 'success');
        
        // Update image preview if new image is uploaded
        if (formData.image && formData.image instanceof File) {
          setImagePreview(URL.createObjectURL(formData.image));
        }
  
        navigate('myArticles');
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire('Error', 'Failed to update article', 'error');
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const isValidType = file.type.startsWith('image/');
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
  
    if (!isValidType) {
      Swal.fire('Error', 'Please upload an image file (JPEG, PNG, GIF)', 'error');
      e.target.value = ''; // Clear the input
      return;
    }
  
    if (!isValidSize) {
      Swal.fire('Error', 'Image size must be less than 5MB', 'error');
      e.target.value = '';
      return;
    }
  
    setValue('image', file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  if (isLoading) return <div className="text-center mt-8">Loading article...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error fetching article: {error.message}</div>;
  if (!articleData) return <div className="text-center mt-8">Article not found</div>;

  return (
    <div className="pt-24 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Update Article</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Article Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Article Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                {...register('title')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <input
                  type="text"
                  value={articleData.status}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Author Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Author Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={articleData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                value={articleData.publisher}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
            <img
              src={articleData.userImg}
              alt="User"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Article Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Current Image</label>
              {articleData.image ? (
                <img
                  src={articleData.image}
                  alt="Article"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
              ) : (
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  No image available
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">New Image Preview</label>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
              ) : (
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  Preview will appear here
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">Upload New Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => navigate('/dashboard/articles')}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Update Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticles;
