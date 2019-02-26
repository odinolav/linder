import 'date-fns';
import React, {Component} from 'react';
import 'css/App.css';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'withRoot';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Edit } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DateHelpers from 'helpers/DateHelpers';

import LinderAppBar from 'components/LinderAppBar';
import DayPartCard from 'components/DayPartCard';

import linderStore from 'flux/LinderStore';

import PROFILE from './img/profile.jpg';

const cardImgMap = {
  'Name': PROFILE
}


class App extends Component {

  constructor() {
    super();
    //let now = new Date();
    this.state = {
      popup: '',
      name: '',
      nameComplete: false,
      dayIndex: 0,
      currentDay: DateHelpers.getDateStorageName(),
      currentDaySchedule: Object.assign({}, this.daySchedule)
    }

    this.daySchedule = {
      'Wake Up': {1:'',2:'',3:''},
      'Mid-Morning': {1:'',2:'',3:''},
      'Afternoon': {1:'',2:'',3:''},
      'Early Evening': {1:'',2:'',3:''},
      'Night': {1:'',2:'',3:''},
    };
  }

  componentWillMount() {
    let today = DateHelpers.getDateStorageName();
    if (localStorage.getItem(today)) {
      this.setState({
        daySchedule: JSON.parse(localStorage.getItem(today)),
      }, this.loadAllDays());
    } else {
      this.saveEmptyToday();
      this.loadAllDays();
    }

    linderStore.on(':OPEN_POPUP', this.handleOpen)
    .on(':CLOSE_POPUP', this.handleClose)
    .on(':CARD_EXPAND_TOGGLE', this.toggleExpandCard);
  }

  componentWillUnmount() {
    linderStore.removeListener(':OPEN_POPUP', this.handleOpen)
    .removeListener(':CLOSE_POPUP', this.handleClose)
    .removeListener(':CARD_EXPAND_TOGGLE', this.toggleExpandCard);
  }

  toggleExpandCard = () => {
    this.setState({
      'Name_Expanded': linderStore['Name_Expanded']
    });
  }

  loadAllDays = () => {
    let potentialName = localStorage.getItem('name');
    let nameValid = this.checkNameValid(potentialName);
    let all = [];
    for (let key of Object.keys(localStorage)) {
      if (key.substring(0,12) === 'daySchedule_') {
        all[key] = JSON.parse(localStorage[key]);
      }
    }
    // Precondition: 'all' will have a length of at least 1
    let currentDayIndex = Object.keys(all).length-1;
    linderStore.allDays = all;
    this.setState({
      name: potentialName ? potentialName : '',
      nameComplete: nameValid
    }, ()=>{this.handleTabChange(null, currentDayIndex)});
  }

  componentDidMount() {
    this.beforeUnload();
  }

  saveEmptyToday = () => {
    localStorage.setItem(DateHelpers.getDateStorageName(), JSON.stringify(this.daySchedule));
  }

  saveAllDays = () => {
    Object.keys(linderStore.allDays).forEach((key)=> {
      localStorage.setItem(key, JSON.stringify(linderStore.allDays[key]));
    });
  }

  beforeUnload = () => {
    window.addEventListener("beforeunload", (ev) => {
       ev.preventDefault();
       this.saveAllDays();
       localStorage.setItem('name', this.state.name);
       localStorage.setItem('nameComplete', this.state.nameComplete);
    });
   };

   checkNameValid = (name) => {
     return (name.length > 4 && name.trim().split(' ').length > 1);
   }

  handleNameChange = event => {
    let newVal = event.target.value;
    this.setState({name: newVal, nameComplete: this.checkNameValid(newVal)});
  }

  handleOpen = () => {
    this.setState({ popup: linderStore.popup });
  }
  handleClose = () => {
    this.setState({ popup: '' });
  }

  handleTabChange = (event, value) => {
    let _currentDay = Object.keys(linderStore.allDays)[value];
    linderStore.switchDay(_currentDay);
    this.setState({
      dayIndex: value,
      currentDay: _currentDay
    });
  };

  render() {
    const isMobile = window.innerWidth < 600;
    const { classes } = this.props;
    const currentDS = linderStore.allDays[this.state.currentDay];
    let mainCards = [];
    for (let timeOfDay of Object.keys(currentDS)) {
      mainCards.push(
        <DayPartCard key={`c-${timeOfDay}`}
          currentDay={this.state.currentDay}
          dayIndex={this.state.dayIndex}
          timeOfDay={timeOfDay}
          isMobile={isMobile}
        />
      );
    };

    return (<div id='app'>
    <div id='mainarea'>
      <AppBar id="tabbar" position="absolute" color="default">
          <Tabs
            value={this.state.dayIndex}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {Object.keys(linderStore.allDays).map((key)=> {
              let dateLabel = key === DateHelpers.getDateStorageName() ? 'Today' : DateHelpers.convertToHumanDate(key);
              return <Tab key={key} label={dateLabel} />
            })}
          </Tabs>
        </AppBar>

        {this.state.popup}

        <Grid container className='maingrid' justify='center' alignItems='center'>
          <Card className={isMobile ? classes.phoneCard : classes.card} key='k.1'>
            <CardActionArea onClick={()=>linderStore.toggleExpandCard('Name')}>
              <CardMedia
                className={classes.media}
                image={cardImgMap['Name']}
                title='Your info'
              />
              <CardContent>
                <Typography gutterBottom variant={isMobile ? "h6": "h5"} component="h2">Profile</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Chip color={this.state.nameComplete ? 'primary' : 'secondary'} label={this.state.nameComplete ? 'Ready' : 'Incomplete'}/>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state['Name_Expanded'],
                })}
                onClick={()=>linderStore.toggleExpandCard('Name')}
                aria-expanded={this.state['Name_Expanded']}
                aria-label="Show more"
              >
                <Edit />
              </IconButton>
            </CardActions>
            <Collapse in={this.state['Name_Expanded']} timeout="auto" unmountOnExit>
            <CardContent>
              <TextField
                autoFocus
                name='namefield'
                id='outlined-controlled'
                multiline
                fullWidth
                rowsMax='3'
                value={this.state.name}
                placeholder='your full name'
                onChange={e => this.handleNameChange(e)}
                margin='dense'
                helperText=''
                type='text'
                variant='standard'
              />
            </CardContent>
          </Collapse>
          </Card>

          {mainCards}
        </Grid>
      </div>

    <LinderAppBar />
  </div>);}
}

export default withRoot(withStyles(null)(App));
