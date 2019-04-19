import styles from './defaultStyles'

export default props => name => {
  const { center, maxWidth, zIndex, overlayColor } = props
  switch (name) {
    case 'wrapper': {
      let style = {
        ...styles.wrapper,
        zIndex
      }
      if (center) {
        style = { ...style, ...styles.center }
      }
      return style
    }
    case 'overlay': {
      return { ...styles.overlay, background: overlayColor }
    }
    case 'bodyWrapper': {
      return { ...styles.bodyWrapper }
    }
    case 'body': {
      if (maxWidth) {
        return { ...styles.body, width: '100%', maxWidth }
      }
      return { ...styles.body }
    }
    case 'title': {
      return { ...styles.title }
    }
    case 'content': {
      return { ...styles.content }
    }
    case 'buttonArrow': {
      return { ...styles.buttonArrow }
    }
    case 'arrowLeft': {
      return { ...styles.arrow, transform: 'rotate(45deg)' }
    }
    case 'arrowRight': {
      return { ...styles.arrow, transform: 'rotate(-45deg)' }
    }
  }
}
