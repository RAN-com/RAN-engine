import { Link, Routes, Route } from "react-router-dom";
import AdminPanel from "./Admin";


const AdminLayout = () => {
  return (
    <div className="h-screen flex">
      <aside className="w-40 bg-gray-800 p-5">
        <h2 className="text-white text-lg font-bold">Admin Dashboard</h2>
        <nav className="mt-5">
          <ul>
            <li><Link to="/admin" className="text-white">Dashboard</Link></li>
            <li><Link to="/admin/users" className="text-white">Manage Users</Link></li>
            <li><Link to="/admin/games" className="text-white">Manage Games</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<AdminPanel />} />
    
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
