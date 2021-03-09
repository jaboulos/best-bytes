import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { Restaurants } from '../apis';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    //retrieve data of selected restaurant and store in state variable in context
    const fetchData = async () => {
      try {
        const response = await Restaurants.get(`/${id}`);
        // update global state to tell rest of app what the selected restaurant is
        setSelectedRestaurant(response.data.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // add conditional to make sure name is rendered only when the state selectedRestaurant is defined
  return <div>{selectedRestaurant && selectedRestaurant.name}</div>;
};

export default RestaurantDetailPage;
