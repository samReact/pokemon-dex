import React from 'react';

const HealthBar = (props) => {
  const {completed} = props;

  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: completed <= 10 ? 'red' : 'green',
  };

  return (
    <div className="healthbar-container">
      <div style={fillerStyles} className="healthbar-fill">
        <span className="healthbar-label">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default HealthBar; 