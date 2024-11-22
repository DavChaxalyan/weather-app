# Weather App

## Overview

**Weather App** is a modern weather forecasting application built using **React**, **Tailwind CSS**, and **Express.js** for handling requests and displaying data. The app allows users to search for cities using an intelligent search, view the weather forecast for several days ahead, and switch between light and dark themes for comfort. A detailed hourly forecast is available when clicking on forecast items.

Weather data is provided through the **OpenWeather API**, and city search is powered by the **OpenCageData API**.

## Features

- **Smart City Search**: As you type in the search bar, multiple city suggestions are automatically provided based on your input.
- **Weather Forecast**: View a multi-day weather forecast with information about temperature, humidity, wind speed, and weather conditions.
- **Hourly Forecast**: Get detailed hourly forecasts by clicking on forecast items.
- **Light and Dark Themes**: Switch between light and dark themes for a more comfortable experience.
- **Responsive Design**: The app is fully responsive, adapting to different screen sizes using **Tailwind CSS**.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js
- **APIs**:
  - OpenWeather API (for weather forecasts)
  - OpenCageData API (for city search)
- **Other**: Node.js, npm

## Installation

### Requirements

Make sure you have the following installed on your machine:

- **Node.js** (with npm) — Download and install from the [official website](https://nodejs.org/).

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DavChaxalyan/weather-app.git
Navigate to the project directory:

bash
Copy code
cd weather-app
Install frontend dependencies:

bash
Copy code
npm install
Set up the backend:

Navigate to the server directory:

bash
Copy code
cd server
Install server dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
node server.js
Run the frontend:

Return to the root project directory:

bash
Copy code
cd ..
Start the React development server:

bash
Copy code
npm run start
Open your browser and go to http://localhost:3000 to view the app.

Usage
City Search: Type a city name in the search bar, and the app will provide several suggestions based on the input. Select the desired city to view its weather forecast.
View Forecast Details: Click on any forecast item to see detailed hourly weather data.
Switch Themes: Toggle between light and dark themes using the theme switcher for better comfort.
API Keys
This project already includes pre-configured API keys for OpenWeather and OpenCageData, so you do not need to obtain or set up your own API keys. Simply follow the installation steps to get started with the app.

Acknowledgements
OpenWeather for providing weather data.
OpenCageData for offering city search functionality.
Tailwind CSS for providing an efficient and flexible CSS framework.
React for enabling powerful and fast development of user interfaces.
