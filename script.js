document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Event data for all days
    const eventData = {
        day1: {
            morning: [
                { eventNum: 102, eventName: "Boys 12U 100 freestyle", athletes: ["Ling Shen Yang 5U", "Ayden Koay 4K", "Yeoh Li Ze 4H"] },
                { eventNum: 103, eventName: "Girls 12U 100 freestyle", athletes: ["Shavietaa 5M", "Lim Ginny Sze Han 5M", "Ainatul Dhamia 5K"] },
                { eventNum: 108, eventName: "Boys 12U 50 fly", athletes: ["Ling Shen Yang 5U", "Ayden Koay 4K"] },
                { eventNum: 109, eventName: "Girls 12U 50 fly", athletes: ["Law Yin Er 6B", "Shavietaa 5M", "Ammara 3M"] },
                { eventNum: 114, eventName: "Mixed 12U 200 Freestyle relay", athletes: ["Relay: Ayden Koay 4K, Lee Jia Kai 4K, Ainatul Dhamia 5K, Law Yin Er 6B"] }
            ],
            afternoon: [
                { eventNum: 118, eventName: "Boys 12U 100 Breast", athletes: ["Ayden Koay 4K", "Lee Jia Kai 4K", "Yeoh Li Ze 4H"] },
                { eventNum: 119, eventName: "Girls 12U 100 Breast", athletes: ["Tan Yun Xin 6K", "Ainatul Dhamia 5K", "Ammara 3M"] },
                { eventNum: 128, eventName: "Mixed 12U Medley Relay", athletes: ["Relay: Ayden Koay 4K, Ainatul Dhamia 5K, Law Yin Er 6B, Lee Jia Kai 4K"] }
            ]
        },
        day2: {
            morning: [
                { eventNum: 202, eventName: "Boys 12U 200IM", athletes: ["Ling Shen Yang 5U", "Ayden Koay 4K"] },
                { eventNum: 203, eventName: "Girls 12U 200IM", athletes: ["Law Yin Er 6B", "Ainatul Dhamia 5K"] },
                { eventNum: 208, eventName: "Boys 12U 50 Breast", athletes: ["Ling Shen Yang 5U", "Lee Jia Kai 4K", "Yeoh Li Ze 4H"] },
                { eventNum: 209, eventName: "Girls 12U 50 Breast", athletes: ["Shavietaa 5M", "Ainatul Dhamia 5K", "Bong Rui You 4B"] },
                { eventNum: 214, eventName: "Boys 12U 200 freestyle", athletes: ["Ayden Koay 4K"] },
                { eventNum: 215, eventName: "Girls 12U 200 freestyle", athletes: ["Law Yin Er 6B", "Shavietaa 5M"] }
            ],
            afternoon: [
                { eventNum: 222, eventName: "Boys 12U 100 butterfly", athletes: ["Ling Shen Yang 5U"] },
                { eventNum: 223, eventName: "Girls 12U 100 butterfly", athletes: ["Law Yin Er 6B", "Ainatul Dhamia 5K"] },
                { eventNum: 228, eventName: "Boys 12U 50 backstroke", athletes: ["Lee Jia Kai 4K"] },
                { eventNum: 229, eventName: "Girls 12U 50 backstroke", athletes: ["Lim Ginny Sze Han 5M", "Tan Yun Xin 6K", "Law Yin Er 6B"] },
                { eventNum: 234, eventName: "Boys 12U 200 freestyle relay", athletes: ["Relay: Ling Shen Yang 5U, Yeoh Li Ze 4H, Lee Jia Kai 4K, Ayden Koay 4K (Backup: Seoh Yeong Terng 6B)"] },
                { eventNum: 235, eventName: "Girls 12U 200 freestyle relay", athletes: ["Relay: Ainatul Dhamia 5K, Shavietaa 5M, Ammara 3M, Law Yin Er 6B (Backup: Lim Ginny Sze Han 5M)"] }
            ]
        },
        day3: {
            morning: [
                { eventNum: 306, eventName: "Boys 12U 50 freestyle", athletes: ["Ayden Koay 4K", "Lee Jia Kai 4K"] },
                { eventNum: 307, eventName: "Girls 12U 50 freestyle", athletes: ["Shavietaa 5M", "Ainatul Dhamia 5K", "Bong Rui You 4B"] },
                { eventNum: 312, eventName: "Boys 12U 100 backstroke", athletes: ["Lee Jia Kai 4K"] },
                { eventNum: 313, eventName: "Girls 12U 100 backstroke", athletes: ["Law Yin Er 6B", "Ammara 3M"] }
            ],
            afternoon: [
                { eventNum: 324, eventName: "Boys 12U 200 Medley Relay", athletes: ["Relay: Lee Jia Kai 4K, Ling Shen Yang 5U, Ayden Koay 4K, Yeoh Li Ze 4H (Backup: Seoh Yeong Terng 6B)"] },
                { eventNum: 325, eventName: "Girls 12U 200 Medley Relay", athletes: ["Relay: Ainatul Dhamia 5K, Ammara 3M, Law Yin Er 6B, Shavietaa 5M (Backup: Bong Rui You 4B)"] }
            ]
        }
    };

    // Populate event tables
    populateEventTable('day1-morning-events', eventData.day1.morning);
    populateEventTable('day1-afternoon-events', eventData.day1.afternoon);
    populateEventTable('day2-morning-events', eventData.day2.morning);
    populateEventTable('day2-afternoon-events', eventData.day2.afternoon);
    populateEventTable('day3-morning-events', eventData.day3.morning);
    populateEventTable('day3-afternoon-events', eventData.day3.afternoon);

    // Function to populate event tables
    function populateEventTable(tableId, events) {
        const tableBody = document.getElementById(tableId);
        
        events.forEach(event => {
            event.athletes.forEach(athlete => {
                const row = document.createElement('tr');
                row.dataset.eventNum = event.eventNum;
                row.dataset.eventName = event.eventName;
                row.dataset.athlete = athlete;
                
                // Create table cells
                const eventNumCell = document.createElement('td');
                eventNumCell.textContent = event.eventNum;
                
                const eventNameCell = document.createElement('td');
                eventNameCell.textContent = event.eventName;
                
                const athleteCell = document.createElement('td');
                athleteCell.textContent = athlete;
                
                const heatLaneCell = document.createElement('td');
                const heatLaneInput = document.createElement('input');
                heatLaneInput.type = 'text';
                heatLaneInput.placeholder = 'H/L';
                heatLaneInput.classList.add('heat-lane-input');
                heatLaneCell.appendChild(heatLaneInput);
                
                const entryTimeCell = document.createElement('td');
                const entryTimeInput = document.createElement('input');
                entryTimeInput.type = 'text';
                entryTimeInput.placeholder = 'MM:SS.ms';
                entryTimeInput.classList.add('entry-time-input');
                entryTimeCell.appendChild(entryTimeInput);
                
                const finishTimeCell = document.createElement('td');
                const finishTimeInput = document.createElement('input');
                finishTimeInput.type = 'text';
                finishTimeInput.placeholder = 'MM:SS.ms';
                finishTimeInput.classList.add('finish-time-input');
                finishTimeCell.appendChild(finishTimeInput);
                
                const actionsCell = document.createElement('td');
                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.classList.add('btn', 'save-btn');
                saveButton.addEventListener('click', function() {
                    saveResult(row);
                });
                actionsCell.appendChild(saveButton);
                
                // Append cells to row
                row.appendChild(eventNumCell);
                row.appendChild(eventNameCell);
                row.appendChild(athleteCell);
                row.appendChild(heatLaneCell);
                row.appendChild(entryTimeCell);
                row.appendChild(finishTimeCell);
                row.appendChild(actionsCell);
                
                // Append row to table
                tableBody.appendChild(row);
            });
        });
    }

    // Save result to results table
    function saveResult(row) {
        const eventNum = row.dataset.eventNum;
        const eventName = row.dataset.eventName;
        const athlete = row.dataset.athlete;
        const heatLane = row.querySelector('.heat-lane-input').value;
        const entryTime = row.querySelector('.entry-time-input').value;
        const finishTime = row.querySelector('.finish-time-input').value;
        
        if (!finishTime) {
            alert('Please enter a finishing time before saving.');
            return;
        }
        
        // Calculate time difference
        const timeDiff = calculateTimeDifference(entryTime, finishTime);
        
        // Check if result already exists for this athlete and event
        const resultsTable = document.getElementById('results-table');
        const existingRows = resultsTable.querySelectorAll('tr');
        let existingRow = null;
        
        existingRows.forEach(r => {
            if (r.dataset.eventNum === eventNum && r.dataset.athlete === athlete) {
                existingRow = r;
            }
        });
        
        if (existingRow) {
            // Update existing row
            existingRow.querySelector('.heat-lane-cell').textContent = heatLane;
            existingRow.querySelector('.entry-time-cell').textContent = entryTime;
            existingRow.querySelector('.finish-time-cell').textContent = finishTime;
            existingRow.querySelector('.time-diff-cell').textContent = timeDiff;
        } else {
            // Create new row
            const resultRow = document.createElement('tr');
            resultRow.dataset.eventNum = eventNum;
            resultRow.dataset.athlete = athlete;
            
            const eventNumCell = document.createElement('td');
            eventNumCell.textContent = eventNum;
            
            const eventNameCell = document.createElement('td');
            eventNameCell.textContent = eventName;
            
            const athleteCell = document.createElement('td');
            athleteCell.textContent = athlete;
            
            const heatLaneCell = document.createElement('td');
            heatLaneCell.textContent = heatLane;
            heatLaneCell.classList.add('heat-lane-cell');
            
            const entryTimeCell = document.createElement('td');
            entryTimeCell.textContent = entryTime;
            entryTimeCell.classList.add('entry-time-cell');
            
            const finishTimeCell = document.createElement('td');
            finishTimeCell.textContent = finishTime;
            finishTimeCell.classList.add('finish-time-cell');
            
            const timeDiffCell = document.createElement('td');
            timeDiffCell.textContent = timeDiff;
            timeDiffCell.classList.add('time-diff-cell');
            
            resultRow.appendChild(eventNumCell);
            resultRow.appendChild(eventNameCell);
            resultRow.appendChild(athleteCell);
            resultRow.appendChild(heatLaneCell);
            resultRow.appendChild(entryTimeCell);
            resultRow.appendChild(finishTimeCell);
            resultRow.appendChild(timeDiffCell);
            
            resultsTable.appendChild(resultRow);
        }
        
        alert('Result saved successfully!');
    }

    // Calculate time difference between entry and finish time
    function calculateTimeDifference(entryTime, finishTime) {
        if (!entryTime || !finishTime) {
            return 'N/A';
        }
        
        try {
            const entryTimeInMs = convertTimeToMs(entryTime);
            const finishTimeInMs = convertTimeToMs(finishTime);
            
            if (isNaN(entryTimeInMs) || isNaN(finishTimeInMs)) {
                return 'Invalid Time';
            }
            
            const diffMs = finishTimeInMs - entryTimeInMs;
            
            // Format the difference
            if (diffMs < 0) {
                return '-' + formatTime(Math.abs(diffMs));
            } else {
                return '+' + formatTime(diffMs);
            }
        } catch (e) {
            return 'Error';
        }
    }

    // Convert time string (MM:SS.ms) to milliseconds
    function convertTimeToMs(timeStr) {
        // Check if the time string is empty
        if (!timeStr.trim()) {
            return NaN;
        }
        
        // Handle different time formats
        let minutes = 0;
        let seconds = 0;
        let milliseconds = 0;
        
        if (timeStr.includes(':')) {
            // Format: MM:SS.ms
            const parts = timeStr.split(':');
            minutes = parseInt(parts[0], 10);
            
            if (parts[1].includes('.')) {
                const secondsParts = parts[1].split('.');
                seconds = parseInt(secondsParts[0], 10);
                milliseconds = parseInt(secondsParts[1], 10);
            } else {
                seconds = parseInt(parts[1], 10);
            }
        } else if (timeStr.includes('.')) {
            // Format: SS.ms
            const parts = timeStr.split('.');
            seconds = parseInt(parts[0], 10);
            milliseconds = parseInt(parts[1], 10);
        } else {
            // Format: SS
            seconds = parseInt(timeStr, 10);
        }
        
        return (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
    }

    // Format milliseconds to MM:SS.ms
    function formatTime(ms) {
        const minutes = Math.floor(ms / (60 * 1000));
        const seconds = Math.floor((ms % (60 * 1000)) / 1000);
        const milliseconds = ms % 1000;
        
        if (minutes > 0) {
            return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        } else {
            return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
        }
    }

    // Export results to CSV
    document.getElementById('export-results').addEventListener('click', function() {
        exportResultsToCSV();
    });

    function exportResultsToCSV() {
        const resultsTable = document.getElementById('results-table');
        const rows = resultsTable.querySelectorAll('tr');
        
        if (rows.length === 0) {
            alert('No results to export.');
            return;
        }
        
        let csvContent = 'Event #,Event Name,Athlete Name,Heat/Lane,Entry Time,Finishing Time,Time Difference\n';
        
        rows.forEach(row => {
            const eventNum = row.querySelector('td:nth-child(1)').textContent;
            const eventName = row.querySelector('td:nth-child(2)').textContent;
            const athlete = row.querySelector('td:nth-child(3)').textContent;
            const heatLane = row.querySelector('td:nth-child(4)').textContent;
            const entryTime = row.querySelector('td:nth-child(5)').textContent;
            const finishTime = row.querySelector('td:nth-child(6)').textContent;
            const timeDiff = row.querySelector('td:nth-child(7)').textContent;
            
            const csvRow = `"${eventNum}","${eventName}","${athlete}","${heatLane}","${entryTime}","${finishTime}","${timeDiff}"`;
            csvContent += csvRow + '\n';
        });
        
        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'MSSPP_2025_Results.csv');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}); 