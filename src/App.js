import 'date-fns';
import React, {Component} from 'react';
import './css/App.css';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
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

import linderStore from 'flux/LinderStore';

import STRINGS from './text/Strings';
import WAKEUP from './img/morning.jpg';
import MIDMORNING from './img/midmorning.jpg';
import AFTERNOON from './img/afternoon.jpg';
import EARLYEVENING from './img/earlyevening.jpg';
import NIGHT from './img/night.jpg';
import PROFILE from './img/profile.jpg';

const cardImgMap = {
  'Wake Up': WAKEUP,
  'Mid-Morning': MIDMORNING,
  'Afternoon': AFTERNOON,
  'Early Evening': EARLYEVENING,
  'Night': NIGHT,
  'Name': PROFILE
}

const styles = theme => ({
  card: {
    width: 180,
    margin: 8
  },
  expandedCard: {
    width: 350,
    margin: 4
  },
  phoneCard: {
    width: 150,
    margin: 8
  },
  expandedPhoneCard: {
    width: '99%',
    margin: 0
  },
  media: {
    height: 120,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(-90deg)',
  }
});

class App extends Component {

  constructor() {
    super();
    //let now = new Date();
    this.state = {
      daySchedule: {
        'Wake Up': {1:'',2:'',3:''},
        'Mid-Morning': {1:'',2:'',3:''},
        'Afternoon': {1:'',2:'',3:''},
        'Early Evening': {1:'',2:'',3:''},
        'Night': {1:'',2:'',3:''},
      },
      popup: '',
      name: '',
      nameComplete: false,
      allDays: {},
      dayIndex: 0,
      currentDay: DateHelpers.getDateStorageName()
    }
  }

  componentWillMount() {
    let today = DateHelpers.getDateStorageName();
    let name = localStorage.getItem('name');
    if (localStorage.getItem(today)) {
      this.setState({
        daySchedule: JSON.parse(localStorage.getItem(today)),
      }, this.loadAllDays());
    } else {
      this.saveToday();
      this.loadAllDays();
    }

    linderStore.on(':OPEN_POPUP', this.handleOpen)
    .on(':CLOSE_POPUP', this.handleClose)
    .on(':CARD_EXPAND_TOGGLE', this.toggleExpandCard)
    .on(':GET_DAY_SCHEDULE', this.sendDaySchedule);
  }

  componentWillUnmount() {
    linderStore.removeListener(':OPEN_POPUP', this.handleOpen)
    .removeListener(':CLOSE_POPUP', this.handleClose)
    .removeListener(':CARD_EXPAND_TOGGLE', this.toggleExpandCard)
    .removeListeneron(':GET_DAY_SCHEDULE', this.sendDaySchedule);
  }

  sendDaySchedule = () => {
    linderStore.updateDaySchedule(this.state.daySchedule);
  }

  toggleExpandCard = () => {
    this.setState({
      'Name_Expanded': linderStore['Name_Expanded'],
      'Wake Up_Expanded': linderStore['Wake Up_Expanded'],
      'Mid-Morning_Expanded': linderStore['Mid-Morning_Expanded'],
      'Afternoon_Expanded': linderStore['Afternoon_Expanded'],
      'Early Evening_Expanded': linderStore['Early Evening_Expanded'],
      'Night_Expanded': linderStore['Night_Expanded'],
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
    this.setState({
      name: potentialName ? potentialName : '',
      nameComplete: nameValid,
      allDays: all
    }, ()=>{this.handleTabChange(null, currentDayIndex)});
  }

  componentDidMount() {
    this.beforeUnload();
  }

  saveToday = () => {
    localStorage.setItem(DateHelpers.getDateStorageName(), JSON.stringify(this.state.daySchedule));
  }

  saveAllDays = () => {
    Object.keys(this.state.allDays).forEach((key)=> {
      localStorage.setItem(key, JSON.stringify(this.state.allDays[key]));
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

  handleChangeActivity = (timeOfDay, colIndex) => event => {
    let currentDaySchedule = this.state.daySchedule;
    currentDaySchedule[timeOfDay][colIndex] =
        event.target.value.replace(/--/g, '—').replace(/\(\)/g, '•').replace(/:\)/g, '🙂').replace(/:D/g, '😃').replace(/:\(/g, '😔').replace(/:o/g, '😮');
    this.setState({
      daySchedule: currentDaySchedule
    });
  }

  handleOpen = () => {
    this.setState({ popup: linderStore.popup });
  }
  handleClose = () => {
    this.setState({ popup: '' });
  }

  LinderInput = (header, timeOfDay, i, classes, text) => {
    return <TextField
      key={`in-${timeOfDay}-${header}-${i}`}
      id='outlined-controlled'
      label={header}
      multiline
      rowsMax='20'
      fullWidth
      value={text}
      placeholder={STRINGS.headerAlternates[i]}
      onChange={this.handleChangeActivity(timeOfDay, i)}
      margin='normal'
      helperText=''
      variant='outlined'
    />
  }

  handleTabChange = (event, value) => {
    this.setState(prevState => ({
      dayIndex: value,
      currentDay: Object.keys(prevState.allDays)[value],
      allDays: Object.assign(prevState.allDays, {[prevState.currentDay]: this.state.daySchedule}),
      daySchedule: prevState.allDays[Object.keys(prevState.allDays)[value]]
    }));
  };

  render() {
    const isMobile = window.innerWidth < 600;
    const { classes } = this.props;
    const currentDs = this.state.allDays[this.state.currentDay];
    let cardClass;
    let mainCards = [];
    for (let [timeOfDay, rowValue] of Object.entries(currentDs)) {
      let expanded = timeOfDay+'_Expanded';
      let complete = currentDs[timeOfDay][0] && currentDs[timeOfDay][1];
      if (this.state[expanded] && isMobile) {
        cardClass = classes.expandedPhoneCard;
      } else if (this.state[expanded]) {
        cardClass = classes.expandedCard;
      } else if (isMobile) {
        cardClass = classes.phoneCard;
      } else {
        cardClass = classes.card;
      }
      mainCards.push(
        <Card className={cardClass} key={`c-${timeOfDay}`}>
          <CardActionArea onClick={()=>linderStore.toggleExpandCard(timeOfDay)}>
            <CardMedia
              className={classes.media}
              image={cardImgMap[timeOfDay]}
              title={timeOfDay}
            />
            <CardContent>
              <Typography gutterBottom variant={isMobile ? "h6": "h5"} component="h2">{timeOfDay}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Chip color={complete ? 'primary' : 'secondary'} label={complete ? 'Ready' : 'Incomplete'}/>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state[expanded],
              })}
              onClick={()=>linderStore.toggleExpandCard(timeOfDay)}
              aria-expanded={this.state[expanded]}
              aria-label="Show more"
            >
              <Edit />
            </IconButton>
          </CardActions>
          <Collapse in={this.state[expanded]} timeout="auto" unmountOnExit>
          <CardContent>
            {STRINGS.headers.map((header, i) => {
              return this.LinderInput(header, timeOfDay, i, classes.textField, rowValue[i])
            })}
          </CardContent>
        </Collapse>
        </Card>
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
            {Object.keys(this.state.allDays).map((key)=> {
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

export default withRoot(withStyles(styles)(App));
