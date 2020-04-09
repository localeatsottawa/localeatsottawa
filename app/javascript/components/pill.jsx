import React from 'react';

class Pill extends React.Component {
  render(){
    const { url, text } = this.props;
    return (
      (!url || (url == null) || (url.length == 0)) ?
        <div className='component-pill'>
          {text}
        </div>  
      :
        <a className='component-pill' href={url} target="_blank">
          {text} <i className="fas fa-arrow-circle-right"></i>
        </a>
    );
  }

}
export default Pill;