import React from 'react';
import ReactDOM from 'react-dom';
import CategoryFilterButton from '../components/category_filter_button';

class Categories extends React.Component {
  state = {
    loadingCategories: true,
    categories: [],
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = () => {
    $.getJSON('/categories', (categories) => {
      this.setState({categories, loadingCategories: false});
    });
  }

  categoriesSortedByName = () => {
    const { categories } = this.state;
    return categories.sort((a, b) => a.name.localeCompare(b.name, undefined, { }));
  }

  goToCategory = (category) => {
    window.location.href = `/?category_id=${category}`;
  }

  render() {
    const { 
      categories,
    } = this.state;

    return (
      <>
        <h1>Categories</h1>
      
        <div className='restaurant-categories'>
          {this.categoriesSortedByName().map((category) => {
            return (
              <CategoryFilterButton 
                key={category.id}
                onClick={this.goToCategory} 
                category={category}
              />
              );
          })}
        </div>
      </>
    );
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('categories-mount-point');

  if (element) {
    ReactDOM.render(
      <Categories />,
      element
    )
  }
})