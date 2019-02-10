export default {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxSizing: 'border-box',
    overflow: 'auto'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)'
  },
  bodyWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
    pointerEvents: 'none'
  },
  body: {
    position: 'relative',
    background: '#fff',
    borderRadius: '5px',
    marginTop: '30px',
    pointerEvents: 'auto'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    padding: '15px',
    paddingRight: '60px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee'
  },
  content: {
    padding: '15px'
  },
  buttonArrow: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '16px',
    width: '32px',
    height: '22px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  arrow: {
    position: 'absolute',
    left: '15px',
    content: ' ',
    height: '20px',
    width: '2px',
    backgroundColor: '#333'
  }
}
