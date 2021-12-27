import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';

const Forecast = ({route}) => {

  const city = route.params.place.split(',')[0]

  const [airq, setairq] = useState('');
  const [weather, setweather] = useState([]);
  const [temp, settemp] = useState('');
  const [time, settime] = useState('');
  const [humidity, sethumidity] = useState('');
  const [forecast, setforecast] = useState([]);

  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const getData = () => {
    try {
      fetchData(`https://api.weatherapi.com/v1/forecast.json?key=21e506d74d464ffa90d220042210612&q=${city}&days=10&aqi=yes`).then(data => {
        settime(data.location.localtime.slice(-5).replace(/ /g,'0'))
        settemp(data.current.temp_c)
        setweather([data.current.condition.text,data.current.condition.icon])
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
    <View>
        <Text style={styles.titles}>Places Not To Visit</Text>				
        <Text style={[styles.titles, {font: 'bold', color: 'blue'}]}>{city}</Text>
      {/* Basic info display */}
      <View style={styles.basicInfo}>

        <Time time = {time}/>
        <Humidity humidity = {humidity}/>
        <Air airq = {airq} />
        <Weather weather = {weather} />
        <Temperature temp = {temp} />

      </View>
      <F_Forecast forecast={forecast} />
    </View>
  );
}

const Humidity = ({humidity}) => {
  return(
    <Text style={styles.attribs}>Humidity :
      { humidity > 80 || humidity < 30 ? <Text style={[styles.values, {color: 'red'}]}> {humidity}</Text> : 
        (humidity > 60 && humidity < 70) ? <Text style={[styles.values, {color: 'goldenrod'}]}> {humidity}</Text> :
        humidity >= 40 && humidity <= 60 ? <Text style={[styles.values, {color: 'green'}]}> {humidity}</Text> :
        humidity > 30 && humidity < 50 ? <Text style={[styles.values, {color: 'goldenrod'}]}> {humidity}</Text> :
        <Text style={[styles.values, {color: 'red'}]}> error getting humidity</Text>
      }
    </Text>
  )
}

const Time = ({time}) => {
  return(
    <Text style={styles.attribs}>Current time : {time}</Text>
  )
}

const Weather = ({weather}) => {
  return(
    <View style={{flexDirection:'row'}}>
    <Text style={styles.attribs}>Weather : {weather[0]}</Text>
    <Image style={{ marginHorizontal: -10, marginVertical : -15,width: 50,height: 40}} source={weather[1]}/>
  </View>
  )
}

const Temperature = ({temp}) => {
  return(
    <Text style={styles.attribs}>Temperature : {temp} °C</Text>
  )
}

const Air = ({airq}) => {
  return(
    <Text style={styles.attribs}>Air Quality : 
      { airq == 1 ? <Text style={[styles.values, {color: 'green'}]}> Good</Text> : 
        airq == 2 ? <Text style={[styles.values, {color: 'goldenrod'}]}> Moderate</Text> :
        airq >= 3 ? <Text style={[styles.values, {color: 'red'}]}> Bad</Text> :
        <Text style={[styles.values, {color: 'red'}]}> error getting air quality</Text>}
    </Text> 
  )
}

const F_Forecast = ({forecast}) => {

  const days = ["today","tommorow", "in 2 days"] 

  return(
    <ScrollView contentContainerStyle={{flex: 1/3, marginTop: 10 }} horizontal = {true}>
      {forecast.map( (weather,index) => (
        <View key ={uuid.v4()} style = {styles.ForecastTabs}>
          <Text style={{fontSize:20, marginTop: 10}}>{days[index]}</Text>
          <Text style={{fontSize:20, marginVertical: 20}}> Day {weather.day.maxtemp_c} °C</Text>
          <Text>----------------------</Text>
          <Text style={{fontSize:20 , marginVertical: 20}}> Night {weather.day.mintemp_c} °C</Text>
        </View>
      ))}
    </ScrollView> 
  )
}

const styles = StyleSheet.create({
  titles: {
    marginTop : 20,
    alignSelf: 'center',
    fontSize: 30,
  },
  basicInfo : {
    marginTop: 20,
    marginHorizontal : 10,
    alignItems : 'flex-start',
  },
  attribs: {
    marginHorizontal: 10,
    fontSize : 20
  },
  values: {
    fontSize : 20
  },
  ForecastTabs : {
    alignItems: 'center',
    backgroundColor: 'rgba(116, 205, 210, 0.54)',
    marginHorizontal: 10,
    height: 190,
    width:140,
  },
});

export default Forecast;