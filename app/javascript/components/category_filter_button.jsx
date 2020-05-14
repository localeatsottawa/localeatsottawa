import React from 'react';

class CategoryFilterButton extends React.Component {

  handleButtonClick = (event) => {
    event.preventDefault();

    const { onClick, category } = this.props;

    if(typeof onClick == 'function') {
      onClick(category);
    }
  }

  render() {
    const { category, selectedCategory } = this.props;
    return (
      <a href='#' 
        className={`btn btn-category ${(category == selectedCategory) ? 'btn-selected' : ''}`} 
        onClick={this.handleButtonClick}>{category.name} {category.emoji}
      </a>
    )
  }
}
export default CategoryFilterButton;