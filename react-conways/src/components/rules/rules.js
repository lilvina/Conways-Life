import React from 'react';

const Rules = () => {
  return(
    <div className="rules">
      <h3>Rules for Conways</h3>
      <ul>
        <li>
          If a cell is alive and it has exactly 2 or 3 live neighbors, it stays alive.
        </li>
        <li>
          If a cell is alive and it has less than 2 or 4+ live neighbors, it dies.
        </li>
        <li>
          If a cell is dead and it has exactly 3 live neighbors, it comes to life.
        </li>
      </ul>
    </div>
  )
}

export default Rules;
