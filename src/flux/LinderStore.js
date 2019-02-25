import React from 'react';
import EventEmitter from 'events';
import Typography from '@material-ui/core/Typography';

import PopupDisclaimer from 'components/PopupDisclaimer';
import PopupMailForm from 'components/PopupMailForm';
import PopupInfo from 'components/PopupInfo';

import STRINGS from 'text/Strings.js';
import DateHelpers from 'helpers/DateHelpers';

class LinderStore extends EventEmitter {

  constructor() {
    super();
    this.html = '';
    this.popup = '';
    this.currentDay = DateHelpers.getDateStorageName();
    this.name = '';
    this['Name_Expanded'] = false;
    this['Wake Up_Expanded'] = false;
    this['Mid-Morning_Expanded'] = false;
    this['Afternoon_Expanded'] = false;
    this['Early Evening_Expanded'] = false;
    this['Night_Expanded'] = false;
    this.daySchedule = {
      'Wake Up': {1:'',2:'',3:''},
      'Mid-Morning': {1:'',2:'',3:''},
      'Afternoon': {1:'',2:'',3:''},
      'Early Evening': {1:'',2:'',3:''},
      'Night': {1:'',2:'',3:''},
    }
  }

  updateDaySchedule(newDaySchedule) {
    this.daySchedule = newDaySchedule;
    this.makeEmailMessage();
    this.emit(':RECEIVED_DAY_SCHEDULE');
  }

  getDaySchedule() {
    this.emit(':GET_DAY_SCHEDULE');
  }

  setCurrentDay = (newDay) => {
    this.currentDay = newDay;
  }

  makeEmailMessage = () => {
    let html = [];
    for (let [timeOfDay, responseObj] of Object.entries(this.daySchedule)) {
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
    this.openPopup()
  }
  openDisclaimerBox = () => {
    this.popup = <PopupDisclaimer />;
    this.openPopup()
  }
  openInfoBox = () => {
    this.popup = <PopupInfo />;
    this.openPopup()
  }


  toggleExpandCard = (timeOfDay) => {
    let name = timeOfDay+'_Expanded';
    this[name] = !this[name];
    this.emit(':CARD_EXPAND_TOGGLE');
  };
  somethingExpanded = () => {
     if (this['Wake Up_Expanded'] || this['Mid-Morning_Expanded'] || this['Afternoon_Expanded'] ||
         this['Early Evening_Expanded'] || this['Night_Expanded']) {
       return true;
     }
     return false;
  }

}

var linderStore = new LinderStore();
export default linderStore;
