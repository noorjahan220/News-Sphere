// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import Select from "react-select";
// import axios from "axios";
// import toast from "react-hot-toast";

// const AddArticle = () => {
//   const { register, handleSubmit, reset } = useForm();
//   const [publishers, setPublishers] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);

//   // Static tag options
//   const tagOptions = [
//     { value: "Travel", label: "Travel" },
//     { value: "Tourism", label: "Tourism" },
//     { value: "Winter", label: "Winter" },
//     { value: "Technology", label: "Technology" },
//     { value: "Health", label: "Health" },
//   ];

//   // Fetch publishers from backend
//   useEffect(() => {
//     const fetchPublishers = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/publishers");
//         setPublishers(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch publishers");
//       }
//     };
//     fetchPublishers();
//   }, []);

//   const onSubmit = async (data) => {
//     if (!selectedTags.length) {
//       return toast.error("Please select at least one tag.");
//     }

//     try {
//       // Upload image to imgbb
//       const formData = new FormData();
//       formData.append("image", data.image[0]);

//       const imgRes = await axios.post(
//         `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
//         formData
//       );

//       if (imgRes.data.success) {
//         const imageUrl = imgRes.data.data.url;

//         // Prepare article data
//         const articleData = {
//           title: data.title,
//           image: imageUrl,
//           publisher: data.publisher,
//           tags: selectedTags.map((tag) => tag.value),
//           description: data.description,
//           viewCount: 0, // Default view count
//         };

//         // Post article to backend
//         const response = await axios.post("http://localhost:3000/articles", articleData);
//         if (response.data.insertedId) {
//           toast.success("Article submitted successfully!");
//           reset();
//           setSelectedTags([]);
//         }
//       } else {
//         toast.error("Image upload failed.");
//       }
//     } catch (error) {
//       toast.error("Failed to submit article.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">Add Article</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             {...register("title", { required: true })}
//             className="w-full border border-gray-300 rounded p-2"
//             placeholder="Enter article title"
//           />
//         </div>

//         {/* Image */}
//         <div>
//           <label htmlFor="image" className="block text-sm font-medium mb-1">
//             Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             {...register("image", { required: true })}
//             className="w-full border border-gray-300 rounded p-2"
//             accept="image/*"
//           />
//         </div>

//         {/* Publisher */}
//         <div>
//           <label htmlFor="publisher" className="block text-sm font-medium mb-1">
//             Publisher
//           </label>
//           <select
//             id="publisher"
//             {...register("publisher", { required: true })}
//             className="w-full border border-gray-300 rounded p-2"
//           >
//             <option value="">Select Publisher</option>
//             {publishers.map((publisher) => (
//               <option key={publisher._id} value={publisher.name}>
//                 {publisher.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Tags */}
//         <div>
//           <label htmlFor="tags" className="block text-sm font-medium mb-1">
//             Tags
//           </label>
//           <Select
//             isMulti
//             options={tagOptions}
//             value={selectedTags}
//             onChange={setSelectedTags}
//             className="w-full"
//             id="tags"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium mb-1">
//             Description
//           </label>
//           <textarea
//             id="description"
//             {...register("description", { required: true })}
//             className="w-full border border-gray-300 rounded p-2"
//             rows="4"
//             placeholder="Enter article description"
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Submit Article
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddArticle;
