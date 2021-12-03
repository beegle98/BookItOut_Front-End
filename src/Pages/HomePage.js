import * as React from 'react';
import {
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import styles from '../Styles/Style'

export default function HomePage ({ navigation }) {
    
    return (
    <View style={styles.view}>
        <SafeAreaView style={{ flex: 1 }}>
        <SectionList
            
            contentContainerStyle={{ paddingHorizontal: 0 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({ section }) => (
            <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                {section.horizontal ? (
                <FlatList
                    horizontal
                    style={styles.FlatList}
                    data={section.data}
                    renderItem={({ item }) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                />
                ) : null}
            </>
            )}
            renderItem={({ item, section }) => {
            if (section.horizontal) {
                return null;
            }
            return <ListItem item={item} />;
            }}
        />
        </SafeAreaView>
    </View>
    );

}

const ListItem = ({ item }) => {
return (
    <View style={styles.item}>
    <Image
        source={{
        uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
    />
    <Text style={styles.itemText}>{item.text}</Text>
    </View>
);
}

const SECTIONS = [
{
    title: '동네 도서',
    horizontal: true,
    data: [
    {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
    },
    {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
    },

    {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
    },
    {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
    },
    {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
    },
    {
        key: '6',
        text: 'Item text 6',
        uri: 'https://picsum.photos/id/1003/200',
    },
    {
        key: '7',
        text: 'Item text 7',
        uri: 'https://picsum.photos/id/1004/200',
    },
    ],
},
{
    title: '베스트셀러',
    horizontal: true,
    data: [
    {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
    },
    {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
    },

    {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
    },
    {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
    },
    {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
    },
    {
        key: '6',
        text: 'Item text 6',
        uri: 'https://picsum.photos/id/1019/200',
    },
    {
        key: '7',
        text: 'Item text 7',
        uri: 'https://picsum.photos/id/1018/200',
    },
    ],
},
{
    title: '최신 도서',
    horizontal: true,
    data: [
    {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1020/200',
    },
    {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
    },

    {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
    },
    {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
    },
    {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1036/200',
    },
    {
        key: '6',
        text: 'Item text 6',
        uri: 'https://picsum.photos/id/1037/200',
    },
    {
        key: '7',
        text: 'Item text 7',
        uri: 'https://picsum.photos/id/1038/200',
    },
    ],
},
];

