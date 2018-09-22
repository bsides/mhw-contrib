import React, { Component, Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Handicraft from './Handicraft'
import Sharpness from './Sharpness'
import imgIcons from '../img/icons.png'

const wrapper = css`
  display: flex;
  flex-flow: column;
  list-style-type: none;
  padding: 1.3em;
  margin: 0;

  & li {
    flex: 1;
    border-bottom: 1px dashed #333;

    &:first-child {
      display: flex;
    }
  }
`
const bgIcon = css`
  background: url(${imgIcons}) no-repeat 0px 0px;
  width: 54px;
  height: 54px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 40px;
    height: 40px;
  }
`

class WeaponInfo extends Component {
  state = { handicraft: 0 }
  handleHandicraft = evt => {
    const { value } = evt.target
    this.setState({ handicraft: parseInt(value, 10) })
  }
  render() {
    const { weapon } = this.props
    const { elements, attributes } = weapon
    const isCraftable = weapon.crafting.craftable ? (
      <li>Craftable</li>
    ) : (
      <li>Upgradeable</li>
    )

    return (
      <Fragment>
        <ul className={wrapper}>
          <li>
            <div className={bgIcon}>
              <img
                src={weapon.assets.icon}
                alt={`Weapon Icon for ${weapon.name}`}
              />
            </div>
            <h1>{weapon.name}</h1>
          </li>
          <li>
            Image:{' '}
            <img
              src={weapon.assets.image}
              alt={`Representation of ${weapon.name}`}
            />
          </li>
          <li>ID: {weapon.id}</li>
          <li>Rarity: {weapon.rarity}</li>
          {weapon.durability && (
            <li>
              <div>
                Handicraft:{' '}
                <Handicraft
                  onChange={this.handleHandicraft}
                  durability={weapon.durability.length}
                />
              </div>
              Sharpness:{' '}
              <Sharpness
                durability={weapon.durability}
                handicraft={this.state.handicraft}
              />
            </li>
          )}

          <li>
            <div>Attack Bloat: {weapon.attack.display}</div>
            <div>Attack Raw: {weapon.attack.raw}</div>
            {elements.length > 0 &&
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
            {attributes.deviation && (
              <div>Deviation: {attributes.deviation}</div>
            )}
            {attributes.elderseal && (
              <div>Elderseal: {attributes.elderseal}</div>
            )}
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
}

export default WeaponInfo
