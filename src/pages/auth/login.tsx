import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../const";
import { AuthService } from "../../services/AuthService";

const PageLogin = () => {
  const { login, token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const { token, user } = await AuthService.login({ username, password });
      login(token, user); // Assuming login function from useAuth sets the token and user in context
      console.log("Login successful. Token:", token);
      console.log("Decoded User Information:", user);
    } catch (error) {
      console.log(error);

      console.error("Login failed:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !token) return;
    console.log("Efectttt");
    console.log(user);
    console.log(token);

    if (user?.role === UserRole.Admin) {
      navigate("/admin", { replace: true });
      return;
    }

    if (user?.role === UserRole.Profesor) {
      navigate("/professor", { replace: true });
      return;
    }

    if (user?.role === UserRole.Student) {
      navigate("/student", { replace: true });
      return;
    }
  }, [user, token, navigate]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">Nombre de usuario </label>
              <input
                defaultValue="userinfoupr"
                type="text"
                name="username"
                placeholder="Escribe tu nombre de usuario aqui"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contrasena</span>
              </label>
              <input
                defaultValue="0bz2Neyw"
                type="password"
                name="password"
                placeholder="Escribe tu contarsena aqui"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                aria-disabled={loading}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
