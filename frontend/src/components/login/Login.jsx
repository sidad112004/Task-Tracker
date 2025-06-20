import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // You can add your login API call here
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-16">
        
        {/* Left info panel */}
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-5xl font-bold mb-4">Login Now!</h1>
          <p className="py-4 text-lg">
            Welcome back! Please enter your credentials to log in and continue.
          </p>
        </div>

        {/* Login Form */}
        <div className="card bg-base-100 shadow-2xl md:w-96 w-full p-8 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type=""
                name="email"
                placeholder="example@email.com"
                className="input input-bordered input-lg w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered input-lg w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-right">
              <a href="#" className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
