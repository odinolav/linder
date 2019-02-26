import 'date-fns';
import React, {Component} from 'react';
import 'css/App.css';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'withRoot';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DateHelpers from 'helpers/DateHelpers';

import LinderAppBar from 'components/LinderAppBar';
import DayPartCard from 'components/DayPartCard';

import linderStore from 'flux/LinderStore';


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
    .on(':CLOSE_POPUP', this.handleClose);
  }

  componentDidMount = () => {
    if (!localStorage.getItem('name')) {
      linderStore.openNameBox();
    }
  }

  componentWillUnmount() {
    linderStore.removeListener(':OPEN_POPUP', this.handleOpen)
    .removeListener(':CLOSE_POPUP', this.handleClose)
  }

  loadAllDays = () => {
    let potentialName = localStorage.getItem('name') || 'YOUR_NAME_HERE';
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
      name: potentialName,
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
    });
   };

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
          {mainCards}
        </Grid>
      </div>

    <LinderAppBar />
  </div>);}
}

export default withRoot(withStyles(null)(App));
