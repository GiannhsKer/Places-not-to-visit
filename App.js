import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Searchbar } from 'react-native-paper';
import Results from './screens/results';
import Screens from './screens/screens'
import Display from './screens/display'

const Stack = createNativeStackNavigator();


const App = () => {

   return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Results" component={Results} />
          <Stack.Screen name="Screens" component={Screens} />
          <Stack.Screen name="Display" component={Display} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

const Home = ({navigation}) => {

  const [place, setPlace] = useState('');
 
   return (
      <View>
       <Text style ={styles.titles}>Places Not To Visit</Text>
 
       <Searchbar
          placeholder="search the city here"
          onChangeText={query => setPlace(query)}
          value={place}
          style={styles.searchbar}
       />
       <View style={styles.button}> 
        <Button
          title = "Search"
          onPress= {() => navigation.navigate('Results',{'place' : place }) }
        />
      </View>
     </View>
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  titles: {
    marginTop : 50,
    alignSelf: 'center',
    fontSize: 30,
  },
});

export default App;