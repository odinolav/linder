import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import linderStore from 'flux/LinderStore';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

export default class Popup extends Component {

  constructor() {
    super();

    this.state = {
      open: true,
      body: ''
    }
  }

  componentWillMount() {
    linderStore.on(':OPEN_POPUP', this.handleOpen)
    .on(':CLOSE_POPUP', this.handleClose);
  }
  componentWillUnmount() {
    linderStore.removeListener(':OPEN_POPUP', this.handleOpen)
    .removeListener(':CLOSE_POPUP', this.handleClose);
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
        scroll='body'
      >
      <DialogTitle id='alert-dialog-slide-title' color='primary'>
        <Typography component='span' variant='h4' color='primary'>{this.title}</Typography>
      </DialogTitle>
      {this.state.body}
      {this.actions}
    </Dialog>
  );
  }
}
