import React from 'react';
import EventEmitter from 'events';
import Typography from '@material-ui/core/Typography';

import PopupDisclaimer from 'components/PopupDisclaimer';
import PopupMailForm from 'components/PopupMailForm';
import PopupInfo from 'components/PopupInfo';
import PopupName from 'components/PopupName';

import STRINGS from 'text/Strings.js';
import DateHelpers from 'helpers/DateHelpers';

class LinderStore extends EventEmitter {

  constructor() {
    super();
    this.html = '';
    this.popup = '';
    this.currentDay = DateHelpers.getDateStorageName();
    this.name = '';
    this.numCardsExpanded = 0;
    this.cardsExpanded = false;
    this.allDays = {};
  }

  updateName = (newName) => {
    this.name = newName;
  }

  updateExpanded = (num) => {
    // num is 1 when a card is opened and -1 when closed
    this.numCardsExpanded = this.numCardsExpanded + num;
    this.cardsExpanded = this.numCardsExpanded > 0;
    this.emit(':UPDATE_CARDS_EXPANDED');
  }

  getInputText = (dayKey, timeOfDay, colIndex) => {
    return this.allDays[dayKey][timeOfDay][colIndex];
  }

  updateInputText = (newDesc, dayKey, timeOfDay, colIndex) => {
    this.allDays[dayKey][timeOfDay][colIndex] = newDesc;
    this.emit(':UPDATE_DAY_SCHEDULE');
  }

  switchDay = (newDay) => {
    this.currentDay = newDay;
    this.emit(':SWITCH_DAY');
  }

  makeEmailMessage = () => {
    let html = [];
    for (let [timeOfDay, responseObj] of Object.entries(this.allDays[this.currentDay])) {
      html.push(<Typography key={timeOfDay} component='span' variant='h5'>{timeOfDay}</Typography>);
      for (let [header, val] of Object.entries(responseObj)) {
        if (val) {
          html.push(<span key={header + timeOfDay}>
            <Typography component='span' variant='h6'>{STRINGS.headers[header]}</Typography>
            <Typography component='span' variant='body1'>{val}</Typography>
            <br/><br/>
          </span>);
        }
      }
      html.push(<span key={'br' + timeOfDay}><br/>————————————————————</span>);
    }
    this.html = html;
  }

  openPopup = () => {
    this.emit(':OPEN_POPUP');
  }
  closePopup = () => {
    this.emit(':CLOSE_POPUP');
  }

  openEmailBox = () => {
    this.popup = <PopupMailForm />;
    this.openPopup();
  }
  openDisclaimerBox = () => {
    this.popup = <PopupDisclaimer />;
    this.openPopup()
  }
  openInfoBox = () => {
    this.popup = <PopupInfo />;
    this.openPopup()
  }
  openNameBox = () => {
    this.popup = <PopupName />;
    this.openPopup()
  }


  somethingExpanded = () => {
     return this.numExpanded > 0;
  }

}

var linderStore = new LinderStore();
export default linderStore;
