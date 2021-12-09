import React, { useContext } from 'react';
import {  
  StyleSheet,
  Text,  
  View,  
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import TradeScreen from './TradeScreen';
import TradePostScreen from './TradePostScreen';
import SearchPostScreen from './TradePostSearchScreen';
import SettingsScreen from './SettingsScreen';
import MessagesScreen from './ReceivedMessagesScreen';
import SignInScreen from './SignInScreen';
import AddPostScreen from './AddPostScreen';
import SendMessageScreen from './SendMessageScreen';
import ReceiveMessagesScreen from './ReceiveMessagesScreen';
import CommunityScreen from './CommunityScreen';
import ReceivedMessagesScreen from './ReceivedMessagesScreen';


import { IconButton } from 'react-native-paper';
import { AuthContext } from '../components/context';

import { UserContext } from '../components/usercontext';


const HomeStack = createNativeStackNavigator();
const TradeStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = ({ route }) => {  
    console.log('MainTab user_id: ', route.params);
    const user_id = useContext(UserContext);
    console.log('MainTab userContext user_id: ', user_id.settingUserName);

    return(
      
    <Tab.Navigator
      initialRouteName="메뉴"
      activeColor="#fff"
      barStyle={{ backgroundColor: 'tomato' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          if (route.name === 'Home') {
            iconName += (focused ? 'home' : 'home-outline');
          } else if (route.name === 'Trade') {
            iconName += (focused ? 'book' : 'book-outline');
          } else if (route.name === 'Community') {
            iconName += (focused ? 'chatbubbles' : 'chatbubbles-outline');
          } else if (route.name === 'Messages') {
            iconName += (focused ? 'mail' : 'mail-outline');
          } else if (route.name === 'MyInfo') {
            iconName += (focused ? 'person' : 'person-outline');
          }

          // You can return any component that you like here!
          return <Ionicons
          name={iconName}
          size={26}
          color={focused ? '#ef4367' : 'gray'} />;
        },
        tabBarStyle: {
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: "#ef4367",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        
      })}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}  
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}      
      />
      <Tab.Screen
        name="Trade"
        component={TradeStackScreen}
        options={{
          tabBarLabel: '거래글',
          tabBarIcon: ({ color }) => (
            <Icon name="book" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: '커뮤니티',
          tabBarIcon: ({ color }) => (
            <Icon name="chatbubbles" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStackScreen}   
        //initialParams={{ user_id: user_id }}     
        options={{
          tabBarLabel: '쪽지함',
          tabBarIcon: ({ color }) => (
            <Icon name="mail" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={SettingsScreen}
        options={{
          tabBarLabel: '내정보',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    );
};
export default MainTabScreen;

 const HomeStackScreen = ({navigation}) => {
     return(
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'lightcoral',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerShown: false
    }}>
        <HomeStack.Screen name="HomeStack" component={HomeScreen} options={{
          title: '홈' ,
          headerStyle: {
            height: 60,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          },
          headerTitle: () => <Image
          style={{ width: 50, height: 50, }}
          source={require('../Images/book_logo.png')}
          />,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              
              <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons onPress={() => navigation.navigate('HomeSearch')}
                  style={styles.headerIcons1}
                  name={'search'}
                  color={'grey'}
                  size={25}
                  />
                  <Ionicons onPress={() => alert("알림")}
                  style={styles.headerIcons3}
                  name={'notifications-outline'}
                  color={'grey'}
                  size={25}
                  />
              </TouchableOpacity >
          </View >
          ),
          
        }}
        />
        <HomeStack.Screen name="HomeSearch" component={SearchScreen} options={{
          headerTitle: "검색",
          headerShown: true, 
          backgroundColor:"lightcoral"
        }}/>   
      </HomeStack.Navigator>
     );
  };
  
  const TradeStackScreen = ({navigation}) => {    
      return(
    <TradeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor:"lightcoral",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerShown: false
    }}>
        <TradeStack.Screen name="TradeStack" component={TradeScreen} options={{
          headerStyle: {
            height: 60,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          },

          headerLeft: () => (
            <Icon name="menu" size={25}
            backgroundColor="#009387" options={() => {navigation.openDrawer()}}>
            </Icon>
          )

        }} />
        <TradeStack.Screen name="TradePost" component={TradePostScreen}
        options={{
          unmountOnBlur: true,
        }}
        /> 
        <TradeStack.Screen name="AddPost" component={AddPostScreen}/>
        <TradeStack.Screen name="SearchPost" component={SearchPostScreen} options={{
          title: "검색",
          headerShown: true,
          backgroundColor:"lightcoral"
        }}/>
        <TradeStack.Screen name="SendMessage" component={SendMessageScreen}/>
      </TradeStack.Navigator>
      );
  };

  const MessagesStackScreen = ({route,navigation}) => {
    //console.log('ReceivedMessagesScreen userName param: ', route.params.user_id);
    //console.log('MessagesScreen user_id param: ', user_id);
    return(
   <MessagesStack.Navigator screenOptions={{
     headerStyle: {
       backgroundColor: '#009387',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
       fontWeight: 'bold'
     },
     headerShown: false
   }}>
       <MessagesStack.Screen name="MessageStack" initialParams={{ user_name: 'abc'}} component={ReceivedMessagesScreen} options={{         
         
       }} />      
       {/*<MessagesStack.Screen name="ReceivedMessage" initialParams={{ user_id: route.params.user_id}} component={ReceivedMessagesScreen} />*/}
       <MessagesStack.Screen name="SendMessage" component={SendMessageScreen}/>
     </MessagesStack.Navigator>
    );
 };

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
    right: 50,
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