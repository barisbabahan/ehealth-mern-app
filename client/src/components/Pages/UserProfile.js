import React, { useEffect, useState } from "react";
import getUserInformation from "../../api/getUserInformation";
import Profile from "../Elements/Profile/Profile";
const UserProfile = () => {
  const [userInformations, setUserInformations] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await getUserInformation();
        setUserInformations(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserInfo();
    return () => setUserInformations();
  }, []);

  return (
    <div className="routes-common-section ">
      {userInformations && (
        <Profile
          username={userInformations.username}
          email={userInformations.email}
        />
      )}
    </div>
  );
};

export default UserProfile;
