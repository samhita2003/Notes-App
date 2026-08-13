import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";

function Layout() {

  const [searchText, setSearchText] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  return (
    <>
      <NavBar
        searchText={searchText}
        setSearchText={setSearchText}
        userInfo={userInfo}
      />

      <Outlet context={{ searchText, userInfo,
          setUserInfo }} />

      <Footer />
    </>
  );
}

export default Layout;