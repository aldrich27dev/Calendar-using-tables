let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector('.calendar-dates');
const currdate = document.querySelector('.calendar-current-date');
const prenexIcons = document.querySelectorAll('.calendar-navigation span');

// Array ng mga buwan to pre
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Function
const manipulate = () => {
  let dayone = new Date(year, month, 1).getDay();
  let lastdate = new Date(year, month + 1, 0).getDate();
  let dayend = new Date(year, month, lastdate).getDay();
  let monthlastdate = new Date(year, month, 0).getDate();

  let lit = '';
  let week = [];

  //ito yung dates ng previous month
  for (let i = dayone; i > 0; i--) {
    week.push(
      `<td class="text-muted bg-light p-5 opacity-25">${
        monthlastdate - i + 1
      }</td>`
    );
  }

  // ito yung month na nasa calendar
  for (let i = 1; i <= lastdate; i++) {
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? 'bg-success bg-gradient text-white p-5 h5 rounded'
        : '';
    week.push(`<td class=" p-5 shadow-sm ${isToday}">${i}</td>`);

    // kapag tapos na yung week
    if (week.length === 7) {
      lit += `<tr>${week.join('')}</tr>`;
      week = [];
    }
  }

  // ito yung first dates ng next month
  for (let i = dayend; i < 6; i++) {
    week.push(`<td class="text-muted p-5 opacity-25">${i - dayend + 1}</td>`);
  }

  if (week.length) {
    lit += `<tr>${week.join('')}</tr>`;
  }

  currdate.innerText = `${months[month]} ${year}`;

  day.innerHTML = lit;
};

manipulate();

// pindutan
prenexIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    month = icon.id === 'calendar-prev' ? month - 1 : month + 1;

    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      date = new Date();
    }

    manipulate();
  });
});
