import React from 'react';

function Container({ children }) {
  return (
    <div className="container mx-auto px-5 py-5 md:px-7 md:py-7 md:my-7">
      {children}
    </div>
  );
}

export default Container;
