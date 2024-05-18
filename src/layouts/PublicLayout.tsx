import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const PublicLayout = () => {
  return (
    <>
      <main className="flex h-screen">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
