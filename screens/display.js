import React, {useState, useEffect} from 'react';
import { Text } from 'react-native'
import { WebView } from 'react-native-webview';
import apiKeys from '../apiKeys.json'

const Display = ({route}) => {

    const api_key = apiKeys.worldcams;
    const page_link = route.params.link

    const [linkDisplay,setLinkDisplay] = useState({})

    const fetchData = async (url) => {
        const response = await fetch(url); 
        return response.json();
    };

    const getData = () => {
        try {
            fetchData(`http://192.168.2.1:7001/cameras/${page_link.replace(/,/g,"/")}/${api_key}`).then(data => {
                setLinkDisplay(data)
        });
        } catch (error) {
            <Text style={{alignSelf: 'center', fontSize: 30}}>error getting webcams from {page_link.split('/')[0]}</Text>
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <WebView 
            style={{flex : 1}}
            source={ linkDisplay }
        />
    );
}


export default Display;