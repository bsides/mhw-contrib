import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from 'react-emotion'
import imgDropboxBackground from './img/bg_ranking.jpg'

const styleDropdown = css`
  position: relative;
  cursor: pointer;
  padding: 1em;

  > div {
    display: none;
    &:first-child {
      display: block;
    }
  }
  > ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    border: 1px solid #6f675d;
    background: url(${imgDropboxBackground});
    position: absolute;

    > li {
      &:first-child {
        padding-top: 0.75em;
      }
      &:last-child {
        padding-bottom: 0.75em;
      }
    }
    a {
      padding: 0.3em 0.6em;
      display: block;
    }
    a:hover {
      background: #869818;
      color: #161211;
    }
  }
  a:hover {
    text-decoration: none;
  }
`

class Dropdown extends Component {
  state = { isOpen: false, title: this.props.title }
  toggleList = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }
  handleClick = () => {
    if (!this.state.isOpen) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }
    this.toggleList()
  }
  handleOutsideClick = evt => {
    // ignore clicks on the component itself
    if (this.node.contains(evt.target)) {
      return
    }

    this.handleClick()
  }
  render() {
    const { isOpen, title } = this.state
    const { list, selected, type } = this.props
    return (
      <div
        className={styleDropdown}
        onClick={this.handleClick}
        ref={node => {
          this.node = node
        }}
      >
        <div>
          {selected
            ? list
                .filter(
                  weapon =>
                    weapon.id.toString() === selected.toString()
                      ? weapon.name
                      : false
                )
                .map(weapon => weapon.name)
            : title}
        </div>
        {isOpen && (
          <ul>
            {list.map(weapon => (
              <li key={weapon.id}>
                <Link
                  to={
                    type
                      ? `/weapons/${type}/${weapon.id}`
                      : `/weapons/${weapon.id}`
                  }
                >
                  {weapon.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Dropdown
