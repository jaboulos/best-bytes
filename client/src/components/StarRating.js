import React from 'react';

const StarRating = ({ rating }) => {
  // store individual stars, geet stars from font-awesome
  const stars = [];

  // iterate 5 times
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // add font-awesome star into stars array
      stars.push(<i class='fas fa-star'></i>);
    } else {
      // otherwise add empty font-awesome star into stars array
      stars.push(<i class='far fa-star'></i>);
    }
  }
  return <>{stars}</>;
};

export default StarRating;
