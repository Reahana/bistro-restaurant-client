import Swal from "sweetalert2";
import { useContext} from 'react';
// import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate} from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useCart from "../../hooks/useCart";


const FoodCard = ({item}) => {
    const {_id, name, image, price, recipe} = item;
    // const { user } = useAuth();
    const {user} = useContext(AuthContext)
     const navigate = useNavigate();
     const location = useLocation();
    // const axiosSecure = useAxiosSecure();
    // const [, refetch] = useCart();


    const handleAddToCart = item => {
        console.log(item);
        if(user && user.email){
            const cartItem = {menuItemId: _id, name, image, price, email: user.email}
            fetch('http://localhost:5000/carts',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(cartItem)
            })
            .then(res=>res.json())
            .then (data=>{
                if (data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

            })
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }

        // if (user && user.email) {
        //     //send cart item to the database
        //     const cartItem = {
        //         menuId: _id,
        //         email: user.email,
        //         name,
        //         image,
        //         price
        //     }
        //     axiosSecure.post('/carts', cartItem)
        //         .then(res => {
        //             console.log(res.data)
        //             if (res.data.insertedId) {
        //                 Swal.fire({
        //                     position: "top-end",
        //                     icon: "success",
        //                     title: `${name} added to your cart`,
        //                     showConfirmButton: false,
        //                     timer: 1500
        //                 });
        //                 // refetch cart to update the cart items count
        //                 refetch();
        //             }

        //         })
        // }
        // else {
        //     Swal.fire({
        //         title: "You are not Logged In",
        //         text: "Please login to add to the cart?",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#3085d6",
        //         cancelButtonColor: "#d33",
        //         confirmButtonText: "Yes, login!"
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             //   send the user to the login page
        //             navigate('/login', { state: { from: location } })
        //         }
        //     });
        // }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button  onClick={() => handleAddToCart(item)} className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;