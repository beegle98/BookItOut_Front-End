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
  
import { TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../components/context';
import Users from '../model/users';

  const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
      username: '',
      password: '',
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true
    });

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
      if(val.trim().length >= 4){
          setData({
              ...data,
              username: val,
              check_textInputChange: true,
              isValidUser: true           
          });
      } else {
          setData({
              ...data,
              username: val,
              check_textInputChange: false,
              isValidUser: false
          });
      }      
    }

    const handlePasswordChange = (val) => {
      if(val.trim().length >= 4) {
        setData({
          ...data,
          password: val,
          isValidPassword: true
      });
    } else {
        setData({
          ...data,
          password: val,
          isValidPassword: false
        });
      }
    }

    /*const updataSecureTextEntry = () => {
      setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
      });
    }*/

    const handleValidUser = (val) => {
      if( val.trim().length >= 4){
        setData({
          ...data,
          isValidUser: true
        });
      } else {
        setData({
          ...data,
          isValidUser: false
        });
      }
      

    }
    

    const loginHandler = (username, password) => {
      const foundUser = username;

      if (username.length == 0 || password.length == 0) {
        Alert.alert('잘못된 입력입니다!', 'Username이나 Password가 입력되지 않았습니다.', [
          {text: '확인'}
        ]);
        return;
      }


      fetch("http://ec2-3-19-61-166.us-east-2.compute.amazonaws.com:3000/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: username,

          pw: password
        }),        

      }).then((response) => response.json())
        .then((response) => {          
            if(response.success == true){
              Alert.alert('로그인 성공', '책이라웃에 오신 걸 환영합니다.', [
                {text: '확인'}
              ]);
              console.log("login success");         
              signIn(username);
            }
            else{
              Alert.alert('로그인 실패', 'Username이나 Password가 올바르지 않습니다.', [
                {text: '확인'}
              ]);
            }
        })
        .catch((error)=>{
          alert("Error Occured!!" + error.msg);
        })

    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.Image
                animation="bounceIn"                
                source={require('../Images/book_logo.png')}
                style={styles.logo}
                resizeMode="cover"
          />
          <Text style={styles.text_header}>WelCome!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer, {
            marginTop: -10
          }}>    
          </Text>
          <View style={styles.action}>
            <FontAwesome
              name="user"
              color="dimgrey"
              size={55}              
            />
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val)=>textInputChange(val)}
              onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
            />            
          </View>
          {data.isValidUser ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Username은 4글자 이상이어야 합니다.</Text>
          </Animatable.View>
          }
          <Text style={styles.text_footer, {
            marginTop: -20
          }}></Text>
          <View style={styles.action}>
            <FontAwesome5
              name="key"
              color="dimgrey"
              size={40}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={data.secureTextEntry ? true : false}
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
          {data.isValidPassword ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Password는 4글자 이상이어야 합니다.</Text>
          </Animatable.View>
          }          

          <TouchableOpacity>
            <Text style={{color: '#009387', marginTop: 15}}>비밀번호 찾기</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.signIn, {
                marginTop: -25
              }]}              
              onPress={() => {loginHandler( data.username, data.password)}}
            >
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, {
                color:'#fff',
                marginTop: 10
               }]}>로그인</Text>
            </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {navigation.navigate('SignUpScreen')}}
              style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 10
              }]}
              >
                <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, {
                color:'#fff',
                marginTop: 10
               }]}>회원가입</Text>
            </LinearGradient>
                
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  export default SignInScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff'
    },
    header: {
        flex: 1.5,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 0
    },
    logo: {
      width: '100%',
      height: '100%',         
      
      //height: height_logo
      
    },
    footer: {
        flex: 2,
        backgroundColor: 'lightcoral',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
        borderRadius: 10,        
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    feather: {
        margin: 20,
        
    },
  });