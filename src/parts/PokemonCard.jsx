import React from 'react';

const PokemonCard = ({pokemon}) => {
  const {image, name} = pokemon;
  return (
    <div className="pokemon-card">
      <div className="image-container">
        <img src={image} alt={name} className='image' />
      </div>
      <h5 className='name'>{name}</h5>
    </div>
  );
};

export default PokemonCard;