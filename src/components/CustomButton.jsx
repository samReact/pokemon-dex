import React from 'react';

const CustomButton = (props) => {
  const {title, onClick, block, type, disabled, pulse} = props;
  return (
    <button className={`btn-custom -${type} ${block && `-block`} ${pulse && `-pulse`}`} disabled={disabled} onClick={onClick} > {title}</button >
  );
};

export default CustomButton;