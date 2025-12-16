// Sample data for demonstration
const sampleRecords = [
    // ... (keep the existing sampleRecords array unchanged)
];

// DOM elements
const nameInput = document.getElementById('nameInput');
const searchBtn = document.getElementById('searchBtn');
const searchType = document.getElementById('searchType');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsSection = document.getElementById('resultsSection');
const resultCards = document.getElementById('resultCards');
const matchLevelItems = document.querySelectorAll('.match-level-item');
const transliterationContainer = document.getElementById('transliterationContainer');
const devanagariValue = document.getElementById('devanagariValue');
const englishValue = document.getElementById('englishValue');
const variantsValue = document.getElementById('variantsValue');

// Language switch elements
const languageSwitch = document.getElementById('languageSwitch');
const englishLabel = document.getElementById('englishLabel');
const hindiLabel = document.getElementById('hindiLabel');
const currentMode = document.getElementById('currentMode');

// Initialize language mode
let isHindiMode = false;
updateLanguageMode();

document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById('nameInput');
    const hindiKeyboard = document.getElementById('hindiKeyboard');
    const currentMode = document.getElementById('currentMode');
    const languageSwitch = document.getElementById('languageSwitch');

    // Switch between English and Hindi modes
    languageSwitch.addEventListener('change', function () {
        if (this.checked) {
            console.log("Switching to Hindi Mode");
            nameInput.placeholder = "नाम दर्ज करें (उदा., सुरेश)";
            nameInput.style.fontFamily = "'Nirmala UI', 'Mangal', sans-serif";
            hindiKeyboard.style.display = "flex";
            currentMode.textContent = "हिंदी (Hindi)";
            isHindiMode = true;
        } else {
            console.log("Switching to English Mode");
            nameInput.placeholder = "Enter name (e.g., Suresh)";
            nameInput.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            hindiKeyboard.style.display = "none";
            currentMode.textContent = "English";
            isHindiMode = false;
        }
        nameInput.value = ""; // Clear input field on mode switch
        resultsSection.style.display = "none"; // Hide results when switching modes
    });

    // Event delegation for keyboard clicks
    hindiKeyboard.addEventListener('click', function (event) {
        if (event.target.classList.contains('keyboard-key')) {
            let key = event.target.textContent.trim();
            
            if (key === "⌫") {
                nameInput.value = nameInput.value.slice(0, -1);
            } else {
                nameInput.value += key;
            }
        }
    });
});

// Update language mode UI and functionality
function updateLanguageMode() {
    if (isHindiMode) {
        // Hindi mode
        nameInput.placeholder = "नाम दर्ज करें (उदा., सुरेश)";
        englishLabel.classList.remove('active-language');
        englishLabel.classList.add('inactive-language');
        hindiLabel.classList.remove('inactive-language');
        hindiLabel.classList.add('active-language');
        currentMode.textContent = "हिंदी (Hindi)";
        nameInput.style.fontFamily = "'Nirmala UI', 'Mangal', sans-serif";
    } else {
        // English mode
        nameInput.placeholder = "Enter name (e.g., Suresh)";
        hindiLabel.classList.remove('active-language');
        hindiLabel.classList.add('inactive-language');
        englishLabel.classList.remove('inactive-language');
        englishLabel.classList.add('active-language');
        currentMode.textContent = "English";
        nameInput.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    }
    
    nameInput.value = "";
    resultsSection.style.display = "none"; // Hide results when initializing
}

// Event listeners
searchBtn.addEventListener('click', performSearch);

matchLevelItems.forEach(item => {
    item.addEventListener('click', () => {
        matchLevelItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        
        const confidenceLevel = item.getAttribute('data-level');
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const cardConfidence = card.getAttribute('data-confidence');
            card.style.display = cardConfidence === confidenceLevel ? 'block' : 'none';
        });
    });
});

searchType.addEventListener('change', () => {
    transliterationContainer.style.display = searchType.value === 'transliteration' ? 'block' : 'none';
});

// Initialize
transliterationContainer.style.display = 'none';
resultsSection.style.display = 'none'; // Ensure results are hidden initially

// Search function
function performSearch() {
    const searchTerm = nameInput.value.trim();
    const type = searchType.value;

    if (!searchTerm) {
        alert(isHindiMode ? 'कृपया खोज के लिए एक नाम दर्ज करें' : 'Please enter a name to search');
        return;
    }

    loadingIndicator.style.display = 'flex';
    resultsSection.style.display = 'none';

    fetch('http://127.0.0.1:5000/match_names', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: searchTerm, type: type })
    })
    .then(response => response.json())
    .then(data => {
        loadingIndicator.style.display = 'none';
        resultsSection.style.display = 'block';
        resultsSection.classList.add('fade-in');

        resultCards.innerHTML = '';
        updateTransliterationInfo(searchTerm);
        generateCardsFromBackend(data.matches);
    })
    .catch(error => {
        loadingIndicator.style.display = 'none';
        console.error('Error:', error);
        alert('Failed to fetch results from server');
    });
}


