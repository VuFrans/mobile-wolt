import React from 'react';
import { Image } from 'react-native';
import { Content, Card, CardItem, Text } from 'native-base';

export default function ResCard(props) {
  const { restaurant } = props;

  return (
    <Content>
      <Card style={{ width: '90%', marginLeft: 15, marginBottom: 20 }}>
        <CardItem cardBody>
          <Image
            source={{ uri: restaurant.image }}
            style={{ height: 200, flex: 1 }}
          />
        </CardItem>
        <CardItem header>
          <Text>{restaurant.name}</Text>
        </CardItem>
        <CardItem bordered>
          <Text>{restaurant.description}</Text>
        </CardItem>
        <CardItem>
          <Text>{'Kuljetus ' + restaurant.delivery_price / 100 + ' €'}</Text>
        </CardItem>
        <CardItem>
          <Text>{restaurant.tags.join(', ')}</Text>
        </CardItem>
      </Card>
    </Content>
  );
}
