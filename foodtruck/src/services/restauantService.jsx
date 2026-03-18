import AxiosInstance from "./AxiosInstance";

export const restaurantList = async()=>{
    const res = await AxiosInstance.get('restaurants');
    return res;
}
export const restaurantMenus = async(id)=>{
    const res = await AxiosInstance.get(`restaurantmenu/${id}`);
    return res?.data;
}