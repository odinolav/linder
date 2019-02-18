import 'date-fns';
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
import { Navigation, Edit, ExpandMore, CalendarToday, Info } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
//import InputAdornment from '@material-ui/core/InputAdornment';
//import IconButton from '@material-ui/core/IconButton';

import STRINGS from './text/Strings';
import WAKEUP from './img/morning.jpg';
import MIDMORNING from './img/midmorning.jpg';
import AFTERNOON from './img/afternoon.jpg';
import EARLYEVENING from './img/earlyevening.jpg';
import NIGHT from './img/night.jpg';
import CALENDAR from './img/calendar.jpg';

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
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit * 8
  },
  card: {
    width: 250,
    margin: 10
  },
  infoCard: {
    width: '100%',
    margin: 10
  },
  media: {
    height: 200,
  },
  actions: {
    display: 'flex',
  },
  submit: {
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
});

class App extends Component {
  constructor() {
    super();
    let now = new Date();
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
      endOfDay: '',
      date1: now.getTime(),
      date2: now.getTime(),
      dialogBody: '',
      popupTitle: '',
    }
  }

  getDate = () => {
    return (new Date()).toISOString().replace(/-|:|\.\d\d\d/g,"");
  }

  buildEventString = () => {
    let title = 'Journaling+for+Emily';
    let details = 'Remember+to+visit+linder.odinolav.com';
    let startTime = this.state.date1;
    let endTime = this.state.date2;
    return `https://calendar.google.com/calendar/r/eventedit?dates=${startTime}/${endTime}&location&text=${title}&details=${details}`;
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
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
      dialogBody: desc,
      popupTitle: title,
      open: true
    });
  }

  openInfoBox = () => {
    this.setState({
      dialogBody: <span><Typography component='span' variant='h6'>Background</Typography>
          {STRINGS.background}
          <Typography component='span' variant='h6'>Instructions</Typography>
          {STRINGS.instructions}</span>,
      popupTitle: 'Research Information',
      open: true
    });
  }

  openCalendarSetupBox = () => {
    let { date1, date2 } = this.state;
    const { classes } = this.props;
    this.setState({
      dialogBody: <span>
          Set up Google Calendar reminders to never miss a day
          <CardContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container={true} className={classes.grid} justify='space-around'>
                <DatePicker margin='normal' label='Weekly day 1' value={date1} onChange={this.handleChange('date1')}/>
                <TimePicker margin='normal' label='Time 1' value={date1} onChange={this.handleChange('date1')}/>
                <DatePicker margin='normal' label='Weekly day 2' value={date2} onChange={this.handleChange('date2')}/>
                <TimePicker margin='normal' label='Time 2' value={date2} onChange={this.handleChange('date2')}/>
              </Grid>
            </MuiPickersUtilsProvider>
            <Button variant='contained' href={this.buildEventString()} target='_blank' className={classes.button}>
              add to calendar
            </Button>
          </CardContent>
        </span>,
      popupTitle: 'Calendar Reminders',
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
      onChange={this.handleChangeActivity(timeOfDay, i)}
      className={classes}
      margin='normal'
      helperText=''
      variant='outlined'
      onDoubleClick={this.showInputDescription(header, STRINGS.headerDescriptions[i])}
    />
  }

  render() {
    const { classes } = this.props;
    let inputFields = [];
    for (let [timeOfDay, rowValue] of Object.entries(this.state.daySchedule)) {
      let expanded = timeOfDay+'_Expanded';
      inputFields.push(
        <Card className={classes.card} key={`c-${timeOfDay}`}>
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
            <Button size="small" color="primary">
              <Edit />
            </Button>
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

    return (<div className={classes.root}>
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
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {this.state.dialogBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color='primary'>Okay</Button>
        </DialogActions>
      </Dialog>

      <form className={classes.container} noValidate='noValidate'>
        <Grid container className={classes.root} spacing={16} justify='center' alignItems='flex-start'>
          <Card className={classes.infoCard} key={`c-cal`}>
            <CardHeader title={STRINGS.title}></CardHeader>
            <CardActions className='center'>
              <Button size="small" color="primary" onClick={this.openCalendarSetupBox}>
                <CalendarToday /> Reminders
              </Button>
              <Button size="small" color='secondary' onClick={this.openInfoBox}>
                <Info /> Project Info
              </Button>
            </CardActions>
          </Card>

          {inputFields}

          <Fab variant='extended' aria-label='Add' className={classes.submit}>
           <Navigation className={classes.extendedIcon} />
           Submit
          </Fab>
        </Grid>

      </form>
      <footer>{this.disclaimer}</footer>
    </div>);
  }
}

export default withRoot(withStyles(styles)(App));
