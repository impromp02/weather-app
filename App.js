// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, TextInput, KeyboardAvoidingView, ImageBackground, StatusBar, ActivityIndicator } from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';

export default function App() {
  const [city, setCity] = useState('San Francisco');
  const [weatherData, setWeatherData] = useState({
    location: '',
    weather: '',
    temperature: ''
  });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCityChange = (city) => {
    setCity(city);
  };

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const woeid = await fetchLocationId(city);
        if (woeid) {
          const data = await fetchWeather(woeid);
          setWeatherData(data);
        }
      } catch (error) {
        setIsError(true);
      }
      setLoading(false);
    })();
  }, [city]);


  return (
    <View style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather('Clear')}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <View>
              {isError && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city. </Text>
              )}
              {!isError && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {weatherData.location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weatherData.weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {weatherData.temperature}
                  </Text>
                </View>
              )}
              <SearchInput
                placeholder="Search any city"
                onSubmit={handleCityChange}
              />
            </View>)}
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  }
});

