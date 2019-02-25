import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Popup from 'components/Popup';

import OkayButton from 'components/OkayButton';
import STRINGS from 'text/Strings';

export default class PopupDisclaimer extends Popup {

  constructor() {
    super();

    this.body = <DialogContent>
      <DialogContentText id='alert-dialog-slide-description'>
        {STRINGS.disclaimer}
      </DialogContentText>
    </DialogContent>;

    this.title = 'Disclaimer';
    this.actions = <OkayButton/>;
  }

}
