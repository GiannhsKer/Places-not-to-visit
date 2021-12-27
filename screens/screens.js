import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Forecast from './forecast';
import Webcams from './webcams';


const Tab = createBottomTabNavigator();

const Screens = ({route}) => {

	return (			
		<Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='Webcams'>
			<Tab.Screen
				name="Forecast" 
				component={Forecast} 
				initialParams={{ place : route.params.place}}
				options = {{
					tabBarIcon: () => (
						<MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name="Webcams"
				component={Webcams}
				initialParams={{ place : route.params.place}}
				options = {{
					tabBarIcon: () => (
						<MaterialCommunityIcons name="webcam" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name="Prices"
				component={Webcams}
				initialParams={{ place : route.params.place}}
				options = {{
					tabBarIcon: () => (
						<MaterialCommunityIcons name="chart-bar" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name="Comments"
				component={Webcams}
				initialParams={{ place : route.params.place}}
				options = {{
					tabBarIcon: () => (
						<MaterialCommunityIcons name="comment" size={24} color="black" />

					),
				}}
			/>
		</Tab.Navigator>
  );
}

export default Screens;