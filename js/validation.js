/* Validate locally, read the selected photo, then persist only a complete ticket. */
'use strict';
const form = document.querySelector('#registration-form');
const avatar = document.querySelector('#avatar');
const preview = document.querySelector('#avatar-preview');
const prompt = document.querySelector('#upload-prompt');
const actions = document.querySelector('#image-actions');
const submitButton = document.querySelector('#submit-button');
const dropZone = document.querySelector('#drop-zone');
let photoData = '';
let photoVersion = 0;
const fields = [
  { input: document.querySelector('#full-name'), error: 'name-error', check: value => value.trim().length > 0 && value.trim().length <= 80, message: 'Please enter your full name.' },
  { input: document.querySelector('#email'), error: 'email-error', check: value => /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(value.trim()) && value.trim().length <= 254, message: 'Please enter a valid email address, e.g. user@domain.com.' },
  { input: document.querySelector('#github'), error: 'github-error', check: value => /^@[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(value.trim()) && !value.includes('--'), message: 'Use @ followed by a valid GitHub username (1-39 letters, digits or single hyphens).' }
];
function showError(input, id, message) {
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  document.getElementById(id).textContent = message;
}
function validateField(field) {
  const valid = field.check(field.input.value);
  showError(field.input, field.error, valid ? '' : field.message);
  return valid;
}
fields.forEach(field => {
  field.input.addEventListener('blur', () => validateField(field));
  field.input.addEventListener('input', () => {
    if (field.input.getAttribute('aria-invalid') === 'true') validateField(field);
  });
});
function resetPhoto() {
  photoVersion += 1;
  photoData = '';
  avatar.value = '';
  preview.src = '../assets/images/icon-upload.svg';
  preview.classList.remove('has-image');
  prompt.textContent = 'Drag and drop or click to upload';
  actions.hidden = true;
  submitButton.disabled = false;
}
function readPhoto(file) {
  resetPhoto();
  const version = photoVersion;
  let error = '';
  if (!file) error = 'Please upload an avatar.';
  else if (!['image/jpeg', 'image/png'].includes(file.type)) error = 'Please choose a JPG or PNG image.';
  else if (file.size >= 500 * 1024) error = 'Your image must be under 500 KB.';
  showError(avatar, 'avatar-error', error);
  if (error) return;
  submitButton.disabled = true;
  const reader = new FileReader();
  reader.onerror = () => {
    if (version !== photoVersion) return;
    submitButton.disabled = false;
    showError(avatar, 'avatar-error', 'This file could not be read. Please choose another image.');
  };
  reader.onload = () => {
    // Decode too: a renamed text file is not a valid avatar.
    const image = new Image();
    image.onload = () => {
      if (version !== photoVersion) return;
      photoData = reader.result;
      preview.src = photoData;
      preview.classList.add('has-image');
      prompt.textContent = file.name;
      actions.hidden = false;
      submitButton.disabled = false;
    };
    image.onerror = () => {
      if (version !== photoVersion) return;
      submitButton.disabled = false;
      showError(avatar, 'avatar-error', 'This image is damaged or unreadable. Choose another JPG or PNG.');
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}
avatar.addEventListener('change', () => readPhoto(avatar.files[0]));
document.querySelector('#change-image').addEventListener('click', () => avatar.click());
document.querySelector('#remove-image').addEventListener('click', () => {
  resetPhoto();
  showError(avatar, 'avatar-error', '');
  avatar.focus();
});
['dragenter', 'dragover'].forEach(event => dropZone.addEventListener(event, e => {
  e.preventDefault();
  dropZone.classList.add('dragging');
}));
['dragleave', 'drop'].forEach(event => dropZone.addEventListener(event, e => {
  e.preventDefault();
  dropZone.classList.remove('dragging');
}));
dropZone.addEventListener('drop', e => readPhoto(e.dataTransfer.files[0]));
form.addEventListener('submit', event => {
  event.preventDefault();
  const validFields = fields.map(validateField).every(Boolean);
  if (!photoData) showError(avatar, 'avatar-error', document.querySelector('#avatar-error').textContent || 'Please upload an avatar.');
  if (!validFields || !photoData) {
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }
  const ticket = {
    fullName: fields[0].input.value.trim(),
    email: fields[1].input.value.trim(),
    github: fields[2].input.value.trim(),
    avatar: photoData,
    serial: '#' + String(Math.floor(Math.random() * 100000)).padStart(5, '0')
  };
  try {
    sessionStorage.setItem('codingConfTicket', JSON.stringify(ticket));
    window.location.href = 'ticket.html';
  } catch (error) {
    document.querySelector('#form-error').textContent = 'Unable to save your ticket. Allow browser storage and try again.';
  }
});
