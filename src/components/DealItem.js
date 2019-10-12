import React from 'react';
import prop from 'prop-types';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {priceDisplay} from '../util/util';

class DealItem extends React.Component {
  static propType = {
    deal: prop.object.isRequired,
    goToDeatailsPage: prop.func.isRequired,
  };

  goToDetails = () => {
    this.props.onPress(this.props.deal.key);
  };
  render() {
    const {deal} = this.props;
    return (
      <TouchableOpacity style={styles.deal} onPress={this.goToDetails}>
        <Image source={{uri: deal.media[0]}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    borderColor: '#bbb',
    borderWidth: 1,
  },
  deal: {
    marginTop: 12,
  },
  info: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderTopWidth: 0,
    padding: 10,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DealItem;
