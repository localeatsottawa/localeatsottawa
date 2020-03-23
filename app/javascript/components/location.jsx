import React from 'react';
import CheckIcon from './check_icon';

class Location extends React.Component {
  render() {
    const { restaurantId, location } = this.props;
    return (
      <tr className='component-restaurant'>
        <td>{`${location.name} (${location.address})`}</td>
        <td className='check-col'><CheckIcon value={location.pickup} /></td>
        <td className='check-col'><CheckIcon value={location.delivery} /></td>
        <td className='check-col'><CheckIcon value={location.skip_the_dishes} /></td>
        <td className='check-col'><CheckIcon value={location.uber_eats} /></td>
        <td className='check-col'><CheckIcon value={location.foodora} /></td>
        <td className='check-col'><CheckIcon value={location.door_dash} /></td>
        {
          window.gon.admin &&
          <React.Fragment>
            <td><a href={`/restaurants/${restaurantId}/locations/${location.id}/edit`}>Edit</a></td>
            <td>
              <a href={`/restaurants/${restaurantId}/locations/${location.id}`} 
                 data-method='delete'
                 data-confirm={`Are you sure you want to delete '${location.name}'?`}
              >Destroy</a>
            </td>
          </React.Fragment>
        }
      </tr>
    );
  }
}

export default Location;