import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="p-4 bg-gray-100 border-b border-gray-600">
        <Link to="/" className="mr-4 hover:text-blue-600">
          Home
        </Link>
      </nav>

      <main className="mt-2">
        <Outlet />
      </main>
    </div>
  );
}
