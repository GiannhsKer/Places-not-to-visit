import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Searchbar } from 'react-native-paper';

import Screens from './screens/screens'
import ResultsCities from './screens/resultsCities';
import Display from './screens/webcamsDisplay'
import ResultsReviews from './screens/resultsReviews';

const Stack = createNativeStackNavigator();


const App = () => {

   return (
      <NavigationContainer >
        <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName ='home'>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="resultsCities" component={ResultsCities} />
          <Stack.Screen name="screens" component={Screens} />
          <Stack.Screen name="display" component={Display} />
          <Stack.Screen name="resultsReviews" component={ResultsReviews} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

const Home = ({navigation}) => {

  const [query, setQuery] = useState('');
 
   return (
      <View>
       <Text style ={styles.titles}>Places Not To Visit</Text>
 
       <Searchbar
          placeholder="search the city here"
          onChangeText={query => setQuery(query)}
          value={query}
          style={styles.searchbar}
       />
       <View style={styles.button}> 
        <Button
          title = "Search"
          onPress= {() => navigation.navigate('resultsCities',{place : query }) }
        />
      </View>
     </View>
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titles: {
    marginTop : 100,
    alignSelf: 'center',
    fontSize: 30,
  },
  searchbar: {
    alignSelf: 'center',
    width: 300,
    marginVertical: 50,
  },
  button: {
    width : 200,
    alignSelf: 'center'
  },
});

export default App;