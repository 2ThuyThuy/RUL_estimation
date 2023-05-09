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
        color: 'white'
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

const InvoiceTableBlankSpace = ({rowsCount}) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map( (x, i) => 
        <View style={styles.row} key={`BR${i}`}>
            <Text style={styles.unit}>-</Text>
            <Text style={styles.day_start}>-</Text>
            <Text style={styles.operation}>-</Text>
            <Text style={styles.day_error}>-</Text>
            <Text style={styles.reliability}>-</Text>
            <Text style={styles.remaining}>-</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableBlankSpace

