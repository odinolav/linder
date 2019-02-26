import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

import linderStore from 'flux/LinderStore';

import STRINGS from 'text/Strings';

export default class LinderInput extends Component {
  constructor(props) {
    super(props);
    this.timeOfDay = props.timeOfDay;
    this.headerIndex = props.headerIndex;
    this.header = props.header;
    this.state = {
      dayName: props.dayName,
      value: linderStore.getInputText(props.dayName, this.timeOfDay, this.headerIndex) || ''
    }
  }

  componentWillMount = () => {
    linderStore.on(':SWITCH_DAY', this.updateDay);
  }

  componentWillUnmount = () => {
    linderStore.removeListener(':SWITCH_DAY', this.updateDay);
  }

  updateDay = () => {
    let currentDay = linderStore.currentDay;
    let currentValue = linderStore.getInputText(currentDay, this.timeOfDay, this.headerIndex);
    console.log(this.timeOfDay, this.headerIndex, currentValue);
    this.setState({
      dayName: currentDay,
      value: currentValue || '' // Protect against phantom values caused by null values
    });
  }

  handleChange = event => {
    let newText = event.target.value;
    newText = newText.replace(/--/g, '—').replace(/\(\)/g, '•').replace(/:\)/g, '🙂')
                     .replace(/:D/g, '😃').replace(/:\(/g, '😔').replace(/:o/g, '😮');
    linderStore.updateInputText(newText, this.state.dayName, this.timeOfDay, this.headerIndex);
    this.setState({value: newText});
  }

  render() {
    return (
      <TextField
        id='outlined-controlled'
        label={this.header}
        multiline
        rowsMax='20'
        fullWidth
        value={this.state.value}
        placeholder={STRINGS.headerAlternates[this.headerIndex]}
        onChange={this.handleChange}
        margin='normal'
        helperText=''
        variant='outlined'
      />)
  }
}
