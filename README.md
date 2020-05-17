# Introduction

Wolt-like mobile application that uses deployed [backend API](https://github.com/VuFrans/fullstack-wolt/tree/master/backend) to fetch restaurants data. Currently list of restaurants are limited. The application can fetch nearby restaurants that are within 3 kilometers.

If no restaurants are found, the application will prompt with an info card. The card is clickable, which will fetch restaurants from fixed location for demo purposes.

### Deployed Backend API

You can access the deployed api from http://vufrans.me:8000/api

`GET - http://vufrans.me:8000/api/restaurants` - Returns array of objects (restaurants)

`GET - http://vufrans.me:8000/api/restaurants/tags` - Returns array of restaurant tags.

`GET - http://vufrans.me:8000/api/search?q&lat=&lon=` - Insert latitude and longitude into query parameters and API will return 3 kilometers nearby restaurants. MUST include parameters; q(string), lat(integers), lon(integers).

### Requirements

- Node.js
- Expo-cli

## Instructions

### Local development enviroment

1. `npm install` or `yarn install`
2. `expo start` or `yarn start` or `npm run start`

### Built using

- React Native
- React Navigation
- Expo
- Expo-Location
- Axios
- Native-Base
