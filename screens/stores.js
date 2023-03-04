import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import uuid from 'react-native-uuid';
import CountryFlag from "react-native-country-flag";
import countriesCodes from '../data/countries.json'
import apiKeys from '../apiKeys.json'

const Stores = ({ navigation, route }) => {

    const city = route.params.city
    const country = route.params.country
    const api_key = apiKeys.googlePlacesApi

    const [stores, setStores] = useState({});

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const getData = () => {
        try {
            fetchData(`http://192.168.2.1:7001/stores/${city}/${api_key}`).then(data => {
                setStores(data[city])
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
            <View >
                <Text style={styles.placesTitle}>Places Not To Visit</Text>
                <Text style={styles.cityTitle}>{city}, {country}</Text>
                <CountryFlag isoCode={countriesCodes[country]} size={45} style={{ marginTop: "5%", alignSelf: 'center' }} />
            </View>
            <View>
                <Image source={{ uri: 'https://www.revivifymarketing.com/wp-content/uploads/2020/06/google-reviews-logo.png' }} style={styles.logo}></Image>
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: "40%" }}>Rating</Text>
                    <Text style={{ marginLeft: "5%" }}>S. Rating</Text>
                    <Text style={{ marginLeft: "5%" }}>Ratings Total</Text>
                </View>
                {Object.keys(stores).map(store =>
                    <View key={uuid.v4()} style={{ flexDirection: 'row', marginTop: "10%" }}>
                        <Pressable style={{ width: 120, height: 100 }} onPress={() => { navigation.navigate('resultsReviews', { city: city, country: country, storeName: store, storeId: stores[store].place_id }) }}>
                            {store.length > 20 ?
                                <Text style={{ fontSize: 15 }}>{store.slice(0, 25)}...:</Text> :
                                <Text style={{ fontSize: 15 }}>{store}</Text>
                            }
                        </Pressable>
                        <View style={{ flexDirection: 'row' }}>
                            {stores[store]["rating"] < 3 ?
                                <Text style={[styles.ratingStyle, { color: 'firebrick' }]}>Negative</Text> :
                                <Text style={[styles.ratingStyle, { color: 'green' }]}>Positive</Text>
                            }
                            {stores[store]["sentRating"] == "Negative" ?
                                <Text style={[styles.ratingStyle, { color: 'firebrick' }]}>Negative</Text> :
                                <Text style={[styles.ratingStyle, { color: 'green' }]}>Positive</Text>
                            }
                            {stores[store]["ratingsTotal"] > 200 ?
                                <Text style={[styles.ratingsTotalStyle, { color: 'deepskyblue' }]}>{"\t\t\t\t" + stores[store]["ratingsTotal"]}</Text> :
                                stores[store]["ratingsTotal"] > 100 ?
                                    <Text style={[styles.ratingStyle, { color: 'dodgerblue' }]}>{stores[store]["ratingsTotal"]}</Text> :
                                    <Text style={[styles.ratingStyle, { color: 'darkslateblue' }]}>{stores[store]["ratingsTotal"]}</Text>
                            }
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: "10%",
        marginLeft: "5%",
    },
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
    ratingStyle: {
        fontSize: 15,
        marginLeft: 30,
    },
    error_text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Stores;