import ReactDOM from 'react-dom';
import React from 'react';

function Home() {
    return <h2>Home</h2>;
}

const wrapper = document.getElementById('root-app');
ReactDOM.render(<Home />, wrapper);