import React, { useEffect, useContext } from 'react';
import { Restaurants } from '../apis';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';

const RestaurantList = (props) => {
  // save data from useEffect call, store it within restaurants value from context state
  // destructure properties passed from value prop from RestaurantsContext
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  // route user to new page 'update' for a given restaurant that they have clicked on and want to update
  // access history API to do this with useHistory hook from react-router-dom
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      // tryCatch block for async calls
      try {
        // destructure response from api call
        const {
          data: {
            data: { restaurants },
          },
        } = await Restaurants.get('/'); // baseURL + '/'
        // call setRestaurants to set the state to the api calls value
        // without destructuring ===> setRestaurants(response.data.data.restaurants);
        setRestaurants(restaurants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // pass empty dependency array to run the hook only when component mounts

  const handleUpdate = async (id) => {
    // tell react router to route to the /restaurants/id/update route
    history.push(`/restaurants/${id}/update`);
  };

  const handleDelete = async (id) => {
    try {
      await Restaurants.delete(`/${id}`);
      // update UI after delete, filter out restaurants whos id we want to delete from context
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='list-group'>
      <table className='table table-secondary table-striped table-hover'>
        <thead>
          <tr>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location} </td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>1star</td>
                <td>
                  {/* Update a restaurant */}
                  <button
                    className='btn btn-info'
                    onClick={() => handleUpdate(restaurant.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  {/* Delete restaurant from list */}
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(restaurant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