// Update transliteration information
function updateTransliterationInfo(name) {
    const isDevanagari = /[\u0900-\u097F]/.test(name);
    
    if (isDevanagari) {
        devanagariValue.textContent = name;
        if (name === 'सुरेश') {
            englishValue.textContent = 'Suresh';
            variantsValue.textContent = 'Suresh, Sursh, Surash, Sooresh';
        } else if (name === 'कुमार') {
            englishValue.textContent = 'Kumar';
            variantsValue.textContent = 'Kumar, Kumaar, Koomarr';
        } else {
            englishValue.textContent = name;
            variantsValue.textContent = name;
        }
    } else {
        englishValue.textContent = name;
        if (name.toLowerCase().includes('suresh')) {
            devanagariValue.textContent = 'सुरेश';
            variantsValue.textContent = 'Suresh, Sursh, Surash, Sooresh';
        } else if (name.toLowerCase().includes('kumar')) {
            devanagariValue.textContent = 'कुमार';
            variantsValue.textContent = 'Kumar, Kumaar, Koomarr';
        } else {
            devanagariValue.textContent = name;
            variantsValue.textContent = name;
        }
    }
}

// Generate result cards
function generateResultCards(searchTerm) {
    let filteredRecords = [...sampleRecords];
    const isDevanagari = /[\u0900-\u097F]/.test(searchTerm);
    
    if (isDevanagari) {
        filteredRecords.sort((a, b) => {
            const aContains = a.nameHindi.includes(searchTerm);
            const bContains = b.nameHindi.includes(searchTerm);
            return aContains && !bContains ? -1 : !aContains && bContains ? 1 : 0;
        });
    } else {
        filteredRecords.sort((a, b) => {
            const aContains = a.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase());
            const bContains = b.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase());
            return aContains && !bContains ? -1 : !aContains && bContains ? 1 : 0;
        });
    }
    
    filteredRecords.forEach((record, index) => {
        const card = document.createElement('div');
        card.className = 'card slide-up';
        card.setAttribute('data-confidence', record.confidence);
        card.style.animationDelay = `${index * 0.1}s`;
        
        let primaryName = isHindiMode ? record.nameHindi : record.nameEnglish;
        let secondaryName = isHindiMode ? record.nameEnglish : record.nameHindi;
        
        card.innerHTML = `
            <div class="card-header">
                <h3>${primaryName}</h3>
                <span class="match-percentage">${record.matchPercentage}%</span>
            </div>
            <div class="card-content">
                <div class="detail-row">
                    <div class="detail-label">ID:</div>
                    <div class="detail-value">${record.id}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">${isHindiMode ? 'अंग्रेज़ी:' : 'Hindi:'}</div>
                    <div class="detail-value">${secondaryName}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">${isHindiMode ? 'आयु/लिंग:' : 'Age/Gender:'}</div>
                    <div class="detail-value">${record.age} / ${record.gender}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">${isHindiMode ? 'केस आईडी:' : 'Case IDs:'}</div>
                    <div class="detail-value">${record.caseIds.join(', ')}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">${isHindiMode ? 'पता:' : 'Address:'}</div>
                    <div class="detail-value">${record.address}</div>
                </div>
                <div class="phonetic-note">
                    <strong>${isHindiMode ? 'ध्वन्यात्मक कुंजी:' : 'Phonetic Key:'}</strong> ${record.phoneticKey}
                </div>
                <div class="suggestions">
                    <div class="suggestion-title">${isHindiMode ? 'नाम के प्रकार:' : 'Name Variants:'}</div>
                    <div class="suggestion-chips">
                        ${record.variants.map(v => `<span class="suggestion-chip">${v}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const chips = card.querySelectorAll('.suggestion-chip');
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    nameInput.value = chip.textContent;
                    performSearch();
                });
            });
        }, 0);
        
        resultCards.appendChild(card);
    });
    
    // Initially filter for high confidence
    const highConfidenceButton = document.querySelector('[data-level="high"]');
    if (highConfidenceButton) {
        highConfidenceButton.click();
    }
}

function generateCardsFromBackend(matches) {
    matches.forEach((match, index) => {
        const confidence = match.score.replace('%', '') >= 90 ? 'high' :
                           match.score.replace('%', '') >= 70 ? 'medium' : 'low';

        const card = document.createElement('div');
        card.className = 'card slide-up';
        card.setAttribute('data-confidence', confidence);
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="card-header">
                <h3>${match.name}</h3>
                <span class="match-percentage">${match.score}</span>
            </div>
            <div class="card-content">
                <p>This is a matched name from the police master record.</p>
            </div>
        `;

        resultCards.appendChild(card);
    });

    const highConfidenceButton = document.querySelector('[data-level="high"]');
    if (highConfidenceButton) highConfidenceButton.click();
}
