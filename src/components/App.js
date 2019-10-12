import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {fetchDeals, fetchDealDetailsFromText} from '../ajax/ajax';
import DealList from './DealList';
import DealDetails from './DealDetails';
import SearchBar from './SearchBar';

class App extends React.Component {
  titleXPos = new Animated.Value(0);

  state = {
    deals: [],
    currentDealId: null,
    searchResult: [],
  };
  animateLogo = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;

    Animated.timing(this.titleXPos, {
      toValue: direction * (width / 2),
      duration: 1000,
      easing: Easing.ease,
    }).start(({finished}) => {
      if (finished) {
        this.animateLogo(direction * -1);
      }
    });
  };

  async componentDidMount() {
    this.animateLogo();
    const dealsList = await fetchDeals();
    this.setState(() => {
      return {deals: dealsList};
    });
  }

  setCurrentDealId = dealID => {
    this.setState({currentDealId: dealID});
  };
  unsetCurrentDealId = () => {
    this.setState({currentDealId: null});
  };

  searchText = async searchTerm => {
    let results = [];
    if (searchTerm) {
      results = await fetchDealDetailsFromText(searchTerm);
    }
    console.log(results);
    this.setState({searchResult: results});
  };

  currentDeal() {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  }

  render() {
    if (this.state.currentDealId != null) {
      return (
        <View style={styles.main}>
          <DealDetails
            initialDealData={this.currentDeal()}
            onBack={this.unsetCurrentDealId}
          />
        </View>
      );
    }
    const dealsToDisplay =
      this.state.searchResult.length > 0
        ? this.state.searchResult
        : this.state.deals;
    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchHandle={this.searchText} />

          <DealList
            deals={dealsToDisplay}
            onItemsPress={this.setCurrentDealId}
          />
        </View>
      );
    }

    return (
      <Animated.View style={[{left: this.titleXPos}, styles.container]}>
        <Text style={styles.header}>BakeSale</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 40,
  },
  main: {
    marginTop: 30,
  },
});
export default App;
