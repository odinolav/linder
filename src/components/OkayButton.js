import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import linderStore from 'flux/LinderStore';

export default class OkayButton extends Component {


  render() {
    return <Button onClick={linderStore.closePopup} color='primary'>Okay</Button>;
  }
}
