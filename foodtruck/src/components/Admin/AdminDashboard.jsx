import { useEffect, useState } from "react"
import DataTable from "../ReUsuableComponents/DataTable"
import Card from "../User/Card"
import { restaurantList } from "../../services/restauantService";

const AdminDashboard = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRestaurantsList = async () => {
      try {
        setLoading(true)
        const res = await restaurantList();
        console.log(res?.data)
        setRestaurantsList(res?.data?.data ?? []);
      }
      catch (err) {
        console.log("Error : " + err?.message)
      } finally {
        setLoading(false)
      }

    }
    fetchRestaurantsList();

  }, []);
  return (
    <div>
      Admin Dashboard
      <div className="flex flex-wrap">
        {restaurantsList?.map(data => (
          <Card key={data?._id} resName={data?.name} cuisines={data?.cuisines} rating={data?.rating} resImage={data?.restaurantImage} description={data?.description} address={data?.address}/>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard