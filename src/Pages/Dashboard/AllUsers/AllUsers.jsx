
import {
    
    useQuery,
  } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure =  useAxiosSecure();
    const { data: users =[] ,refetch } = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data;
            
        }
        
    });

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
   const  handleDeleteUser = user =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
  
          axiosSecure.delete(`/users/${user._id}`)
            .then(res => {
              refetch();
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
              }
            })
        }
      });
   }
    return (
        <div>
          <div className="flex justify-evenly my-4">
            <h2 className="text-3xl">All Users</h2>
            <h2 className="text-3xl">Total Users:{users.length}</h2>

          </div>
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          Image
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map(user=>   <tr key={user._id}>
            <th>
            <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={user.image}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                 
                </div>
                <div>
                  <div className="font-bold">{user.name}</div>
                  
                </div>
              </div>
            </td>
            <td>
             {user.email}
            </td>
            <td>{user.role === 'admin' ? 'Admin':<button onClick={()=>handleMakeAdmin(user)}><FaUser/></button>}</td>
            <th>
            <button onClick={()=>handleDeleteUser(user)}><FaTrash/></button>
            </th>
          </tr> )
      }
   
  
    </tbody>
   
    
  </table>
</div>
        </div>
    );
};

export default AllUsers;