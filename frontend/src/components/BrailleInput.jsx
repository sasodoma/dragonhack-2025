import React from 'react';

export default function BrailleInput({ braille, setBraille }) {
  return (
    <div className="braille-grid">
      {braille.map((active, index) => (
        <button
          key={index}
          className={`braille-dot ${active ? 'active' : ''}`}
          onClick={() => {
            setBraille(braille.map((val, idx) => idx === index ? !val : val));
          }}
        />
      ))}
    </div>
  );
}
