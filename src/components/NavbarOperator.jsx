import React from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const logout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const penjualan = () => {
    navigate("/penjualanoperator");
  };

  const terimaBBM = () => {
    navigate("/terimabbm");
  };
  
  return (
    <nav className="flex justify-end bg-primary h-16 items-center gap-10 pr-5">
      <a href="#" className="p-2 px-4 text-white font-bold text-xl">
        Dashboard
      </a>
      <button
        className="p-2 px-4 text-white font-bold text-xl"
        onClick={terimaBBM}
      >
        Terima BBM
      </button>
      <button
        className="p-2 px-4 text-white font-bold text-xl"
        onClick={penjualan}
      >
        Penjualan
      </button>
      <button
        className="mr-6 p-2 px-4 text-white font-bold text-xl"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
