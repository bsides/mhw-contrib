import React from 'react'

const Handicraft = props => (
  <select onChange={props.onChange}>
    {[...Array(props.durability).keys()].map(n => (
      <option value={n} key={n}>
        {n}
      </option>
    ))}
  </select>
)

export default Handicraft
