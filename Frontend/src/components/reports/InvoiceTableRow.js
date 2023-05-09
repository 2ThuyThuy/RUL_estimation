import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    unit: {
        width: '15%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        // paddingLeft: 8,
    },
    day_start: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        // paddingRight: 8,
    },
    operation: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        // paddingRight: 8,
    },
    day_error: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        // paddingRight: 8,
    },
    reliability: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        // paddingRight: 8,
    },
    remaining: {
        width: '15%',
        textAlign: 'center',
        // paddingRight: 8,
    }

  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( item => 
        <View style={styles.row} key={item.unit.toString()}>
            <Text style={styles.unit}>{item.unit}</Text>
            <Text style={styles.day_start}>{item.day_start}</Text>
            <Text style={styles.operation}>{item.operation}</Text>
            <Text style={styles.day_error}>{item.day_error}</Text>
            <Text style={styles.reliability}>{item.reliability}</Text>
            <Text style={styles.remaining}>{item.remaining}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow