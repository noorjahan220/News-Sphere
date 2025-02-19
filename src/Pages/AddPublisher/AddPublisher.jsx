import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddPublisher = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null); // For image preview
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true); // Start loading

      // Create FormData for image upload
      const formData = new FormData();
      formData.append("image", data.logo[0]);

      // Upload the image to the image hosting service (ImgBB)
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        formData
      );

      // If image upload is successful
      if (imgRes.data.success) {
        const logoUrl = imgRes.data.data.url;

        // Prepare publisher data to send to the backend
        const publisherData = {
          name: data.name,
          logo: logoUrl,
        };

        // Send publisher data to backend API
        const response = await axiosSecure.post("/publishers", publisherData);

        // Handle response
        if (response.data.insertedId) {
          toast.success("Publisher added successfully!");
          reset(); // Reset form after successful submission
          setPreview(null); // Reset image preview
        } else {
          toast.error("Failed to add publisher.");
        }
      } else {
        toast.error("Logo upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the publisher.");
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl my-5 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Add Publisher</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Publisher Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-600">
            Publisher Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Publisher name is required" })}
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter publisher name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Publisher Logo */}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium mb-2 text-gray-600">
            Publisher Logo
          </label>
          <input
            type="file"
            id="logo"
            {...register("logo", { required: "Publisher logo is required" })}
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.logo ? 'border-red-500' : ''}`}
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo.message}</p>}

          {/* Image Preview */}
          {preview && <img src={preview} alt="Logo Preview" className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto" />}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold 
                         hover:from-teal-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Publisher'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
