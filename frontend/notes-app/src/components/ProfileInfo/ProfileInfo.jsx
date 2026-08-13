import { useNavigate } from "react-router-dom";
import { profileName } from "../../utils/helper";

function ProfileInfo({ userInfo }) {

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.clear();
    navigate("/");
  };

  if (!userInfo) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 shrink-0">

      {/* Profile Avatar */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 text-lg sm:text-xl font-bold flex justify-center items-center">
        {profileName(userInfo.name)}
      </div>

      {/* User Details */}
      <div className="min-w-0">
        <h3 className="text-base sm:text-xl font-bold truncate max-w-[150px] sm:max-w-none">
          {userInfo.name}
        </h3>

        <button
          className="text-sm sm:text-base underline underline-offset-2 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default ProfileInfo;