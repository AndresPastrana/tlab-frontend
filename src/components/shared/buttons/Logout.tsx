import { useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    const redirectToPath = "/login";
    navigate(redirectToPath);
  };

  return (
    <div
      onClick={handleLogout}
      className="hover:cursor-pointer flex py-3 px-2 rounded-lg gap-2 hover:bg-neutral-200 lg:px-4 lg:py-2 lg:hover:text-accent-focus"
    >
      <ArrowLeftOnRectangleIcon className="w-5 -h-5" />
      <p>Logout</p>
    </div>
  );
};

export default Logout;
