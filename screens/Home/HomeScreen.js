import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { ListItem } from 'react-native-elements';

export default function HomeScreen() {
  const baseUrl = 'http://localhost:8000/api';
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

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '80%',
          backgroundColor: '#fff',
          marginLeft: '10%',
        }}
      />
    );
  };

  const renderItem = ({ item }) => {
    return <ListItem style={{ width: 350 }} title={item.name} bottomDivider />;
  };

  return (
    <View style={styles.container}>
      <Text>New Wolt</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => renderItem(item)}
        data={state}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
