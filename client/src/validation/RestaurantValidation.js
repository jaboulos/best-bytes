const yup = require('yup'); // form field validation library

// validation schema for form AddRestaurants component form fields
const Validation = yup.object().shape({
  name: yup.string().required('Required'),
  location: yup.string().required('Required'),
  priceRange: yup.string().required('Required'),
});

export default Validation;
