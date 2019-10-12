import React from 'React';
import {TextInput, StyleSheet} from 'react-native';
import prop from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  static propTypes = {
    searchHandle: prop.func.isRequired,
  };

  state = {
    searchText: '',
  };

  debounceSearchDeal = debounce(this.props.searchHandle, 300);

  handleChange = text => {
    this.props.searchHandle(text);
    this.setState({searchText: text}, () => {
      console.log('from set call back ', text);
      this.debounceSearchDeal(text);
    });
  };

  render() {
    return (
      <TextInput
        style={styles.input}
        onChangeText={this.handleChange}
        placeholder="search deals"
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 10,
  },
});
export default SearchBar;
