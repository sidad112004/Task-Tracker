import React from 'react';

function DetailHeaderRow({ label, value }) {
  return (
    <div className="flex justify-between px-4 py-2 border-b border-base-300">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default DetailHeaderRow;
