let Calendar = function (divId) {
  this.divId = divId;

  this.daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  this.months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = new Date();

  this.currentMonth = currentDate.getMonth();
  this.currentYear = currentDate.getFullYear();
  this.currentDay = currentDate.getDate();
};

Calendar.prototype.nextMonth = function () {
  if (this.currentMonth == 11) {
    this.currentMonth = 0;
    this.currentYear++;
  } else {
    this.currentMonth++;
  }
  this.showCurrentMonth();
};

Calendar.prototype.previousMonth = function () {
  if (this.currentMonth == 0) {
    this.currentMonth = 11;
    this.currentYear--;
  } else {
    this.currentMonth--;
  }
  this.showCurrentMonth();
};

Calendar.prototype.showCurrentMonth = function () {
  this.showMonth(this.currentYear, this.currentMonth);
};

Calendar.prototype.showMonth = function (year, month) {
  let firstDayOfMonth = new Date(year, month, 7).getDay(),
    lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
    lastDayOfLastMonth =
      month == 0
        ? new Date(year - 1, 11, 0).getDate()
        : new Date(year, month, 0).getDate();

  let html = "<table>";

  html += "<thead><tr>";
  html += '<td colspan="7">' + this.months[month] + " " + year + "</td>";
  html += "</tr></thead>";

  html += '<tr class="days">';
  for (let i = 0; i < this.daysOfWeek.length; i++) {
    html += "<td>" + this.daysOfWeek[i] + "</td>";
  }
  html += "</tr>";

  let dayNumber = 1;
  do {
    let dayOfWeek = new Date(year, month, dayNumber).getDay();

    if (dayOfWeek == 1) {
      html += "<tr>";
    } else if (dayNumber == 1) {
      html += "<tr>";
      let k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (let j = 0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }

    let chk = new Date();
    let chkY = chk.getFullYear();
    let chkM = chk.getMonth();
    if (
      chkY == this.currentYear &&
      chkM == this.currentMonth &&
      dayNumber == this.currentDay
    ) {
      html += '<td class="today">' + dayNumber + "</td>";
    } else {
      html += '<td class="normal">' + dayNumber + "</td>";
    }
    if (dayOfWeek == 0) {
      html += "</tr>";
    } else if (dayNumber == lastDateOfMonth) {
      let k = 1;
      for (dayOfWeek; dayOfWeek < 7; dayOfWeek++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }

    dayNumber++;
  } while (dayNumber <= lastDateOfMonth);

  html += "</table>";
  document.getElementById(this.divId).innerHTML = html;
};

window.onload = function () {
  let calendar = new Calendar("divCal");
  calendar.showCurrentMonth();

  getId("btnNext").onclick = function () {
    calendar.nextMonth();
  };
  getId("btnPrev").onclick = function () {
    calendar.previousMonth();
  };
};
function getId(id) {
  return document.getElementById(id);
}
