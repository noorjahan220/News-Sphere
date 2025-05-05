import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiPlusCircle } from 'react-icons/fi';

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddArticleForm = () => {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Custom styles for react-select to match dark theme
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937',
      borderColor: '#374151',
      color: '#f3f4f6',
      minHeight: '44px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#4b5563'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#92400e' : state.isFocused ? '#1e40af' : '#1f2937',
      color: state.isSelected ? '#f3f4f6' : '#f3f4f6',
      cursor: 'pointer'
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#92400e',
      color: '#f3f4f6'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#f3f4f6'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#f3f4f6',
      ':hover': {
        backgroundColor: '#b45309',
        color: '#f3f4f6'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937',
      borderColor: '#374151'
    }),
    input: (provided) => ({
      ...provided,
      color: '#f3f4f6'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#f3f4f6'
    })
  };

  // Fetch publishers
  const { data: publishers = [], isLoading, isError } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/publishers');
      return data.map(pub => ({ value: pub.name, label: pub.name }));
    },
  });

  useEffect(() => {
    setTags([
      { value: 'Politics', label: 'Politics' },
      { value: 'Sports', label: 'Sports' },
      { value: 'Technology', label: 'Technology' },
      { value: 'Health', label: 'Health' },
      { value: 'Entertainment', label: 'Entertainment' },
    ]);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Only JPG, PNG, GIF, and WEBP images are allowed',
          background: '#1f2937',
          color: '#f3f4f6',
          confirmButtonColor: '#d97706',
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Maximum image size is 5MB',
          background: '#1f2937',
          color: '#f3f4f6',
          confirmButtonColor: '#d97706',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      
      // Check for premium user article limits
      if (user?.premiumTaken === null) {
        const response = await axiosPublic.get(`/articles?email=${user?.email}`);
        if (response.data.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'You can only submit one article as a normal user. Please upgrade to a premium plan for unlimited submissions.',
            background: '#1f2937',
            color: '#f3f4f6',
            confirmButtonColor: '#d97706',
          });
          setIsUploading(false);
          return;
        }
      }

      // Validate image exists
      if (!data.image || data.image.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Missing Image',
          text: 'Please select an image to upload',
          background: '#1f2937',
          color: '#f3f4f6',
          confirmButtonColor: '#d97706',
        });
        setIsUploading(false);
        return;
      }

      // Prepare image for upload
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append('image', imageFile);

      // Upload to ImgBB
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${img_hosting_key}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 30000 // 30 seconds timeout
        }
      );

      if (!imgRes.data.success) {
        throw new Error('Image upload failed');
      }

      const imageUrl = imgRes.data.data.url;

      // Prepare article data
      const articleData = {
        title: data.title,
        description: data.Description,
        publisher: data.publisher,
        tags: data.tags.map(tag => tag.value),
        image: imageUrl,
        status: 'pending',
        isApproved: false,
        createdAt: new Date(),
        email: user?.email,
        name: user?.displayName,
        userImg: user?.photoURL,
      };

      // Submit article
      const response = await axiosPublic.post('/articles', articleData);
      if (response.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Article Submitted!',
          text: 'Your article has been submitted successfully for admin approval.',
          background: '#1f2937',
          color: '#f3f4f6',
          confirmButtonColor: '#d97706',
        });
        navigate('/myArticles');
      }
    } catch (error) {
      console.error('Submission error:', error);
      let errorMessage = 'There was an error submitting your article. Please try again.';
      
      if (error.response?.status === 400) {
        errorMessage = 'Image upload failed. Please check your API key and try again.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your internet connection.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        background: '#1f2937',
        color: '#f3f4f6',
        confirmButtonColor: '#d97706',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="text-center p-6 bg-zinc-800 rounded-lg border border-red-500/30 max-w-md">
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Publishers</h3>
          <p className="text-gray-400 mb-4">Please try refreshing the page</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
              Submit New Article
            </span>
          </h1>
          <p className="text-gray-400">Share your knowledge with our community</p>
        </div>

        <div className="bg-zinc-800 rounded-xl shadow-lg p-6 sm:p-8 border border-zinc-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                placeholder="Enter article title"
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Publisher *</label>
              <select
                {...register('publisher', { required: 'Publisher is required' })}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Select a publisher</option>
                {publishers.map(publisher => (
                  <option key={publisher.value} value={publisher.value}>
                    {publisher.label}
                  </option>
                ))}
              </select>
              {errors.publisher && (
                <p className="mt-1 text-sm text-red-400">{errors.publisher.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags *</label>
              <Select
                isMulti
                options={tags}
                onChange={(selectedOptions) => setValue('tags', selectedOptions)}
                className="w-full"
                styles={customStyles}
                placeholder="Select tags..."
                classNamePrefix="react-select"
              />
              <input
                type="hidden"
                {...register('tags', { validate: value => value?.length > 0 || 'At least one tag is required' })}
              />
              {errors.tags && (
                <p className="mt-1 text-sm text-red-400">{errors.tags.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                {...register('Description', { required: 'Description is required' })}
                placeholder="Write article description"
                rows={6}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              {errors.Description && (
                <p className="mt-1 text-sm text-red-400">{errors.Description.message}</p>
              )}
            </div>

            // In your image upload section, replace with this:
<div>
  <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image *</label>
  <div className="flex flex-col items-center">
    {imagePreview ? (
      <div className="relative mb-4">
        <img
          src={imagePreview}
          alt="Preview"
          className="w-48 h-48 object-cover rounded-lg border border-amber-500/30"
        />
        <button
          type="button"
          onClick={() => {
            setImagePreview('');
            setValue('image', null);
          }}
          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    ) : (
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-600 border-dashed rounded-lg cursor-pointer bg-zinc-700 hover:bg-zinc-700/50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP (MAX. 5MB)</p>
        </div>
        <input 
          type="file" 
          {...register('image', { 
            required: 'Image is required',
            onChange: handleImageUpload // Add this to ensure the handler is called
          })}
          className="hidden"
          accept="image/jpeg, image/png, image/gif, image/webp"
        />
      </label>
    )}
  </div>
  {errors.image && (
    <p className="mt-1 text-sm text-red-400">{errors.image.message}</p>
  )}
</div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiPlusCircle size={18} />
                    Submit Article
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticleForm;