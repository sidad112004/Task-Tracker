import React from 'react';

function Taskcard() {
  return (
    <div className="card bg-base-200 w-full max-w-sm mx-auto shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>
          A card component has a figure, a body part, and inside body there are title and actions parts.
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Taskcard;
