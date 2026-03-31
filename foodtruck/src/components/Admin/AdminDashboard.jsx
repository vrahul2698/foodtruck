import { useEffect, useState } from "react"
import Card from "../User/Card"
import { restaurantList } from "../../services/restauantService";
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRestaurantsList = async () => {
      try {
        setLoading(true)
        const res = await restaurantList();
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
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      Admin Dashboard
      <div className="flex flex-wrap">
        {restaurantsList?.map(data => (
          <Link key={data?._id} to={`/admin/restaurant/${data?._id}`}>
            <Card
              key={data?._id}
              resName={data?.name}
              cuisines={data?.cuisines}
              rating={data?.rating}
              resImage={data?.restaurantImage}
              description={data?.description}
              address={data?.address}
            />
          </Link>
        ))}

      </div>
    </div>
  )
}

export default AdminDashboard