import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState(localStorage.getItem("rememberedPassword") || "");
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("rememberedEmail"));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://auth.bytebandits.in/user/admin", {
        method: "POST",
        headers: {
          Authorization: "9f3a7c2d8e6b1a47",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || "Login failed");

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      navigate("/home-management");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-archivo relative">
      {/* Background image */}
     <div className="relative w-full overflow-hidden">
  <img src="/back.png" alt="Background" className="w-full h-[45dvh] object-cover " />
  <div className="ocean ">
    <div className="wave"></div>
    <div className="wave"></div>
  </div>
</div>


      {/* Content Area */}
      <div className="w-full max-w-sm mx-auto px-6 mt-4 flex-1">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src="/logo.png" alt="Logo" className="h-14" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#00285d] mb-5">
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="User Name"
              className="w-full pl-10 pr-3 py-3 rounded-md bg-[#d4d8de] border border-[#a3aab1] text-sm placeholder-blue-900 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 rounded-md bg-[#d4d8de] border border-[#a3aab1] text-sm placeholder-blue-900 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Remember Me */}
          <div className="flex items-center text-sm text-gray-600 ">
            <input
              id="rememberMe"
              type="checkbox"
              className="mr-2 accent-blue-900 mb-8 "
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe" className="mb-8"> Remember Me</label>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#00285d] text-white py-3 rounded-full font-semibold hover:bg-blue-800 transition duration-300 "
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
