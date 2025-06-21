import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // ✅ import toaster
import Container from '../container/Container.jsx';

function Updateuser() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const skillsOptions = [
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'Nodejs', label: 'Nodejs' },
    { value: 'Express.js', label: 'Express.js' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Next.js', label: 'Next.js' },
    { value: 'Tailwind CSS', label: 'Tailwind CSS' },
    { value: 'Redux', label: 'Redux' },
    { value: 'GraphQL', label: 'GraphQL' },
  ];

  const roleOptions = [
    { value: 'USER', label: 'User' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'EXPERT', label: 'Expert' },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      color: '#f1f5f9',
      padding: '2px',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#1e293b',
      color: '#f1f5f9',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#334155' : 'transparent',
      color: '#f1f5f9',
      cursor: 'pointer',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#334155',
      borderRadius: '9999px',
      paddingInline: '6px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#f1f5f9',
      fontWeight: '500',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#f1f5f9',
      ':hover': {
        backgroundColor: '#0f172a',
        color: 'white',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#f1f5f9',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#94a3b8',
    }),
  };

  const handleSubmit = async () => {
    if (!email || !selectedRole || selectedSkills.length === 0) {
      toast.error("Please fill all fields.");
      return;
    }

    const data = {
      role: selectedRole.value,
      skill: selectedSkills.map(skill => skill.value),
      useremail: email,
    };

    try {
      setLoading(true);
      const res = await axios.put("http://localhost:3000/api/user/updatebyadmin", data, {
        withCredentials: true,
      });
      toast.success(res.data.message || "User updated successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
     
      <h1 className='text-3xl font-bold text-center my-5 mb-16 text-white'>Update User</h1>

      <div className="hero bg-base-200 shadow-2xl border-2 border-base-300 rounded-xl md:w-1/2 mx-auto p-10">
        <div className="hero-content flex-col w-full">
          
          {/* Email */}
          <label htmlFor="user-email" className="label">
            <span className="label-text text-white">User Email</span>
          </label>
          <input
            type="email"
            id="user-email"
            placeholder="example@email.com"
            className="input input-lg w-full bg-base-100 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Role */}
          <label htmlFor="user-role" className="label mt-4">
            <span className="label-text text-white">Role</span>
          </label>
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
            styles={customStyles}
            placeholder="Select role..."
            className="w-full"
          />

          {/* Skills */}
          <label className="label mt-4">
            <span className="label-text text-white">Skills (Select multiple)</span>
          </label>
          <Select
            isMulti
            options={skillsOptions}
            value={selectedSkills}
            onChange={setSelectedSkills}
            styles={customStyles}
            placeholder="Select skills..."
            className="w-full"
          />

          {/* Preview */}
          {selectedSkills.length > 0 && (
            <div className="mt-4 text-sm text-white">
              <strong>Selected Skills:</strong> {selectedSkills.map(skill => skill.label).join(', ')}
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-center items-center mt-5'>
        <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Submit"}
        </button>
      </div>
    </Container>
  );
}

export default Updateuser;
