import React from 'react';

export default function Presentational({ first, last, imgUrl }) {
    console.log('props in Pres: ', first, last, imgUrl);
    imgUrl = imgUrl || '/img/default.png';
    return (
        <>
            <h2>I am the Presentational component</h2>
            <h3>
                My name is: {first} {last}
            </h3>
            <img src={imgUrl} alt={first} />
        </>
    );
}
