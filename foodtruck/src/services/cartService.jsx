import AxiosInstance from "./AxiosInstance"

export const addCartItems = async(id)=>{
    const cart = await AxiosInstance.post(`addcart`,{foodItemId:id});
    return cart;
}
export const removeCartItem = async(resId ,itemId)=>{
    const cart = await AxiosInstance.patch(`removecartitem/${resId}/${itemId}`);
    return cart;
}
export const getCartItems = async(resId)=>{
    const cart = await AxiosInstance.get(`cartitems/${resId}`);
    return cart?.data;
}