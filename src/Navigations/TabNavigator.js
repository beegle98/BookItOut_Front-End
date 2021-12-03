import * as React from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '../Pages/HomePage'
import styles from '../Styles/Style'
import LogoTitle from '../Components/LogoTitle'

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}


function PostScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Post screen</Text>
    </View>
  );
}

function CommunityScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Community screen</Text>
    </View>
  );
}
function MessageScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>쪽지함</Text>
    </View>
  );
}

function MyInfoScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MyInfo screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const MyInfoStack = createNativeStackNavigator();

function MyInfoStackScreen() {
  return (
    <MyInfoStack.Navigator>
      <MyInfoStack.Screen name="Myinfo" component={MyInfoScreen} />
      <MyInfoStack.Screen name="Details" component={DetailsScreen} />
    </MyInfoStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigator({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          if (route.name === 'Home') {
            iconName += (focused ? 'home' : 'home-outline');
          } else if (route.name === 'Post') {
            iconName += (focused ? 'book' : 'book-outline');
          } else if (route.name === 'Community') {
            iconName += (focused ? 'chatbubbles' : 'chatbubbles-outline');
          } else if (route.name === 'Message') {
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
      name="Home" component={HomePage}
      options={{
        title: '홈' ,
        headerStyle: {
          height: 60,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        },
        headerTitle: (props) => <LogoTitle {...props} />,
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            
            <TouchableOpacity activeOpacity={0.7}>
                <Ionicons onPress={() => navigation.navigate('SearchPage')}
                style={styles.headerIcons1}
                name={'search'}
                color={'grey'}
                size={25}
                />
                <Ionicons onPress={() => alert("카테고리")}
                style={styles.headerIcons2}
                name={'menu'}
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
      <Tab.Screen
      name="Post" component={PostScreen}
      options={{ title: '거래글' }}   />
      <Tab.Screen
      name="Community" component={CommunityScreen}
      options={{ title: '커뮤니티' }}   />
      <Tab.Screen
      name="Message" component={MessageScreen}
      options={{ title: '쪽지함' }}   />
      <Tab.Screen
      name="MyInfo" component={MyInfoStackScreen}
      options={{ title: '내정보' }}  />
    </Tab.Navigator>
  );
}



