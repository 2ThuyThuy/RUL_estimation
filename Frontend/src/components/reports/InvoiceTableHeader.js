import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    unit: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    day_start: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    operation: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    day_error: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    reliability: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    remaining: {
       width: '15%'
    }
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.unit}>Unit</Text>
        <Text style={styles.day_start}>Day start</Text>
        <Text style={styles.operation}>Operation</Text>
        <Text style={styles.day_error}>Day error</Text>
        <Text style={styles.reliability}>Reliability</Text>
        <Text style={styles.remaining}>Remaining</Text>
    </View>
  );
  
  export default InvoiceTableHeader