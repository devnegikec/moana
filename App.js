import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';

import { PlaceInput } from './src/components/PlaceInput';
import { PlaceList } from './src/components/PlaceList';
import { PlaceDetail } from "./src/components/PlaceDetail";

export default class App extends Component {
  state = {
    currentUserName: '',
    places: [],
    selectedPlace: null,
    users: [{name:'Dev'}, {name: 'subin'}]
  };

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: {
            uri:
              "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          }
        })
      };
    });
  };

  placeDeletedHandler = () => {
    this.setState(prevState => {
      
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      };
    });
  };

  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    });
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      };
    });
  };
  userNameChangedHandler = val => {
    this.setState({
      currentUserName: val
    });
  };

  addUser = () => {
    // alert(event.target.value);
    const name = this.state.currentUserName.trim();
    if (name === '' ) {
      return;
    }
    const users = this.state.users;
    const newUsers = [...users, {name}];
    this.setState({
      currentUserName: '',
      users: newUsers
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
        placeholder="An awesome place"
        value={this.state.currentUserName}
        onChangeText={this.userNameChangedHandler}
        style={styles.placeInput}
        />
        <Button onPress={this.addUser} title="Add" />
        <FlatList
          data={this.state.users}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  placeInput: {
    width: "70%"
  }
});
