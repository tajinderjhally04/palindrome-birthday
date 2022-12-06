function reverseString(str) {
  var listOfChars = str.split("");
  var reversedListOfChar = listOfChars.reverse();
  var reversedString = reversedListOfChar.join("");

  return reversedString;
}

function isPalindrome(str) {
  var reversed = reverseString(str);
  return str === reversed;
}

// console.log(reverseString('tata')); // atat
// console.log(isPalindrome("tata"));  // false
// console.log(isPalindrome("242"));   // true
// console.log(isPalindrome("oppo"));  // true
// console.log(isPalindrome("momo"));  // false

function convertDateToString(date) {
  var dateInString = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInString.day = "0" + date.day;
  } else {
    dateInString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInString.month = "0" + date.month;
  } else {
    dateInString.month = date.month.toString();
  }

  dateInString.year = date.year.toString();

  return dateInString;
}

// To check function is working fine, - hard coding the value
// var date = {
//     day: 5,
//     month: 11,
//     year: 2020
// }
// console.log(convertDateToString(date));

function getDateInAllFormats(date) {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// var date = {
//     day: 5,
//     month: 11,
//     year: 2022
// }
// console.log(getDateInAllFormats(date));

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getDateInAllFormats(date);
  var result = false;

  for (let index = 0; index < listOfPalindromes.length; index++) {
    if (isPalindrome(listOfPalindromes[index])) {
      result = true;
      break;
    }
  }
  return result;
}

// var date = {
//     day: 5,
//     month: 11,
//     year: 2022
// }
// console.log(checkPalindromeForAllDateFormats(date));

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  if (year % 4 === 0) {
    return true;
  }

  return false;
}
// console.log(isLeapYear(1992));

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonths[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

// var date = {
//     day: 29,
//     month: 2,
//     year: 2020
// }
// console.log(getNextDate(date));

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}
// var date = {
//     day: 31,
//     month: 12,
//     year: 2020
// }
// console.log(getNextPalindromeDate(date));

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
  } else {
  }
}

function getPreviousPalindromeDate(date) {}

var dobInput = document.querySelector("#dob-input");
var showButton = document.querySelector("#btn");
var resultArea = document.querySelector("#result");

function clickHandler(e) {
  // console.log(dobInput.value);

  var bdayString = dobInput.value;

  if (bdayString !== "") {
    var listOfDate = bdayString.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };
    // console.log(date);

    var isPalindrome = checkPalindromeForAllDateFormats(date);
    console.log(isPalindrome);

    if (isPalindrome) {
      resultArea.innerText = "Yes, your birthday is palindrome 😁";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      resultArea.innerText = `Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. you missed it by ${ctr} days.`;
    }
  } else {
    resultArea = alert("Input field can't be empty");
  }
}

showButton.addEventListener("click", clickHandler);
