import React, { Component, Fragment } from 'react'
import WeaponInfo from './WeaponInfo'
import { getWeapons } from './middleware/requests'

const WEAPON_TYPES = [
  { title: 'Great Sword', id: 'great-sword' },
  { title: 'Long Sword', id: 'long-sword' },
  { title: 'Sword and Shield', id: 'sword-and-shield' },
  { title: 'Dual Blades', id: 'dual-blades' },
  { title: 'Hammer', id: 'hammer' },
  { title: 'Hunting Horn', id: 'hunting-horn' },
  { title: 'Lance', id: 'lance' },
  { title: 'Gunlance', id: 'gunlance' },
  { title: 'Switch Axe', id: 'switch-axe' },
  { title: 'Charge Blade', id: 'charge-blade' },
  { title: 'Insect Glaive', id: 'insect-glaive' },
  { title: 'Light Bowgun', id: 'light-bowgun' },
  { title: 'Heavy Bowgun', id: 'heavy-bowgun' },
  { title: 'Bow', id: 'bow' }
]

class App extends Component {
  state = {
    weapons: [],
    isWeaponTypeSelected: false,
    weaponsByType: [],
    weaponSelected: []
  }

  async componentDidMount() {
    const weapons = await getWeapons()
    this.setState({ weapons })
  }

  handleWTSelected = evt => {
    const weaponType = evt.target.value
    this.showWeaponsByType(weaponType)
    this.setState({
      isWeaponTypeSelected: evt.target.value === '0' ? true : false
    })
  }

  showWeaponsByType(weaponId) {
    const { weapons } = this.state
    const weaponsByType = weapons.filter(
      item => (item.type === weaponId ? item : false)
    )
    this.setState({ weaponsByType })
  }

  handleWeaponSelected = evt => {
    const weaponId = parseInt(evt.target.value, 10) // item.id is int!
    const { weapons } = this.state
    const filteredWeapon = weapons.filter(item => {
      if (item.id === weaponId) return item
      return false
    })
    console.log(filteredWeapon)
    this.setState({ weaponSelected: filteredWeapon })
  }

  handleInput = evt => {
    console.log(evt.target)
  }

  render() {
    const { weaponsByType, weaponSelected } = this.state
    const weaponTypeOptions = WEAPON_TYPES.map(weapon => (
      <option key={weapon.id} value={weapon.id}>
        {weapon.title}
      </option>
    ))
    const weaponOptions = weaponsByType.map(weapon => (
      <option key={weapon.id} value={weapon.id}>
        {weapon.name}
      </option>
    ))
    const weaponInfo = weaponSelected.map(weapon => (
      <WeaponInfo
        weapon={weapon}
        key={weapon.id}
        handleInput={this.handleInput}
      />
    ))
    return (
      <Fragment>
        <select onChange={this.handleWTSelected}>
          <option>Select a Weapon Type</option>
          {weaponTypeOptions}
        </select>
        <select onChange={this.handleWeaponSelected}>
          <option>Select a Weapon</option>
          {weaponOptions}
        </select>
        {weaponInfo}
      </Fragment>
    )
  }
}

export default App
