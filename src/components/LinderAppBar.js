import React, {Component} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar'
import Toolbar from '@material-ui/core/Toolbar';
import {CalendarToday, Info, Warning} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import linderStore from 'flux/LinderStore';

import STRINGS from 'text/Strings';
import EMILY from 'img/emily.jpg';

const styles = theme => ({
  avatar: {
    width: 60,
    height: 60
  },
  appBar: {
    position: 'fixed',
    top: 'auto',
    bottom: 0
  },
  bottomAppBar: {
    position: 'static'
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  emilyButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
});

class LinderAppBar extends Component {

  constructor() {
    super();

    this.state = {
      somethingExpanded: false,
      eventString: `https://calendar.google.com/calendar/r/eventedit?text=Journaling+for+Emily+Linder&location=Decorah,+IA&details=Make+sure+to+visit+linder.odinolav.com`
    }
  }

  componentWillMount = () => {
    linderStore.on(':UPDATE_CARDS_EXPANDED', this.updateSomethingExpanded);
  }

  updateSomethingExpanded = () => {
    this.setState({somethingExpanded: linderStore.cardsExpanded});
  }

  render() {
    const isMobile = window.innerWidth < 600;

    const {classes} = this.props;

    return <AppBar color="primary" className={(
        isMobile && this.state.somethingExpanded)
        ? classes.bottomAppBar
        : classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {STRINGS.title}
          <Button color="inherit" aria-label="Project Info" className='mobile' onClick={linderStore.openInfoBox}>
            <Info/>
          </Button>
        </Typography>
        <Tooltip title="Send to Emily">
          <Fab className={classes.emilyButton} target='_blank' onClick={linderStore.openEmailBox}>
            <Avatar alt="Emily Linder" src={EMILY} className={classes.avatar}/>
          </Fab>
        </ Tooltip>
        <div>
          <Tooltip title="Project Info" className='non-mobile' onClick={linderStore.openInfoBox}>
            <Button color="inherit" aria-label="Project Info">
              <Info/>
            </Button>
          </ Tooltip>
          <Tooltip title="Disclaimer" onClick={linderStore.openDisclaimerBox}>
            <Button color="inherit" aria-label="Disclaimer">
              <Warning/>
            </Button>
          </ Tooltip>
          <Tooltip title="Reminders">
            <Button color="inherit" href={this.state.eventString} target='_blank'>
              <CalendarToday/>
            </Button>
          </ Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  }
}

export default withStyles(styles)(LinderAppBar);
