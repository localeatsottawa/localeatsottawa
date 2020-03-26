import React from 'react';
import Location from './location';

class Restaurant extends React.Component {
  state = {
    collapsed: false
  }

  handleHeaderClick = (e) => {
    e.preventDefault();

    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { restaurant } = this.props;
    const { collapsed } = this.state;
    return (
      <div className='component-restaurant card'>
        <div className='header' onClick={this.handleHeaderClick}>
          <h2>{restaurant.name}</h2>
          <div className='contact-details'>
            {
              restaurant.website &&
              <a href={`${restaurant.website}`} target="_blank">
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
        {
          !collapsed &&
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
        }
        
      </div>
    );
  }
}

export default Restaurant;