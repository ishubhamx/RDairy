import moment from "moment";

export const getMorningOrEvening = () => {
  var currentHour = moment().hour();

  if (currentHour >= 3 && currentHour < 20) {
    return "Good Morning";
  }  else if (currentHour >= 15 && currentHour < 20) {
    return "Good Evening";
  } else if (currentHour >= 20 || currentHour < 3) {
    return "Good Night";
  } else {
    return "Hello";
  }
};
