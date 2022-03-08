import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';
import { SvgUri } from 'react-native-svg';

import conv_dict from '../data/eur.json'
import flags from '../data/flags.json'
import l_prices from '../data/thes_prices.json'

const Prices = ({navigation,route}) => {

    const city = "Lausanne"
    const country = "Switzerland"
    const api_key = "r60hnqccmjg8yc"
    
    const [f_prices, setFPrices] = useState({});

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
            </View>
                <Image source = {{uri: 'https://logovtor.com/wp-content/uploads/2021/10/numbeo-logo-vector.png'}} style={{ marginTop: 30, alignSelf: 'center' ,height:100, width: 200}}></Image>
                <View style = {{marginVertical: 40}}>
                    <View style = {{alignSelf : 'flex-end', flexDirection: 'row'}} >
                        <SvgUri uri= {flags[country]} width="100%" height="100%"></SvgUri>
                        <SvgUri uri= {flags["Greece"]} width="100%" height="100%"></SvgUri>
                    </View>
                    {Object.keys(f_prices).map((item,i) => (
                        <View key = {uuid.v4()} style = {{ marginTop : 10, marginHorizontal : 10, flexWrap:'wrap', flexDirection: 'row'}} >
                            <View style = {{ width : 230, height: 60 }}>
                                <Text style = {{ fontSize: 15 }}>{item.slice(0,50)} :</Text>
                            </View>
                                {f_prices[item] - l_prices[item] > 10 ?
                                    <View>
                                        <Text style = {{color : "red"}}>{f_prices[item]} €</Text>
                                    </View> :
                                f_prices[item] - l_prices[item] > 5 ?
                                    <View>
                                        <Text style = {{color : "goldenrod"}}>{f_prices[item]} €</Text>
                                    </View> :
                                f_prices[item] - l_prices[item] >= 0 ?
                                    <View>
                                        <Text style = {{color : "green"}}>{f_prices[item]} €</Text>
                                    </View> : 
                                    <View>
                                        <Text style = {{color : "limegreen"}}>{f_prices[item]} €</Text>
                                    </View>}
                            <View style = {{ marginLeft: 35 }} >
                                <Text>{l_prices[item]} €</Text>
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