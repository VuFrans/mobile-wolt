import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResCard from '../../components/Card/Card';
import { Container, Header, Content, Body, Title } from 'native-base';

export default function HomeScreen() {
  const baseUrl = 'http://vufrans.me:8000/api';
  const [state, setState] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    return await axios
      .get(`${baseUrl}/restaurants`)
      .then((response) => response.data)
      .then((data) => (setState(data), setRestaurants(data)))
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>New Wolt</Title>
        </Body>
      </Header>
      <Content>
        {state.map((restaurant, index) => (
          <ResCard
            key={index}
            restaurant={restaurant}
            onPress={() => console.log('Press')}
          />
        ))}
      </Content>
    </Container>
  );
}
