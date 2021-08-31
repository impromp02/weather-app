import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchInput = ({ placeholder, onSubmit }) => {
    const [text, setText] = useState(placeholder);

    const handleChangeText = (text) => {
        setText(text);
    };

    const handleSubmitEditing = () => {
        if(!text) return;
        
        onSubmit(text);
        setText('');
    };

    return <View style={styles.container}>
        <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor="white"
            style={styles.textInput}
            clearButtonMode="always"
            value={text}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmitEditing}
        />
    </View>;
};

export default SearchInput;

const styles = StyleSheet.create({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    textInput: {
        flex: 1,
        color: 'white'
    }
});