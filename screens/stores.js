import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import uuid from 'react-native-uuid';
import CountryFlag from "react-native-country-flag";
import countriesCodes from '../data/countries.json'


const Stores = ({ navigation, route }) => {

    const city = route.params.city
    const country = route.params.country
    const api_key = "AIzaSyCKevPwKDkRUN4T3mRVwM6HxZoIdLn08tw"

    const [stores, setStores] = useState({});

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const getData = () => {
        try {
            fetchData(`https://places-not-to-visit.herokuapp.com/stores/${city}/${api_key}`).then(data => {
                setStores(data)
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
                <Image source={{ uri: 'https://www.revivifymarketing.com/wp-content/uploads/2020/06/google-reviews-logo.png' }} style={{ marginTop: "5%", alignSelf: 'center', height: 80, width: 190 }}></Image>
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: "40%" }}>Rating</Text>
                    <Text style={{ marginLeft: "5%" }}>S. Rating</Text>
                    <Text style={{ marginLeft: "5%" }}>Ratings Total</Text>
                </View>
                {Object.keys(stores).map(store =>
                    <View key={uuid.v4()} style={{ flexDirection: 'row' }}>
                        <Pressable style={{ width: 120, height: 100 }} onPress = {() => {navigation.navigate('resultsReviews',{city : city , country : country, storeName : store, storeId : stores[store].place_id})}}>
                            {store.length > 20 ?
                                <Text style={{ fontSize: 20 }}>{store.slice(0, 25)}...:</Text> :
                                <Text style={{ fontSize: 20 }}>{store}</Text>
                            }
                        </Pressable>
                        <View style={{ marginTop: "5%", flexDirection: 'row' }}>
                            {stores[store]["rating"] < 3.5 ?
                                <Text style={ [styles.ratingStyle, {color: 'firebrick'}] }>{stores[store]["rating"]}</Text> :
                                stores[store]["rating"] < 4 ?
                                    <Text style={ [styles.ratingStyle, {color: 'green'}] }>{stores[store]["rating"]}</Text> :
                                    <Text style={ [styles.ratingStyle, {color: 'limegreen'}] }>{stores[store]["rating"]}</Text>
                            }
                            {stores[store]["rating"] < 3.5 ?
                                <Text style={ [styles.ratingSStyle, {color: 'firebrick' }]}>{stores[store]["rating"]}</Text> :
                                stores[store]["rating"] < 4 ?
                                    <Text style={ [styles.ratingSStyle, {color: 'green' }]}>{stores[store]["rating"]}</Text> :
                                    <Text style={ [styles.ratingSStyle, {color: 'limegreen' }]}>{stores[store]["rating"]}</Text>
                            }
                            {stores[store]["ratingsTotal"] > 200 ?
                                <Text style={ [styles.ratingsTotalStyle, {color: 'deepskyblue' }]}>{stores[store]["ratingsTotal"]}</Text> :
                                stores[store]["ratingsTotal"] > 100 ?
                                    <Text style={ [styles.ratingsTotalStyle, {color: 'dodgerblue' }]}>{stores[store]["ratingsTotal"]}</Text> :
                                    <Text style={ [styles.ratingsTotalStyle, {color: 'darkslateblue' }]}>{stores[store]["ratingsTotal"]}</Text>
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
    cityTitle : {
        alignSelf: 'center', 
        fontSize: 23, 
        color: 'blue' 
    },
    ratingStyle : {
        fontSize: 20, 
        marginLeft: 30,
    },
    ratingSStyle:{
        fontSize: 20, 
        marginLeft: 50
    },
    ratingsTotalStyle : {
        fontSize: 20, 
        marginLeft: 35
    },
    error_text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Stores;