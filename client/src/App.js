import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, UpdatePage, RestaurantDetailPage } from './pages';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
  return (
    // wrap app with context API
    <RestaurantsContextProvider>
      <div className='container'>
        <Router>
          {/* Wrap in switch to prevent react router from loading multiple components */}
          <Switch>
            {/* Load a page based on route */}
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/restaurants/:id/update'
              component={UpdatePage}
            />
            <Route
              exact
              path='/restaurants/:id'
              component={RestaurantDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
