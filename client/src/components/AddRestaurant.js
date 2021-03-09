import React, { useState, useContext } from 'react';
import { Restaurants } from '../apis';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  // bring addRestaurants function from context to update state after adding a restaurant
  const { addRestaurants } = useContext(RestaurantsContext);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');

  const handleSubmit = async (e) => {
    // prevent page reload on submit
    e.preventDefault();
    try {
      // send data to post route
      // destructure response : data.data.restaurants
      const {
        data: {
          data: { restaurants },
        },
      } = await Restaurants.post('/', {
        name,
        location,
        price_range: priceRange,
      });
      // update state after post request
      addRestaurants(restaurants);
    } catch (error) {}
  };
  return (
    <div className='mb-4'>
      <form action=''>
        <div className='form-row'>
          <div className='col'>
            {/* make controlled inputs */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className='form-control'
              placeholder='name'
            />
          </div>
          <div className='col'>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='form-control'
              type='text'
              placeholder='location'
            />
          </div>
          <div className='col'>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className='custom-select my-1 mr-sm-2'
            >
              <option disabled>Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type='submit'
            className='btn btn-primary'
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
