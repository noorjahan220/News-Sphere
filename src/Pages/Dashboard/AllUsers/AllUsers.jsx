import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 8; // Limit the number of users per page

  const { data: { users = [], totalUsers = 0 } = {}, refetch } = useQuery({
    queryKey: ['users', page], // Trigger refetch on page change
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: { page, limit },
      });
      return res.data;
    },
  });

  // Handle Make Admin
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
      });
  };

  // Handle Delete User
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
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {totalUsers}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={user.image} alt="Avatar" />
                  </div>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? (
                    'Admin'
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)}>
                      <FaUser />
                    </button>
                  )}
                </td>
                <th>
                  <button onClick={() => handleDeleteUser(user)}>
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center my-4">
        <button
          onClick={() => setPage(1)} // Jump to the first page
          disabled={page === 1}
          className="btn"
        >
          First
        </button>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="btn"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="btn"
        >
          Next
        </button>
        <button
          onClick={() => setPage(totalPages)} // Jump to the last page
          disabled={page === totalPages}
          className="btn"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
