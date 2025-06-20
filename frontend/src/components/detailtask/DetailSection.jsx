import React from 'react';

function DetailSection({ title, children, defaultChecked }) {
  return (
    <div className="collapse bg-base-100 border border-base-300">
      <input type="radio" name="accordion" defaultChecked={defaultChecked} />
      <div className="collapse-title font-semibold">{title}</div>
      <div className="collapse-content text-sm">{children}</div>
    </div>
  );
}

export default DetailSection;
