import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-end bg-primary h-16 items-center gap-10 pr-5">
      <a href="#" className="p-2 px-4 text-white font-bold text-xl">
        Dashboard
      </a>
      <a href="#" className="p-2 px-4 text-white font-bold text-xl">
        Penjualan
      </a>
      <a href="#" className="mr-6 p-2 px-4 text-white font-bold text-xl">
        Logout
      </a>
    </nav>
  );
}

export default Navbar;
