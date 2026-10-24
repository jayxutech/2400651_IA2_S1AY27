# Coding Conf - CIT2011 Individual Assignment 2

Student: Jayden Peterson  
Student ID: 2400651  
Programme: BSc Computer Information Systems, University of Technology, Jamaica  
Lecturer: Sirisha Badhika  
Semester: 1, Academic Year 2026-2027  
Due: October 31, 2026 at 11:59 PM

## Run

Extract the complete ZIP first. Open HTML/index.html in a modern browser.
For consistent browser storage behaviour, serve the project root with a local
web server, for example `python -m http.server 8000`, then visit
http://localhost:8000/HTML/index.html. No framework, build step, external font,
package installation or internet connection is needed by the application.

## Sample registration

- Full Name: Jayden Peterson
- Email: jayden@example.com (sample only)
- GitHub Username: @jayxdevo
- Avatar: assets/images/image-avatar.jpg (supplied sample photo, not the student's portrait)

The registration page is named login.html to match the brief. It is an event
registration form; no password or account authentication is implemented.
No email is sent and no server receives attendee information. The ticket is
stored in sessionStorage for the current browser tab and survives refresh.
Closing the tab normally ends the session. The serial is a demo identifier,
not a centrally issued unique booking reference.

## Files

- HTML/index.html: event overview with the specified date and location.
- HTML/login.html: labelled registration form and image upload.
- HTML/ticket.html: guarded confirmation page and personal ticket.
- css/style.css: shared responsive theme, Grid/Flexbox, position, float,
  custom properties, fluid typography, focus, hover and print rules.
- js/validation.js: contextual checks, drag/drop, file decoding and storage.
- js/ticket.js: route guard and safe text-based DOM population.
- assets/images/: artwork supplied in the assignment ZIP.
- documentation/: report, wireframe and actual test screenshots.

## Before submission

1. Review the code and make sure you can explain it. The brief restricts work
   to Weeks 1-6 and warns about excessive AI use. Those lecture notes were not
   supplied, so conformity to each taught feature cannot be verified here.
2. Verify the student details above.
3. Review the included report and upload the final ZIP through the course portal.
   This package has not been submitted to the university portal.

## Published links

- Repository: https://github.com/jayxutech/2400651_IA2_S1AY27
- Live site: https://jayxutech.github.io/2400651_IA2_S1AY27/HTML/index.html

GitHub Pages publishes the main branch from the repository root. The extra
root index.html redirects to the required HTML/index.html entry page.

## Implementation notes

Only native HTML5, CSS3 and JavaScript are used. The supplied style guide allows
alternative fonts, so Courier New is used as a locally available monospace
font. Avatar validation accepts JPEG/PNG only, requires a decodable image,
and rejects sizes greater than or equal to 500 * 1024 bytes. GitHub handles
require @, 1-39 valid characters, no edge hyphens and no consecutive hyphens.
This is client-side validation, not a server security or authentication system.
The actual event metadata is October 26, 2026 / Papine, Kgn; the year 2025
in the visual mockups was replaced with the year required by the brief.
