import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
   const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
           const res = await axiosSecure.get('/users');
          // const res = await fetch(`http://localhost:5000/users`)
           return res.data;
           // return res.json();
        }
    })

    const handleMakeAdmin = user =>{
        fetch(`http://localhost:5000/users/admin/${user._id}`,{
            method: 'PATCH'
        })
        .then(res=>res.json())
        .then(data=>{
        // axiosSecure.patch(`/users/admin/${user._id}`)
        // .then(res =>{
        //     console.log(res.data)
             if(data.modifiedCount > 0){
                refetch();
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

    const handleDeleteUser = user => {
        // Swal.fire({
        //     title: "Are you sure?",
        //     text: "You won't be able to revert this!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!"
        // }).then((result) => {
        //     if (result.isConfirmed) {

        //         axiosSecure.delete(`/users/${user._id}`)
        //             .then(res => {
        //                 if (res.data.deletedCount > 0) {
        //                     refetch();
        //                     Swal.fire({
        //                         title: "Deleted!",
        //                         text: "Your file has been deleted.",
        //                         icon: "success"
        //                     });
        //                 }
        //             })
        //     }
        // });
    }

    return (
        <div>
            <Helmet>
            <title>Bisto Boss | All Users</title>
            </Helmet>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    { user.role === 'admin' ?<button className="btn btn-lg bg-pink-500"><FaUserShield className="text-white 
                                        text-2xl"></FaUserShield></button>  : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-lg bg-orange-500">
                                        <FaUsers className="text-white 
                                        text-2xl"></FaUsers>
                                    </button>}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;