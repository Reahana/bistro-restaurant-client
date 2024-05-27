import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
//import useAuth from "../../hooks/useAuth";
//import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const SocialLogin = () => {
    // const { googleSignIn } = useAuth();
    // const axiosPublic = useAxiosPublic();
    const {googleSignIn} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () =>{
         googleSignIn()
         .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);

            const savedUser = {name: loggedUser.displayName, email: loggedUser.email}
            fetch(`http://localhost:5000/users`,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(savedUser)
            })
            .then(res=>res.json())
            .then (data=>{
                if (data.insertedId) {
                   
                }
            })


            navigate(from, { replace: true });
            // const userInfo = {
            //     email: result.user?.email,
            //     name: result.user?.displayName
            // }
        //     axiosPublic.post('/users', userInfo)
        //     .then(res =>{
        //         console.log(res.data);
           //      navigate('/');
            // })
         })
    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;