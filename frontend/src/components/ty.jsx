import React from 'react';

function ThankYouPage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <svg className="tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '100px', height: '100px', fill: '#4CAF50', margin: '20px auto' }}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/><path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <p style={{ fontSize: '18px' }}>Thank you for booking. Your booking is successful.</p>
            <a href = "/home">Go to homepage</a>
        </div>
    );
}

export default ThankYouPage;
