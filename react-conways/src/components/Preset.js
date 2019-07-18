import React from 'react';

import './Preset.css';

const Preset = () => {
  return (
    <div>
      <h3>Preset</h3>
      <br />
      <div className="preset">
        <button className="button-preset">Preset 1</button>
      </div>
      <div className="preset">
        <button className="button-preset">Preset 2</button>
      </div>
      <div className="preset">
        <button className="button-preset">Preset 3</button>
      </div>
      <div className="preset">
        <button className="button-preset">Preset 4</button>
      </div>
    </div>
  )
}

export default Preset;
