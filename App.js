/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons';

import MainTabScreen from './screens/MainTabScreen';
import { DrawerContent } from './screens/DrawerContent';


import { AuthContext } from './components/context';
import { UserContext } from './components/usercontext';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Drawer = createDrawerNavigator();

const App = () => {

  //const [isLoading, setIsLoading] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null);

  const [settingUserValue, setSettingUserValue] = React.useState('initialuser');


  const initialLoginState = {
    isLoading: true,
    userName: null,
    loginSuccess: false,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        setSettingUserValue({
          settingUserValue: action.id,
        })
        return {
          ...prevState,
          userName: action.id,
          loginSuccess: true,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          loginSuccess: false,
          isLoading: false,
        };      
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() => ({
    signIn: async(username) => {
      const userName = username;
      initialLoginState.userName = username;
      /*try {        
        await AsyncStorage.setItem(true, loginSuccess);
        await AsyncStorage.setItem(userName , userName);
      } catch(e) {
        console.log(e);
      }*/      
      console.log('passed userName: ', userName);
      dispatch({ type: 'LOGIN', id: userName});
      //console.log('loginState.userName: ', loginState.userName);
    },
    signOut: async() => {
      //setUserToken(null);
      //setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
  }), []);

  const userSettings = {
    settingUserName: settingUserValue,
    setSettingUserValue,
  }

  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false); 
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      //console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }  
  console.log("App.js UserContext: ", userSettings.settingUserName);
  return (
    <AuthContext.Provider value={authContext}>
    <UserContext.Provider value={userSettings}>

    <NavigationContainer>      
    { loginState.loginSuccess != false ? (

        <Drawer.Navigator drawerContent = {props => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true
        }}
        >           
        <Drawer.Screen name="드로워" initialParams={{ user_id: loginState.userName }} component={MainTabScreen} options={{
          title: '메뉴' ,
          headerStyle: {
            height: 60,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          },
          headerTitle: () => 
          <Image
          style={{ 
            width: 100, 
            height: 50,
            left: -20,
          }}
          source={require('./Images/LogoTitleImage.png')}
          />,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons onPress={() => alert("알림")}
                  style={styles.headerIcons1}
                  name={'notifications-outline'}
                  color={'grey'}
                  size={25}
                  />
              </TouchableOpacity >
          </View >
          ),
          
        }}/>        
      </Drawer.Navigator>
      )
      :
      <RootStackScreen/>
      }
      

      {/*<Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainTabScreen} />
        {/*<Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>
      }<Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title:'Overview'
        }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>*/}
    </NavigationContainer>
    </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;


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
  headerIcons1: {
    //top: 10,
    right: 20,
  },
  headerIcons2: {
    position: 'absolute',
    //top: -20,
    right: 20,
  },
  headerIcons3: {
     position: 'absolute',
     //top: -20,
     right: 10,
  },
});