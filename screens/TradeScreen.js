import React, { useState, useEffect } from 'react';
import {  
    SafeAreaView,
    StyleSheet,
    Text,  
    View,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
  } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';
import {useIsFocused, useNavigation} from '@react-navigation/native';
  

const TradeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  //const [bookData, setBookData] = useState([]);
  //const [filteredBookData, setfilteredBookData] = useState([]);

  const posturl = 'http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/list/book_post'
  //const bookurl = 'http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/book/'
  useEffect(() => {
    fetch(posturl,{
      method: 'GET',
    }).then((res) => res.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        /*
        fetch(bookurl,{
          method: 'GET',
        }).then((res) => res.json())
          .then((response) => {
            //console.log(responseJson)
            setBookData(response)
            console.log(bookData)
            
          })
          .catch((error) => {
            console.error(error);
          });
          */
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isFocused]);

  const Item = ({ item, navigation }) => (
    
    /*
    console.log(item.book_id)
    if(item.book_id){
        const newBookData = bookData.filter(function (object) {
          const itemData = object.book_id
          
          const bookId = item.book_id;
          return itemData.indexOf(bookId) > -1;
        });
      setfilteredBookData(newBookData)
      console.log(newBookData)
    }
    */
    // Flat List Item
    <View style={styles.container}>
      <View style={{        
        top: 20,
        left: 20,
        marginBottom: 10,
      }}>
      
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
      }}>{item.title}</Text>  
    
    </View>

    <View style={{
      
    }}>
    </View>

    <View style={{
      top: 20,
      left: 20,
      marginBottom: 40,
      alignItems: 'flex-start',
    }}>
      <Text>{item.content}</Text>
    </View>
    <View style={styles.divider}/>
  </View>
  
  )
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="원하시는 거래글을 검색하세요"
          value={search}
        />
        
        <FlatList 
          data={filteredDataSource}          
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item}) => {
            return(
              <TouchableOpacity onPress= {() => {navigation.navigate("TradePost",{ item })}}>
                 <Item item={item}/>
              </TouchableOpacity>
            )
          }}
           
        />

        <View style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <TouchableOpacity style={{
            borderColor: 'black',
            borderWidth: 2,
          }}
            onPress={() => {navigation.navigate("AddPost")}}
          >
            
            <Ionicons
              name="add"
              color="dimgrey"
              size={35}
            />
          </TouchableOpacity>
        </View>
        
      </View>
    );
  };

  export default TradeScreen;

  const styles = StyleSheet.create({
      container: {
          flex: 1,          
          //alignItems: 'center',
          //justifyContent: 'center'
      },
      divider: {
          borderBottomColor: 'grey',
          borderBottomWidth: 0.5,
          
      },
      username: { 
          
      },
      itemStyle: {
    
        padding: 10,
      },
      itemPhoto: {
        margin: 10,
        width: 100,
        height: 150,
      },
  });
  /*
  <View style={{
      flex: 1,
      flexDirection: 'row',
    }}>
      <Image
            source={{
            uri: filteredBookData.image,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
      />
      <Text style={styles.itemStyle}>
        {item.title}
        {'\n\n'}
        {item.content}
        {'\n'}
        {filteredBookData.bookname}
        {'\n\n'}
        {'가격: '+filteredBookData.bookprice+'원'}
        
      </Text>
    </View>
  */
