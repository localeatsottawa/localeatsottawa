import React from 'react'

export default (props) => {
  const { value } = props;

  if(value) {
    return <i className='fas fa-check-circle success' />;
  } else {
    return <i className='fas fa-times-circle error' />;
  }
}
