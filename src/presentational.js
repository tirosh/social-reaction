import React from 'react';

export default function Presentational({ first, last, imgUrl, toggleModal }) {
    return (
        <>
            <h2>I am the Presentational component</h2>
            <h3>
                My name is: {first} {last}
            </h3>
            <div onClick={() => toggleModal()} className='user profile'>
                <img src={imgUrl || '/img/lego.svg'} alt={first} />
            </div>
        </>
    );
}
