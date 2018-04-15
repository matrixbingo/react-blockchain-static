import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import {white, grey800} from 'material-ui/styles/colors'
import {typography} from 'material-ui/styles'

class InfoBox extends React.Component {

  render() {
      const {color, title,contents} = this.props

    const styles = {
      content: {
        marginLeft: 88,
        height: 32
      },
      number: {
        display: 'block',
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: grey800
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        color: grey800
      },
      iconSpan: {
        float: 'left',
        height: 32,
        width: 88,
        textAlign: 'center',
        lineHeight:'32px',
        backgroundColor: color,
        color:white,
        borderRadius:'3px 0 0 3px',
        fontSize:13
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: '100%'

      }
    }

    return (
      <Paper style={{boxShadow:'none',marginRight:'10px'}}>
        <span style={styles.iconSpan}>
         {title}
        </span>

        <div style={styles.content}>
            {contents}
        </div>
      </Paper>
      )
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
}

export default InfoBox
