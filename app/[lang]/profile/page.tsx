import { Suspense } from "react";
import { ManageProfile } from "@/screens/profile-page";

const ProfilePage = async () => {
  return (
    <Suspense>
      <ManageProfile />
    </Suspense>
  );
};

export default ProfilePage;
