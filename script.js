document.addEventListener('DOMContentLoaded', function() {
    // Add search box and clock
    const headerSection = document.querySelector('header');
    const searchDiv = document.createElement('div');
    searchDiv.className = 'search-container';
    searchDiv.innerHTML = `
        <div class="search-box">
            <input type="text" id="swimmer-search" placeholder="Search swimmers, events...">
            <button id="clear-search" class="clear-search-btn">&times;</button>
        </div>
        <div class="clock" id="real-time-clock"></div>
    `;
    headerSection.appendChild(searchDiv);

    // Initialize clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('real-time-clock').textContent = timeString;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Initialize search functionality with expanded search
    const searchInput = document.getElementById('swimmer-search');
    const clearSearchBtn = document.getElementById('clear-search');

    // Clear search function
    function clearSearch() {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    }

    clearSearchBtn.addEventListener('click', clearSearch);

    // Enhanced search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('tr');
        
        rows.forEach(row => {
            if (row.classList.contains('relay-swimmer-row')) {
                // Don't directly hide/show relay swimmer rows - they will be handled by their parent row
                return;
            }

            let shouldShow = false;
            const eventNum = row.querySelector('td:nth-child(1)');
            const eventName = row.querySelector('td:nth-child(2)');
            const athleteName = row.querySelector('td:nth-child(3)');
            
            if (eventNum && eventName && athleteName) {
                const eventNumText = eventNum.textContent.toLowerCase();
                const eventNameText = eventName.textContent.toLowerCase();
                const athleteNameText = athleteName.textContent.toLowerCase();
                
                shouldShow = eventNumText.includes(searchTerm) || 
                            eventNameText.includes(searchTerm) || 
                            athleteNameText.includes(searchTerm);

                // Show/hide the main row
                row.style.display = shouldShow ? '' : 'none';

                // Handle associated relay swimmer rows
                if (athleteNameText.includes('relay team')) {
                    let nextRow = row.nextElementSibling;
                    while (nextRow && nextRow.classList.contains('relay-swimmer-row')) {
                        // If searching and this swimmer matches, show both the relay team row and this swimmer row
                        const swimmerText = nextRow.textContent.toLowerCase();
                        if (searchTerm && swimmerText.includes(searchTerm)) {
                            row.style.display = '';
                            nextRow.style.display = '';
                            shouldShow = true;
                        } else {
                            // Show/hide based on the relay team row's visibility
                            nextRow.style.display = shouldShow ? '' : 'none';
                        }
                        nextRow = nextRow.nextElementSibling;
                    }
                }
            }
        });
    });

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
                { eventNum: 102, eventName: "Boys 12U 100 freestyle", athletes: [
                    { name: "Ling Shen Yang 5U", heat: "6", lane: "9", seedTime: "1:45.94" },
                    { name: "Ayden Koay 4K", heat: "7", lane: "5", seedTime: "1:28.10" },
                    { name: "Yeoh Li Ze 4H", heat: "5", lane: "7", seedTime: "1:54.04" }
                ]},
                { eventNum: 103, eventName: "Girls 12U 100 freestyle", athletes: [
                    { name: "Shavietaa 5M", heat: "5", lane: "0", seedTime: "1:41.32" },
                    { name: "Lim Ginny Sze Han 5M", heat: "3", lane: "6", seedTime: "1:59.43" },
                    { name: "Ainatul Dhamia 5K", heat: "8", lane: "8", seedTime: "1:22.61" }
                ]},
                { eventNum: 108, eventName: "Boys 12U 50 fly", athletes: [
                    { name: "Ling Shen Yang 5U", heat: "6", lane: "7", seedTime: "58.98" },
                    { name: "Ayden Koay 4K", heat: "8", lane: "9", seedTime: "46.64" }
                ]},
                { eventNum: 109, eventName: "Girls 12U 50 fly", athletes: [
                    { name: "Law Yin Er 6B", heat: "8", lane: "3", seedTime: "39.34" },
                    { name: "Shavietaa 5M", heat: "4", lane: "3", seedTime: "56.39" },
                    { name: "Ammara 3M", heat: "6", lane: "9", seedTime: "51.49" }
                ]},
                { eventNum: 114, eventName: "Mixed 12U 200 Freestyle relay", athletes: ["Relay: Ayden Koay 4K, Lee Jia Kai 4K, Ainatul Dhamia 5K, Law Yin Er 6B"], heat: "3", lane: "1", seedTime: "NT" }
            ],
            afternoon: [
                { eventNum: 118, eventName: "Boys 12U 100 Breast", athletes: [
                    { name: "Ayden Koay 4K", heat: "7", lane: "1", seedTime: "1:55.16" },
                    { name: "Lee Jia Kai 4K", heat: "6", lane: "7", seedTime: "2:00.79" },
                    { name: "Yeoh Li Ze 4H", heat: "6", lane: "0", seedTime: "2:04.82" }
                ]},
                { eventNum: 119, eventName: "Girls 12U 100 Breast", athletes: [
                    { name: "Tan Yun Xin 6K", heat: "2", lane: "7", seedTime: "2:35.40" },
                    { name: "Ainatul Dhamia 5K", heat: "7", lane: "2", seedTime: "1:40.90" },
                    { name: "Ammara 3M", heat: "5", lane: "5", seedTime: "1:55.21" }
                ]},
                { eventNum: 128, eventName: "Mixed 12U Medley Relay", athletes: ["Relay: Ayden Koay 4K, Ainatul Dhamia 5K, Law Yin Er 6B, Lee Jia Kai 4K"], heat: "2", lane: "8", seedTime: "NT" }
            ]
        },
        day2: {
            morning: [
                { eventNum: 202, eventName: "Boys 12U 200IM", athletes: [
                    { name: "Ayden Koay 4K", heat: "3", lane: "2", seedTime: "3:27.96" },
                    { name: "Ling Shen Yang 5U", heat: "2", lane: "5", seedTime: "3:56.09" }
                ]},
                { eventNum: 203, eventName: "Girls 12U 200IM", athletes: [
                    { name: "Law Yin Er 6B", heat: "4", lane: "0", seedTime: "3:10.49" },
                    { name: "Ammara 3M", heat: "2", lane: "8", seedTime: "3:52.49" },
                    { name: "Ainatul Dhamia 5K", heat: "4", lane: "9", seedTime: "3:19.37" }
                ]},
                { eventNum: 208, eventName: "Boys 12U 50 Breast", athletes: [
                    { name: "Ling Shen Yang 5U", heat: "17", lane: "0", seedTime: "52.88" },
                    { name: "Lee Jia Kai 4K", heat: "16", lane: "5", seedTime: "53.00" },
                    { name: "Yeoh Li Ze 4H", heat: "15", lane: "8", seedTime: "56.97" }
                ]},
                { eventNum: 209, eventName: "Girls 12U 50 Breast", athletes: [
                    { name: "Shavietaa 5M", heat: "12", lane: "3", seedTime: "59.92" },
                    { name: "Ainatul Dhamia 5K", heat: "17", lane: "8", seedTime: "46.47" },
                    { name: "Bong Rui You 4B", heat: "13", lane: "9", seedTime: "59.27" }
                ]},
                { eventNum: 214, eventName: "Boys 12U 200 freestyle", athletes: [
                    { name: "Ayden Koay 4K", heat: "3", lane: "7", seedTime: "3:08.20" },
                    { name: "Lee Jia Kai 4K", heat: "1", lane: "3", seedTime: "NT" }
                ]},
                { eventNum: 215, eventName: "Girls 12U 200 freestyle", athletes: [
                    { name: "Shavietaa 5M", heat: "2", lane: "0", seedTime: "3:31.02" },
                    { name: "Law Yin Er 6B", heat: "4", lane: "2", seedTime: "2:48.46" },
                    { name: "Lim Ginny Sze Han 5M", heat: "1", lane: "6", seedTime: "NT" }
                ]}
            ],
            afternoon: [
                { eventNum: 222, eventName: "Boys 12U 100 butterfly", athletes: [
                    { name: "Ling Shen Yang 5U", heat: "2", lane: "2", seedTime: "1:59.73" }
                ]},
                { eventNum: 223, eventName: "Girls 12U 100 butterfly", athletes: [
                    { name: "Law Yin Er 6B", heat: "4", lane: "3", seedTime: "1:31.47" },
                    { name: "Ainatul Dhamia 5K", heat: "4", lane: "7", seedTime: "1:41.10" }
                ]},
                { eventNum: 228, eventName: "Boys 12U 50 backstroke", athletes: [
                    { name: "Lee Jia Kai 4K", heat: "7", lane: "5", seedTime: "50.79" }
                ]},
                { eventNum: 229, eventName: "Girls 12U 50 backstroke", athletes: [
                    { name: "Lim Ginny Sze Han 5M", heat: "4", lane: "6", seedTime: "1:06.27" },
                    { name: "Tan Yun Xin 6K", heat: "4", lane: "9", seedTime: "1:11.18" },
                    { name: "Law Yin Er 6B", heat: "9", lane: "7", seedTime: "44.45" }
                ]},
                { eventNum: 234, eventName: "Boys 12U 200 freestyle relay", athletes: ["Relay: Ling Shen Yang 5U, Yeoh Li Ze 4H, Lee Jia Kai 4K, Ayden Koay 4K (Backup: Seoh Yeong Terng 6B)"], heat: "2", lane: "9", seedTime: "NT" },
                { eventNum: 235, eventName: "Girls 12U 200 freestyle relay", athletes: ["Relay: Ainatul Dhamia 5K, Shavietaa 5M, Ammara 3M, Law Yin Er 6B (Backup: Lim Ginny Sze Han 5M)"], heat: "2", lane: "6", seedTime: "NT" }
            ]
        },
        day3: {
            morning: [
                { eventNum: 306, eventName: "Boys 12U 50 freestyle", athletes: [
                    { name: "Ayden Koay 4K", heat: "17", lane: "7", seedTime: "40.20" },
                    { name: "Lee Jia Kai 4K", heat: "15", lane: "8", seedTime: "45.81" }
                ]},
                { eventNum: 307, eventName: "Girls 12U 50 freestyle", athletes: [
                    { name: "Shavietaa 5M", heat: "13", lane: "9", seedTime: "44.16" },
                    { name: "Bong Rui You 4B", heat: "11", lane: "7", seedTime: "48.87" }
                ]},
                { eventNum: 312, eventName: "Boys 12U 100 backstroke", athletes: [
                    { name: "Lee Jia Kai 4K", heat: "2", lane: "6", seedTime: "1:50.47" }
                ]},
                { eventNum: 313, eventName: "Girls 12U 100 backstroke", athletes: [
                    { name: "Law Yin Er 6B", heat: "4", lane: "2", seedTime: "1:31.36" },
                    { name: "Ammara 3M", heat: "2", lane: "7", seedTime: "2:06.16" }
                ]}
            ],
            afternoon: [
                { eventNum: 324, eventName: "Boys 12U 200 Medley Relay", athletes: ["Relay: Lee Jia Kai 4K, Ling Shen Yang 5U, Ayden Koay 4K, Yeoh Li Ze 4H (Backup: Seoh Yeong Terng 6B)"], heat: "1", lane: "6", seedTime: "NT" },
                { eventNum: 325, eventName: "Girls 12U 200 Medley Relay", athletes: ["Relay: Ainatul Dhamia 5K, Ammara 3M, Law Yin Er 6B, Shavietaa 5M (Backup: Bong Rui You 4B)"], heat: "2", lane: "6", seedTime: "NT" }
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
            const isRelay = event.eventName.toLowerCase().includes('relay');
            
            if (isRelay) {
                // Handle relay event
                const row = document.createElement('tr');
                row.dataset.eventNum = event.eventNum;
                row.dataset.eventName = event.eventName;
                row.dataset.isRelay = "true";
                
                // Create event info cells
                const eventNumCell = document.createElement('td');
                eventNumCell.textContent = event.eventNum;
                eventNumCell.rowSpan = 1; // Will be updated later
                
                const eventNameCell = document.createElement('td');
                eventNameCell.textContent = event.eventName;
                eventNameCell.rowSpan = 1; // Will be updated later
                
                // Display relay team name in the first row
                const athleteCell = document.createElement('td');
                athleteCell.innerHTML = "<strong>Keong Hoe Relay Team</strong>";
                
                // Heat/Lane for the team
                const heatLaneCell = document.createElement('td');
                const heatLaneInput = document.createElement('input');
                heatLaneInput.type = 'text';
                heatLaneInput.placeholder = 'H/L';
                heatLaneInput.classList.add('heat-lane-input');
                heatLaneInput.readOnly = true;
                heatLaneInput.value = `H${event.heat}/L${event.lane}`;
                heatLaneCell.appendChild(heatLaneInput);
                
                // Entry time for the team
                const entryTimeCell = document.createElement('td');
                const entryTimeInput = document.createElement('input');
                entryTimeInput.type = 'text';
                entryTimeInput.placeholder = 'MM:SS.ms';
                entryTimeInput.classList.add('entry-time-input');
                entryTimeInput.readOnly = true;
                entryTimeInput.value = event.seedTime;
                entryTimeCell.appendChild(entryTimeInput);
                
                // Finish time for the team
                const finishTimeCell = document.createElement('td');
                const finishTimeInput = document.createElement('input');
                finishTimeInput.type = 'text';
                finishTimeInput.placeholder = 'MM:SS.ms';
                finishTimeInput.classList.add('finish-time-input');
                finishTimeInput.value = ''; // Leave finish time blank
                finishTimeCell.appendChild(finishTimeInput);
                
                // Actions for the team
                const actionsCell = document.createElement('td');
                // Create save button with icon
                const saveButton = document.createElement('button');
                saveButton.innerHTML = '<i class="fas fa-save"></i>';
                saveButton.title = 'Save';
                saveButton.classList.add('btn', 'save-btn');
                saveButton.addEventListener('click', function() {
                    saveResult(row);
                });
                actionsCell.appendChild(saveButton);
                
                // Create stopwatch button with icon and move it next to save button
                const stopwatchButton = createStopwatch(finishTimeInput);
                actionsCell.appendChild(stopwatchButton);
                
                // Append cells to main row
                row.appendChild(eventNumCell);
                row.appendChild(eventNameCell);
                row.appendChild(athleteCell);
                row.appendChild(heatLaneCell);
                row.appendChild(entryTimeCell);
                row.appendChild(finishTimeCell);
                row.appendChild(actionsCell);
                
                // Append row to table
                tableBody.appendChild(row);
                
                // Parse relay swimmers and create a row for each
                const relayText = event.athletes[0];
                const isMedley = event.eventName.toLowerCase().includes('medley');
                
                // Extract swimmer names from the relay text
                // Format typically: "Relay: Name1, Name2, Name3, Name4 (Backup: Name5)"
                const relayInfo = relayText.replace('Relay: ', '');
                let swimmers = [];
                let backup = '';
                
                if (relayInfo.includes('(Backup:')) {
                    const parts = relayInfo.split('(Backup:');
                    swimmers = parts[0].split(',').map(s => s.trim());
                    backup = parts[1].replace(')', '').trim();
                } else {
                    swimmers = relayInfo.split(',').map(s => s.trim());
                }
                
                // Define stroke order for medley relay
                const medleyStrokes = ['Backstroke', 'Breaststroke', 'Butterfly', 'Freestyle'];
                
                // Create rows for each swimmer
                let swimmerCount = swimmers.length;
                if (backup) swimmerCount++; // Add one for backup
                
                // Update rowspan for event number and name
                eventNumCell.rowSpan = swimmerCount + 1; // +1 for the team row
                eventNameCell.rowSpan = swimmerCount + 1;
                
                swimmers.forEach((swimmer, index) => {
                    const swimmerRow = document.createElement('tr');
                    swimmerRow.classList.add('relay-swimmer-row');
                    
                    // Swimmer cell with number
                    const swimmerCell = document.createElement('td');
                    let positionText = `Swimmer #${index + 1}: ${swimmer}`;
                    
                    // Add stroke information for medley relay
                    if (isMedley && index < medleyStrokes.length) {
                        positionText += ` (${medleyStrokes[index]})`;
                    }
                    
                    swimmerCell.textContent = positionText;
                    swimmerCell.colSpan = 5; // Span across Heat/Lane, Entry Time, Finish Time, Actions
                    
                    swimmerRow.appendChild(swimmerCell);
                    tableBody.appendChild(swimmerRow);
                });
                
                // Add backup swimmer if present
                if (backup) {
                    const backupRow = document.createElement('tr');
                    backupRow.classList.add('relay-swimmer-row');
                    
                    const backupCell = document.createElement('td');
                    backupCell.textContent = `Backup: ${backup}`;
                    backupCell.colSpan = 5;
                    
                    backupRow.appendChild(backupCell);
                    tableBody.appendChild(backupRow);
                }
            } else {
                // Handle individual event with new athlete structure
                event.athletes.forEach(athlete => {
                    const row = document.createElement('tr');
                    row.dataset.eventNum = event.eventNum;
                    row.dataset.eventName = event.eventName;
                    row.dataset.athlete = athlete.name;
                    
                    // Create table cells
                    const eventNumCell = document.createElement('td');
                    eventNumCell.textContent = event.eventNum;
                    
                    const eventNameCell = document.createElement('td');
                    eventNameCell.textContent = event.eventName;
                    
                    const athleteCell = document.createElement('td');
                    athleteCell.textContent = athlete.name;
                    
                    const heatLaneCell = document.createElement('td');
                    const heatLaneInput = document.createElement('input');
                    heatLaneInput.type = 'text';
                    heatLaneInput.placeholder = 'H/L';
                    heatLaneInput.classList.add('heat-lane-input');
                    heatLaneInput.value = `H${athlete.heat}/L${athlete.lane}`;
                    heatLaneInput.readOnly = true;
                    heatLaneCell.appendChild(heatLaneInput);
                    
                    const entryTimeCell = document.createElement('td');
                    const entryTimeInput = document.createElement('input');
                    entryTimeInput.type = 'text';
                    entryTimeInput.placeholder = 'MM:SS.ms';
                    entryTimeInput.classList.add('entry-time-input');
                    entryTimeInput.value = athlete.seedTime;
                    entryTimeInput.readOnly = true;
                    entryTimeCell.appendChild(entryTimeInput);
                    
                    const finishTimeCell = document.createElement('td');
                    const finishTimeInput = document.createElement('input');
                    finishTimeInput.type = 'text';
                    finishTimeInput.placeholder = 'MM:SS.ms';
                    finishTimeInput.classList.add('finish-time-input');
                    finishTimeInput.value = ''; // Leave finish time blank
                    finishTimeCell.appendChild(finishTimeInput);
                    
                    const actionsCell = document.createElement('td');
                    // Create save button with icon
                    const saveButton = document.createElement('button');
                    saveButton.innerHTML = '<i class="fas fa-save"></i>';
                    saveButton.title = 'Save';
                    saveButton.classList.add('btn', 'save-btn');
                    saveButton.addEventListener('click', function() {
                        saveResult(row);
                    });
                    actionsCell.appendChild(saveButton);
                    
                    // Create stopwatch button with icon and add it to actions cell
                    const stopwatchButton = createStopwatch(finishTimeInput);
                    actionsCell.appendChild(stopwatchButton);
                    
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
            }
        });
    }

    // Save result to results table
    function saveResult(row) {
        const eventNum = row.dataset.eventNum;
        const eventName = row.dataset.eventName;
        const isRelay = row.dataset.isRelay === "true";
        
        // Use team name for relay events
        const athlete = isRelay ? "Keong Hoe Relay Team" : row.dataset.athlete;
        
        const heatLane = row.querySelector('.heat-lane-input').value;
        const entryTime = row.querySelector('.entry-time-input').value;
        const finishTime = row.querySelector('.finish-time-input').value;
        
        if (!finishTime) {
            alert('Please enter a finishing time before saving.');
            return;
        }
        
        // Calculate time difference and determine color
        const timeDiff = calculateTimeDifference(entryTime, finishTime);
        const isImprovement = timeDiff.startsWith('-');
        
        // Check if result already exists for this athlete and event
        const resultsTable = document.getElementById('results-table');
        const existingRows = resultsTable.querySelectorAll('tr');
        let existingRow = null;
        let existingRelayInfoRows = [];
        
        existingRows.forEach(r => {
            if (r.dataset.eventNum === eventNum && r.dataset.athlete === athlete) {
                existingRow = r;
            }
            // If this is a relay info row associated with the event
            if (r.dataset.relayInfoFor === eventNum) {
                existingRelayInfoRows.push(r);
            }
        });
        
        // Remove existing relay info rows if any
        existingRelayInfoRows.forEach(r => r.remove());
        
        if (existingRow) {
            // Update existing row
            existingRow.querySelector('.heat-lane-cell').textContent = heatLane;
            existingRow.querySelector('.entry-time-cell').textContent = entryTime;
            existingRow.querySelector('.finish-time-cell').textContent = finishTime;
            
            const timeDiffCell = existingRow.querySelector('.time-diff-cell');
            timeDiffCell.textContent = timeDiff;
            timeDiffCell.className = 'time-diff-cell'; // Reset classes
            if (isImprovement) {
                timeDiffCell.classList.add('improvement');
            } else if (timeDiff !== 'N/A' && timeDiff !== 'Invalid Time' && timeDiff !== 'Error') {
                timeDiffCell.classList.add('slower');
            }
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
            if (isImprovement) {
                timeDiffCell.classList.add('improvement');
            } else if (timeDiff !== 'N/A' && timeDiff !== 'Invalid Time' && timeDiff !== 'Error') {
                timeDiffCell.classList.add('slower');
            }
            
            resultRow.appendChild(eventNumCell);
            resultRow.appendChild(eventNameCell);
            resultRow.appendChild(athleteCell);
            resultRow.appendChild(heatLaneCell);
            resultRow.appendChild(entryTimeCell);
            resultRow.appendChild(finishTimeCell);
            resultRow.appendChild(timeDiffCell);
            
            resultsTable.appendChild(resultRow);
        }
        
        // For relay events, add swimmer information below the main result
        if (isRelay) {
            // Find the swimmer rows associated with this relay
            const swimmerRows = document.querySelectorAll('.relay-swimmer-row');
            const relevantSwimmers = [];
            
            // Start looking for the swimmers after the current row
            let currentSibling = row.nextElementSibling;
            while (currentSibling && currentSibling.classList.contains('relay-swimmer-row')) {
                relevantSwimmers.push(currentSibling);
                currentSibling = currentSibling.nextElementSibling;
            }
            
            // Find where to insert swimmer rows in results table
            const mainResultRow = existingRow || resultsTable.lastElementChild;
            
            // Add the swimmers
            relevantSwimmers.forEach(swimmerRow => {
                const infoRow = document.createElement('tr');
                infoRow.classList.add('results-relay-info');
                infoRow.dataset.relayInfoFor = eventNum;
                
                const infoCell = document.createElement('td');
                infoCell.colSpan = 7;
                infoCell.textContent = swimmerRow.textContent.trim();
                infoCell.style.paddingLeft = '30px';
                infoCell.style.fontSize = '0.9em';
                infoCell.style.color = '#555';
                infoCell.style.backgroundColor = '#f5f9ff';
                infoCell.style.borderBottom = '1px dashed #ddd';
                
                infoRow.appendChild(infoCell);
                
                // Insert after the main result row
                mainResultRow.insertAdjacentElement('afterend', infoRow);
            });
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
        
        let csvContent = 'Event #,Event Name,Athlete Name,Heat/Lane,Entry Time,Finishing Time,Time Difference,Notes\n';
        
        let currentEventNum = null;
        let relaySwimmers = [];
        
        rows.forEach(row => {
            // Check if this is a relay info row
            if (row.classList.contains('results-relay-info')) {
                // Store swimmer info to add to the previous row
                relaySwimmers.push(row.textContent.trim());
                return;
            }
            
            const eventNum = row.querySelector('td:nth-child(1)').textContent;
            const eventName = row.querySelector('td:nth-child(2)').textContent;
            const athlete = row.querySelector('td:nth-child(3)').textContent;
            const heatLane = row.querySelector('td:nth-child(4)').textContent;
            const entryTime = row.querySelector('td:nth-child(5)').textContent;
            const finishTime = row.querySelector('td:nth-child(6)').textContent;
            const timeDiff = row.querySelector('td:nth-child(7)').textContent;
            
            // Prepare notes field with relay swimmer info if available
            let notes = '';
            if (relaySwimmers.length > 0 && athlete.includes('Relay')) {
                notes = relaySwimmers.join(' | ');
                relaySwimmers = []; // Clear after using
            }
            
            const csvRow = `"${eventNum}","${eventName}","${athlete}","${heatLane}","${entryTime}","${finishTime}","${timeDiff}","${notes}"`;
            csvContent += csvRow + '\n';
            
            // Reset for next event
            currentEventNum = eventNum;
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

    // Add stopwatch functionality 
    function createStopwatch(finishTimeInput) {
        let startTime;
        let timerInterval;
        let isRunning = false;
        
        const stopwatchButton = document.createElement('button');
        stopwatchButton.innerHTML = '<i class="fas fa-stopwatch"></i>';
        stopwatchButton.title = 'Start Timing';
        stopwatchButton.classList.add('btn', 'stopwatch-btn');
        
        stopwatchButton.addEventListener('click', function() {
            if (!isRunning) {
                // Start the stopwatch
                startTime = Date.now();
                isRunning = true;
                stopwatchButton.classList.add('running');
                stopwatchButton.title = 'Stop Timing';
                
                // Update the display every 10ms
                timerInterval = setInterval(function() {
                    const elapsedMs = Date.now() - startTime;
                    const formattedTime = formatStopwatchTime(elapsedMs);
                    finishTimeInput.value = formattedTime;
                }, 10);
            } else {
                // Stop the stopwatch
                clearInterval(timerInterval);
                isRunning = false;
                stopwatchButton.classList.remove('running');
                stopwatchButton.title = 'Start Timing';
            }
        });
        
        return stopwatchButton;
    }

    function formatStopwatchTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        
        if (minutes > 0) {
            return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
        } else {
            return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
        }
    }
}); 