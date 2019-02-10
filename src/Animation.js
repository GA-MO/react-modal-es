import React from 'react'
import Animate from 'react-move/Animate'
import { easeBackOut, easeCircleOut } from 'd3-ease'

export default ({ show, children }) => (
  <Animate
    show={show}
    start={{
      opacity: 0,
      opacityModal: 0,
      y: -100
    }}
    enter={[
      {
        opacity: [1],
        timing: { duration: 300, ease: easeCircleOut }
      },
      {
        y: [0],
        opacityModal: [1],
        timing: { delay: 500, duration: 500, ease: easeBackOut }
      }
    ]}
    leave={[
      {
        y: [-100],
        opacityModal: [0],
        timing: { duration: 500, ease: easeBackOut }
      },
      {
        opacity: [0],
        timing: { delay: 300, duration: 300, ease: easeCircleOut }
      }
    ]}
  >
    {children}
  </Animate>
)
