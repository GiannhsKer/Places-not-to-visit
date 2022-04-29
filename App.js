import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Searchbar } from 'react-native-paper';
<<<<<<< HEAD
import Results from './screens/results';
import Screens from './screens/screens'
import Display from './screens/display'
=======

import Screens from './screens/screens'
import ResultsCities from './screens/resultsCities';
import Display from './screens/webcamsDisplay'
import ResultsReviews from './screens/resultsReviews';
>>>>>>> 5977e15aa0cd5d64801da49169c6f6ac256c805f

const Stack = createNativeStackNavigator();


const App = () => {

   return (
      <NavigationContainer >
<<<<<<< HEAD
        <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName ='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Results" component={Results} />
          <Stack.Screen name="Screens" component={Screens} />
          <Stack.Screen name="Display" component={Display} />
=======
        <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName ='home'>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="resultsCities" component={ResultsCities} />
          <Stack.Screen name="screens" component={Screens} />
          <Stack.Screen name="display" component={Display} />
          <Stack.Screen name="resultsReviews" component={ResultsReviews} />
>>>>>>> 5977e15aa0cd5d64801da49169c6f6ac256c805f
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
<<<<<<< HEAD
          onPress= {() => navigation.navigate('Results',{place : query }) }
=======
          onPress= {() => navigation.navigate('resultsCities',{place : query }) }
>>>>>>> 5977e15aa0cd5d64801da49169c6f6ac256c805f
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