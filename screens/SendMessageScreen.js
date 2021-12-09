import React, {useContext} from 'react';
import {  
    StyleSheet,
    Text,  
    View,
    Button,
    TouchableOpacity,
    TextInput,
    Alert,
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../components/usercontext';

  const SendMessageScreen = ({navigation, route}) => {
    const [comment, setComment] = React.useState();
    const send_user = useContext(UserContext); 
    const receive_user_id = route.params.receiveuser;

    console.log('send_user_id: ', send_user.settingUserName.settingUserValue);
    console.log('receive_user_id: ', receive_user_id);
    const sendUrl = 'http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/letter'
    const sendPost = () => {        

        fetch(sendUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            send_user_id: send_user.settingUserName.settingUserValue,
            receive_user_id: receive_user_id,
            comment: comment,
          }), 
        }
        
        ).then((response) => response.json())
         .then((response) => {          
          if(response.success == true || response.success == 'true'){            
            console.log("send messages success: ", response);
            Alert.alert(
              '쪽지 전송', '쪽지 전송을 성공했습니다', [{text: '확인'}]
            );
            navigation.popToTop();
          }
          else{
            Alert.alert(
              '쪽지 전송 실패', '쪽지 전송을 실패했습니다', [{text: '확인'}]
            );
          }
         })
         .catch((error) => {
              console.error(error);
          });
      }

    return (
      <View style={styles.container}>
        <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 10,
        }}>  쪽지 보내기</Text>
        {/*<Text>{route.params.userName}</Text>*/}
        <TextInput
          style={{
            //borderWidth: 1,
            padding: 10,
            marginBottom: 20,
          }}
          placeholder="내용"
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={{
          top: 100,
        }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={40}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{
          bottom: 100,
          left: 330,
        }}
          onPress={() => {sendPost()}}
        >
          <Ionicons
            name="send"
            size={40}
          />
          <Text>
              전송
          </Text>
        </TouchableOpacity>
      </View>
      
    );

  };

  export default SendMessageScreen;

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          //alignItems: 'center',
          //justifyContent: 'center'
      },
  });