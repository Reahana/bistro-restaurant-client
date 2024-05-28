import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyCart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    //const axiosSecure = useAxiosSecure();

    const handleDelete = item => {
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
                fetch(`http://localhost:5000/carts/${item._id}`,{
                    method: 'DELETE'
                })

                //axiosSecure.delete(`/carts/${id}`)
                .then(res=>res.json())
                .then(data=> {
                    // .then(res => {
                        if (data.deletedCount > 0) {
                            refetch();
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
            <Helmet>
                <title>Bisto Boss | My Cart</title>
            </Helmet>
        <div className="flex justify-evenly mb-8">
            <h2 className="text-4xl">Items: {cart.length}</h2>
            <h2 className="text-4xl">Total Price: {totalPrice}</h2>
           <Link to='/dashboard/payment'>
           <button className="btn btn-warning">Pay</button>
           </Link>
          

        </div>
        <div className="overflow-x-auto">
            <table className="table  w-full">
                {/* head */}
                <thead className='bg-yellow-400'>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item, index) => <tr key={item._id}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>${item.price}</td>
                            <th>
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="btn btn-ghost btn-lg">
                                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                </button>
                            </th>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyCart;