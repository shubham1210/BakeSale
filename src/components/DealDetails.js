import React from 'react';
import prop from 'prop-types';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Linking,
} from 'react-native';
import {priceDisplay} from '../util/util';
import {fetchDealDetails} from '../ajax/ajax';

class DealDetails extends React.Component {
  imageXValue = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evn, gs) => {
      this.imageXValue.setValue(gs.dx);
    },
    onPanResponderRelease: (evn, gs) => {
      this.width = Dimensions.get('window').width;

      if (Math.abs(gs.dx) > this.width * 0.4) {
        const direction = Math.sign(gs.dx);
        //if -1 left 1 then right
        Animated.timing(this.imageXValue, {
          toValue: direction * this.width,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXValue, {
          toValue: 0,
        }).start();
      }
    },
  });

  handleSwipe = indexDirection => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXValue, {
        toValue: 0,
      }).start();
      return;
    }
    this.setState(
      prevProp => ({
        imageIndex: prevProp.imageIndex + indexDirection,
      }),
      () => {
        console.log(this.width, this.state.imageIndex);
        this.imageXValue.setValue(indexDirection * this.width);
        Animated.spring(this.imageXValue, {
          toValue: 0,
        }).start();
      }
    );
  };
  static propTypes = {
    initialDealData: prop.object.isRequired,
    onBack: prop.func.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  };

  async componentDidMount() {
    //if you dont place await her the it will return promise here
    const fullDeal = await fetchDealDetails(this.state.deal.key);
    this.setState({deal: fullDeal});
  }

  openDealURL = () => {
    Linking.openURL(this.state.deal.url);
  };
  render() {
    const dealData = this.state.deal;
    const imageIndex = this.state.imageIndex;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{uri: dealData.media[imageIndex]}}
          style={[{left: this.imageXValue}, styles.image]}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{dealData.title}</Text>
          <View style={styles.footer}>
            <View>
              <Text style={styles.cause}>{dealData.cause.name}</Text>
              <Text style={styles.price}>{priceDisplay(dealData.price)}</Text>
            </View>
            {dealData.user && (
              <View>
                <Image
                  source={{uri: dealData.user.avatar}}
                  style={styles.avatar}
                />
              </View>
            )}
          </View>

          <View style={styles.description}>
            <Text>{dealData.description}</Text>
          </View>
          <Button title="Buy a Deal" onPress={this.openDealURL} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
  },
  deal: {
    marginTop: 20,
  },
  info: {
    borderTopWidth: 0,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: 'rgba(237,149,45,0.4)',
    padding: 10,
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
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  description: {
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
});

export default DealDetails;
