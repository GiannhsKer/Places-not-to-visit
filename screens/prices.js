import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';
import CountryFlag from "react-native-country-flag";

import countriesCodes from '../data/countries.json'
import conv_dict from '../data/eur.json'
import local_prices from '../data/thes_prices.json'

const Prices = ({navigation,route}) => {

    const city = route.params.city
    const country = route.params.country

    const api_key = "r60hnqccmjg8yc"

    const [foreign_prices, setFPrices] = useState({});

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const getData = () => {
        try {
            fetchData(`https://www.numbeo.com/api/city_prices?api_key=${api_key}&city=${city}&country=${country}`).then(data => {
                var prices = {}
                var rate

                if (data.currency.toLowerCase() == 'eur'){
                    data.prices.map((it,i) => { 
                        prices[data.prices[i].item_name] = data.prices[i].average_price.toFixed(1)
                    })
                }
                else{
                    rate = conv_dict[data.currency.toLowerCase()].rate

                    data.prices.map((it,i) => { 
                        prices[data.prices[i].item_name] = (data.prices[i].average_price / rate ).toFixed(1)
                    })
                }
                setFPrices(prices);
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
                <Text style = {{ alignSelf : 'center', fontSize : 30 , marginTop : 50 }}>Places Not To Visit</Text>				
                <Text style = {{ alignSelf : 'center', fontSize : 23 , marginTop : 10 , color: 'blue'}}>{city}, {country}</Text>
                <CountryFlag isoCode= {countriesCodes[country]} size={45} style={{marginTop:"5%", alignSelf:'center'}}/>
            </View>
                <Image source = {{uri: 'https://logovtor.com/wp-content/uploads/2021/10/numbeo-logo-vector.png'}} style={{ marginTop: "10%", alignSelf: 'center' ,height:100, width: 200}}></Image>
                <View style = {{ marginVertical: 40}}>
                    <View style = {{ marginRight: "5%", alignSelf : 'flex-end', flexDirection: 'row'}} >
                        <CountryFlag isoCode= {countriesCodes[country]} size={25} />
                        <CountryFlag isoCode="GR" size={25} style = {{marginLeft: "7%"}}/>
                    </View>
                    {Object.keys(foreign_prices).map((item,i) => (
                        <View key = {uuid.v4()} style = {{ marginTop : "5%", flexWrap:'wrap', flexDirection: 'row'}} >
                            <View style = {{ width : 230, height: 60 }}>
                                <Text style = {{ marginLeft: "10%" ,fontSize: 15 }}>{item.slice(0,50)}...:</Text>
                            </View>
                                {foreign_prices[item] - local_prices[item] > 10 ?
                                    <View style={{marginLeft:"10%"}}>
                                        <Text style = {{color : "red"}}>{foreign_prices[item]} €</Text>
                                    </View> :
                                foreign_prices[item] - local_prices[item] > 5 ?
                                    <View style={{marginLeft:"10%"}}>
                                        <Text style = {{color : "goldenrod"}}>{foreign_prices[item]} €</Text>
                                    </View> :
                                foreign_prices[item] - local_prices[item] >= 0 ?
                                    <View style={{marginLeft:"10%"}}>
                                        <Text style = {{color : "green"}}>{foreign_prices[item]} €</Text>
                                    </View> : 
                                    <View style={{marginLeft:"10%"}}>
                                        <Text style = {{color : "limegreen"}}>{foreign_prices[item]} €</Text>
                                    </View>}
                            <View style = {{ marginLeft: "5%" }} >
                                <Text>{local_prices[item]} €</Text>
                            </View>
                        </View>
                    ))}
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent: 'space-evenly'
    },
    titles: {
        marginTop : 50,
        alignSelf: 'center',
        fontSize: 30,
    },
    error_text : {
        fontWeight : 'bold',
        fontSize : 20,
    }
});

export default Prices;