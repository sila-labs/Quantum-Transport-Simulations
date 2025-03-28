// frontend/src/components/Layout.jsx
import React from "react";

const Layout = ({ sidebar, children }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 border-r border-gray-300 p-4">
        {sidebar}
      </aside>
      <main className="flex-1 bg-white overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
