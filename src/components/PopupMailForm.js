import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Popup from 'components/Popup';
import Button from '@material-ui/core/Button';

import linderStore from 'flux/LinderStore';

import DateHelpers from 'helpers/DateHelpers';
import SECRET_STRINGS from 'text/SecretStrings';

export default class Popup_Disclaimer extends Popup {

  constructor() {
    super();
    linderStore.makeEmailMessage();
    let mailUrl = `mailto:${SECRET_STRINGS.targetEmail}?subject=Research Journal for ${linderStore.name} ${DateHelpers.convertToHumanDate(linderStore.currentDay)}`;

    this.body =
      <DialogContent>
        <DialogContentText>Copy the following text, then submit to Emily.</DialogContentText>
        <br/><br/>
        <DialogContentText id='alert-dialog-slide-description'>
          {linderStore.html}
        </DialogContentText>
      </DialogContent>;

    this.title = 'Submit to Emily';

    this.actions =
      <Button target='_blank'
        href={mailUrl}
        onClick={this.handleClose} color='primary'>
        Email to Emily
      </Button>;
  }


}
