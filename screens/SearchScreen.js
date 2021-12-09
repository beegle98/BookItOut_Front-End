import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const url = 'http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/book'
  //'https://jsonplaceholder.typicode.com/posts'
  useEffect(() => {
    fetch(url,{
      method: 'GET',
    }).then((res) => res.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.bookname
          ? item.bookname.toUpperCase()
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

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}>
        <Image
              source={{
              uri: item.image,
              }}
              style={styles.itemPhoto}
              resizeMode="cover"
        />
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {'\n'}
          {item.bookname}
          {'\n\n'}
          {'저자: '+item.author}
          {'\n'}
          {'정가: '+item.bookprice+'원'}
          {'\n'}
          {'출판사: ' +item.bookcompany}
        </Text>
      </View>
    );
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

  const getItem = (item) => {
    // Function for click on an item
    //alert('Id : ' + item.book_id + ' bookname : ' + item.bookname);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          lightTheme
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="원하시는 책을 검색하세요"
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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

export default SearchScreen;