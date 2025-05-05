import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaUser, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data: { users = [], totalUsers = 0 } = {}, refetch, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: { page, limit },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: 'Make Admin?',
      text: `Are you sure you want to make ${user.name} an admin?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d97706',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, make admin',
      background: '#1f2937',
      color: '#f3f4f6',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.name} is now an Admin!`,
                showConfirmButton: false,
                timer: 1500,
                background: '#1f2937',
                color: '#f3f4f6',
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed!',
              text: err.message || 'Unable to make admin',
              background: '#1f2937',
              color: '#f3f4f6',
              confirmButtonColor: '#d97706',
            });
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: 'Delete User?',
      text: `You are about to delete ${user.name}. This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d97706',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
      background: '#1f2937',
      color: '#f3f4f6',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then((res) => {
            refetch();
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted.',
                icon: 'success',
                background: '#1f2937',
                color: '#f3f4f6',
                confirmButtonColor: '#d97706',
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed!',
              text: err.message || 'Unable to delete user',
              background: '#1f2937',
              color: '#f3f4f6',
              confirmButtonColor: '#d97706',
            });
          });
      }
    });
  };

  const totalPages = Math.ceil(totalUsers / limit);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
            Manage Users
          </span>
        </h2>
        <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
          <span className="text-amber-400 font-medium">Total Users:</span>
          <span className="text-white ml-2">{totalUsers}</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-zinc-800 rounded-xl shadow-lg border border-zinc-700">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-700">
            <tr>
              <th className="py-4 px-6 text-left text-gray-300 font-medium">Image</th>
              <th className="py-4 px-6 text-left text-gray-300 font-medium">Name</th>
              <th className="py-4 px-6 text-left text-gray-300 font-medium">Email</th>
              <th className="py-4 px-6 text-left text-gray-300 font-medium">Role</th>
              <th className="py-4 px-6 text-left text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-zinc-700 hover:bg-zinc-700/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="mask mask-squircle h-10 w-10">
                      <img 
                        src={user.image || 'https://via.placeholder.com/40'} 
                        alt={user.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/40';
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-white font-medium">{user.name}</td>
                <td className="py-4 px-6 text-gray-300">{user.email}</td>
                <td className="py-4 px-6">
                  {user.role === 'admin' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400">
                      <FaUserShield className="mr-1" /> Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="text-amber-400 hover:text-amber-300 transition-colors"
                      title="Make Admin"
                    >
                      <FaUser />
                    </button>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg border ${page === 1 ? 'border-zinc-700 text-zinc-600 cursor-not-allowed' : 'border-amber-500 text-amber-400 hover:bg-amber-500/10'}`}
        >
          First
        </button>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg border ${page === 1 ? 'border-zinc-700 text-zinc-600 cursor-not-allowed' : 'border-amber-500 text-amber-400 hover:bg-amber-500/10'}`}
        >
          Previous
        </button>
        <div className="flex items-center px-4 text-gray-300">
          Page {page} of {totalPages}
        </div>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-lg border ${page === totalPages || totalPages === 0 ? 'border-zinc-700 text-zinc-600 cursor-not-allowed' : 'border-amber-500 text-amber-400 hover:bg-amber-500/10'}`}
        >
          Next
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-lg border ${page === totalPages || totalPages === 0 ? 'border-zinc-700 text-zinc-600 cursor-not-allowed' : 'border-amber-500 text-amber-400 hover:bg-amber-500/10'}`}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default AllUsers;