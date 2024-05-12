const getDateTimeNow = () => {
  // Get current datetime
  const currentDate = new Date();

  // Format datetime string in ISO 8601 with milliseconds and timezone
  const isoString = currentDate.toISOString().slice(0, -1) + "Z";

  return isoString;
};

export default getDateTimeNow;
