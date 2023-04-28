import React from 'react'
import { ReactComponent as ChipSVG } from '../svg/antenna.radiowaves.left.and.right.circle.svg'

interface IProps {
  detected?: boolean
}

export default function Chip({ detected }: IProps) {
  return <ChipSVG />
}
