import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';
import countriesCodes from '../data/countries.json'
import CountryFlag from "react-native-country-flag";
import apiKeys from '../apiKeys.json'


const Forecast = ({ route }) => {

  const city = route.params.city
  const country = route.params.country
  const api_key = apiKeys.weatherApi

  const [airq, setairq] = useState('');
  const [weather, setweather] = useState([]);
  const [temp, settemp] = useState('');
  const [time, settime] = useState('');
  const [humidity, sethumidity] = useState('');
  const [forecast, setforecast] = useState([]);

  const fetchData = async (url) => {
    const response = await fetch(url, { mode: 'cors' });
    return response.json();
  };

  const getData = () => {
    try {
      fetchData(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=10&aqi=yes`).then(data => {
        settime(data.location.localtime.slice(-5).replace(/ /g, '0'))
        settemp(data.current.temp_c)
        setweather([data.current.condition.text, data.current.condition.icon])
        sethumidity(data.current.humidity)
        setairq(data.current.air_quality["us-epa-index"])
        setforecast(data.forecast.forecastday)
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.placesTitle}>Places Not To Visit</Text>
        <Text style={styles.cityTitle}>{city}, {country}</Text>
        <CountryFlag isoCode={countriesCodes[country]} size={45} style={{ marginTop: "5%", alignSelf: 'center' }} />
      </View>
      <Image source={{ uri: 'https://blog.weatherapi.com/wp-content/uploads/2020/02/cropped-Asset-62-1.png' }} style={styles.logo}></Image>
      <View style={styles.basicInfo}>
        <Time time={time} />
        <Humidity humidity={humidity} />
        <Airq airq={airq} />
        <Weather weather={weather} />
        <Temperature temp={temp} />
      </View>
      <F_Forecast forecast={forecast} />
    </ScrollView>
  );
}

const Humidity = ({ humidity }) => {
  return (
    <Text style={styles.attribs}>Humidity :
      {humidity >= 80 || humidity <= 30 ? <Text style={[styles.values, { color: 'red' }]}> {humidity}</Text> :
        humidity > 60 && humidity < 80 ? <Text style={[styles.values, { color: 'goldenrod' }]}> {humidity}</Text> :
          humidity > 50 && humidity <= 60 ? <Text style={[styles.values, { color: 'green' }]}> {humidity}</Text> :
            humidity > 30 && humidity <= 50 ? <Text style={[styles.values, { color: 'goldenrod' }]}> {humidity}</Text> :
              <Text style={[styles.values, { color: 'red' }]}> Error getting humidity</Text>
      }
    </Text>
  )
}

const Time = ({ time }) => {
  return (
    <Text style={styles.attribs}>Current time : {time}</Text>
  )
}

const Weather = ({ weather }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.attribs}>Weather : {weather[0]}</Text>
      <Image style={styles.weatherLogo} source={{ uri: weather[1] }} />
    </View>
  )
}

const Temperature = ({ temp }) => {
  return (
    <Text style={styles.attribs}>Temperature : {temp} °C</Text>
  )
}

const Airq = ({ airq }) => {
  return (
    <Text style={styles.attribs}>Air Quality :
      {airq <= 3 ? <Text style={[styles.values, { color: 'green' }]}> Good</Text> :
        airq <= 6 ? <Text style={[styles.values, { color: 'goldenrod' }]}> Moderate</Text> :
          airq <= 9 ? <Text style={[styles.values, { color: 'red' }]}> Bad</Text> :
            airq >= 10 ? <Text style={[styles.values, { color: 'darkred' }]}> Really Bad</Text> :
              <Text style={[styles.values, { color: 'red' }]}> Error getting air quality</Text>}
    </Text>
  )
}

const F_Forecast = ({ forecast }) => {

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date();

  return (
    <ScrollView contentContainerStyle={{ flex: 1 / 3, marginTop: 20 }} horizontal={true}>
      {forecast.map((weather, index) => (
        <View key={uuid.v4()} style={styles.ForecastTabs}>
          <Text style={{ fontSize: 20, marginTop: 10 }}>{days[(d.getDay() + index) % 7]}</Text>
          <Text style={{ fontSize: 20, marginVertical: 20 }}>Day {weather.day.maxtemp_c} °C</Text>
          <View style={{ borderWidth: 1, width: 130, alignSelf: 'flex-start' }}></View>
          <Text style={{ fontSize: 20, marginVertical: 30 }}>Night {weather.day.mintemp_c} °C</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  placesTitle: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: "10%"
  },
  cityTitle: {
    alignSelf: 'center',
    fontSize: 23,
    color: 'blue'
  },
  logo: {
    marginTop: "5%",
    alignSelf: 'center',
    height: 80,
    width: 190
  },
  basicInfo: {
    marginTop: 30,
    marginHorizontal: 10,
    alignItems: 'flex-start',
  },
  weatherLogo: {
    marginVertical: -15,
    width: 40,
    height: 50
  },
  attribs: {
    marginHorizontal: 10,
    fontSize: 20
  },
  values: {
    fontSize: 20
  },
  ForecastTabs: {
    alignItems: 'center',
    backgroundColor: 'rgba(116, 205, 210, 0.54)',
    marginHorizontal: 10,
    height: 190,
    width: 130,
  },
});

export default Forecast;