import React from 'react';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onInput(
      this.refs.filterTextInput.value
    );
  }

  render() {
    return (
     <div className="well text-left">
          <h4>Search Shelters:</h4>
          <div>
            <input className="form-control" type="text"
              placeholder="start typing here..."
              value={ this.props.filter }
              ref="filterTextInput"
              onChange={ this.handleChange }
            / >
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onInput: React.PropTypes.func,
  filter: React.PropTypes.string,
};

export default SearchBar;
