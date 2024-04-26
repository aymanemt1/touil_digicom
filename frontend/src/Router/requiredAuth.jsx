    import { useContext, useEffect } from "react";
    import { Navigate, Outlet, useNavigate } from "react-router-dom";
    import { LangueContext } from "../Context/LangueContext";

    export default function RequiredAuth() {
        const { isauth, setisauth } = useContext(LangueContext);
        const navigate = useNavigate();
      
        useEffect(() => {
          const token = sessionStorage.getItem("token");
          const valid = sessionStorage.getItem("valid") === "true";
      
          if (token && valid) {
            setisauth(true);
          } else {
            navigate("/login");
          }
        }, [navigate, setisauth]);
      
        if (isauth ) {
          return <Outlet />;
        } else {
          return <Navigate to="/login" />;
        }
      }