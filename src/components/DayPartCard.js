import React, {Component} from 'react';
import { Edit } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import LinderInput from 'components/LinderInput';

import linderStore from 'flux/LinderStore';

import STRINGS from 'text/Strings';
import WAKEUP from 'img/morning.jpg';
import MIDMORNING from 'img/midmorning.jpg';
import AFTERNOON from 'img/afternoon.jpg';
import EARLYEVENING from 'img/earlyevening.jpg';
import NIGHT from 'img/night.jpg';

const cardImgMap = {
  'Wake Up': WAKEUP,
  'Mid-Morning': MIDMORNING,
  'Afternoon': AFTERNOON,
  'Early Evening': EARLYEVENING,
  'Night': NIGHT
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

class DayPartCard extends Component {

  constructor(props) {
    super(props);
    this.dayIndex = props.dayIndex;
    this.timeOfDay = props.timeOfDay;
    this.state = {
      isMobile: props.isMobile,
      expanded: false,
      currentDay: props.currentDay,
      '0': linderStore.allDays[props.currentDay][this.timeOfDay][0],
      '1': linderStore.allDays[props.currentDay][this.timeOfDay][1],
      '2': linderStore.allDays[props.currentDay][this.timeOfDay][2],
    };
  }

  componentWillMount = () => {
    linderStore.on(':UPDATE_DAY_SCHEDULE', this.checkComplete)
    .on(':SWITCH_DAY', this.updateDay);
  }

  componentWillUnmount = () => {
    linderStore.removeListener(':UPDATE_DAY_SCHEDULE', this.checkComplete)
    .removeListener(':SWITCH_DAY', this.updateDay);
  }

  updateDay = () => {
    this.setState({currentDay: linderStore.currentDay}, this.checkComplete);
  }

  checkComplete = () => {
    let newComplete = linderStore.allDays[this.state.currentDay][this.timeOfDay][0]
                      && linderStore.allDays[this.state.currentDay][this.timeOfDay][1];
    this.setState({complete: newComplete});
  }

  handleExpandClick = () => {
    const newExpanded = !this.state.expanded;
    linderStore.updateExpanded(newExpanded ? 1 : -1);
    this.setState({expanded: newExpanded});
  }

  render() {
    const { classes } = this.props;
    let cardClass;
    let currentDs = linderStore.allDays[this.state.currentDay];
    let complete = currentDs[this.timeOfDay][0] && currentDs[this.timeOfDay][1];

    if (this.state.expanded && this.state.isMobile) {
      cardClass = classes.expandedPhoneCard;
    } else if (this.state.expanded) {
      cardClass = classes.expandedCard;
    } else if (this.state.isMobile) {
      cardClass = classes.phoneCard;
    } else {
      cardClass = classes.card;
    }

    return (
      <Card className={cardClass}>
        <CardActionArea onClick={this.handleExpandClick}>
          <CardMedia
            className={classes.media}
            image={cardImgMap[this.timeOfDay]}
            title={this.timeOfDay}
          />
          <CardContent>
            <Typography gutterBottom variant={this.state.isMobile ? "h6": "h5"} component="h2">{this.timeOfDay}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Chip color={complete ? 'primary' : 'secondary'} label={complete ? 'Ready' : 'Incomplete'}/>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <Edit />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {STRINGS.headers.map((header, i) => {
            return (
              <LinderInput
                key={`in-${this.dayIndex}-${this.timeOfDay}-${header}-${i}`}
                dayName={this.state.currentDay} headerIndex={i} timeOfDay={this.timeOfDay} header={header}
              />)
          })}
        </CardContent>
      </Collapse>
      </Card>
    )
  }
}

export default withStyles(styles)(DayPartCard);
