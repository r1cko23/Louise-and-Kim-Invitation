# Wedding Invitation Website

A beautiful, responsive wedding invitation website with RSVP functionality for Louise and Kim's wedding celebration.

## Features

- **Two-page invitation design** with elegant typography and minimalist aesthetic
- **Interactive photo gallery** showcasing couple photos
- **RSVP form with popup modal** for guest responses
- **Google Sheets integration** for collecting and managing RSVP responses
- **Fully responsive design** that works on all devices
- **Accessibility features** including keyboard navigation and screen reader support
- **Modern web standards** with semantic HTML5 and CSS3

## Pages

### Page 1: Main Invitation

- Couple names (Louise and Kim)
- Wedding date (December 1, 2025)
- Time (3:00 PM)
- Venue (Timmy in the Woods, Antipolo City, Rizal)
- Elegant floral decoration

### Page 2: Photo Gallery & RSVP

- "You are INVITED" header
- 2x2 grid of couple photos
- Interactive RSVP button with envelope icon
- Popup form for guest responses

## RSVP Form Fields

- **Full Name** (required)
- **Email Address** (required)
- **Phone Number** (optional)
- **Attendance** (Yes/No - required)
- **Number of attendees** (shown only if attending)
- **Dietary restrictions** (optional)
- **Message for the couple** (optional)

## Setup Instructions

### 1. Google Sheets Integration

To enable RSVP form submissions, you need to set up a Google Apps Script:

1. **Go to [Google Apps Script](https://script.google.com/)**
2. **Create a new project**
3. **Replace the default code** with the contents of `google-apps-script.js`
4. **Save the project** (Ctrl+S or Cmd+S)
5. **Deploy as a web app:**
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
6. **Copy the web app URL** and update the `GOOGLE_SHEETS_URL` variable in `script.js`

### 2. Update Configuration

In `script.js`, find this line and replace with your Google Apps Script URL:

```javascript
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

### 3. Deploy the Website

You can host this website on any web hosting service:

- **GitHub Pages** (free)
- **Netlify** (free tier available)
- **Vercel** (free tier available)
- **Traditional web hosting** (upload files via FTP)

### 4. Test the Setup

1. Open the website in a browser
2. Navigate to page 2
3. Click the RSVP button
4. Fill out and submit the form
5. Check your Google Sheet for the new entry

## File Structure

```
/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # JavaScript functionality
├── google-apps-script.js   # Google Apps Script code
├── README.md              # This file
└── Copy of White and Black Simple Minimalist Floral Wedding Invitation (1-5).png
    # Wedding photos for the gallery
```

## Customization

### Colors and Fonts

The design uses CSS custom properties for easy customization. Edit the `:root` section in `styles.css`:

```css
:root {
  --primary-color: #2c2c2c; /* Main text color */
  --secondary-color: #666666; /* Secondary text color */
  --accent-color: #8b4513; /* Accent color */
  --background-color: #faf8f5; /* Background color */
  --card-background: #fefefe; /* Card background */
}
```

### Wedding Details

Update the wedding information in `index.html`:

- Names
- Date
- Time
- Venue
- Location

### Photos

Replace the placeholder images with your actual wedding photos:

- Update the `src` attributes in the photo grid
- Ensure images are optimized for web (WebP format recommended)
- Maintain consistent aspect ratios for the grid layout

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy loading** for images
- **Optimized CSS** with minimal unused styles
- **Efficient JavaScript** with event delegation
- **Responsive images** that adapt to screen size
- **Smooth animations** with hardware acceleration

## Accessibility Features

- **Semantic HTML5** structure
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode support
- **Focus indicators** for all interactive elements

## Security Considerations

- **Input validation** on both client and server side
- **XSS protection** through proper data sanitization
- **CORS configuration** for Google Sheets integration
- **Rate limiting** (implemented in Google Apps Script)

## Troubleshooting

### RSVP Form Not Submitting

1. Check that the Google Apps Script URL is correct
2. Verify the Google Apps Script is deployed with "Anyone" access
3. Check browser console for error messages
4. Ensure all required fields are filled

### Images Not Loading

1. Verify image file paths are correct
2. Check that images are in the same directory as the HTML file
3. Ensure images are in supported formats (PNG, JPG, WebP)

### Styling Issues

1. Clear browser cache and reload
2. Check for CSS syntax errors in browser developer tools
3. Verify all font files are loading correctly

## Support

For technical support or customization requests, please refer to the code comments or create an issue in the project repository.

## License

This project is created for Louise and Kim's wedding celebration. Please respect the personal nature of this content.

---

**Created with ❤️ for Louise & Kim's special day**
