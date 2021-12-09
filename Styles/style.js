import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
      right: 90,
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

export default styles;