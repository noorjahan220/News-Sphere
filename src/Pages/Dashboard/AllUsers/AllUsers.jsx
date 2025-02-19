import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaUser } from 'react-icons/fa';
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
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: err.message || 'Unable to make the user an admin.',
        });
      });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  const totalPages = Math.ceil(totalUsers / limit);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-center my-6">
        <h2 className="text-3xl font-semibold text-gray-800">All Users</h2>
        <h2 className="text-xl text-gray-600">Total Users: {totalUsers}</h2>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-3 px-6">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={user.image} alt="Avatar" />
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="font-semibold">{user.name}</div>
                </td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  {user.role === 'admin' ? (
                    'Admin'
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaUser />
                    </button>
                  )}
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Delete ${user.name}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`btn btn-outline btn-primary ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          First
        </button>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`btn btn-outline btn-primary ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span className="self-center">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`btn btn-outline btn-primary ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className={`btn btn-outline btn-primary ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
