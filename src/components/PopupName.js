import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from 'components/Popup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class PopupDisclaimer extends Popup {

  constructor() {
    super();

    this.state = {
      open: true,
      name: '',
      body:
        <DialogContent>
            <TextField
              id='outlined-controlled'
              label='name'
              multiline
              rowsMax='20'
              fullWidth
              placeholder='First Last'
              value={this.state.name}
              onChange={this.handleChange}
              margin='normal'
              helperText=''
              variant='outlined'
            />
        </DialogContent>
    }

    this.title = 'What is your name?';
    this.actions = <Button onClick={this.submitName} color='primary'>Okay</Button>;
  }

   checkNameValid = (name) => {
     return (name.length > 4 && name.trim().split(' ').length > 1);
   }

  submitName = () => {
    localStorage.setItem('name', this.state.name);
    this.setState({open: false});
  }

  handleChange = (event) => {
    let newName = event.target.value;
    this.setState({
      name: newName
    });
  }

}
