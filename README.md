# Keong Hoe Swim Team - MSSPP 2025 Event Manager

A responsive HTML platform for managing the MSSPP 2025 swimming event (April 7-9, 2025) with heat assignments, timing, and results tracking.

## Features

- **Responsive Design:** Fully adaptive layout for all devices (mobile, tablet, desktop)
- **Tabbed Interface:** Organized by day (April 7, 8, 9) and results section
- **Search Functionality:** Search for athletes, events, or event numbers with a clear button
- **Real-time Clock:** Digital clock display for timing reference
- **Heat and Lane Management:** Pre-filled heat and lane assignments for all athletes
- **Time Tracking:**
  - Pre-filled seed times for every athlete
  - Built-in stopwatch for timing events with start/stop functionality
  - Manual time entry option
  - Automatically calculated time differences
  - Color-coded results (green for improvements, red for slower times)
- **Relay Team Management:**
  - Clear display of relay team members with position numbers
  - Special formatting for medley relays with stroke assignments
  - Consistent appearance for all relay swimmers
- **Results Management:**
  - Dedicated results tab showing all saved times
  - Local storage persistence (results remain after page refresh)
  - One-click CSV export with comprehensive data

## How to Use

### Event Management

1. **Navigate Events:** Use the day tabs (April 7, 8, 9) to view scheduled events
2. **Search:** Type in the search box to quickly find swimmers or events
3. **Timing Athletes:**
   - For each athlete, you can:
     - View their assigned Heat/Lane and seed time (pre-filled)
     - Use the stopwatch button to time their performance (blue to start, red to stop)
     - Manually enter times in the finishing time field
     - Save results with the save button (diskette icon)
4. **Relay Teams:**
   - Relay teams show the "Keong Hoe Relay Team" header with heat/lane
   - Individual relay swimmers are listed with position numbers
   - For medley relays, each swimmer's stroke is shown (back, breast, fly, free)
   - Time the entire relay team with one stopwatch button

### Viewing Results

1. **Access Results Tab:** Click on the "Results" tab to view all saved results
2. **Review Data:** See event details, athlete names, times, and time differences
3. **Export Data:** Click the export button (file icon) to download results as CSV

## Data Persistence

- Results are automatically saved to the browser's local storage
- Data remains available even after closing or refreshing the browser
- To clear all data, use your browser's "Clear Site Data" function

## Browser Compatibility

Compatible with modern browsers including:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## Customization

### CSS Customization
You can modify the appearance by editing the `styles.css` file:
- Colors and themes
- Font sizes and families
- Table layouts and spacing
- Mobile breakpoints

### Data Customization
To modify event data or seed times:
- Edit the `eventData` object in `script.js`
- Update athlete names, heat/lane assignments, and seed times

## Hosting on Wix or Other Providers

### Wix Hosting
1. Download all files (`index.html`, `styles.css`, `script.js`)
2. Create a new Wix site with the "HTML iframe" element
3. Upload the files to Wix's file manager
4. Set the iframe source to your uploaded HTML file

### Other Hosting Options
1. Download all project files
2. Upload to any web hosting service that supports HTML/CSS/JavaScript
3. No server-side processing is required as all data is stored client-side

## Usage Notes

- **Mobile Usage:** On smaller screens, some columns may be condensed for better viewing
- **Stopwatch Accuracy:** The stopwatch is dependent on device performance and may have slight variations
- **Data Limitation:** Since data is stored in local storage, it's limited to the same browser/device
- **Export Regularly:** For data backup, export results to CSV periodically 