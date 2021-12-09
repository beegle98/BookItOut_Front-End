import React from 'react';
import {  
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  } from 'react-native';
  import Ionicons from 'react-native-vector-icons/Ionicons';

  const HomeScreen = ({navigation}) => {

    return (
      <View style={styles.view}>
          <Ionicons onPress={() => navigation.navigate('HomeSearch')}
                style={styles.searchIcons}
                name={'search'}
                color={'grey'}
                size={30}
            />
          <SafeAreaView style={{ flex: 1 }}>
          <SectionList
              
              contentContainerStyle={{ paddingHorizontal: 0 }}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS}
              renderSectionHeader={({ section }) => (
              <>
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                  {section.horizontal ? (
                  <FlatList
                      horizontal
                      style={styles.FlatList}
                      data={section.data}
                      renderItem={({ item }) => <ListItem item={item} />}
                      showsHorizontalScrollIndicator={false}
                  />
                  ) : null}
              </>
              )}
              renderItem={({ item, section }) => {
              if (section.horizontal) {
                  return null;
              }
              return <ListItem item={item} />;
              }}
          />
          </SafeAreaView>
      </View>
      );
  };
  const ListItem = ({ item }) => {
    return (
        <View style={styles.item}>
        <Image
            source={{
            uri: item.uri,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.text}</Text>
        </View>
    );
    }
    
    const SECTIONS = [
    {
        title: '동네 도서',
        horizontal: true,
        data: [
            {
                key: '1',
                text: '완득이',
                uri: 'https://image.aladin.co.kr/product/193/55/cover500/8936456083_1.jpg',
            },
            {
                key: '2',
                text: '트렌드 코리아 2022',
                uri: 'https://image.aladin.co.kr/product/27971/10/cover150/s822734222_3.jpg',
            },
        
            {
                key: '3',
                text: '책은 도끼다',
                uri: 'https://image.aladin.co.kr/product/28430/73/cover150/k512835415_2.jpg',
            },
            {
                key: '4',
                text: '화가들의 정원',
                uri: 'https://image.aladin.co.kr/product/28412/89/cover150/8946422017_1.jpg',
            },
            {
                key: '5',
                text: '미스터 마켓  2022',
                uri: 'https://image.aladin.co.kr/product/28313/62/cover150/k982835809_1.jpg',
            },
            {
                key: '6',
                text: '70일 미라클',
                uri: 'https://image.aladin.co.kr/product/28418/58/cover150/k182835211_1.jpg',
            },
            {
                key: '7',
                text: '오늘의 법칙',
                uri: 'https://image.aladin.co.kr/product/28424/41/cover150/8972917575_2.jpg',
            },
            ],
    },
    {
        title: '베스트셀러',
        horizontal: true,
        data: [
            {
                key: '1',
                text: '달콩이네 떡집',
                uri: 'https://image.aladin.co.kr/product/28418/58/cover150/8949162121_1.jpg',
            },
            {
                key: '2',
                text: '거꾸로 읽는 세계사',
                uri: 'https://image.aladin.co.kr/product/28182/0/cover150/k502835770_1.jpg',
            },
        
            {
                key: '3',
                text: '웰씽킹',
                uri: 'https://image.aladin.co.kr/product/28273/37/cover150/k852835990_1.jpg',
            },
            {
                key: '4',
                text: '흔한 남매 9',
                uri: 'https://image.aladin.co.kr/product/28395/15/cover150/k962835911_1.jpg',
            },
            {
                key: '5',
                text: '트렌드 코리아 2022',
                uri: 'https://image.aladin.co.kr/product/27971/10/cover150/s822734222_3.jpg',
            },
            {
                key: '6',
                text: '눈아이',
                uri: 'https://image.aladin.co.kr/product/28328/68/cover150/8936455737_1.jpg',
            },
            {
                key: '7',
                text: '장면들',
                uri: 'https://image.aladin.co.kr/product/28294/42/cover150/8936478907_1.jpg',
            },
            ],
        
    },
    {
        title: '최신 도서',
        horizontal: true,
        data: [
        {
            key: '1',
            text: '소마',
            uri: 'https://image.aladin.co.kr/product/28426/29/cover150/k052835317_2.jpg',
        },
        {
            key: '2',
            text: '보통의 것이 좋아',
            uri: 'https://image.aladin.co.kr/product/28412/78/cover150/k712835015_1.jpg',
        },
    
        {
            key: '3',
            text: '신의 비밀, 징조',
            uri: 'https://image.aladin.co.kr/product/28412/77/cover150/k752835015_1.jpg',
        },
        {
            key: '4',
            text: '패터슨',
            uri: 'https://image.aladin.co.kr/product/28426/16/cover150/8937475545_1.jpg',
        },
        {
            key: '5',
            text: '환희의 인간',
            uri: 'https://image.aladin.co.kr/product/28420/96/cover150/k472835216_1.jpg',
        },
        {
            key: '6',
            text: '드림 노트',
            uri: 'https://image.aladin.co.kr/product/28454/36/cover150/k342835729_1.jpg',
        },
        {
            key: '7',
            text: '그리움의 정원에서',
            uri: 'https://image.aladin.co.kr/product/28420/85/cover150/k272835216_1.jpg',
        },
        ],
    },
    ];

  export default HomeScreen;

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      },
      view: {
        flex: 1,
        backgroundColor: 'white',
        borderTopColor: "lightgray",
      },
      FlatList: {
        borderBottomColor: "lightgray",
        borderBottomWidth: 5,
        padding: 10,
      },
      sectionHeader: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        marginTop: 20,
      },
      item: {
        margin: 10,
        marginTop: -5,
      },
      itemPhoto: {
        width: 100,
        height: 150,
      },
      itemText: {
        color: 'black',
        //textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
      },
      searchIcons: {
        top: 15,
        left: 190,
        //alignItems: "center"
      },
      headerIcons2: {
        position: 'absolute',
        //top: -20,
        right: 50,
      },
      headerIcons3: {
         position: 'absolute',
         //top: -20,
         right: 10,
      },
  });