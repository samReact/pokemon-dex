import React from 'react';


const Pills = (props) => {

  const {title, type} = props;
  return (
    <span className={`pills -${type}`}>{title}</span>
  );
};

export default Pills;