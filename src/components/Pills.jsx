import React from 'react';


const Pills = (props) => {

  const {title} = props;
  return (
    <span className={`pills -${title}`}>{title}</span>
  );
};

export default Pills;