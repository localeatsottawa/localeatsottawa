// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import Restaurant from '../components/restaurant';

class Restaurants extends React.Component {
  state = {
    restaurants: []
  }

  componentDidMount() {
    this.loadRestaurants();
  }

  loadRestaurants = () => {
    $.getJSON('/restaurants', (restaurants) => {
      this.setState({restaurants});
    });
  }

  render() {
    const { restaurants } = this.state;
    return (
      <div className='component-restaurants'>
        <div className='restaurants'>
          {
            restaurants.map((restaurant) => {
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
