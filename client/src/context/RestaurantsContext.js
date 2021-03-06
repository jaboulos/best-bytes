/*
context API vs local state
results stored in context API

Benefit: All components in app can retrieve data, dont need to worry
about passing data as props or lifting state, all components have
access to context API.
*/

import React, { useState, createContext } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  // store restaurants from api call to restaurants endpoint
  // setRestaurants will update a restaurant
  const [restaurants, setRestaurants] = useState([]);

  return (
    // pass value of restaurants to all components and setRestaurants to be able to update state
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {props.children}
    </RestaurantsContext.Provider>
  );
};
