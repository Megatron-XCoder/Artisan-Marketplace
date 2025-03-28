import {useState} from "react";
import Header from "../Components/Layout/Header";
import Loader from "../Components/Layout/Loader";
import ProfileSideBar from "../Components/Profile/ProfileSidebar";
import ProfileContent from "../Components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {RiShieldStarFill} from "react-icons/ri";


const ProfilePage = () => {
    const { loading, user } = useSelector((state) => state.user);
    const [active, setActive] = useState(1);

    return (
        <div>
          {loading ? (
            <Loader />
          ) : (
        <>
            <Header/>
            <div className="w-11/12 mx-auto bg-[#f5f5f5] sm:py-5">
                <div className="flex flex-col 800px:grid 800px:grid-cols-[335px_1fr] gap-3">
                    {/* Sidebar on top in mobile view */}
                    <div className="relative flex top-[10px] h-fit z-10 sm:mb-0">
                        <ProfileSideBar active={active} setActive={setActive}/>
                        {/* Admin Dashboard Button (only for admin users) */}
                        {user?.role?.toLowerCase() === "admin" && (
                            <Link
                                to="/admin/dashboard"
                                className=" top-76 right-3 mr-4 sm:mt-6 sm:mr-6"
                            >
                                <button className="flex absolute -top-1 right-0 items-center gap-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition">
                                    <span>Admin Dashboard</span>
                                    <RiShieldStarFill className="text-sm" />
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Content below */}
                    <div className="w-full">
                        <ProfileContent active={active}/>
                    </div>
                </div>
            </div>
        </>

          )}
        </div>
    );
};

export default ProfilePage;
