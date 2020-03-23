import React from 'react';
import ReactDOM from 'react-dom';

class Flash extends React.Component {
  state = {
    visible: true
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ visible: false })
    }, 5000);
  }

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ visible: false });
  }

  render() {
    const { message, flashType } = this.props;
    const { visible } = this.state;

    return (
      <div className={`component-flash ${flashType} ${!visible && 'invisible'}`}>
        <span className='message'>{message}</span>
        <a href='#' onClick={this.handleClose}><i className='fas fa-times' /></a>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('flash-mount-point');
  
  if (element) {
    const message = element.dataset.message;
    const flashType = element.dataset.flashType;
    
    ReactDOM.render(
      <Flash message={message} flashType={flashType} />,
      element
    )
  }
})
