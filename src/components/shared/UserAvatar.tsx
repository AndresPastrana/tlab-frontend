import { useAuth } from "../../hooks/useAuth";

const UserAvatar = () => {
  const { user } = useAuth();
  return (
    <div className={`${!user && "hidden"} ml-6`}>
      <div className="avatar online placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-16">
          <span className="text-xl">{user?.username.slice(0, 2)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
