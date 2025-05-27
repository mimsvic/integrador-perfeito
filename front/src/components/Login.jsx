import React, { useState } from 'react';

// Para fonte Poppins funcionar, adicione no index.html:
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Erro ao fazer login');
      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      if (onLogin) onLogin();
    } catch (error) {
      alert('Erro no login. Verifique seu usuário e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gray-100"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Ilustração à esquerda */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-teal-400 to-cyan-400 items-center justify-center p-10">
          <svg width="270" height="270" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="55" y="40" width="160" height="200" rx="20" fill="#fff"/>
            <circle cx="135" cy="90" r="32" fill="#06d6a0"/>
            <rect x="82" y="140" width="104" height="18" rx="6" fill="#06d6a0" />
            <rect x="82" y="170" width="104" height="18" rx="6" fill="#06d6a0" />
          </svg>
        </div>

        {/* Formulário à direita */}
        <div className="w-full md:w-1/2 flex flex-col justify-center py-12 px-8 md:px-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to</h2>
            <h1 className="text-3xl font-extrabold text-teal-500 mt-1">Smart City!</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 font-semibold" htmlFor="username">
                User
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200 focus-within:ring-2 ring-teal-400">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" />
                </svg>
                <input
                  id="username"
                  type="text"
                  placeholder="seu_usuario"
                  className="bg-transparent flex-1 outline-none text-gray-700 font-medium"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-semibold" htmlFor="password">
                Password
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200 focus-within:ring-2 ring-teal-400">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a4 4 0 0 0-4 4v3H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-1V6a4 4 0 0 0-4-4zm-2 4a2 2 0 1 1 4 0v3H8V6zm-3 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5z"/>
                </svg>
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="**********"
                  className="bg-transparent flex-1 outline-none text-gray-700 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="focus:outline-none ml-2"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPass ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4.477-9-7s4-7 9-7c1.005 0 1.97.144 2.875.413M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 3l18 18M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-5.12M6.53 6.53A10.05 10.05 0 0 0 3 12c0 2.523 4 7 9 7 1.61 0 3.14-.32 4.47-.88M17.47 17.47A10.05 10.05 0 0 0 21 12c0-2.523-4-7-9-7-1.61 0-3.14.32-4.47.88" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center text-gray-600 text-sm">
                <input type="checkbox" className="mr-2 accent-teal-400" />
                Remember me
              </label>
              <a href="#" className="text-teal-500 hover:underline text-sm font-medium">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full py-3 mt-2 rounded-lg bg-teal-400 hover:bg-teal-500 text-white font-bold text-lg transition ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-6 text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-teal-500 font-bold hover:underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;