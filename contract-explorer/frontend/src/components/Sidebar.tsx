import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { Loader } from "./Loader";

import { api } from "../api";

type Page = {
  _id: string;
  title: string;
  url: string;
  rank: number;
};

export const Sidebar = () => {
  const location = useLocation();

  const { data: pages, isLoading } = useQuery<Page[]>({
    queryKey: ["pages"],
    queryFn: async () => {
      const res = await api.get("/api/pages");
      return res.data;
    },
  });

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Pages</h2>

      {isLoading && (
  <div className="mb-2">
    <Loader />
  </div>
)}


      <nav className="space-y-2">
        <Link
          to="/"
          className={`block px-3 py-2 rounded text-sm ${
            location.pathname === "/"
              ? "bg-slate-900 text-white"
              : "hover:bg-slate-100"
          }`}
        >
          Home
        </Link>

        {pages?.map((page) => {
          const path = `/pages/${page.url}`;
          const active = location.pathname === path;

          return (
            <Link
              key={page._id}
              to={path}
              className={`block px-3 py-2 rounded text-sm ${
                active
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-100 text-slate-800"
              }`}
            >
              {page.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
