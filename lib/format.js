export const enToBn = (number) => {
  const input = number.toString();

  const digits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  let output = [];

  for (let i = 0; i < input.length; ++i) {
    if (digits.hasOwnProperty(input[i])) {
      output.push(digits[input[i]]);
    } else {
      output.push(input[i]);
    }
  }

  return output.join("");
};

export const formatDate = (date) => {
  const lastReadDate = new Date(date);
  const currentDate = new Date();
  const lastReadDay = lastReadDate.getDate();
  const currentDay = currentDate.getDate();

  let options, formatted;

  if (lastReadDay == currentDay) {
    options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  } else {
    options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    };
  }
  formatted = lastReadDate.toLocaleString("bn", options);
  return formatted;
};
