import React from 'react';

class Pill extends React.Component {
  render(){
    const { className, url, text } = this.props;
    const StylingClassName = `component-pill ${className}`;
    return (
      (!url || (url == null) || (url.length == 0)) ?
        <div className={StylingClassName}>
          {text}
        </div>  
      :
        <a className={StylingClassName} href={url} target="_blank">
          {text} <i className="fas fa-arrow-circle-right"></i>
        </a>
    );
  }

}
export default Pill;