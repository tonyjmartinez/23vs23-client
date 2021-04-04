import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import NativeSelect from '@material-ui/core/NativeSelect'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import KeyboardDown from 'react-icons/lib/md/keyboard-arrow-down'
import ArrowDown from 'react-icons/lib/md/arrow-drop-down-circle'
import colors from '../../styles/colors'
import * as actions from '../../store/actions'
import {connect} from 'react-redux'
const selectStyle = {
  width: '45%',
  marginLeft: '10px',
  color: '#0095B3',
  fontSize: '1.2em',
  appearance: 'none',
  borderBottom: '3px solid ' + colors.blue,
}

const selectStyleYear = {
  width: '35%',
  marginLeft: '10px',
  color: '#0095B3',
  fontSize: '1.2em',
  appearance: 'none',
  borderBottom: '3px solid ' + colors.blue,
}

const optionStyle = {
  borderTop: 'none',
  color: colors.blue,
}

class SimpleSelect extends React.Component {
  state = {
    season: '2020-2021',
    seasonType: 'regular',
  }

  componentDidMount() {}
  season = event => {
    this.setState({season: event.target.value})
    this.props.fetchPlayersList(event.target.value, this.state.seasonType)
  }

  seasonType = event => {
    let type = event.target.value
    if (event.target.value === 'regular') {
      this.setState({season: '2020-2021', seasonType: type})
      this.props.fetchPlayersList('2020-2021', type)
    } else {
      this.setState({season: '2020', seasonType: type})
      this.props.fetchPlayersList('2020', type)
    }
  }

  colorStyle = () => {
    return (
      <ArrowDown
        style={{
          color: '#0095B3',
          right: 0,
          position: 'absolute',
          top: 'calc(50% - 12px)',
          pointerEvents: 'none',
        }}
      />
    )
  }

  render() {
    let options
    if (this.state.seasonType === 'regular') {
      options = [
        <MenuItem key={6} style={optionStyle} value="2020-2021">
          2020-21
        </MenuItem>,
        <MenuItem key={1} style={optionStyle} value="2019-2020">
          2019-20
        </MenuItem>,
      ]
    } else if (this.state.seasonType === 'playoff') {
      options = [
        <MenuItem key={6} style={optionStyle} value="2020">
          2020
        </MenuItem>,
      ]
    }
    return (
      <React.Fragment>
        <Select
          IconComponent={this.colorStyle}
          onChange={this.seasonType.bind(this)}
          value={this.state.seasonType}
          input={
            <Input style={selectStyle} name="seasonType" id="seasonType" />
          }
        >
          <MenuItem style={optionStyle} value="regular">
            Regular Season
          </MenuItem>
          <MenuItem style={optionStyle} value="playoff">
            Playoffs
          </MenuItem>
        </Select>
        <Select
          value={this.state.season}
          IconComponent={this.colorStyle}
          onChange={this.season.bind(this)}
          input={<Input style={selectStyleYear} name="season" id="season" />}
        >
          {options}
        </Select>
      </React.Fragment>
    )
  }
}

export default connect(null, actions)(SimpleSelect)
