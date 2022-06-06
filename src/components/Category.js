import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Category = ({ category}) => {
  return (
    <View style={styles.category_container}>
      <Text style={styles.category_name}>{category ? category.category_name : 'Not Added'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    category_container: {
        backgroundColor: '#f81745',
        padding: 6,
        borderRadius: 5,
        textAlign: 'center',
    },
    category_name: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 12
    }
});

export default Category;
