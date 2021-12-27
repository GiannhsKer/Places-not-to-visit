import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

const Webcams = ({navigation,route}) => {

    const city = route.params.place.split(',')[0].replace(/ /,'')
    const country = route.params.place.split(',')[2].replace(/ /,'')

    const [data, setData] = useState([]);

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
      };
    
    const getData = () => {
        try {
            fetchData(`http://localhost:7001/${country}/${city}`).then(data => {
					setData(data);
            });
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getData();
    }, []);

    return (

        <ScrollView>
            <View>
                <Text style={styles.titles}>Places Not To Visit</Text>				
                <Text style={[styles.titles, {font: 'bold', color: 'blue'}]}>{city}</Text>
            </View>
            <View style={styles.container}>
                {Object.keys(data).length > 0 ? Object.keys(data).map(place => (
                    <Pressable key = {uuid.v4()} >
                        <Image
                            source= {data[place][0]}
                            style = {styles.thumbnail}
                            onPress = {() => {navigation.navigate('Display',{'link': data})}}
                        />
                        <Text style={styles.text}>{place}</Text>
                    </Pressable>
                ))
                :   <View style = {{marginTop : 50}}>
                        <Text style={styles.error_text}>No cameras found for {country}, {city} </Text>
                        <Text>{Object.keys(data)[0]}</Text>  
                        <MaterialCommunityIcons style={{alignSelf : 'center'}} name="alert-circle-outline" size={24} color="black" />
                    </View>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent: 'space-evenly'
    },
    titles: {
        marginTop : 20,
        alignSelf: 'center',
        fontSize: 30,
    },
    thumbnail: {
        width: 150,
        height: 100,
    },
    text: {
        marginTop: 10
    },
    error_text : {
        fontWeight : 'bold',
        fontSize : 20,
    }
});

export default Webcams;