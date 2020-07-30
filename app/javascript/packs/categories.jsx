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
    const data = {
    }

    $.getJSON('/categories', data, (categories) => {
      this.setState({categories, loadingCategories: false});
    });
  }

  categoriesSortedByName = () => {
    const { categories } = this.state;
    //return categories.sort((a, b) => a.name.localeCompare(b.name, undefined, { }));
    return categories
  }

  goToCategory = (category) => {
    console.log(category);
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


/* <h1>Categories</h1>

<table class='resource-table'>
  <thead>
    <tr>
      <th>Name</th>
      <th>Emoji</th>
      <th>Featured</th>
      <th colspan="3"></th>
    </tr>
  </thead>

  <tbody>
    <% @categories.each do |category| %>
      <tr>
        <td><%= category.name %></td>
        <td><%= category.emoji %></td>
        <td><%= category.featured %></td>
        <td><%= link_to 'Show', category %></td>
        <td><%= link_to 'Edit', edit_category_path(category) %></td>
        <td><%= link_to 'Destroy', category, method: :delete, data: { confirm: 'Are you sure?' } %></td>
      </tr>
    <% end %>
  </tbody>
</table>

<br>

<%= link_to 'New Category', new_category_path, class: 'btn btn-primary' %></br> */