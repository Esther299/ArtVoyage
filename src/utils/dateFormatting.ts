const getDayWithSuffix = (day: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = day % 10;
  const suffix =
    remainder >= 1 && remainder <= 3 && Math.floor(day / 10) !== 1
      ? suffixes[remainder]
      : suffixes[0];
  return `${day}${suffix}`;
};

const parseAndFormatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("T")[0].split("-");

  const formattedDay = getDayWithSuffix(Number(day));
  const monthName = new Date(`${year}-${month}`).toLocaleString("en-GB", {
    month: "long",
  });

  return `${formattedDay} of ${monthName} of ${year}`;
};

export const formatExhibitionDateRange = (
  startDateString: string,
  endDateString: string
): string => {
  if (!startDateString || !endDateString) {
    return "Invalid Date Range";
  }

  const startDateFormatted = parseAndFormatDate(startDateString);
  const endDateFormatted = parseAndFormatDate(endDateString);

  const startMonth = startDateString.split("-")[1];
  const endMonth = endDateString.split("-")[1];

  const startYear = startDateString.split("-")[0];
  const endYear = endDateString.split("-")[0];

  let formattedRange = `From the ${startDateFormatted}`;

  if (startMonth !== endMonth || startYear !== endYear) {
    formattedRange += ` to the ${endDateFormatted}`;
  } else {
    formattedRange += ` to the ${endDateFormatted}`;
  }

  return formattedRange;
};

import { Timestamp } from "firebase/firestore";

export const timestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};

export const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};
