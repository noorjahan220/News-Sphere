import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiUpload, FiPlusCircle } from "react-icons/fi";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddPublisher = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Validate image exists
      if (!data.logo || data.logo.length === 0) {
        toast.error("Please select a logo image");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", data.logo[0]);

      // Upload to ImgBB
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 30000 // 30 seconds timeout
        }
      );

      if (imgRes.data.success) {
        const logoUrl = imgRes.data.data.url;

        const publisherData = {
          name: data.name,
          logo: logoUrl,
        };

        const response = await axiosSecure.post("/publishers", publisherData);

        if (response.data.insertedId) {
          toast.success("Publisher added successfully!", {
            style: {
              background: '#1f2937',
              color: '#f3f4f6',
              border: '1px solid #374151'
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#f3f4f6',
            }
          });
          reset();
          setPreview(null);
        } else {
          throw new Error("Failed to add publisher");
        }
      } else {
        throw new Error("Logo upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred while adding the publisher", {
        style: {
          background: '#1f2937',
          color: '#f3f4f6',
          border: '1px solid #374151'
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#f3f4f6',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, PNG, GIF, and WEBP images are allowed", {
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151'
          }
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Maximum image size is 5MB", {
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151'
          }
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
              Add New Publisher
            </span>
          </h1>
          <p className="text-gray-400">Register a new content publisher</p>
        </div>

        <div className="bg-zinc-800 rounded-xl shadow-lg p-6 sm:p-8 border border-zinc-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Publisher Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Publisher Name *
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Publisher name is required" })}
                className={`w-full px-4 py-3 bg-zinc-700 border ${errors.name ? 'border-red-500' : 'border-zinc-600'} rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                placeholder="Enter publisher name"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Publisher Logo */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium mb-2 text-gray-300">
                Publisher Logo *
              </label>
              <div className="flex items-center justify-center w-full">
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
                    id="logo"
                    {...register("logo", { required: "Publisher logo is required" })}
                    className="hidden"
                    accept="image/jpeg, image/png, image/gif, image/webp"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {errors.logo && <p className="text-red-400 text-xs mt-1">{errors.logo.message}</p>}

              {/* Image Preview */}
              {preview && (
                <div className="mt-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Logo Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-amber-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        reset({ logo: null });
                      }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <FiPlusCircle size={18} />
                    Add Publisher
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

export default AddPublisher;