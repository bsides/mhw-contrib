import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import WeaponInfo from './Weapon/WeaponInfo'
import { getWeapons } from './middleware/requests'
import { Wrapper, styleWeaponInfo } from './styles/general'

const WEAPON_TYPES = [
  { title: 'Great Sword', type: 'great-sword' },
  { title: 'Long Sword', type: 'long-sword' },
  { title: 'Sword and Shield', type: 'sword-and-shield' },
  { title: 'Dual Blades', type: 'dual-blades' },
  { title: 'Hammer', type: 'hammer' },
  { title: 'Hunting Horn', type: 'hunting-horn' },
  { title: 'Lance', type: 'lance' },
  { title: 'Gunlance', type: 'gunlance' },
  { title: 'Switch Axe', type: 'switch-axe' },
  { title: 'Charge Blade', type: 'charge-blade' },
  { title: 'Insect Glaive', type: 'insect-glaive' },
  { title: 'Light Bowgun', type: 'light-bowgun' },
  { title: 'Heavy Bowgun', type: 'heavy-bowgun' },
  { title: 'Bow', type: 'bow' }
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

    const { type, id } = this.props.match.params
    if (type) {
      this.showWeaponsByType(type)
      this.setState({
        isWeaponTypeSelected: type ? true : false
      })
    }
    if (id) {
      this.showWeaponsById(parseInt(id, 10))
    }
    console.log('mounted')
  }
  componentDidUpdate(prevProps) {
    const { type, id } = this.props.match.params
    const { type: oldType, id: oldId } = prevProps.match.params
    if (type !== oldType) {
      this.showWeaponsByType(type)
      this.setState({
        isWeaponTypeSelected: type ? true : false
      })
    }
    if (id !== oldId) {
      this.showWeaponsById(parseInt(id, 10))
    }
  }

  handleWTSelected = evt => {
    const weaponType = evt.target.value
    this.showWeaponsByType(weaponType)
    this.setState({
      isWeaponTypeSelected: weaponType ? true : false
    })
    // Change path
    this.props.history.push(`/weapons/${weaponType}`)
  }

  handleWeaponSelected = evt => {
    const weaponId = parseInt(evt.target.value, 10) // item.id is int!
    const { weapons } = this.state
    this.showWeaponsById(weaponId)
    // Change path
    this.props.history.push(
      `/weapons/${this.props.match.params.type}/${weaponId}`
    )
  }

  showWeaponsByType(weaponType) {
    const { weapons } = this.state
    const weaponsByType = weapons.filter(
      item => (item.type === weaponType ? item : false)
    )
    this.setState({ weaponsByType })
  }

  showWeaponsById(weaponId) {
    const { weapons } = this.state
    const filteredWeapon = weapons.filter(
      item => (item.id === weaponId ? item : false)
    )
    this.setState({ weaponSelected: filteredWeapon })
  }

  handleInput = evt => {
    console.log(evt.target)
  }

  render() {
    const { weaponsByType, weaponSelected } = this.state
    const { type, id } = this.props.match.params

    const ListWeaponsTypes = () => (
      <select onChange={this.handleWTSelected} defaultValue={type}>
        <option>Select a Weapon Type</option>
        {WEAPON_TYPES.map(weapon => (
          <option key={weapon.type} value={weapon.type}>
            {weapon.title}
          </option>
        ))}
      </select>
    )
    const ListWeapons = () => (
      <select onChange={this.handleWeaponSelected} defaultValue={id}>
        <option>Select a Weapon</option>
        {weaponsByType.map(weapon => (
          <option key={weapon.id} value={weapon.id}>
            {weapon.name}
          </option>
        ))}
      </select>
    )
    const WeaponInfoWrapper = () => {
      return weaponSelected.length > 0 ? (
        <div className={styleWeaponInfo}>
          {weaponSelected.map(weapon => (
            <WeaponInfo
              weapon={weapon}
              key={weapon.id}
              handleInput={this.handleInput}
            />
          ))}
        </div>
      ) : null
    }

    return (
      <Wrapper>
        <div>
          <ListWeaponsTypes />
          <ListWeapons />
          <WeaponInfoWrapper />
        </div>
      </Wrapper>
    )
  }
}

export default App
