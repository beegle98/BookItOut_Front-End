import React from 'react';
import {  
    StyleSheet,
    Text,  
    View,
    Button,
    TouchableOpacity, 
    Dimensions,
    Touchable,
    Alert,
  } from 'react-native';

  import * as Animatable from 'react-native-animatable';
  import LinearGradient from 'react-native-linear-gradient';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import Feather from 'react-native-vector-icons/Feather';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  
import { TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


  const SignUpScreen = ({navigation}) => {   
    const [data, setData] = React.useState({
      username: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      check_textInputChange: false,
      secureTextEntry: true
    });



    const handleUsernameChange = (val) => {
      if(val.length != 0){
          setData({
              ...data,
              username: val,
              check_textInputChange: true
          });
      } else {
          setData({
              ...data,
              username: val,
              check_textInputChange: false
          });
      }
    }

    const handlePasswordChange = (val) => {
      setData({
        ...data,
        password: val
      });
    }

    const handleEmailChange = (val) => {
      if(val.length != 0){
          setData({
              ...data,
              email: val,
              check_textInputChange: true
          });
      } else {
          setData({
              ...data,
              email: val,
              check_textInputChange: false
          });
      }
    }

    const handlePhoneChange = (val) => {
      if(val.length != 0){
          setData({
              ...data,
              phone: val,
              check_textInputChange: true
          });
      } else {
          setData({
              ...data,
              phone: val,
              check_textInputChange: false
          });
      }
    }

    const handleAddressChange = (val) => {
      if(val.length != 0){
          setData({
              ...data,
              address: val,
              check_textInputChange: true
          });
      } else {
          setData({
              ...data,
              address: val,
              check_textInputChange: false
          });
      }
    }
    

    const registerHandler = (username, password, email, phone, address) => {

      if (username.length == 0 || password.length == 0 || email.length == 0 || phone.length == 0 ||
        address.length == 0) {
        Alert.alert('잘못된 입력입니다!', '입력되지 않은 정보가 있습니다.', [
          {text: '확인'}
        ]);
        return;
      }

      fetch("http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/register", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: username,
          user_pw: password,
          user_email: email,
          user_phone: phone,
          user_address: address,
        }),        

      }
      
      ).then((response) => response.json())
        .then((response) => {             
            //console.log("회원가입 응답, user_id: ", user_id);
            console.log("success: ", response.success);
            if(response.success == 'true' || response.success == true){
              Alert.alert('회원가입 성공', '가입하신 정보로 로그인 해주세요.', [
                {text: '확인'}
              ]);
              console.log("register success");
              navigation.navigate("SignInScreen");      
              
            }
            else{
              Alert.alert('회원가입 실패', '이미 존재하는 회원 정보입니다.', [
                {text: '확인'}
              ]);             
            }
        })
        .catch((error)=>{
          alert("Error Occured!!" + error.msg);
          console.error(error);
        })

    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.Image
                animation="bounceIn"                
                source={require('../Images/book_logo.png')}
                style={styles.logo}
                resizeMode="contain"                
          />
          <Text style={styles.text_header}>회원가입 페이지</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer, {
            marginTop: -10
          }}>    
          </Text>
          <View style={styles.action}>            
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val)=>handleUsernameChange(val)}
            />
            {/*{data.check_textInputChange ?
            <Feather
              name="check-circle"
              color="green"
              size={20}
              style={styles.feather}
            />
            : null}*/}
          </View>
          <Text style={styles.text_footer, {
            marginTop: -20
          }}></Text>
          <View style={styles.action}>            
            <TextInput
              placeholder="Password"              
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            {/*<TouchableOpacity
              onpress={updataSecureTextEntry}
            >
              <Feather
                name="eye-off"
                color="grey"
                size={20}
                style={styles.feather}
              />
            </TouchableOpacity>*/}
          </View>
          <View style={styles.action}>            
            <TextInput
              placeholder="Email"              
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleEmailChange(val)}
            />
            {/*<TouchableOpacity
              onpress={updataSecureTextEntry}
            >
              <Feather
                name="eye-off"
                color="grey"
                size={20}
                style={styles.feather}
              />
            </TouchableOpacity>*/}
          </View>
          <View style={styles.action}>            
            <TextInput
              placeholder="Phone"              
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePhoneChange(val)}
            />
            {/*<TouchableOpacity
              onpress={updataSecureTextEntry}
            >
              <Feather
                name="eye-off"
                color="grey"
                size={20}
                style={styles.feather}
              />
            </TouchableOpacity>*/}
          </View>
          <View style={styles.action}>            
            <TextInput
              placeholder="Address"              
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleAddressChange(val)}
            />
            {/*<TouchableOpacity
              onpress={updataSecureTextEntry}
            >
              <Feather
                name="eye-off"
                color="grey"
                size={20}
                style={styles.feather}
              />
            </TouchableOpacity>*/}
          </View>

          <View style={styles.button}>            

            <TouchableOpacity
              onPress={() => registerHandler(data.username, data.password, data.email, data.phone, data.address)}
              style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: -40
              }]}
              >
                <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, {
                color:'#fff',
                marginTop: 0
               }]}>회원가입</Text>
            </LinearGradient>                
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.back}
              >
                <Ionicons
                name="arrow-back"
                color="dimgrey"
                size={50} 
                />
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  export default SignUpScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    logo: {
      width: '100%',
      height: '100%',      
      
      //height: height_logo
      
    },
    footer: {
        flex: 4,
        backgroundColor: 'lightcoral',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        left: 85,
        color: 'lightcoral',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: -30 
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        width: 10,
                
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {

        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10             
    },
    back: {
      
      width: '100%',
      height: 50,
      bottom: 650,
      left: -10,
      borderRadius: 10               
  },
    textSign: {
      
        fontSize: 18,
        fontWeight: 'bold'
    },
    feather: {
        margin: 20,
        
    },
  });