import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Stores from './stores';
import Forecast from './forecast';
import Webcams from './webcams';
import Prices from './prices';

const Tab = createBottomTabNavigator();

const Screens = ({ route }) => {

	const params = { city: route.params.city, country: route.params.country }

	return (
		<Tab.Navigator screenOptions={{ headerShown: false }} >
			<Tab.Screen
				name="Stores"
				component={Stores}
				initialParams={params}
				options={{
					tabBarIcon: () => (
						<MaterialCommunityIcons name="comment" size={24} color="black" />

					),
				}}
			/>
			<Tab.Screen
				name="Forecast"
				component={Forecast}
				initialParams={params}
				options={{
					tabBarIcon: () => (
						<MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name="Prices"
				component={Prices}
				initialParams={params}
				options={{
					tabBarIcon: () => (
						<MaterialCommunityIcons name="chart-bar" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name="Webcams"
				component={Webcams}
				initialParams={params}
				options={{
					tabBarIcon: () => (
						<MaterialCommunityIcons name="webcam" size={24} color="black" />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default Screens;