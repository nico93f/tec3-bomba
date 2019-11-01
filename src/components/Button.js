import React from 'react';

const Button = ({ backgroundColor, onClick }) => (
    <div
        className="round-button"
        style={{ backgroundColor }}
        onClick={onClick}
    >
        <div className="button-overlay" />
    </div>
);

export default Button;