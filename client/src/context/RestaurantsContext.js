/*
Constext benefit: All components in app can retrieve data, dont need to worry
about passing data as props or lifting state, all components have
access to context API.
*/

import React, { useState, createContext } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  // store restaurants from api call to restaurants endpoint
  // setRestaurants will update a restaurant
  const [restaurants, setRestaurants] = useState([]);

  // create new state in context when user selects a restaurant from RestaurantList component
  // so that the application knows what the user has selected
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // after adding a restaurant on the UI, update the state
  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  return (
    // pass value of restaurants to all components and setRestaurants to be able to update state
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
