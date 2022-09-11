<h1 align="center">Weather</h1>

## Content Table

- [About this project](#-about-this-project)
- [Layout](#-layout)
- [Running the project](#running-the-project)
- [Running the tests](#running-the-tests)
- [Author](#-author)


## 📄 About this project

Application developed using React Native with the objective of reporting weather data using the user's location.


## 🎨 Layout

Designed with Figma, available in:

- [Weather](https://www.figma.com/file/yBnBPJIsYtSZG5V3PrkKMA/Weather?node-id=0%3A1)


#### Weather

<img src="https://github.com/danielsjg/weather/blob/main/files/weather.gif?raw=true" width="200">


#### Screens

<img src="https://raw.githubusercontent.com/danielsjg/weather/main/files/weather.png" width="200">


## Running the project

```bash
# 1. Clone this repo
git clone https://github.com/danielsjg/weather.git


# 2. Access the project folder
cd weather


# 3. Install the dependencies
yarn # or $ npm install


# 4. Install Pod for ios
npx pod-install


# 5. Create a .env file in root project folder


# 6. Add the following environment variables (.env file)
# API_BASE_URL='https://api.openweathermap.org/data/2.5'
# API_KEY_URL=''

Note: You need to create an account in [Open Weather Map](https://openweathermap.org/api) and create an API key.


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
