import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

const Layout = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   console.log("connecté ou pas", isLoggedIn);
   
   return (
      <main className="main-content">
         <Header setIsLoggedIn={setIsLoggedIn} />
         {/* Outlet sert à changer dynamiquement la page par rapport à ce qui est entré dans l'URL */}
         <Outlet />
      </main>
   );
};

export default Layout;