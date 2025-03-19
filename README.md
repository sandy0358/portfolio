# Modern Portfolio Website

A responsive and interactive portfolio website for web developers and graphic designers. This portfolio features a modern design, smooth animations, and a photography gallery with download options.

## Features

- Responsive design that works on all devices
- Modern and clean UI with smooth animations
- Portfolio gallery with filtering options
- Photography showcase with download functionality
- Contact form with validation
- Mobile-friendly navigation
- Social media integration
- Smooth scrolling
- Interactive elements and hover effects

## Getting Started

1. Clone this repository or download the files
2. Replace the placeholder images in the root directory with your own:
   - `profile.jpg` - Your profile picture
   - `web1.jpg`, `design1.jpg`, `photo1.jpg` - Portfolio images
   - Add more images as needed

3. Customize the content:
   - Update the text in `index.html`
   - Modify the portfolio items in `script.js`
   - Adjust colors in `styles.css` (using CSS variables)

4. Add your own portfolio items:
   - Edit the `portfolioItems` array in `script.js`
   - Add your project images
   - Update download links

5. Update contact information:
   - Replace email and phone number in `index.html`
   - Add your social media links

## Customization

### Colors
The website uses CSS variables for easy color customization. Edit these variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --light-bg: #f8f9fa;
}
```

### Portfolio Items
Add or modify portfolio items in `script.js`:

```javascript
const portfolioItems = [
    {
        id: 1,
        category: 'web',
        title: 'Your Project Title',
        image: 'your-image.jpg',
        downloadUrl: 'your-file.zip'
    },
    // Add more items...
];
```

### Adding New Sections
You can add new sections by:
1. Adding HTML in `index.html`
2. Styling in `styles.css`
3. Adding any necessary JavaScript functionality in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Dependencies

- Font Awesome 6.0.0 (for icons)
- Google Fonts (Poppins)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 