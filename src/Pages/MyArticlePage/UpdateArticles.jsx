import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const UpdateArticles = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['article', id],
    queryFn: () => axiosPublic.get(`/articles/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [articleData, setArticleData] = React.useState(null);

  useEffect(() => {
    if (data) {
      setArticleData(data);
      setValue('title', data.title);
      setValue('content', data.content);
      setValue('tags', data.tags.join(', '));
      setValue('status', data.status);
      setValue('description', data.description);
      setValue('image', data.image); // Default to existing image if no new image is uploaded
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    if (
      formData.title === articleData.title &&
      formData.content === articleData.content &&
      formData.tags === articleData.tags.join(', ') &&
      formData.status === articleData.status &&
      formData.description === articleData.description &&
      formData.image === articleData.image
    ) {
      Swal.fire('No Changes', 'No changes were made to the article', 'info');
      return;
    }

    try {
      const updatedFormData = new FormData();
      updatedFormData.append('title', formData.title);
      updatedFormData.append('content', formData.content);
      updatedFormData.append('tags', formData.tags);
      updatedFormData.append('status', formData.status);
      updatedFormData.append('description', formData.description);

      let imageUrl = articleData.image; // Default to current image if no new image is uploaded
      if (formData.image && formData.image[0]) {
        // Upload the image if it's new
        const imageFormData = new FormData();
        imageFormData.append('file', formData.image[0]);

        const imageResponse = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${img_hosting_key}`, 
          imageFormData
        );
        
        imageUrl = imageResponse.data.data.url;
      }

      updatedFormData.append('image', imageUrl); // Only send the updated image URL

      await axiosPublic.patch(`/articles/${id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire('Success', 'Article updated successfully!', 'success');
      refetch();
      navigate(`/my-articles`);
    } catch (error) {
      Swal.fire('Error', 'Failed to update article', 'error');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (!isValidType) {
        Swal.fire('Error', 'Please upload an image file', 'error');
        return;
      }
      if (!isValidSize) {
        Swal.fire('Error', 'Image size should not exceed 5MB', 'error');
        return;
      }

      setValue('image', file); // Set image value using React Hook Form
    }
  };

  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error fetching article: {error.message}</div>;
  if (!articleData) return <div>Article not found</div>;

  return (
    <div className="pt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">Update Article</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Content</label>
          <textarea
            {...register('content', { required: 'Content is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Tags</label>
          <input
            type="text"
            {...register('tags', { required: 'Tags are required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            value={articleData.status}
            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={articleData.email}
            className="w-full px-4 py-2 border rounded"
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={articleData.publisher}
            className="w-full px-4 py-2 border rounded"
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700">User Image</label>
          <img src={articleData.userImg} alt="User" className="w-16 h-16 rounded-full" />
        </div>

        <div>
          <label className="block text-gray-700">Article Image</label>
          {articleData.image ? (
            <img src={articleData.image} alt="Article" className="w-full h-auto" />
          ) : (
            <div>No image available</div>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Upload New Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Update Article
        </button>
      </form>
    </div>
  );
};

export default UpdateArticles;
