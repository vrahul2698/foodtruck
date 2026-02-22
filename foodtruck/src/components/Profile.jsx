import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile';

const Profile = () => {
  const user = useSelector(store => store?.user);
  console.log(user, "profile")

  return (
    <>
      {
        user &&
        <EditProfile user={user} />
      }

    </>

  )
}

export default Profile