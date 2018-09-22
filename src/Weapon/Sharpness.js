import React from 'react'
import styled, { css } from 'react-emotion'
import { darken } from 'polished'
import imgIcons from '../img/icons.png'

const sharpnessColors = {
  red: '#d92c2c',
  orange: '#d9662c',
  yellow: '#d9d12c',
  green: '#70d92c',
  blue: '#2c86d9',
  white: '#ffffff'
}
const sharpnessBegin = css`
  background: url(${imgIcons}) no-repeat 0px -58px;
  width: 30px;
  height: 22px;
`
const sharpnessEnd = css`
  background: url(${imgIcons}) no-repeat -34px -58px;
  width: 14px;
  height: 22px;
`
const sharpnessWrapper = css`
  background: #454545
    linear-gradient(to bottom, #000000 0%, #343434 60%, #343434 100%);
  display: flex;
  height: 16px;
  min-width: 100px;
  border: 0;
  border-top: 2px solid #949494;
  border-bottom: 2px solid #737373;
  margin-top: 5px;
  padding: 1px;
`
const SharpnessData = styled('span')(props => ({
  height: 10,
  width: props.width,
  background: `${props.color} linear-gradient(to top, ${darken(
    10,
    props.color
  )} 0%, ${props.color} 60%, ${props.color} 100%)`
}))

const Sharpness = props => {
  let result = []
  for (let color in sharpnessColors) {
    result.push(
      <SharpnessData
        key={sharpnessColors[color]}
        color={sharpnessColors[color]}
        width={`${Math.floor(
          (props.durability[props.handicraft][color] / 400) * 100
        )}%`}
      />
    )
  }
  return (
    <div style={{ display: 'flex' }}>
      <div className={sharpnessBegin} />
      <div className={sharpnessWrapper}>{result.map(item => item)}</div>
      <div className={sharpnessEnd} />
    </div>
  )
}

export default Sharpness
