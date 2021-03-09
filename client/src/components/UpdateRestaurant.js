import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Restaurants } from '../apis';
import { RestaurantsContext } from '../context/RestaurantsContext';
// TODO refactor using yup + formik, change price_range input to select

const UpdateRestaurant = (props) => {
  // determine what restaurant needs to be updated by grabbing the id from the URL
  const { id } = useParams();
  let history = useHistory();
  const { restaurants } = useContext(RestaurantsContext);
  // make all inputs controlled, define state for each input
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  // context api fetches when coming from RestaurantList component.
  // handle issue if user comes directly to this page or refreshes, need to make api call for those scenarios as well
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: {
          data: { restaurants },
        },
      } = await Restaurants.get(`/${id}`);
      // set values of input fields to values that are retrieved when page loads
      setName(restaurants.name);
      setLocation(restaurants.location);
      setPriceRange(restaurants.price_range);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Restaurants.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push('/');
  };

  return (
    <div>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id='name'
            className='form-control'
            type='text'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id='location'
            className='form-control'
            type='text'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id='price_range'
            className='form-control'
            type='number'
          />
        </div>
        <button
          className='btn btn-primary'
          type='submit'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
