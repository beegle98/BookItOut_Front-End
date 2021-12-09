import * as React from 'react';
import {
  Image,
} from 'react-native';

export default function LogoTitle() {
    return (
        <Image
        style={{ width: 100, height: 50 }}
        source={require('../Images/book_logo.png')}
        />
    );
}