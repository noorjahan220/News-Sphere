import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiUpload, FiX, FiSave, FiArrowLeft } from 'react-icons/fi';

const UpdateArticles = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setImagePreview(data.image);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    const updatedArticle = new FormData();
    updatedArticle.append('title', formData.title);
    updatedArticle.append('content', formData.content);
    updatedArticle.append('status', formData.status);
    updatedArticle.append('description', formData.description);
    
    if (formData.image && formData.image instanceof File) {
      updatedArticle.append('image', formData.image);
    }
  
    try {
      const response = await axiosSecure.patch(`/articles/${id}`, updatedArticle, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.data.message === 'Article updated successfully') {
        Swal.fire({
          title: 'Success',
          text: 'Article updated successfully!',
          icon: 'success',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        });
        
        if (formData.image && formData.image instanceof File) {
          setImagePreview(URL.createObjectURL(formData.image));
        }
  
        navigate('/myArticles');
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        });
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update article',
        icon: 'error',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#f59e0b'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const isValidType = file.type.startsWith('image/');
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
  
    if (!isValidType) {
      Swal.fire({
        title: 'Error',
        text: 'Please upload an image file (JPEG, PNG, GIF)',
        icon: 'error',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#f59e0b'
      });
      e.target.value = '';
      return;
    }
  
    if (!isValidSize) {
      Swal.fire({
        title: 'Error',
        text: 'Image size must be less than 5MB',
        icon: 'error',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#f59e0b'
      });
      e.target.value = '';
      return;
    }
  
    setValue('image', file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  if (isLoading) return (
    <div className="pt-24 px-4 min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
    </div>
  );

  if (error) return (
    <div className="pt-24 px-4 min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-xl mb-4">Error fetching article</div>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  if (!articleData) return (
    <div className="pt-24 px-4 min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl mb-4">Article not found</div>
        <button 
          onClick={() => navigate('/myArticles')}
          className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
        >
          Back to My Articles
        </button>
      </div>
    </div>
  );

  return (
    <div className="pt-24 px-4 min-h-screen bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-amber-500">Update Article</h1>
          <button
            onClick={() => navigate('/myArticles')}
            className="flex items-center px-4 py-2 bg-zinc-800 text-gray-300 rounded-lg hover:bg-zinc-700 hover:text-white transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Articles
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Article Details Section */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700">
            <h2 className="text-xl font-semibold text-amber-400 mb-6 pb-2 border-b border-zinc-700">Article Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Title</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className={`w-full px-4 py-2 rounded-lg bg-zinc-700 border focus:outline-none focus:ring-2 ${
                    errors.title 
                      ? 'border-red-500 focus:ring-red-500/30' 
                      : 'border-zinc-600 focus:border-amber-500 focus:ring-amber-500/30'
                  } text-white`}
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Description</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg bg-zinc-700 border focus:outline-none focus:ring-2 ${
                    errors.description 
                      ? 'border-red-500 focus:ring-red-500/30' 
                      : 'border-zinc-600 focus:border-amber-500 focus:ring-amber-500/30'
                  } text-white`}
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Content</label>
                <textarea
                  {...register('content', { required: 'Content is required' })}
                  rows="8"
                  className={`w-full px-4 py-2 rounded-lg bg-zinc-700 border focus:outline-none focus:ring-2 ${
                    errors.content 
                      ? 'border-red-500 focus:ring-red-500/30' 
                      : 'border-zinc-600 focus:border-amber-500 focus:ring-amber-500/30'
                  } text-white`}
                />
                {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Status</label>
                  <input
                    type="text"
                    value={articleData.status}
                    disabled
                    className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Author Information Section */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700">
            <h2 className="text-xl font-semibold text-amber-400 mb-6 pb-2 border-b border-zinc-700">Author Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={articleData.email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={articleData.publisher}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-gray-300 font-medium mb-2">Profile Image</label>
              <img
                src={articleData.userImg}
                alt="User"
                className="w-20 h-20 rounded-full object-cover border-2 border-amber-500"
              />
            </div>
          </div>

          {/* Image Section */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700">
            <h2 className="text-xl font-semibold text-amber-400 mb-6 pb-2 border-b border-zinc-700">Article Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Current Image</label>
                {articleData.image ? (
                  <img
                    src={articleData.image}
                    alt="Article"
                    className="w-full h-48 object-cover rounded-lg border-2 border-zinc-700"
                  />
                ) : (
                  <div className="h-48 bg-zinc-700 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-zinc-600">
                    No image available
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">New Image Preview</label>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-amber-500"
                  />
                ) : (
                  <div className="h-48 bg-zinc-700 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-zinc-600">
                    Preview will appear here
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-gray-300 font-medium mb-2">Upload New Image</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-600 rounded-lg cursor-pointer bg-zinc-700 hover:bg-zinc-700/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-3 text-amber-500" />
                  <p className="mb-2 text-sm text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/myArticles')}
              className="flex items-center px-6 py-2 bg-zinc-700 text-gray-300 rounded-lg hover:bg-zinc-600 hover:text-white transition-colors"
            >
              <FiX className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Update Article
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticles;