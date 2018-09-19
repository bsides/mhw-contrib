import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'

const WeaponInfo = props => {
  const { weapon } = props
  const { elements, attributes } = weapon
  const sharpnessWrapper = css`
    background: #666666;
    display: flex;
    height: 10px;
    min-width: 100px;
    border: 1px solid #cccccc;
  `
  const sharpnessColors = {
    red: '#d92c2c',
    orange: '#d9662c',
    yellow: '#d9d12c',
    green: '#70d92c',
    blue: '#2c86d9',
    white: '#ffffff'
  }
  const sharpnessStyles = props => css`
    height: 10px;
    width: ${props.width};
    background: ${props.color};
  `
  const SharpnessSpan = styled('span')`
    ${sharpnessStyles};
  `
  const Sharpness = () => {
    let result = []
    for (let color in sharpnessColors) {
      result.push(
        <SharpnessSpan
          key={sharpnessColors[color]}
          color={sharpnessColors[color]}
          width={`${Math.floor((weapon.durability[0][color] / 400) * 100)}%`}
        />
      )
    }
    return result
  }

  const hasElement = elements.length > 0
  const isCraftable = weapon.crafting.craftable ? (
    <li>Craftable</li>
  ) : (
    <li>Upgradeable</li>
  )
  return (
    <Fragment>
      <ul>
        <li>
          Icon:{' '}
          <img
            src={weapon.assets.icon}
            alt={`Weapon Icon for ${weapon.name}`}
          />
        </li>
        <li>
          Image:{' '}
          <img
            src={weapon.assets.image}
            alt={`Representation of ${weapon.name}`}
          />
        </li>
        <li>ID: {weapon.id}</li>
        <li>
          <label htmlFor="name">Name:</label>{' '}
          <input defaultValue={weapon.name} onChange={props.handleInput} />
        </li>
        <li>Rarity: {weapon.rarity}</li>
        {weapon.durability && (
          <li>
            Sharpness:{' '}
            <div className={sharpnessWrapper}>
              {Sharpness().map(item => item)}
            </div>
          </li>
        )}

        <li>
          <div>Attack Bloat: {weapon.attack.display}</div>
          <div>Attack Raw: {weapon.attack.raw}</div>
          {hasElement &&
            elements.map(element => {
              return (
                <div key={element.damage}>
                  Element: {element.damage} {element.type}{' '}
                  {element.hidden ? `(Hidden)` : ``}
                </div>
              )
            })}
        </li>
        {weapon.slots.length > 0 && (
          <li>
            Slots: {weapon.slots.length}{' '}
            {weapon.slots.map(slot => `(Rank ${slot.rank}) `)}
          </li>
        )}
        <li>
          <div>Attributes:</div>
          {attributes.ammoCapacities && (
            <div>Ammo Capacities: {attributes.ammoCapacities}</div>
          )}
          {attributes.affinity && <div>Affinity: {attributes.affinity}</div>}
          {attributes.boostType && (
            <div>Boost Type: {attributes.boostType}</div>
          )}
          {attributes.coatings && (
            <div>
              Coatings: {attributes.coatings.map(coating => `${coating} | `)}
            </div>
          )}
          {attributes.damageType && (
            <div>Damage Type: {attributes.damageType}</div>
          )}
          {attributes.defense && <div>Defense: {attributes.defense}</div>}
          {attributes.deviation && <div>Deviation: {attributes.deviation}</div>}
          {attributes.elderseal && <div>Elderseal: {attributes.elderseal}</div>}
          {attributes.phialType && (
            <div>Phial Type: {attributes.phialType}</div>
          )}
          {attributes.shellingType && (
            <div>Shelling Type: {attributes.shellingType}</div>
          )}
          {attributes.specialAmmo && (
            <div>Special Ammo: {attributes.specialAmmo}</div>
          )}
        </li>
        {isCraftable}
      </ul>
      <hr />
    </Fragment>
  )
}

export default WeaponInfo
