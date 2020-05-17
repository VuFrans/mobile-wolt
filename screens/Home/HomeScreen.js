import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResCard from '../../components/Card/Card';
import {
  Container,
  Header,
  Content,
  Body,
  Title,
  Input,
  Item,
} from 'native-base';

export default function HomeScreen() {
  const baseUrl = 'http://vufrans.me:8000/api';
  const [state, setState] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const response = await axios.get(`${baseUrl}/restaurants`);
    const data = response.data;
    setState(data);
    setRestaurants(data);
  };

  const filterRestaurants = () => {
    if (search) {
      const filteredRestaurants = state.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
      );
      setState(filteredRestaurants);
    } else {
      setState(restaurants);
    }
  };

  const handleInputChange = (textInput) => {
    if (textInput.length >= 1) {
      setSearch(textInput);
      filterRestaurants(search);
    } else {
      setSearch('');
      setState(restaurants);
    }
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>New Wolt</Title>
        </Body>
      </Header>
      <Item>
        <Input
          placeholder="Search restaurants"
          value={search}
          onChangeText={(search) => handleInputChange(search)}
        />
      </Item>
      <Content>
        {state.map((restaurant, index) => (
          <ResCard key={index} restaurant={restaurant} />
        ))}
      </Content>
    </Container>
  );
}
