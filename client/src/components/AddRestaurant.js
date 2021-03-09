import React, { useContext } from 'react';
import { Form, Formik, Field } from 'formik';

import { Restaurants } from '../apis';
import { RestaurantsContext } from '../context/RestaurantsContext';
// validation schema that uses yup validation for form fields
import Validation from '../validation/RestaurantValidation';

// formik state
const initialValues = {
  name: '',
  location: '',
  priceRange: '',
};

const AddRestaurant = () => {
  // bring addRestaurants function from context to update state on page after adding a restaurant
  const { addRestaurants } = useContext(RestaurantsContext);

  return (
    <div className='mb-4'>
      {/* need to wrap formik forms with formik component, gain access to formik props */}
      <Formik
        initialValues={initialValues}
        validationSchema={Validation}
        // values are the initialValues declared above
        onSubmit={async (values) => {
          try {
            // send data to post route
            // destructure response, without destructure it looks like this -> data.data.restaurants
            const {
              data: {
                data: { restaurants },
              },
            } = await Restaurants.post('/', {
              name: values.name,
              location: values.location,
              price_range: values.priceRange,
            });
            // update state after post request
            addRestaurants(restaurants);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form action=''>
            <div className='form-row'>
              <div className='col'>
                {/* Formik field components act as inputs, faster way of creating forms.
                No need for things like onChange handlers for example.
              */}
                <Field
                  name='name'
                  type='text'
                  className='form-control'
                  placeholder='name'
                />
                {/* Render error message if validation schema is violated */}
                {errors.name && touched.name ? (
                  <div style={{ color: 'red', fontWeight: 'bold' }}>
                    {errors.name}
                  </div>
                ) : null}
              </div>
              <div className='col'>
                <Field
                  name='location'
                  className='form-control'
                  type='text'
                  placeholder='location'
                />
                {errors.location && touched.location ? (
                  <div style={{ color: 'red', fontWeight: 'bold' }}>
                    {errors.name}
                  </div>
                ) : null}
              </div>
              <div className='col'>
                <Field
                  //For 'select' form fields, give prop 'as' and specify the type of element
                  as='select'
                  name='priceRange'
                  className='custom-select my-1 mr-sm-2'
                >
                  <option value=''>Select an option</option>
                  <option value='1'>$</option>
                  <option value='2'>$$</option>
                  <option value='3'>$$$</option>
                  <option value='4'>$$$$</option>
                  <option value='5'>$$$$$</option>
                </Field>
                {errors.priceRange && touched.priceRange ? (
                  <div style={{ color: 'red', fontWeight: 'bold' }}>
                    {errors.priceRange}
                  </div>
                ) : null}
              </div>
              <button
                // Formik takes care of submit by changing the type to submit, no need for onClick listener
                type='submit'
                className='btn btn-primary'
              >
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRestaurant;
