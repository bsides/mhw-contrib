import React from 'react'
import styled, { css } from 'react-emotion'
import Background from '../img/bg_ranking.jpg'

const Wrapper = styled('div')(
  props => `
    display: flex;
    align-items: center;
    justify-content: center;
  `
)
const styleWeaponInfo = css`
  /* background: url(${Background}); */
  box-shadow: 0 0 20px #000;
  background-color: rgba(0, 0, 0, 0.6);
  /* max-width: 500px; */
  display: flex;
`

export { Wrapper, styleWeaponInfo }
