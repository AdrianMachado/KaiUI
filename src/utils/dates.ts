import { Time } from "../components/TimeSelector/TimeSelector";

export const getDaysInMonth = function(month,year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
  };

export const get12Hour = function(hh) {
  let h = hh;
  if (h >= 12) {
    h = hh - 12;
  }
  if (h == 0) {
    h = 12;
  }
  return h;
}

export const getPeriod = function(hh) {
  let p = "AM";
  if (hh >= 12) {
    p = "PM"
  }
  return p;
}

export const getTimeString = function(time: Time): string {
  let dd = time.period;
  let h = time.hour;
  let m = time.minute;
  
  let mStr = m < 10 ? "0" + m : m;

  return `${h}:${mStr} ${dd}`;
}