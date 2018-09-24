import React from 'react'
import startCase from 'lodash/startCase'
import join from 'lodash/join'

const Attributes = ({ attributes }) => {
  let result = []
  for (let attr in attributes) {
    switch (attr) {
      case 'ammoCapacities':
        let ammoResult = []
        for (let ammo in attributes[attr]) {
          console.log(ammo)
          console.log(attributes[attr])
          console.log(attributes[attr][ammo])
          ammoResult.push(
            <div key={ammo}>
              {startCase(ammo)} ({join(attributes[attr][ammo], ', ')})
            </div>
          )
        }
        result.push(
          <li key={attr}>
            <span>{startCase(attr)}</span>
            <span>{ammoResult.map(ammo => ammo)}</span>
          </li>
        )
        break
      case 'coatings':
        result.push(
          <li key={attr}>
            <span>{startCase(attr)}</span>
            <span>
              {attributes[attr].map(coating => startCase(coating)).join(', ')}
            </span>
          </li>
        )
        break
      default:
        result.push(
          <li key={attr}>
            <span>{startCase(attr)}</span>
            <span>{startCase(attributes[attr])}</span>
          </li>
        )
        break
    }
  }
  return result.map(item => item)
}

export default Attributes
