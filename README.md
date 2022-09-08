<h1 align="center">Weather</h1>

## Content Table

- [About this project](#-about-this-project)
- [Layout](#-layout)
- [Running the project](#running-the-project)
- [Running the tests](#running-the-tests)
- [Author](#-author)

## 📄 About this project

App developed in React Native with the objective of reporting weather data using the user's location

## 🎨 Layout

Designed with Figma, available in:

- [Weather](https://www.figma.com/file/yBnBPJIsYtSZG5V3PrkKMA/Weather?node-id=0%3A1).

#### Weather

<img src="https://drive.google.com/uc?export=view&id=1ULqP6Bevul4atdUIFp-HZJ7ozQc7RGCh" width="150">

#### Screens

<img src="https://drive.google.com/uc?export=view&id=1ULqP6Bevul4atdUIFp-HZJ7ozQc7RGCh" width="600">

## Running the project

```bash
# 1. Clone thie repo
git clone https://github.com/danielsjg/weather.git
# 2. Access the project folder
cd weather
# 3. Install the dependencies
yarn # or $ npm install
# 4. Install Pod for ios
npx pod-install
# 5. Create a .env file on root project folder
# 6. Add the following environment variables
# API_BASE_URL='https://api.openweathermap.org/data/2.5'
# API_KEY_URL='' Note: You need to create a account in Open Weather Map to create a API_KEY_URL
# 7. Run the application on android
yarn android
# 8. Run the application on iOS
yarn ios
```

## Running the tests

```bash
yarn test
```

## 👨‍💻 Author

- [Daniel Soares Jorge](https://github.com/danielsjg)
