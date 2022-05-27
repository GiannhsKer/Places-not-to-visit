import React, {useState, useEffect} from 'react';
import { Text } from 'react-native'
import { WebView } from 'react-native-webview';

const Display = ({route}) => {

    const api_key = "Webcams key"
    const page_link = route.params.link

    const [linkDisplay,setLinkDisplay] = useState({})

    const fetchData = async (url) => {
        const response = await fetch(url); 
        return response.json();
    };

    const getData = () => {
        try {
            fetchData(`https://places-not-to-visit.herokuapp.com/${page_link}/${api_key}`).then(data => {
                setLink(data)
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