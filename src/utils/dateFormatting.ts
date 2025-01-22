const getDateParts = (date: Date | null) => {
  if (!date) return { day: "", month: "", year: "" };

  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  return { day, month, year };
};

const getDayWithSuffix = (day: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = day % 10;
  const suffix =
    remainder >= 1 && remainder <= 3 && Math.floor(day / 10) !== 1
      ? suffixes[remainder]
      : suffixes[0];

  return `${day}${suffix}`;
};

const formatExhibitionDateRange = (
  startDate: Date | null,
  endDate: Date | null
) => {
  const {
    day: startDay,
    month: startMonth,
    year: startYear,
  } = getDateParts(startDate);
  const { day: endDay, month: endMonth, year: endYear } = getDateParts(endDate);

  const formattedStartDay = getDayWithSuffix(Number(startDay));
  const formattedEndDay = getDayWithSuffix(Number(endDay));

  let formattedRange = `From the ${formattedStartDay}`;

  if (startMonth !== endMonth || startYear !== endYear) {
    formattedRange += ` to the ${formattedEndDay} of ${endMonth} of ${endYear}`;
  } else {
    if (startYear !== endYear) {
      formattedRange += ` to the ${formattedEndDay} of ${endYear}`;
    } else {
      formattedRange += ` to the ${formattedEndDay} of ${startMonth}`;
    }
  }

  if (startMonth === endMonth && startYear === endYear) {
    formattedRange += ` of ${startYear}`;
  }

  return formattedRange;
};

export default formatExhibitionDateRange;
