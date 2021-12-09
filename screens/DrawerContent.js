import React from "react";
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AuthContext } from "../components/context";

export function DrawerContent(props) {

    const {signOut} = React.useContext(AuthContext);
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView { ...props }>
                <View style={styles.drawerContent}>
                    
                </View>

                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="홈"
                        onPress={() => {props.navigation.navigate('Home')}}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                            name="account-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="내정보"
                        onPress={() => {props.navigation.navigate('Profile')}}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialIcons
                            name="settings"
                            color={color}
                            size={size}
                            />
                        )}
                        label="설정"
                        onPress={() => {props.navigation.navigate('Settings')}}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                            name="account-check-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="고객지원"
                        onPress={() => {}}
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <MaterialCommunityIcons
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )}
                    label="로그아웃"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });