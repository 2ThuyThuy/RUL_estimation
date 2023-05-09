import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    inFor: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const InFor = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.inFor}>Customer :</Text>
        <Text>Name: {invoice.name}</Text>
        <Text>phone: {invoice.phone}</Text>
        <Text>email: {invoice.email}</Text>
    </View>
  );
  
  export default InFor