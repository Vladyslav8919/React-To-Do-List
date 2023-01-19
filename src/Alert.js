import React, { useEffect } from 'react';

const Alert = ({ show, msg, type, hideAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [show]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
