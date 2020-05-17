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
  const [state, setState] = useState();
  const [nearby, setNearby] = useState([]);
  const [hasRestaurants, setHasRestaurants] = useState();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setState(location);
    }
  };

  const getNearbyRestaurants = async () => {
    const response = await axios.get(
      `${baseUrl}/search?q&lat=${state.coords.latitude}&lon=${state.coords.longitude}`
    );
    const data = response.data;
    if (data.length >= 1) {
      setNearby(data);
      setHasRestaurants(true);
    } else {
      setNearby([]);
      setHasRestaurants(false);
    }
  };

  const showRestaurants = async () => {
    const centralLat = 60.170971;
    const centralLon = 24.940789;
    const response = await axios.get(
      `${baseUrl}/search?q&lat=${centralLat}&lon=${centralLon}`
    );
    const data = response.data;
    setNearby(data);
    setHasRestaurants(true);
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
        {hasRestaurants == false && textCard}
      </Content>
      <Button info block onPress={getNearbyRestaurants}>
        <Text>Search Nearby Restaurants (3km)</Text>
      </Button>
    </Container>
  );
}
