import { Timestamp } from "firebase/firestore";

const getDayWithSuffix = (day: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = day % 10;
  const suffix =
    remainder >= 1 && remainder <= 3 && Math.floor(day / 10) !== 1
      ? suffixes[remainder]
      : suffixes[0];
  return `${day}${suffix}`;
};

const parseAndFormatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  const formattedDay = getDayWithSuffix(Number(day));
  const monthName = new Date(`${year}-${month}`).toLocaleString("en-GB", {
    month: "long",
  });
  return { formattedDay, monthName, year };
};

export const formatExhibitionDateRange = (
  startDateString: string,
  endDateString: string
): string => {
  if (!startDateString || !endDateString) {
    return "Invalid Date Range";
  }

  const {
    formattedDay: startDay,
    monthName: startMonth,
    year: startYear,
  } = parseAndFormatDate(startDateString);
  const {
    formattedDay: endDay,
    monthName: endMonth,
    year: endYear,
  } = parseAndFormatDate(endDateString);

  let formattedRange = `From the ${startDay}`;
  if (startMonth === endMonth && startYear === endYear) {
    formattedRange += ` to the ${endDay} of ${startMonth} of ${startYear}`;
  } else if (startYear === endYear) {
    formattedRange += ` of ${startMonth} to the ${endDay} of ${endMonth} of ${startYear}`;
  } else {
    formattedRange += ` of ${startMonth} of ${startYear} to the ${endDay} of ${endMonth} of ${endYear}`;
  }

  return formattedRange;
};

const parseDateToComponents = (dateString: string) => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return { day, month, year };
};

export const formatDate = (
  startDateString: string,
  endDateString: string
): string => {
  if (!startDateString || !endDateString) {
    return "Invalid Date Range";
  }

  const {
    day: startDay,
    month: startMonth,
    year: startYear,
  } = parseDateToComponents(startDateString);

  const {
    day: endDay,
    month: endMonth,
    year: endYear,
  } = parseDateToComponents(endDateString);

  return `(${startDay}/${startMonth}/${startYear} - ${endDay}/${endMonth}/${endYear})`;
};

export const formatTimestamp = (timestamp: Timestamp | Date): string => {
  const date =
    timestamp instanceof Timestamp
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);
  return `${date.toLocaleTimeString(
    "en-GB"
  )} on the ${date.toLocaleDateString("en-GB")}`;
};