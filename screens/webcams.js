import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import CountryFlag from "react-native-country-flag";
import countriesCodes from '../data/countries.json'
import apiKeys from '../apiKeys.json'

const Webcams = ({ navigation, route }) => {    

    const city = route.params.city
    const country = route.params.country
    const api_key = apiKeys.worldcams

    const [data, setData] = useState([]);

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const getData = () => {
        try {
            fetchData(`http://192.168.2.6:7001/cameras/${country}/${city}/${api_key}`).then(data => {
                setData(data);
            });
        } catch (error) {
            <Text>error getting {country},{city}</Text>
        }
    };


    useEffect(() => {
        getData();
    }, []);

    return (

        <ScrollView>
            <View>
                <Text style={styles.placesNotToVisit}>Places Not To Visit</Text>
                <Text style={styles.cityCountry}>{city}, {country}</Text>
                <CountryFlag isoCode={countriesCodes[country]} size={45} style={{ marginTop: "5%", alignSelf: 'center' }} />
            </View>
            <Image source={{ uri: "https://worldcams.tv/img/logo.png" }} style={styles.logo}></Image>
            <View style={styles.container}>
                {Object.keys(data).length > 0 ? Object.keys(data).map(place => (
                    <Pressable key={uuid.v4()} onPress={() => { navigation.navigate('display', { 'link': `${data[place][1].split("/").slice(3,6)}` }) }} >
                        <Image
                            source={{ uri: data[place][0] }}
                            style={styles.thumbnail}
                        />
                        <Text style={styles.thumbnail_text}>{place}</Text>
                    </Pressable>
                ))
                    : <View style={{ marginTop: 50 }}>
                        <Text style={styles.error_text}>No cameras found in</Text>
                        <Text style={styles.error_text}>{city}, {country}</Text>
                        <Text>{Object.keys(data)[0]}</Text>
                        <MaterialCommunityIcons style={{ alignSelf: 'center' }} name="alert-circle-outline" size={24} color="black" />
                    </View>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    placesNotToVisit: {
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 50
    },
    cityCountry: {
        alignSelf: 'center',
        fontSize: 23,
        marginTop: 10,
        color: 'blue'
    },
    logo: {
        height: 70,
        width: 135,
        alignSelf: 'center',
        marginTop: "15%"
    },
    titles: {
        marginTop: 50,
        alignSelf: 'center',
        fontSize: 30,
    },
    thumbnail: {
        width: 150,
        height: 100,
    },
    thumbnail_text: {
        marginVertical: 7,
        alignSelf: 'center',
        fontSize: 17
    },
    error_text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Webcams;