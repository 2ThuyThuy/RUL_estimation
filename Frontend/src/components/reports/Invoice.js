import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
//import InvoiceTitle from './InvoiceTitle'
import InvoiceTitle from './InvoiceTitle';
// import BillTo from './BillTo'

import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import logo from '../../assets/img/login1.png'
import InFor from './InFor';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 80,
        height: "auto",
        // marginLeft: 'auto',
        // marginRight: 'auto',
        flexDirection: 'row',
    }
  });
  
  const Invoice = ({invoice}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image style={styles.logo} src={logo} />
                    <InvoiceNo invoice={invoice}/> 
                    <InvoiceTitle title='predictive maintenance'/>
                    <InFor invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        );
  
  export default Invoice