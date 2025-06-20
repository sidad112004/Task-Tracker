import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    // Place your POST request logic here
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-16">
        
        {/* Info Section */}
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-6xl font-bold mb-4">Sign Up Now!</h1>
          <p className="py-4 text-lg">
            Join us to access exclusive features. It's fast, easy, and free. Fill in your details to get started!
          </p>
        </div>

        {/* Signup Form */}
        <div className="card bg-base-100 w-full md:w-1/2 p-8 shadow-2xl rounded-xl">
          <form onSubmit={handleSubmit} className="card-body p-0 space-y-4">
            
            <div>
              <label className="label text-lg font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-lg input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label text-lg font-semibold">Email</label>
              <input
                type=""
                name="email"
                placeholder="example@email.com"
                className="input input-lg input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label text-lg font-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-lg input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg mt-4 w-full">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
