

import moment, { months } from "moment";

export const TimeFrames: ITimeFrame[] = [
  { duration: '1 Month' },
  { duration: '3 Months' },
  { duration: '6 Months' },
  { duration: '1 Year' },
  { duration: '3 Years' },
]
export const ITimeFrame = [
  '1 Month',
  '3 Months',
  '6 Months',
  '1 Year',
  '3 Years',
]
export interface ITimeFrame {
  duration: TimeFrameType;
};

export interface IDateRange {
  startDate: string;
  endDate: string;
};


export type TimeFrameType =
  "1 Month" |
  "3 Months" |
  "6 Months" |
  "1 Year" |
  "3 Years"
  ;

function calc1months() {
  var current = moment().toISOString()
  var month = moment().add(30, 'days').toISOString()
  console.log("date range for 1 month", current, month)
}



export function GetTimeFrame(timeFrame: TimeFrameType) {
  let dateRange: IDateRange = {
    startDate: '',
    endDate: ''
  };
  let today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();
  if (timeFrame === '1 Month') {
    dateRange.endDate = lastDayOfMonth;
    dateRange.startDate = firstDayOfMonth;
  } else if (timeFrame === '3 Months') {
    dateRange.startDate = moment().add(-3, 'months').toISOString();
    dateRange.endDate = moment().toISOString();
  } else if (timeFrame === '6 Months') {
    dateRange.startDate = moment().add(-6, 'months').toISOString();
    dateRange.endDate = moment().toISOString();
  } else if (timeFrame === '1 Year') {
    dateRange.startDate = moment().add(-1, 'year').toISOString();
    dateRange.endDate = moment().toISOString();;
  } else if (timeFrame === '3 Years') {
    dateRange.startDate = moment().add(-3, 'years').toISOString();
    dateRange.endDate = moment().toISOString();;
  }
  console.log("dateRange", dateRange);
  return dateRange;
}

