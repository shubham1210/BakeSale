import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import prop from 'prop-types';
import DealItem from './DealItem';

class DealList extends React.Component {
  static propType = {
    deals: prop.array.isRequired,
    onItemsPress: prop.func.isRequired,
  };

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => (
            <DealItem deal={item} onPress={this.props.onItemsPress} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
  },
});

export default DealList;
