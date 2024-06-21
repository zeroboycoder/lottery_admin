import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "../components/nav/nav";

const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check the agent is login or not
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("adminId");
    if (!token || !adminId) {
      return navigate("/admin/login");
    } else {
      if (location.pathname === "/login") {
        return navigate("/admin/");
      }
    }
  }, []);

  return (
    <>
      <Nav />
      <div style={{ margin: "84px 0" }}></div>
      {props.children}
    </>
  );
};

export default Layout;
