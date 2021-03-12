import React from 'react';

const StarRating = ({ rating }) => {
  // store individual stars, geet stars from font-awesome
  const stars = [];

  // iterate 5 times
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // add font-awesome star into stars array
      stars.push(<i className='fas fa-star'></i>);
      // If ratings value rounded up is i and if rating has a decimal
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i className='fas fa-star-half-alt'></i>);
    } else {
      // otherwise add empty font-awesome star into stars array
      stars.push(<i className='far fa-star'></i>);
    }
  }
  return <>{stars}</>;
};

export default StarRating;
