import React, { Component, Fragment } from 'react'

class Input extends Component {
  render() {
    const { type } = this.props
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
          />
        )
      case 'textarea':
        return (
          <textarea onChange={this.props.onChange}>
            {this.props.defaultValue}
          </textarea>
        )
      case 'select':
        return (
          <select onChange={this.props.onChange}>
            <option>{this.props.selectDefault}</option>
            {this.props.selectOptions.map(item => item)}
          </select>
        )
    }
    return <Fragment>{type}</Fragment>
  }
}

export default Input
