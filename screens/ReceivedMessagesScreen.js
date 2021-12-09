import React, {useState, useEffect, useContext} from 'react';
import {  
    StyleSheet,
    Text,  
    View,
    Button,
    FlatList,
    TouchableOpacity,

  } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../components/usercontext';

  const ReceivedMessagesScreen = ({route,navigation}) => {
    
    const user_id = useContext(UserContext);    
    console.log('ReceivedMessagesScreen user_id: ', user_id.settingUserName);

    //const [filteredDataSource, setFilteredDataSource] = useState([]);

    const [receivedMessageData, setreceivedMessageData] = useState([]);
    const receiveBoxUserUrl = 'http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/rbox/'

    console.log('url: ', receiveBoxUserUrl);
    useEffect(() => {
      fetch(receiveBoxUserUrl+user_id.settingUserName.settingUserValue, {
        method: 'GET',
      }
      
      ).then((response) => response.json())
       .then((response) => {          
        //if(response.success == true || response.success == 'true'){
          setreceivedMessageData(response);
          console.log("receivebox success");        
       })
       .catch((error) => {
            console.error(error);
        });
        //}
        //else{
          /*Alert.alert('로그인 실패', 'Username이나 Password가 올바르지 않습니다.', [
            {text: '확인'}
          ]);*/
        // alert('not success!');
        //}
    }, [])      

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
          }}>{item.send_user_id}</Text>  
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
    //console.log('ReceivedMessagesScreen userName param: ', route.params.user_id);
    return (
      <View style={styles.container}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: 'mediumseagreen',
          marginTop: 10,
        }}>   받은 쪽지함</Text>
        <FlatList 
          data={receivedMessageData}          
          keyExtractor={item => item.idx}
          renderItem={({item}) => {
            return(
              <TouchableOpacity onPress= {() => {navigation.navigate("ReceiveMessage",{ item })}}>
                 <Item item={item}/>
              </TouchableOpacity>
            )
          }}
        />
        <View>
          <TouchableOpacity style={{            
            //backgroundColor: 'red',
            //alignItems: 'center',
            bottom: 40,
            left: 330,
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

  export default ReceivedMessagesScreen;

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