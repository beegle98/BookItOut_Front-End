import React, {useState, useEffect} from 'react';
import {  
    StyleSheet,
    Text,  
    View,
    Button,
    TouchableOpacity,
    Image,
  } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

  const TradePostScreen = ({navigation, route}) => {
    const [receivedUserName, setreceivedUserName] = useState();
    const [bookData, setBookData] = useState({});

    const receiveuser = route.params.item.user_id;

    //console.log('receiveuser id: ', receiveuser);

    const passUserName = () => {      
      console.log('passusername executed');
      setreceivedUserName(route.params.item.user_id);
      console.log('receiveuser id: ', receiveuser);   
      console.log('setreceivedUserName: ', receivedUserName);
    }
    const url = 'http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/book/'
    //console.log(route.params.item.book_id);
    useEffect(() => {
      fetch(url+route.params.item.book_id,{
        method: 'GET',
      }).then((res) => res.json())
        .then((responseJson) => {
          setBookData(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    return (      
      <View style={styles.container}>   
        <View style={{
            marginTop: 40,
            bottom: 40,
            marginBottom: 10,
          }
          }>     
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
            }}>{route.params.item.title}</Text>            
        </View>

        <View style={styles.divider}/>

        <View style={{
            bottom: 30
        }}>
            <Text>
                {route.params.item.content}
            </Text>
        </View>

        <View style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          alignSelf: 'stretch',
          width: "100%",
          bottom: 0,          
        }}/>

        <View style={{                 
        }}>
          <Image style={{
            width: 100,
            height: 150,
            right: 80,
            top: 40,
          }}          
          source={{
            uri: bookData.image,
            }}
          />
          <View style={{ 
            bottom: 80,          
            left: 70,
          }}>
          <Text style={{
            marginBottom: 10            
          }}>
            제목: {bookData.bookname}                      
          </Text>
          <Text style={{
            marginBottom: 10
          }}>
            작가: {bookData.author}            
          </Text>
          <Text style={{
            marginBottom: 10
          }}>
            정가: {bookData.bookprice+'원'}         
          </Text>
          <Text>
            출판사: {bookData.bookcompany}          
          </Text>
          </View>
        </View>

        <View style={{
          top: 0,
        }}>
          <Text>
           판매자: {route.params.item.user_id}
          </Text>
          <Text style={{
            marginTop: 10,
          }}>
            거래위치: 경기도 성남시 분당구
          </Text>
        </View>      

        <TouchableOpacity style={{
          top: 60,
          right: 170,
        }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={40}
          />
        </TouchableOpacity>

        <View>
          <TouchableOpacity style={{
            borderColor: 'red',
            borderWidth: 1,
            backgroundColor: 'red',
            alignItems: 'center',
            top: 10,
          }}
            onPress={() => { passUserName(), navigation.navigate("SendMessage", {receiveuser})}}>
            <FontAwesome 
              name="paper-plane-o"
              color="white"
              size={35}
              />
            <Text style={{
              color: 'white',              
            }}
            >
              판매자에게 쪽지보내기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default TradePostScreen;

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      },      
      divider: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        width: "100%",
        bottom: 60,
        marginTop: 20,
    },
  });