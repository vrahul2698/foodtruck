import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const CommonLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <div className="text-2xl font-bold p-4 shadow-sm">
        🍓Food Truck
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default CommonLayout;
