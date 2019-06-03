import React, { Fragment } from 'react';
import NavBar from './subcomponents/NavBar.jsx';
import Spaghetti from '../assets/spaghetti.png';

export default function() {
    return (
        <Fragment>
            <NavBar title='Spaghetti - Forbidden' />
            <div style={{textAlign: 'center', marginTop: 80}}>
                <h1
                    style={{paddingTop: 10, paddingBottom: 10, marginBottom: 30}}
                >
                    Sorry, this page is not available
                </h1>
                <img src={Spaghetti} alt="spaghetti" style={{marginLeft: 'auto', marginRight: 'auto'}}/>
            </div>
        </Fragment>
    )
}