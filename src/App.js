import React, { Component, Fragment } from 'react'
import { getWeapons } from './middleware/requests'
import WeaponInfo from './Weapon/WeaponInfo'
import { Wrapper, styleWeaponInfo } from './styles/general'
import Dropdown from './Dropdown'

const WEAPON_TYPES = [
  { name: 'Great Sword', id: 'great-sword' },
  { name: 'Long Sword', id: 'long-sword' },
  { name: 'Sword and Shield', id: 'sword-and-shield' },
  { name: 'Dual Blades', id: 'dual-blades' },
  { name: 'Hammer', id: 'hammer' },
  { name: 'Hunting Horn', id: 'hunting-horn' },
  { name: 'Lance', id: 'lance' },
  { name: 'Gunlance', id: 'gunlance' },
  { name: 'Switch Axe', id: 'switch-axe' },
  { name: 'Charge Blade', id: 'charge-blade' },
  { name: 'Insect Glaive', id: 'insect-glaive' },
  { name: 'Light Bowgun', id: 'light-bowgun' },
  { name: 'Heavy Bowgun', id: 'heavy-bowgun' },
  { name: 'Bow', id: 'bow' }
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

    const Select = ({ list, value, onChange }) => (
      <select onChange={onChange} defaultValue={value}>
        <option>Select a Weapon</option>
        {list.map(weapon => (
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
          {/* <Dropdown
            title="Select a Weapon Type"
            list={WEAPON_TYPES}
            selected={type}
          />
          <Dropdown
            title="Select a Weapon"
            list={weaponsByType}
            selected={id}
            type={type}
          /> */}
          <Select
            list={WEAPON_TYPES}
            value={type}
            onChange={this.handleWTSelected}
          />
          <Select
            list={weaponsByType}
            value={id}
            onChange={this.handleWeaponSelected}
          />
          <WeaponInfoWrapper />
        </div>
      </Wrapper>
    )
  }
}

export default App
