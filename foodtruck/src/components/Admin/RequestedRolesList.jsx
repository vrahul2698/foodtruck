import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DataTable from '../ReUsuableComponents/DataTable'
import { getRequestRoles, acceptRequestedRole } from '../../services/userService';

const RequestedRolesList = () => {
    const [requestRoles, setRequestedRoles] = useState([]);
    const [approvingId, setApprovingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchRequestRolesList = async () => {
            try {
                setLoading(true)
                const roles = await getRequestRoles();
                console.log(roles.data, "Requested Roles");
                setRequestedRoles(roles?.data?.users ?? []);
            } catch (err) {
                console.log("Error :", err?.message);
            } finally {
                setLoading(false)
            }

        };

        fetchRequestRolesList();

    }, []);


    const handleApproveRole = useCallback(async (user) => {
        try {
            setApprovingId(user.id);
            const res = await acceptRequestedRole(user);
            if (res?.data?.success) {
                setRequestedRoles(prev =>
                    prev.filter(u => u._id !== user.id)
                );
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }

        } catch (err) {
            setError(err?.response?.data || "Something went wrong")
            console.error(err);

        }
    }, []);
    const columns = useMemo(() => [
        { field: "serialNumber", headerName: "Serial No", width: 100 },
        { field: "firstName", headerName: "First Name", width: 150 },
        { field: "lastName", headerName: "Last Name", width: 150 },
        { field: "userStatus", headerName: "Role", width: 150 },
        { field: "requestedRole", headerName: "Requested Role", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <>
                    <button className="cursor-pointer btn btn-success btn-sm" disabled={approvingId === params.row.id} onClick={() => handleApproveRole(params.row)}>{approvingId === params.row.id ? "Approving..." : "Approve"}</button>
                </>
            )
        }
    ], [handleApproveRole]);
    const rows = useMemo(() => {
        return requestRoles?.map((data, index) => ({
            ...data,
            id: data?._id,
            serialNumber: (index + 1),
        }));
    }, [requestRoles])
    return (
        <div className="bg-base-200 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="mb-6">
                    <h2 className="text-3xl font-semibold">
                        Requested Roles
                    </h2>
                    <p className="text-sm text-base-content/60">
                        Manage role access requests from users
                    </p>
                </div>

                <div className="divider"></div>

                <div className="bg-base-100 rounded-xl shadow-md p-4">

                    <DataTable
                        loading={loading}
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                        pageSizeOptions={[5, 10, 20]}
                    />

                </div>

            </div>
            {showToast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Role Approved successfully.</span>
                    </div>
                </div>}
            {error && (
                <div className="alert alert-error mb-4">
                    <span>{error}</span>
                </div>
            )}

        </div>
    )
}

export default RequestedRolesList