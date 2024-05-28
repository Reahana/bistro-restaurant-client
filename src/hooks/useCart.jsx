import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
const useCart = () =>{
    const {user,loading}=  useContext(AuthContext)
    const token = localStorage.getItem('access-token')
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart',user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await fetch(`https://bistro-restaurant-server-tau.vercel.app/carts?email=${user.email}`,{
                headers :{
                    authorization : `bearer ${token}`
                }
            })
        return res.json()
        }
      })
      return [cart, refetch]
}

export default useCart;