import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
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
        } else {
          toast.error("Failed to add publisher.");
        }
      } else {
        toast.error("Logo upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the publisher.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add Publisher</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Publisher Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Publisher Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Publisher name is required" })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter publisher name"
          />
        </div>

        {/* Publisher Logo */}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium mb-1">
            Publisher Logo
          </label>
          <input
            type="file"
            id="logo"
            {...register("logo", { required: "Publisher logo is required" })}
            className="w-full border border-gray-300 rounded p-2"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Publisher
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;
