import React from 'react'
import Container from '../container/Container.jsx'


function Createtask() {
    return (
        <Container>
            <h1 className='text-3xl font-bold text-center my-5 mb-16 '>
                Create Task
            </h1>
            <div className="hero bg-base-200 shadow-2xl boarder-2 border-base-300 rounded-4xl md:w-1/2 flex justify-center items-center mx-auto p-10">
                <div className="hero-content flex-col lg:flex-col w-full">
                    <label htmlFor="task-title" className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input type="text" id="task-title" placeholder="Large" className="input input-lg w-full" />
                    <label htmlFor="task-description" className="label">
                        <span className="label-text">Task Description</span>
                    </label>
                    <input type="text" id="task-description" placeholder="Large" className="input input-lg w-full" />
                </div>

            </div>
            <div className='flex justify-center items-center mt-5'>
                <button className="btn btn-xs btn-primary sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Responsive</button>
            </div>

        </Container>
    )
}

export default Createtask