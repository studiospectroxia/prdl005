const ENDPOINT = 'https://docs.google.com/forms/d/e/1FAIpQLSf9lTrxRtjyUAcair2S5gMliZdTQ1983VQd6SKwQxoxsZ6Y7Q/formResponse';

const FIELDS = {
  name:     'entry.1412316193',
  location: 'entry.2107217771',
  email:    'entry.1080259172',
  phone:    'entry.578458605',
  insta:    'entry.903467826',
};

function submitForm() {
  const btn      = document.getElementById('submit-btn');
  const errorMsg = document.getElementById('error-msg');

  const name     = document.getElementById('name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const location = document.getElementById('location').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const insta    = document.getElementById('insta').value.trim();

  if (!name || !email || !location) {
    errorMsg.textContent = 'Name, location and email are required.';
    errorMsg.style.display = 'block';
    return;
  }

  errorMsg.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Sending...';

  // Build the hidden form and target a hidden iframe
  // This is the reliable method for Google Forms cross-origin submission
  const iframe = document.createElement('iframe');
  iframe.name = 'hidden-submit';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = ENDPOINT;
  form.target = 'hidden-submit';

  const data = {
    [FIELDS.name]:     name,
    [FIELDS.location]: location,
    [FIELDS.email]:    email,
    [FIELDS.phone]:    phone,
    [FIELDS.insta]:    insta,
  };

  for (const [key, value] of Object.entries(data)) {
    const input = document.createElement('input');
    input.type  = 'hidden';
    input.name  = key;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);

  iframe.onload = () => {
    document.getElementById('form-wrap').style.display = 'none';
    document.getElementById('success').style.display = 'block';
    // cleanup
    document.body.removeChild(form);
    document.body.removeChild(iframe);
  };

  form.submit();
}
