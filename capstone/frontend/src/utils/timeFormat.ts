const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const timeFormat = (timeString: string) => {
  const dateString = new Date(timeString);
  const month = months[dateString.getMonth()];
  const date = dateString.getDate();
  const year = dateString.getUTCFullYear();
  const hours = dateString.getHours();
  const minutes = dateString.getMinutes();

  const formattedHours = hours % 12 || 12;
  const period = hours < 12 ? "AM" : "PM";

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${month} ${date}, ${year} | ${formattedHours}:${formattedMinutes} ${period}`;
};

export default timeFormat;
