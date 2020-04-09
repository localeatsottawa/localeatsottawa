// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import Restaurant from '../components/restaurant';

class Restaurants extends React.Component {
  state = {
    loadingRestaurants: true,
    showFilters: true,
    filterPickup: true,
    filterDelivery: true,
    filterUberEats: true,
    filterSkipTheDishes: true,
    filterFoodora: true,
    filterDoorDash: true,
    restaurants: []
  }

  componentDidMount() {
    this.loadRestaurants();
  }

  loadRestaurants = () => {
    this.setState({ loadingRestaurants: true, showFilters: false });

    const {
      filterPickup: pickup,
      filterDelivery: delivery,
      filterUberEats: uber_eats,
      filterSkipTheDishes: skip_the_dishes,
      filterFoodora: foodora,
      filterDoorDash: door_dash,
    } = this.state;

    const data = {
      pickup,
      delivery,
      uber_eats,
      skip_the_dishes,
      foodora,
      door_dash,
    }

    $.getJSON('/restaurants', data, (restaurants) => {
      this.setState({restaurants, loadingRestaurants: false});
    });
  }

  toggleFilters = (e) => {
    e.preventDefault();

    const { showFilters } = this.state;
    this.setState({ showFilters: !showFilters });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { 
      restaurants, 
      loadingRestaurants, 
      showFilters,
      filterPickup,
      filterDelivery,
      filterUberEats,
      filterSkipTheDishes,
      filterFoodora,
      filterDoorDash,
    } = this.state;
    return (
      <div className='component-restaurants'>
        <div className='restaurant-actions'>
          <div className="left-section">
            <a href='#' className='btn btn-secondary' onClick={this.toggleFilters}>
              <i className='fas fa-sliders-h'></i> Filter
            </a>
            {
              showFilters &&
              <div className='filters-pop-up pop-up'>
                <div className='header'>Filters</div>
                <form className='fields'>
                  <div className='field'>
                    <input
                      id='filter-pickup'
                      name="filterPickup"
                      type="checkbox"
                      checked={filterPickup}
                      onChange={this.handleInputChange} />
                    <label className='checkbox-label' htmlFor='filter-pickup'>Pickup</label>
                  </div>
                  <div className='field'>
                    <input
                      id='filter-delivery'
                      name="filterDelivery"
                      type="checkbox"
                      checked={filterDelivery}
                      onChange={this.handleInputChange} />
                    <label className='checkbox-label' htmlFor='filter-delivery'>Delivery</label>
                  </div>
                  <div className='field'>
                    <input
                      id='filter-uber-eats'
                      name="filterUberEats"
                      type="checkbox"
                      checked={filterUberEats}
                      onChange={this.handleInputChange} />
                    <label className='checkbox-label' htmlFor='filter-uber-eats'>Uber Eats</label>
                  </div>
                  <div className='field'>
                    <input
                      id='filter-skip-the-dishes'
                      name="filterSkipTheDishes"
                      type="checkbox"
                      checked={filterSkipTheDishes}
                      onChange={this.handleInputChange} />
                    <label className='checkbox-label' htmlFor='filter-skip-the-dishes'>Skip the Dishes</label>
                  </div>
                  <div className='field'>
                    <input
                      id='filter-foodora'
                      name="filterFoodora"
                      type="checkbox"
                      checked={filterFoodora}
                      onChange={this.handleInputChange} />
                    <label className='checkbox-label' htmlFor='filter-foodora'>Foodora</label>
                  </div>
                  <div className='field'>
                    <input
                      id='filter-door-dash'
                      name="filterDoorDash"
                      type="checkbox"
                      checked={filterDoorDash}
                      onChange={this.handleInputChange} />
                    <label className='checkbox-label' htmlFor='filter-door-dash'>DoorDash</label>
                  </div>
                  <div className='actions'>
                    <a href="#" onClick={(e) => { e.preventDefault(); this.loadRestaurants()}} className='btn btn-primary'>Submit</a>
                  </div>
                </form>
              </div>
            }
          </div>
          <div className='right-section'>
            <a href='/tickets/new' className='btn btn-secondary'>
              <i className='far fa-envelope'></i> Submit Feedback
            </a>
            {' '}
            <a href="/restaurants/new" className='btn btn-primary'>
              <i className='fas fa-plus'></i> Add restaurant
            </a>
          </div>
        </div>
        <div className='restaurants'>
          {
            loadingRestaurants &&
            <React.Fragment>
              <div className='loading-restaurant'></div>
              <div className='loading-restaurant'></div>
              <div className='loading-restaurant'></div>
              <div className='loading-restaurant'></div>
              <div className='loading-restaurant'></div>
              <div className='loading-restaurant'></div>
            </React.Fragment>
          }
          {
            !loadingRestaurants && restaurants.map((restaurant) => {
              return (<Restaurant key={restaurant.id} restaurant={restaurant} />)
            })
          }
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('restaurants-mount-point');

  if (element) {
    ReactDOM.render(
      <Restaurants />,
      element
    )
  }
})
