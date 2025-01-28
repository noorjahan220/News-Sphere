import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2'; // SweetAlert2 for notifications

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddArticle = () => {
  const { user } = useContext(AuthContext);
  const [publishers, setPublishers] = useState([]);
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const { data } = await axiosPublic.get('/publishers');
        setPublishers(data.map(pub => ({ value: pub.name, label: pub.name })));
      } catch (error) {
        console.error('Failed to fetch publishers:', error);
      }
    };
    fetchPublishers();

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
      // Check if the user is a premium or normal user
      if (user?.premiumTaken === null) {
        // Check if the user has already published an article
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
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your article. Please try again.',
      });
    }
  };
  

  return (
    <div className="add-article-page pt-32">
      <div className="max-w-4xl mx-auto shadow-lg p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Add New Article</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              {...register('title', { required: true })}
              placeholder="Enter article title"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Publisher</label>
            <select
              {...register('publisher', { required: true })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
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
            <label className="block text-sm font-medium mb-1">Tags</label>
            <Select
              isMulti
              options={tags}
              onChange={(selectedOptions) => setValue('tags', selectedOptions)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description', { required: true })}
              placeholder="Write article description"
              rows={4}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              {...register('image', { required: true })}
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Submit Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
