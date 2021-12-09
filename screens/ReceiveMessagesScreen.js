import React from 'react';
import {  
    StyleSheet,
    Text,  
    View,
    Button,
    FlatList,
    TouchableOpacity,

  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

  const ReceiveMessagesScreen = ({navigation, route}) => {
    const Messages = [
      {
        idx: '1',
        send_user: 'senduser1',
        comment: 'senduser1의 첫 번째 쪽지',        
      },
      {
        idx: '2',
        send_user: 'senduser1',
        comment: 'senduser1의 두 번째 쪽지',        
      },
      {
        idx: '3',
        send_user: 'senduser1',
        comment: 'senduser1의 세 번째 쪽지',        
      },
    ]

    const Item = ({ item, navigation }) => (
      <View style={styles.container}>
        <View style={{        
          top: 20,
          left: 20,
          marginBottom: 10,
        }}>
        {/*<TouchableOpacity
          onPress={() => {navigation.navigate("TradePost", { title: [item.title] })}}
        >*/}
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#08d4c4',
          }}>받은 쪽지</Text>  
        {/*</TouchableOpacity>    */}
        </View>
  
        <View style={{
          
        }}>
        {/*<Text>작성자:{item.userName}</Text>*/}
        </View>
  
        <View style={{
          top: 20,
          left: 20,
          marginBottom: 40,
          alignItems: 'flex-start',
        }}>
          <Text>{item.comment}</Text>
        </View>
        <View style={styles.divider}/>
      </View>
    )
    return (
      <View style={styles.container}>
        {/*<Text style={{
          fontWeight: 'bold',
          fontSize: 20,
        }}>  쪽지함</Text>*/}
        <FlatList 
          data={Messages}          
          keyExtractor={item => item.title}
          renderItem={({item}) => {
            return(
              <TouchableOpacity onPress= {() => {navigation.navigate("Home",{ item })}}>
                 <Item item={item}/>
              </TouchableOpacity>
            )
          }}
          />
          <TouchableOpacity style={{
          top: 0,
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
            //backgroundColor: 'red',
            //alignItems: 'center',
            bottom: 40,
            left: 340,
          }}
            onPress={() => {}}>
            <FontAwesome 
              name="paper-plane-o"
              color="red"
              size={35}
              />            
          </TouchableOpacity>
        </View>    
      </View>
    );
  };

  export default ReceiveMessagesScreen;

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
  });