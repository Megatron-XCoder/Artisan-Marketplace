import { useState } from "react";
import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
// import { useSelector } from "react-redux";

const ProfilePage = () => {
  // const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    // <div>
    //   {loading ? (
    //     <Loader />
    //   ) : (
      <>
          <Header />
          <div className="w-11/12 mx-auto bg-[#f5f5f5] sm:py-5">
              <div className="flex flex-col 800px:grid 800px:grid-cols-[335px_1fr] gap-3">
                  {/* Sidebar on top in mobile view */}
                  <div className="sticky top-[70px] h-fit z-10 sm:mb-0">
                      <ProfileSideBar active={active} setActive={setActive} />
                  </div>

                  {/* Content below */}
                  <div className="w-full">
                      <ProfileContent active={active} />
                  </div>
              </div>
          </div>
      </>

      //   )}
    // </div>
  );
};

export default ProfilePage;
