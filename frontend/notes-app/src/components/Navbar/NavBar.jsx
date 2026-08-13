import ProfileInfo from "../ProfileInfo/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

function NavBar({ searchText, setSearchText , userInfo}) {

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setSearchText("");
  };

  return (
    <div className="bg-gray-100 p-3 sm:p-4 shadow-lg flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">

      <div>
         <h1 className="text-xl sm:text-2xl font-bold">
          Notes
        </h1>
      </div>

      <SearchBar
        onClick={handleClose}
        value={searchText}
        onChange={handleChange}
      />

      <ProfileInfo userInfo={userInfo} />

    </div>
  );
}

export default NavBar;