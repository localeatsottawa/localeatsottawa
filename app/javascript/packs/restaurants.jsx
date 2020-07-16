// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import Restaurant from '../components/restaurant';
import CategoryFilterButton from '../components/category_filter_button';

class Restaurants extends React.Component {
  state = {
    loadingRestaurants: true,
    loadingCategories: true,
    showFilters: false,
    filterPickup: true,
    filterDelivery: true,
    filterUberEats: true,
    filterSkipTheDishes: true,
    filterDoorDash: true,
    restaurants: [],
    categories: [],
  }

  componentDidMount() {
    this.loadRestaurants();
    this.loadCategories();
  }

  loadCategories = () => {
    const data = {
      featured: true   
    }

    $.getJSON('/categories', data, (categories) => {
      this.setState({categories, loadingCategories: false});
    });
  }

  loadRestaurants = () => {
    this.setState({ loadingRestaurants: true, showFilters: false });

    const {
      filterPickup: pickup,
      filterDelivery: delivery,
      filterUberEats: uber_eats,
      filterSkipTheDishes: skip_the_dishes,
      filterDoorDash: door_dash,
      categoryId: category_id,
    } = this.state;

    const data = {
      pickup,
      delivery,
      uber_eats,
      skip_the_dishes,
      door_dash,
      category_id,
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

  setCategoryFilter = (category) => {
    this.setState({
      categoryId: category.id,
      selectedCategory: category
    }, this.loadRestaurants)
  }

  categoriesSortedByName = () => {
    const { categories } = this.state;
    return categories.sort((a, b) => a.name.localeCompare(b.name, undefined, { }));
  }

  render() {
    const { 
      restaurants,
      categories, 
      loadingRestaurants, 
      showFilters,
      filterPickup,
      filterDelivery,
      filterUberEats,
      filterSkipTheDishes,
      filterDoorDash,
      selectedCategory,
    } = this.state;
    
    return (
      <div className='component-restaurants'>
        <div className='restaurant-categories'>
          {this.categoriesSortedByName().map((category) => {
          return (
            <CategoryFilterButton 
              key={category.id}
              onClick={this.setCategoryFilter} 
              category={category}
              selectedCategory={selectedCategory}
            />
            );
        })}
        </div>
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
                    <label className='checkbox-label' htmlFor='filter-pickup'>Takeout</label>
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
            !loadingRestaurants &&
              (
                restaurants.length > 0 ?
                  restaurants.map((restaurant) => {
                    return (<Restaurant key={restaurant.id} restaurant={restaurant} />)
                  })
                :
                  <div className='empty-state-message card'>
                    We're sorry, but there are no restaurants that match the filters you have selected.
                  </div>
              )
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
