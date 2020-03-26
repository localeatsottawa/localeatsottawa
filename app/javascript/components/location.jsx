import React from 'react';
import CheckIcon from './check_icon';

class Location extends React.Component {
  deliveryOptions = () => {
    const { location } = this.props;

    let output = '';

    if(location.pickup) {
      output += 'Pickup';
    } 
    
    if(location.delivery) {
      if(output.length > 0) {
        output += ', ';
      }
      output += 'Delivery';
    } 
    
    if(location.skip_the_dishes) {
      if(output.length > 0) {
        output += ', ';
      }
      output += 'Skip the Dishes';
    } 
    
    if(location.uber_eats) {
      if(output.length > 0) {
        output += ', ';
      }
      output += 'Uber Eats';
    } 
    
    if(location.foodora) {
      if(output.length > 0) {
        output += ', ';
      }
      output += 'Foodora'
    } 
    
    if(location.door_dash) {
      if(output.length > 0) {
        output += ', '
      }
      output += 'Doordash';
    } 

    return output;
  }

  render() {
    const { restaurantId, location } = this.props;
    return (
      <div className='component-location'>
        <div className='address'>
          <i className='fas fa-map-marker-alt' />{`${location.name} (${location.address})`}
        </div>
        <div className='delivery-options'>
          {this.deliveryOptions()}
        </div>
        {
          window.gon.admin &&
          <div className='actions'>
            <a href={`/restaurants/${restaurantId}/locations/${location.id}/edit`}>Edit</a>
            <a href={`/restaurants/${restaurantId}/locations/${location.id}`} 
                data-method='delete'
                data-confirm={`Are you sure you want to delete '${location.name}'?`}
            >Destroy</a>
          </div>
        }
      </div>
    );
  }
}

export default Location;