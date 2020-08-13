import React from 'react';

class CategoryFilterButton extends React.Component {

  handleButtonClick = (event) => {
    event.preventDefault();

    const { onClick, category } = this.props;

    if(typeof onClick == 'function') {
      onClick(category.id);
    }
  }

  render() {
    const { category, selectedCategoryId } = this.props;
    return (
      <a href='#' 
        className={`btn btn-category ${(category.id == selectedCategoryId) ? 'btn-selected' : ''}`} 
        onClick={this.handleButtonClick}>{category.name} {category.emoji}
      </a>
    )
  }
}
export default CategoryFilterButton;