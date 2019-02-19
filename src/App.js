import 'date-fns';
import {format} from 'date-fns/esm'
import React, {Component} from 'react';
import './css/App.css';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import { ExpandMore, CalendarToday, Info, Warning } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar'

import STRINGS from './text/Strings';
import WAKEUP from './img/morning.jpg';
import MIDMORNING from './img/midmorning.jpg';
import AFTERNOON from './img/afternoon.jpg';
import EARLYEVENING from './img/earlyevening.jpg';
import NIGHT from './img/night.jpg';
import EMILY from './img/emily.jpg';

const cardImgMap = {
  'Wake Up': WAKEUP,
  'Mid-Morning': MIDMORNING,
  'Afternoon': AFTERNOON,
  'Early Evening': EARLYEVENING,
  'Night': NIGHT
}

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const styles = theme => ({
  avatar: {
    width: 60,
    height: 60,
  },
  card: {
    width: 200,
    margin: 10
  },
  expandedCard: {
    width: 350,
    margin: 10
  },
  media: {
    height: 120,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  appBar: {
    top: 'auto',
    bottom: 0
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emilyButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
});

class App extends Component {

  constructor() {
    super();
    //let now = new Date();
    this.state = {
      open: false,
      daySchedule: {
        'Wake Up': {1:'',2:'',3:''},
        'Mid-Morning': {1:'',2:'',3:''},
        'Afternoon': {1:'',2:'',3:''},
        'Early Evening': {1:'',2:'',3:''},
        'Night': {1:'',2:'',3:''},
      },
      'Wake Up_Expanded': false,
      'Mid-Morning_Expanded': false,
      'Afternoon_Expanded': false,
      'Early Evening_Expanded': false,
      'Night_Expanded': false,
      //date1: '20190228T110200Z',
      //date2: '20190228T110200Z',
      dialogBody: '',
      popupTitle: '',
      name: '',
      dialogActions: this.OkayDialogButton(),
      eventString: `https://calendar.google.com/calendar/r/eventedit?text=Journaling+for+Emily+Linder&location=Decorah,+IA&details=Make+sure+to+visit+odinolav.com/linder`
    }
  }

  componentWillMount() {
    let today = this.getReadableDate();
    if (localStorage['daySchedule_'+today]) {
      this.setState({
        daySchedule: JSON.parse(localStorage['daySchedule_'+today])
      });
    }
  }

  componentDidMount() {
    this.beforeUnload();
  }

  beforeUnload = () => {
    let today = this.getReadableDate();
    window.addEventListener("beforeunload", (ev) => {
       ev.preventDefault();
       localStorage['daySchedule_'+today] = JSON.stringify(this.state.daySchedule);
    });
   };

   getHumanDate = () => {
     return format(new Date(),'MM/dd/yyyy');
   }
   getReadableDate = () => {
     return format(new Date(),'MM_dd_yyyy');
   }

   OkayDialogButton = () => {return <Button onClick={this.handleClose} color='primary'>Okay</Button>};

   encodeEmail = () => {
     let msg = '';
     for (let [timeOfDay, responseObj] of Object.entries(this.state.daySchedule)) {
       msg += timeOfDay + '%0A%0A';
       for (let val of Object.values(responseObj)) {
         msg += val + '%0A%0A';
       }
       msg += '%0A';
     }
     return msg;
   }

  getDate = () => {
    return (new Date()).toISOString().replace(/-|:|\.\d\d\d/g,"");
  }

  convertDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g,"");
  }

  updateEventString = () => {
    let title = 'Journaling+for+Emily';
    let details = 'Remember+to+visit+linder.odinolav.com';
    let startTime = '';
    let endTime = ''
    this.setState({
      eventString: `https://calendar.google.com/calendar/r/eventedit?dates=${startTime}/${endTime}&location&text=${title}&details=${details}`
    });
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  }

  handleDateChange = (dateName, date) => {
    console.log(dateName, this.convertDate(date));
    this.setState({[dateName]: this.convertDate(date)}, this.updateEventString());
  }
  handleDateChange1 = date => {
    this.handleDateChange('date1', date);
  }
  handleDateChange2 = date => {
    this.handleDateChange('date2', date);
  }

  handleChangeActivity = (timeOfDay, colIndex) => event => {
    let currentDaySchedule = this.state.daySchedule;
    currentDaySchedule[timeOfDay][colIndex] = event.target.value;
    this.setState(prevState => ({
      daySchedule: currentDaySchedule
    }));
  }

  handleExpandClick = (timeOfDay) => {
    let name = timeOfDay+'_Expanded';
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };

  showInputDescription = (title, desc) => event => {
    this.setState({
      dialogBody: <DialogContent><DialogContentText id='alert-dialog-slide-description'>{desc}</DialogContentText></DialogContent>,
      popupTitle: title,
      dialogActions: this.OkayDialogButton(),
      open: true
    });
  }

  openInfoBox = () => {
    this.setState({
      dialogBody:
      <DialogContent><DialogContentText id='alert-dialog-slide-description'>
        <span><Typography component='span' variant='h6'>Background</Typography>
          {STRINGS.background}
          <br/><br/>
          <Typography component='span' variant='h6'>Instructions</Typography>
          {STRINGS.instructions}</span>
      </DialogContentText></DialogContent>,
      popupTitle: 'Research Information',
      dialogActions: this.OkayDialogButton(),
      open: true
    });
  }

  openDisclaimerBox = () => {
    this.setState({
      dialogBody:
        <DialogContent><DialogContentText id='alert-dialog-slide-description'>
            {STRINGS.disclaimer}
        </DialogContentText></DialogContent>,
      popupTitle: 'Disclaimer',
      dialogActions: this.OkayDialogButton(),
      open: true
    });
  }

  openCalendarSetupBox = () => {
    const { classes } = this.props;
    const { date1, date2 } = this.state;
    this.setState({
      dialogBody: <DialogContent>
          <DialogContentText gutterBottom variant="h6" component="h2">Set up Google Calendar reminders to never miss a day</DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} className={classes.grid} justify='space-around'>
              <DatePicker margin='normal' label='Date picker' value={date1} onChange={this.handleDateChange1}/>
              <TimePicker margin='normal' label='Time picker' value={date1} onChange={this.handleDateChange1}/>
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} className={classes.grid} justify='space-around'>
              <DatePicker margin='normal' label='Date picker' value={date2} onChange={this.handleDateChange2}/>
              <TimePicker margin='normal' label='Time picker' value={date2} onChange={this.handleDateChange2}/>
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>,
      popupTitle: 'Calendar Reminders',
      dialogActions:
        <DialogActions>
          <Button onClick={this.handleClose}
                  href={this.state.eventString}
                  target='_blank'
                  className={classes.button}
                  color='primary'>Add to Calendar
          </Button>
          <Button onClick={this.handleClose} color='secondary'>Return</Button>
      </DialogActions>,
      open: true
    });
  }

  openInputBox = (timeOfDay, rowValue, classes) => {
    let body = STRINGS.headers.map((header, i) => {
      return this.LinderInput(header, timeOfDay, i, classes, rowValue[i])
    });

    this.setState({
      dialogBody: body,
      popupTitle: timeOfDay,
      open: true
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

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
      onDoubleClick={this.showInputDescription(header, STRINGS.headerDescriptions[i])}
    />
  }

  render() {
    const { classes } = this.props;
    const ds = this.state.daySchedule;
    let inputFields = [];
    for (let [timeOfDay, rowValue] of Object.entries(ds)) {
      let expanded = timeOfDay+'_Expanded';
      let complete = ds[timeOfDay][0] && ds[timeOfDay][1];
      inputFields.push(
        <Card className={this.state[expanded] ? classes.expandedCard : classes.card} key={`c-${timeOfDay}`}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={cardImgMap[timeOfDay]}
              title={timeOfDay}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">{timeOfDay}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Chip color={complete ? 'primary' : 'secondary'} label={complete ? 'Ready' : 'Incomplete'}/>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state[expanded],
              })}
              onClick={()=>this.handleExpandClick(timeOfDay)}
              aria-expanded={this.state[expanded]}
              aria-label="Show more"
            >
              <ExpandMore />
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
          <Typography component='span' variant='h4' color='primary'>{this.state.popupTitle}</Typography>
        </DialogTitle>
        {this.state.dialogBody}
        {this.state.dialogActions}
      </Dialog>

      <form className={classes.container} noValidate='noValidate'>
        <Grid container className={classes.root} justify='center' alignItems='center'>
          {inputFields}
        </Grid>
      </form>
    </div>

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {STRINGS.title}
          </Typography>
          <Tooltip title="Send to Emily">
            <Fab
              className={classes.emilyButton}
              href={`mailto:lindem01@luther.edu?subject=Research Journal for ${this.state.name} ${this.getHumanDate()}&body=${this.encodeEmail()}`}
              target='_blank'
              >
              <Avatar alt="Emily Linder" src={EMILY} className={classes.avatar}/>
            </Fab>
          </ Tooltip>
          <div>
            <Tooltip title="Reminders">
              <Button color="inherit" href={this.state.eventString} target='_blank'>
                <CalendarToday />
              </Button>
            </ Tooltip>
            <Tooltip title="Project Info" onClick={this.openInfoBox}>
              <Button color="inherit" aria-label="Project Info">
                <Info />
              </Button>
            </ Tooltip>
            <Tooltip title="Disclaimer" onClick={this.openDisclaimerBox}>
              <Button color="inherit" aria-label="Disclaimer">
                <Warning />
              </Button>
            </ Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </div>);
  }
}

export default withRoot(withStyles(styles)(App));