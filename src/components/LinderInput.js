import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

import linderStore from 'flux/LinderStore';

import STRINGS from 'text/Strings';

export default class LinderInput extends Component {
  constructor(props) {
    super(props);
    this.timeOfDay = props.timeOfDay;
    this.headerIndex = props.headerIndex;
    this.dayName = props.dayName;
    this.header = props.header;
    this.state = {
      text: props.text
    }
  }

  handleChange = event => {
    let newText = event.target.value;
    linderStore.updateInputText(newText, this.dayName, this.timeOfDay, this.headerIndex);
    this.setState({text: newText});
  }

  render() {

    return <TextField
      id='outlined-controlled'
      label={this.header}
      multiline
      rowsMax='20'
      fullWidth
      value={this.state.text}
      placeholder={STRINGS.headerAlternates[this.headerIndex]}
      onChange={this.handleChange}
      margin='normal'
      helperText=''
      variant='outlined'
    />
  }
}
