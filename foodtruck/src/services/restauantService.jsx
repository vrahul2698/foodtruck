import AxiosInstance from "./AxiosInstance";

export const restaurantList = async()=>{
    const res = await AxiosInstance.get('restaurants');
    return res;
}