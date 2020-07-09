import React from 'react';
import Location from './location';

class Restaurant extends React.Component {
  render() {
    const { restaurant } = this.props;
    return (
      <div className='component-restaurant card'>
        <div className='header'>
          <h2>{restaurant.name}</h2>
          {
            restaurant.category &&
            <div className='category'>
              {restaurant.category.name} {restaurant.category.emoji}
            </div>
          }
          <div className='contact-details'>
            {
              restaurant.website &&
              <a href={`${restaurant.website}`} className='contact-restaurant-website' target="_blank">
                {restaurant.website}
              </a>
            }
            {
              restaurant.website && restaurant.phone &&
              <span className='separator'>·</span>
            }
            {
              restaurant.phone &&
              <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
            }
          </div>
        </div>
        <div className="details">
          {
            restaurant.locations.length > 0 &&
            <div className='locations'>
              {
                restaurant.locations.map((location) => {
                  return <Location key={location.id} restaurantId={restaurant.id} location={location} />
                })
              }
            </div>
          }
          
          <div className='actions'>
            <a href={`/restaurants/${restaurant.id}/locations/new`}>Add new location</a>
            {
              window.gon.admin &&
              <React.Fragment>
                {' | '}
                <a href={`/restaurants/${restaurant.id}/edit`}>Edit</a>
                {' | '}
                <a href={`/restaurants/${restaurant.id}`} 
                  data-method='delete'
                  data-confirm='Are you sure?'
                >
                  Destroy
                </a>
              </React.Fragment>
            }
          </div>
          <div className='contact-info'>
            
          </div>
        </div>
        
      </div>
    );
  }
}

export default Restaurant;