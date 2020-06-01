import { Time } from "../components/TimeSelector/TimeSelector";

export const getDaysInMonth = (month,year) => {
    return new Date(year, month, 0).getDate();
  };

export const get12Hour = (hh) => {
  let h = hh;
  if (h >= 12) {
    h = hh - 12;
  }
  if (h === 0) {
    h = 12;
  }
  return h;
}

export const getPeriod = (hh) => {
  let p = "AM";
  if (hh >= 12) {
    p = "PM"
  }
  return p;
}

export const getTimeString = (time: Time): string => {
  const dd = time.period;
  const h = time.hour;
  const m = time.minute;
  
  const mStr = m < 10 ? "0" + m : m;

  return `${h}:${mStr} ${dd}`;
}