import {format} from 'date-fns/esm'

export default class DateHelpers {

  static convertToHumanDate = (storageDate) => {
    //today's date: format(new Date(),'MM/dd/yyyy');
    return storageDate.substring(12).replace(/_/g, '/');
  }

  static getDateStorageName = () => {
    return 'daySchedule_'+format(new Date(),'MM_dd_yyyy');
  }

}
