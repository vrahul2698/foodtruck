import AxiosInstance from "./AxiosInstance"

export const addCartItems = async(id)=>{
    const cart = await AxiosInstance.post(`addcart`,{foodItemId:id});
    return cart;
}