import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../const";
import { AuthService } from "../../services/AuthService";

// Texts for the Login Page
const loginPageTexts = {
  title: "¡Inicia sesión ahora!",
  subtitle:
    "Potenciando el Futuro: Tesis Lab, tu aliado en el camino hacia el éxito académico en Ingeniería Informática en la Universidad de Pinar del Río.",
  usernameLabel: "Nombre de usuario",
  usernamePlaceholder: "Escribe tu nombre de usuario aquí",
  passwordLabel: "Contraseña",
  passwordPlaceholder: "Escribe tu contraseña aquí",
  forgotPasswordLink: "¿Olvidaste tu contraseña?",
  error: "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.",
  buttonText: "Autenticar",
  loadingText: "Autenticando...",
};

const PageLogin = () => {
  const { login, token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const { token, user } = await AuthService.login({ username, password });
      login(token, user);
    } catch (error) {
      setError(loginPageTexts.error);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !token) return;

    if (user?.role === UserRole.Admin) {
      navigate("/admin", { replace: true });
      return;
    }

    if (user?.role === UserRole.Profesor) {
      navigate("/profesors", { replace: true });
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
          <h1 className="text-5xl font-bold">{loginPageTexts.title}</h1>
          <p className="py-6">{loginPageTexts.subtitle}</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">{loginPageTexts.usernameLabel}</label>
              <input
                defaultValue="userinfoupr"
                type="text"
                name="username"
                placeholder={loginPageTexts.usernamePlaceholder}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {loginPageTexts.passwordLabel}
                </span>
              </label>
              <input
                defaultValue="WuiR30cu"
                type="password"
                name="password"
                placeholder={loginPageTexts.passwordPlaceholder}
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  {loginPageTexts.forgotPasswordLink}
                </a>
              </label>
            </div>

            <div className="form-control mt-4 text-error text-sm font-semibold h-[40px] text-center">
              {error ? loginPageTexts.error : ""}
            </div>

            <div className="form-control mt-6">
              <button
                aria-disabled={loading}
                disabled={loading}
                className="btn bg-green-600 text-gray-50 hover:bg-green-800"
              >
                {loading
                  ? loginPageTexts.loadingText
                  : loginPageTexts.buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
