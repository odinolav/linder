import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Popup from 'components/Popup';
import Typography from '@material-ui/core/Typography';

import OkayButton from 'components/OkayButton';

import STRINGS from 'text/Strings';

export default class Popup_Disclaimer extends Popup {

  constructor() {
    super();

    this.title = 'Research Information';
    this.actions = <OkayButton/>;

    this.state = {
      open: true,
      body: <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          <span>
            <Typography component='span' variant='h6'>Background</Typography>
            {STRINGS.background}
            <br/><br/>
            <Typography component='span' variant='h6'>Instructions</Typography>
            {STRINGS.instructions}</span>
        </DialogContentText>
      </DialogContent>
    }
  }

}
