import { NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  const onLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <NavLink to="/tasks" className={navClass} end>
              Tasks
            </NavLink>
            <NavLink to="/tasks/new" className={navClass}>
              New Task
            </NavLink>
          </div>

          <button
            onClick={onLogout}
            className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white"
          >
            Logout
          </button>
        </div>

        {isNavigating && <div className="h-0.5 w-full animate-pulse bg-blue-600" />}
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
