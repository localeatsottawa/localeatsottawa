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
      <div className='component-restaurant'>
        <div className='header' onClick={this.handleHeaderClick}>
          <h2>{restaurant.name}</h2>
          <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-down'}`} />
        </div>
        {
          !collapsed &&
          <div className="details">
            {
              restaurant.locations.length > 0 &&
              <table>
                <thead>
                  <tr>
                    <td>Location</td>
                    <td className='check-col'>Pickup</td>
                    <td className='check-col'>Delivery</td>
                    <td className='check-col'>Skip the Dishes</td>
                    <td className='check-col'>Uber Eats</td>
                    <td className='check-col'>Foodora</td>
                    <td className='check-col'>DoorDash</td>
                    { 
                      window.gon.admin &&
                      <React.Fragment>
                        <td></td>
                        <td></td>
                      </React.Fragment>
                    }
                  </tr>
                </thead>
                <tbody>    
                  {
                    restaurant.locations.map((location) => {
                      return <Location key={location.id} restaurantId={restaurant.id} location={location} />
                    })
                  }
                </tbody>
              </table>
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
            <div className='website-link'>
              {
              restaurant.website &&
                <a href={`${restaurant.website}`} target="_blank">Go to website</a>
              }
            </div>
          </div>
        }
        
      </div>
    );
  }
}

export default Restaurant;