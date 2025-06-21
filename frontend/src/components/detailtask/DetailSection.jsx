import React from 'react';

function DetailSection({ title, children, defaultChecked }) {
  return (
    <div className="collapse bg-base-100 border border-base-300 text-2xl">
      <input type="radio" name="accordion" defaultChecked={defaultChecked} />
      <div className="collapse-title font-semibold">{title}</div>
      <div className="collapse-content textarea-lg">{children}</div>
    </div>
  );
}

export default DetailSection;
