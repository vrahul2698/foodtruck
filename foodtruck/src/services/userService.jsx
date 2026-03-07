import AxiosInstance from "./AxiosInstance"

export const getRequestRoles = async()=>{
    const res = await AxiosInstance.get("requestedroles?approvedStatus=" + "PENDING");
    return res;
}
export const acceptRequestedRole = async(data)=>{
    const res = await AxiosInstance.patch(`users/${data?.id}/approve-role`,{role: data?.requestedRole});
    return res;
}