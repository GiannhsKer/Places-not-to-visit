import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

const Results = ({navigation,route}) => {

  const [data, setData] = useState([]);


  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const getData = () => {
    try {
      fetchData(`http://api.weatherapi.com/v1/search.json?key=21e506d74d464ffa90d220042210612&q=${route.params.place}`).then(data => {
        setData(data)
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
 
   return (
        <View style={styles.container}>
            <View style={{ marginTop : 20}}>
                {data.length > 0 ? data.slice(0,5).map(result => 
                    <View key = {uuid.v4()}>
                        <Pressable style={{alignSelf : 'center'}} onPress = {() => {navigation.navigate('Screens',{'place' : result.name})}}>
                            <Text> </Text>
                            <Text style={styles.result}>{result.name}</Text>
                            <Text> </Text>
                        </Pressable>
                        <View style={styles.borderline}></View>
                    </View> ) : 
                <Not_found place={route.params.place}/>}
            </View>
        </View>
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
        marginTop : 10,
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue'
    },
    borderline:{
        borderWidth: 1,
    }
});

export default Results;