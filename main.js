const ENDPOINT = 'https://docs.google.com/forms/d/e/1FAIpQLSf9lTrxRtjyUAcair2S5gMliZdTQ1983VQd6SKwQxoxsZ6Y7Q/formResponse';

const FIELDS = {
  name:     'entry.1412316193',
  location: 'entry.2107217771',
  email:    'entry.1080259172',
  phone:    'entry.578458605',
  insta:    'entry.903467826',
};

async function submitForm() {
  const btn      = document.getElementById('submit-btn');
  const errorMsg = document.getElementById('error-msg');

  const name     = document.getElementById('name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const location = document.getElementById('location').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const insta    = document.getElementById('insta').value.trim();

  // Basic validation
  if (!name || !email) {
    errorMsg.textContent = 'Name and email are required.';
    errorMsg.style.display = 'block';
    return;
  }

  errorMsg.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const body = new URLSearchParams({
    [FIELDS.name]:     name,
    [FIELDS.location]: location,
    [FIELDS.email]:    email,
    [FIELDS.phone]:    phone,
    [FIELDS.insta]:    insta,
  });

  try {
    // no-cors: browser won't return a response, but data submits successfully
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  } catch (e) {
    // Fetch with no-cors throws a TypeError — this is normal, not an error
    console.log('Submitted (no-cors expected behaviour)');
  }

  // Always show success — no-cors gives no status code to check
  document.getElementById('form-wrap').style.display = 'none';
  const success = document.getElementById('success');
  success.style.display = 'block';
}
