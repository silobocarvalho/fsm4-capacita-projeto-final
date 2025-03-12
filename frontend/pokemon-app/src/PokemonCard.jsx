import React from 'react';

const PokemonCard = ({ pokemon }) => {
 return (
<div className="pokemon-card">
   <img src={pokemon.img_url} alt={pokemon.nome} className="pokemon-image" />
   <div className="pokemon-info">
    <h3>{pokemon.nome}</h3>
    <p><strong>ID:</strong> {pokemon.id_pokemon}</p>
    <p><strong>Tipo:</strong> {pokemon.tipo}</p>
    <p><strong>Preço:</strong> {pokemon.preco < 300 ? 'PROMOÇÃO - R$ ' + pokemon.preco  : 'R$ ' + pokemon.preco }</p>
    <p><strong>Raridade:</strong> {pokemon.raridade}</p>
   </div>
  </div>
 );
};
export default PokemonCard;