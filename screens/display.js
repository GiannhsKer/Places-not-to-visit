import React, {useState, useEffect} from 'react';
import { WebView } from 'react-native-webview';

const Display = ({route}) => {

    const link = 'https://www.youtube.com/embed/K_Vg94nBiaY?autoplay=1&rel=0'

    // const fetchData = async (url) => {
    //     const response = await fetch(url);
    //     return response.json();
    // };

    // const getData = () => {
    //     try {
    //         fetchData(link).then(data => {
                
    //     });
    //         setLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <WebView 
            style={{flex : 1}}
            source={{ uri: link }}
        />
    );
}


export default Display;