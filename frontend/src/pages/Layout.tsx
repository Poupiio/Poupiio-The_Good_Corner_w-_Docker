import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

const Layout = () => {
   const [showLogin, setShowLogin] = useState(false);
   console.log(showLogin);
   
   return (
      <main className="main-content">
         <Header setShowLogin={setShowLogin} />
         {/* Outlet sert à changer dynamiquement la page par rapport à ce qui est entré dans l'URL */}
         <Outlet />
      </main>
   );
};

export default Layout;