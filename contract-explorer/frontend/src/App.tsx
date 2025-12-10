import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { DynamicPage } from "./pages/DynamicPage";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Contract Explorer</h1>
      <p className="text-gray-600 mt-2">
        select the left side page auto refrace .
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      
      <Sidebar />

      
      <div className="flex-1 border-l border-slate-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/:url" element={<DynamicPage />} />
        </Routes>
      </div>
    </div>
  );
}
