/* Guard this route before rendering. Use textContent for all attendee text. */
'use strict';
let ticket = null;
try {
  ticket = JSON.parse(sessionStorage.getItem('codingConfTicket'));
} catch (error) {
  ticket = null;
}
const valid = ticket && typeof ticket.fullName === 'string' && ticket.fullName.trim() &&
  typeof ticket.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ticket.email) &&
  typeof ticket.github === 'string' && /^@[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(ticket.github) &&
  !ticket.github.includes('--') && typeof ticket.avatar === 'string' &&
  /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(ticket.avatar) && /^#\d{5}$/.test(ticket.serial);
if (!valid) {
  window.location.replace('index.html');
} else {
  document.querySelector('#congrats-name').textContent = ticket.fullName;
  document.querySelector('#confirmation-email').textContent = ticket.email;
  document.querySelector('#ticket-name').textContent = ticket.fullName;
  document.querySelector('#ticket-avatar').src = ticket.avatar;
  document.querySelector('#ticket-avatar').alt = 'Profile photo of ' + ticket.fullName;
  document.querySelector('#github-handle').textContent = ticket.github;
  document.querySelector('#ticket-github').href = 'https://github.com/' + encodeURIComponent(ticket.github.slice(1));
  document.querySelector('#ticket-number').textContent = ticket.serial;
  document.querySelector('#main').hidden = false;
  document.querySelector('#print-ticket').addEventListener('click', () => window.print());
}
