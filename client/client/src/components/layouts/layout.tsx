import { Outlet } from "react-router-dom";
import "./layout.css";
import { Header } from "./header/Header";
import Footer from "./footer/Footer";

export function Layout() {
  return (
      <div className="min-h-screen">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  );
}
