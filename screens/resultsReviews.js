import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import CountryFlag from "react-native-country-flag";
import countriesCodes from '../data/countries.json'

const ResultsReviews = ({navigation,route}) => {

  const [reviews, setReviews] = useState({});

  const api_key = "Places API key"
  const city = route.params.city
  const country = route.params.country
  const storeName = route.params.storeName
  const storeId = route.params.storeId


  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const getData = () => {
    try {
      fetchData(`https://places-not-to-visit.herokuapp.com/reviews/${storeId}/${api_key}`).then(data => {
        console.log(data)
        setReviews(data)
    });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
 
   return (
        <ScrollView style={styles.container}>
            <View >
                <Text style={styles.placesTitle}>Places Not To Visit</Text>
                <Text style={styles.cityTitle}>{city}, {country}</Text>
                <CountryFlag isoCode={countriesCodes[country]} size={45} style={{ marginTop: "5%", alignSelf: 'center' }} />
            </View>
            <View>
                <Image source={{ uri: 'https://www.revivifymarketing.com/wp-content/uploads/2020/06/google-reviews-logo.png' }} style={{ marginTop: "5%", alignSelf: 'center', height: 80, width: 190 }}></Image>
                <Text style={{ fontSize: 20,fontWeight: "bold", alignSelf:'center', marginTop: "5%"}}>{storeName}</Text>
                <Text style={{ fontSize: 15,fontWeight: "bold", alignSelf:'center', marginTop: "5%"}}>Reviews sorted by sentiment analysis rating</Text>
            </View>
            <View style={{ marginTop : "5%"}}>
                <View style={styles.borderline}></View>
                {Object.keys(reviews).length > 0 ? Object.keys(reviews).slice(0,5).map(review => 
                    <View key = {uuid.v4()}>
                        <Pressable style={{alignSelf : 'center', padding:"3%"}}>
                            <Text style={{fontSize: 20}}>{`\n`}{review}</Text>
                            <Text >{`\n`}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                              <Text style={{fontSize: 15,fontWeight: "bold", color: 'maroon'}}>Sentiment Rating : {reviews[review].S_rating}</Text>
                              <Text style={{fontSize: 15,fontWeight: "bold", color: 'indigo'}}>{`\t\t`} Rating : {reviews[review].rating}</Text>
                            </View>
                        </Pressable>
                        <View style={{borderWidth: 1}}></View>
                    </View> ) : 
                <Not_found place={storeId}/>}
            </View>
        </ScrollView>
   )
}

const Not_found = ({place}) => {

    return(
        <View style = {{alignSelf: 'center', marginTop : 50}}>
            <Text style={styles.titles}>'{place}'</Text>
            <Text style={styles.error_text}>Place not found</Text>  
            <MaterialCommunityIcons style={{ alignSelf : 'center'}} name="alert-circle-outline" size={24} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
    },
    result: {
        fontSize: 20
    },
    error_text : {
        fontWeight : 'bold',
        fontSize : 20,
    },
    titles: {
        marginTop : 100,
        alignSelf: 'center',
        fontSize: 30,
      },
    borderline:{
        borderWidth: 1,
    }
});

export default ResultsReviews;