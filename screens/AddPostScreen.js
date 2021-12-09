import React, { useState, useEffect, useContext } from 'react';
import {  
    StyleSheet,
    Text,  
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
  } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { UserContext } from '../components/usercontext';

  
  const AddPostScreen = ({navigation, route}) => {

    const userID = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [bookData, setBookData] = useState({
      book_id: 0,
      bookname: '',
      bookprice: 0,
      author: '',
      bookcompany: '',
      image: '../Images/book_logo.png',
    });
    useEffect(()=>{
      if(route.params?.book){
        setBookData(route.params.book)
      }
    },[route.params?.book])
    const url = 'http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/post/book_post'
    
    const submitPost = () => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          book_id: bookData.book_id,
          user_id: userID.settingUserName.settingUserValue,
          content: content,
        }),        

      }).then((res) => res.json())
      .then((response) => {             
        console.log("success: ", response);
        console.log("userID: "+userID.settingUserName.settingUserValue)
      }).catch((error)=>{
        console.error(error);
      })
      
      Alert.alert(
        '게시물 등록', '게시물이 등록되었습니다', [{text: '확인'}]
      );
      navigation.goBack();
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            padding: 10,
            marginBottom: 20,
          }}
          placeholder="제목"
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={{
            //borderWidth: 1,
            padding: 10,
            marginBottom: 20,
          }}
          placeholder="내용"
          onChangeText={(text) => setContent(text)}
        />

        <View style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          alignSelf: 'stretch',
          width: "100%",
          bottom: 0,          
        }}/>
        
        <View style={{
          marginTop: 20,
        }}>
          <Text>책 정보검색</Text>
          <TouchableOpacity style={{
          bottom: 25,
          left: 80,
        }}
          onPress={() => {navigation.navigate('SearchPost')}}
        >
          <Ionicons
            name="search-outline"
            size={30}
          />
        </TouchableOpacity>
        </View>
        
        <View style={{                 
        }}>
          <Image style={{
            width: 100,
            height: 150,
            right: -30,
            top: 50,
          }}          
            source={{
              uri: bookData.image
            }}
          />
          <View style={{ 
            bottom: 80,          
            left: 170,
          }}>
          <Text style={{
            marginBottom: 10            
          }}>
            책 이름: {bookData.bookname}                     
          </Text>
          <Text style={{
            marginBottom: 10
          }}>
            작가: {bookData.author}            
          </Text>
          <Text style={{
            marginBottom: 10
          }}>
            출판사: {bookData.bookcompany}             
          </Text>
          <Text>
            정가: {bookData.bookprice+'원'}        
          </Text>
          </View>
        </View>


        <TouchableOpacity style={{
          top: -10,
          right: 0,
        }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={40}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{
          top: -5,
          right: 0,
          //justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',          
        }}
          onPress={() => {submitPost()}}//{alert('등록 완료!'), navigation.goBack()}}
        >
          <Text style={{           
            padding: 10,
            color: 'white',
            fontWeight: 'bold',                    
          }}>등록</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default AddPostScreen;

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          //alignItems: 'center',
          //justifyContent: 'center'
      },
  });