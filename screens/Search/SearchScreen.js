import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResCard from '../../components/Card/Card';
import {
  Container,
  Header,
  Content,
  Body,
  Title,
  Button,
  Text,
  Card,
  CardItem,
} from 'native-base';
import * as Location from 'expo-location';

export default function SearchScreen() {
  const baseUrl = 'http://vufrans.me:8000/api';
  const [state, setState] = useState({
    location: '',
    search: '',
    hasRestaurants: null,
  });
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setState({ ...state, location: location });
    }
  };

  const getNearbyRestaurants = async () => {
    const response = await axios.get(
      `${baseUrl}/search?q&lat=${state.location.coords.latitude}&lon=${state.location.coords.longitude}`
    );
    const data = response.data;
    if (data.length >= 1) {
      setNearby(data);
      setState({ ...state, hasRestaurants: true });
    } else {
      setNearby([]);
      setState({ ...state, hasRestaurants: false });
    }
  };

  const showRestaurants = async () => {
    // Location is Laakso, Helsinki (Demo purpose)
    const Lat = 60.193602;
    const Lon = 24.906536;
    const response = await axios.get(
      `${baseUrl}/search?q&lat=${Lat}&lon=${Lon}`
    );
    const data = response.data;
    setNearby(data);
    setState({ ...state, hasRestaurants: true });
  };

  const textCard = (
    <Card>
      <CardItem header>
        <Button transparent onPress={showRestaurants}>
          <Text>No nearby restaurants! :(</Text>
        </Button>
      </CardItem>
    </Card>
  );

  return (
    <Container>
      <Header>
        <Body>
          <Title>Search</Title>
        </Body>
      </Header>
      <Content>
        {nearby.length >= 1 &&
          nearby.map((restaurant, index) => (
            <ResCard key={index} restaurant={restaurant} />
          ))}
        {state.hasRestaurants == false && textCard}
      </Content>
      <Button info block onPress={getNearbyRestaurants}>
        <Text>Search Nearby Restaurants (3km)</Text>
      </Button>
    </Container>
  );
}
