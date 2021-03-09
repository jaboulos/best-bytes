const yup = require('yup'); // form field validation library

// validation schema for form AddRestaurants component form fields
const Validation = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too short!')
    .max(25, 'Too long!')
    .required('Enter restaurant name'),
  location: yup
    .string()
    .min(2, 'Too short!')
    .max(25, 'Too long!')
    .required('Enter a location'),
  priceRange: yup.string().required('Select a price range'),
});

export default Validation;
