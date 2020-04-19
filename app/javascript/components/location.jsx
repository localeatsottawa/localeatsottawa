import React from 'react';
import Pill from './pill';

class Location extends React.Component {
  optionToClassName = (option) => {
    if (option == "delivery") {
      return "delivery";
    }
    else if (option == "pickup") {
      return "pickup";
    }
    else if (option == "skip_the_dishes") {
      return "skip-the-dishes";
    }
    else if (option == "uber_eats") {
      return "uber-eats";
    }
    else if (option == "foodora") {
      return "foodora";
    }
    else if (option == "door_dash") {
      return "door-dash";
    }
  }
  
  friendlyDeliveryOptionName = (option) => {
    if (option == "delivery") {
      return "Delivery";
    }
    else if (option == "pickup") {
      return "Takeout";
    }
    else if (option == "skip_the_dishes") {
      return "Skip The Dishes";
    }
    else if (option == "uber_eats") {
      return "Uber Eats";
    }
    else if (option == "foodora") {
      return "Foodora";
    }
    else if (option == "door_dash") {
      return "Door Dash";
    }
  }
  
  deliveryOptions = () => {
    const { location } = this.props;
    return ["delivery", "pickup", "skip_the_dishes", "uber_eats", "foodora", "door_dash"].map((option) => {
      return (
        location[option] && 
        <Pill className={this.optionToClassName(option)} text={this.friendlyDeliveryOptionName(option)} url={location[option+"_url"]} />
      );
    })
  }

  render() {
    const { restaurantId, location } = this.props;
    return (
      <div className='component-location'>
        <div className='main-info'>
          <div className='address'>
            <i className='fas fa-map-marker-alt' />{location.address}
          </div>
          <div className='delivery-options'>
            {this.deliveryOptions()}
          </div>
        </div>
        {
          window.gon.admin &&
          <div className='location-actions'>
            <a href={`/restaurants/${restaurantId}/locations/${location.id}/edit`}>Edit</a>
            {' '}
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