import React, { useState } from "react";
import { useLogin } from "../../hooks/Auth/useLogin";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useLogin()

  const handleEmailInput = (event) => {
    setEmail(event.target.value + '@cuilahore.edu.pk') 
  }
  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await login(email, password)
    if(response){
      if(response.status === 'success')
        navigate('/supervisor/add-group')
    }
  }
 
  return (
    <div
      className="bg-cover bg-center h-screen relative"
      style={{ backgroundImage: "url('/Assets/auth-bg.jpg')" }}
    >
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 items-center">
        <div className="backdrop-blur-md bg-white/30">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-blue-950 flex items-center justify-center h-32">
            <img
              className="w-full h-full object-contain"
              src="/Assets/logo.png"
              alt="Your Company"
            />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center items-center mb-4 mr-2">
              <h2 className="text-2xl font-medium tracking-tight text-black text-center">
                Nice to see you again
              </h2>
            </div>

            <form className="space-y-5" action="#" method="POST" onSubmit={handleLogin}>
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 pr-7 relative right-24"
                >
                  Email address
                </label>
                <div className="mt-2 relative max-w-xs mx-auto">
                  <input
                    placeholder="Email"
                    id="email"
                    name="email"
                    type=""
                    required
                    onChange={handleEmailInput}
                    className="block w-full pr-32 rounded-md border-0 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm pointer-events-none font-thin">
                    @cuilahore.edu.pk
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900 pr-7 relative right-28"
                >
                  Password
                </label>
                <div className="mt-2 relative max-w-xs mx-auto">
                  <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={handlePasswordInput}
                    className="block w-full rounded-md border-0 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-950 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ml-8"></div>
                  <span className="ml-1 text-sm font-small text-gray-900 dark:text-gray-300">
                    Remember me
                  </span>
                </label>
                <a
                  href="WrongPassword_email.html"
                  className="font-small text-sky-500 hover:text-blue-950 text-sm pr-8"
                >
                  Forgot password?
                </a>
              </div>

              <div className="mt-2 relative max-w-xs mx-auto">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <hr className="h-px my-8 bg-white border-0 dark:bg-white w-3/4 mx-auto" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
