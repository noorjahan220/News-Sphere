import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2'; // SweetAlert2 for notifications
import { useNavigate } from 'react-router-dom';

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddArticleForm = () => {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
 const navigate = useNavigate()
  // Use Tanstack Query to fetch publishers
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
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (user?.premiumTaken === null) {
        const response = await axiosPublic.get(`/articles?email=${user?.email}`);
        
        if (response.data.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'You can only submit one article as a normal user. Please upgrade to a premium plan for unlimited submissions.',
          });
          return;
        }
      }
  
      const formData = new FormData();
      formData.append('image', data.image[0]);
  
      const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${img_hosting_key}`, formData);
      const imageUrl = imgRes.data.data.url;
  
      const articleData = {
        title: data.title,
        description: data.description,
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
  
      const response = await axiosPublic.post('/articles', articleData);
      if (response.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Article Submitted!',
          text: 'Your article has been submitted successfully for admin approval.',
        });
        
        // Navigate to the "My Articles" page (or any page where you want to show the user's articles)
        navigate('/myArticles');  // Replace with your actual route
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your article. Please try again.',
      });
    }
  };

  if (isLoading) {
    return <div>Loading publishers...</div>;
  }

  if (isError) {
    return <div>Error fetching publishers</div>;
  }

  return (
    <div className="add-article-page pt-8 pb-8 sm:pt-16 sm:pb-16">
      <div className="max-w-4xl mx-auto shadow-lg p-6 sm:p-8 bg-white rounded-lg border-t-4 border-blue-500">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-blue-600">Add New Article</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2">Title</label>
            <input
              type="text"
              {...register('title', { required: true })}
              placeholder="Enter article title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-2">Publisher</label>
            <select
              {...register('publisher', { required: true })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select a publisher</option>
              {publishers.map(publisher => (
                <option key={publisher.value} value={publisher.value}>
                  {publisher.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-2">Tags</label>
            <Select
              isMulti
              options={tags}
              onChange={(selectedOptions) => setValue('tags', selectedOptions)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-2">Description</label>
            <textarea
              {...register('description', { required: true })}
              placeholder="Write article description"
              rows={4}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-2">Image</label>
            <input
              type="file"
              {...register('image', { required: true })}
              onChange={handleImageUpload}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            {imagePreview && (
              <div className="mt-4 text-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300"
          >
            Submit Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticleForm;
