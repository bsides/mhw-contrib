import React, { Component, Fragment } from 'react'
import styled, { css } from 'react-emotion'
import startCase from 'lodash/startCase'
import join from 'lodash/join'
import Handicraft from './Handicraft'
import Sharpness from './Sharpness'
import imgIcons from '../img/icons.png'
import imgIcons2 from '../img/icons2.png'
import imgIcons3 from '../img/icons3.png'

const wrapper = css`
  list-style-type: none;
  padding: 1.3em;
  margin: 0;
  line-height: 2;
  font-size: 1.1em;

  & li {
    display: flex;
    align-items: center;
    border-bottom: 1px dashed #333;

    &:first-child {
      display: flex;
    }
    > span {
      flex: 1;
      + span {
        flex: 0 1 auto;
      }
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
const IconAttack = styled('span')`
  background: url(${imgIcons3}) no-repeat -1.4em -3.85em;
  background-size: 10em;
  display: inline-block;
  width: 1em;
  height: 1em;
`
const IconElement = styled('span')`
  background: url(${imgIcons2}) no-repeat -11.5em -9em;
  background-size: 20.2em;
  display: inline-block;
  width: 1em;
  height: 1em;
`
const IconSharpness = styled('span')`
  background: url(${imgIcons2}) no-repeat -11.5em -9em;
  background-size: 20.2em;
  display: inline-block;
  width: 1em;
  height: 1em;
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
    const Attributes = () => {
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
                <span key={ammo}>
                  {startCase(ammo)} ({join(attributes[attr][ammo], ', ')})
                </span>
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
                  {attributes[attr]
                    .map(coating => startCase(coating))
                    .join(', ')}
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
          <li>
            <span>ID:</span>
            <span>{weapon.id}</span>
          </li>
          <li>
            <span>Rarity:</span>
            <span>{weapon.rarity}</span>
          </li>
          {weapon.durability && (
            <li>
              <span>
                <IconSharpness />
                Sharpness:{' '}
              </span>
              <span>
                <Sharpness
                  durability={weapon.durability}
                  handicraft={this.state.handicraft}
                />
                Handicraft:{' '}
                <Handicraft
                  onChange={this.handleHandicraft}
                  durability={weapon.durability.length}
                />
              </span>
            </li>
          )}

          <li>
            <span>
              <IconAttack />
              Attack Displayed:{' '}
            </span>
            <span>{weapon.attack.display}</span>
          </li>
          <li>
            <span>
              <IconAttack />
              Attack Raw:
            </span>
            <span>{weapon.attack.raw}</span>
          </li>
          <li>
            {elements.length > 0 &&
              elements.map(element => {
                return (
                  <Fragment key={element.damage}>
                    <span>
                      <IconElement />
                      Element:{' '}
                    </span>
                    <span>
                      {element.damage} {element.type}
                      {element.hidden ? `(Hidden)` : ``}
                    </span>
                  </Fragment>
                )
              })}
          </li>
          {weapon.slots.length > 0 && (
            <li>
              <span>Slots:</span>
              <span>
                {weapon.slots.length}{' '}
                {weapon.slots.map(slot => `(Rank ${slot.rank}) `)}
              </span>
            </li>
          )}
          <Attributes />
          {isCraftable}
        </ul>
      </Fragment>
    )
  }
}

export default WeaponInfo
