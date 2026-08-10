/**
 * Aetheria — The Premium Trivia Experience
 * Game Core and Synthesized Audio Engine
 */

// --- Audio Synthesizer Engine using Web Audio API ---
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    initContext() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    createOscillator(type, freq, duration, gainStart, gainEnd = 0.001) {
        if (!this.enabled) return;
        try {
            this.initContext();
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            
            gainNode.gain.setValueAtTime(gainStart, this.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(gainEnd, this.ctx.currentTime + duration);
            
            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn("Audio synthesis failed:", e);
        }
    }

    playHover() {
        // Subtle crisp tick
        this.createOscillator('sine', 1400, 0.04, 0.04);
    }

    playClick() {
        // Satisfying soft block hit
        this.createOscillator('triangle', 650, 0.08, 0.12);
    }

    playCorrect() {
        if (!this.enabled) return;
        try {
            this.initContext();
            const now = this.ctx.currentTime;
            // Elegant ascending gold chord (E5 -> G5 -> B5)
            const notes = [659.25, 783.99, 987.77];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.06);
                
                gain.gain.setValueAtTime(0, now + idx * 0.06);
                gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.06 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(now + idx * 0.06);
                osc.stop(now + idx * 0.06 + 0.5);
            });
        } catch (e) {
            console.warn(e);
        }
    }

    playIncorrect() {
        if (!this.enabled) return;
        try {
            this.initContext();
            const now = this.ctx.currentTime;
            // Muted low dissonant chord (F#2 & G2)
            const freqs = [92.50, 98.00];
            freqs.forEach(freq => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now);
                
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.linearRampToValueAtTime(0.04, now + 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start();
                osc.stop(now + 0.45);
            });
        } catch (e) {
            console.warn(e);
        }
    }

    playComplete() {
        if (!this.enabled) return;
        try {
            this.initContext();
            const now = this.ctx.currentTime;
            // Triumphant arpeggio (C5 -> E5 -> G5 -> C6)
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.1);
                
                gain.gain.setValueAtTime(0, now + idx * 0.1);
                gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.1 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.7);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(now + idx * 0.1);
                osc.stop(now + idx * 0.1 + 0.8);
            });
        } catch (e) {
            console.warn(e);
        }
    }
}

// Instantiate Sound Engine
const synth = new SoundSynth();

// --- Questions Bank ---
const questions = [
    {
        question: "Which Renaissance master painted the ceiling of the Sistine Chapel?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Sandro Botticelli"],
        correctIndex: 0,
        explanation: "Michelangelo spent four years (1508–1512) painting the ceiling of the Sistine Chapel in the Vatican under the patronage of Pope Julius II."
    },
    {
        question: "What is the approximate time it takes for light from the Sun to reach Earth?",
        options: ["8 seconds", "8 minutes", "1 hour", "24 hours"],
        correctIndex: 1,
        explanation: "Light travels at approximately 300,000 km/s. Given the Sun is about 150 million km away, it takes about 8 minutes and 20 seconds for sunlight to reach Earth."
    },
    {
        question: "Which of these is the opening line of Herman Melville's novel Moby-Dick?",
        options: [
            "Call me Ishmael.",
            "It was the best of times, it was the worst of times.",
            "All happy families are alike; each unhappy family is unhappy in its own way.",
            "Stately, plump Buck Mulligan came from the stairhead..."
        ],
        correctIndex: 0,
        explanation: "'Call me Ishmael.' is one of the most famous opening lines in literature, introducing the narrator of Herman Melville's 1851 masterpiece."
    },
    {
        question: "Which country is home to the ancient rock-cut city of Petra?",
        options: ["Jordan", "Egypt", "Greece", "Turkey"],
        correctIndex: 0,
        explanation: "Petra, famous for its rock-cut architecture and water conduit system, is located in southern Jordan and was the capital of the Nabataean Kingdom."
    },
    {
        question: "How many symphonies did Ludwig van Beethoven compose?",
        options: ["3", "5", "9", "41"],
        correctIndex: 2,
        explanation: "Beethoven completed nine symphonies between 1799 and 1824. His Ninth Symphony, featuring the 'Ode to Joy', is one of the most celebrated works in music history."
    },
    {
        question: "Who is the Greek philosopher credited as a founder of Western philosophy, who wrote nothing himself but is known through Plato?",
        options: ["Socrates", "Aristotle", "Epicurus", "Pythagoras"],
        correctIndex: 0,
        explanation: "Socrates wrote nothing down. His philosophy, method of inquiry (the Socratic method), and life are recorded mainly in the dialogues written by his student Plato."
    },
    {
        question: "Which planet in our solar system has the most prominent and extensive ring system?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctIndex: 1,
        explanation: "While all four giant planets have rings, Saturn's rings are by far the largest, brightest, and most complex, composed of billions of ice and rock particles."
    },
    {
        question: "What is the only mammal capable of true, sustained flight?",
        options: ["Bat", "Flying Squirrel", "Sugar Glider", "Platypus"],
        correctIndex: 0,
        explanation: "Bats are the only mammals capable of true, self-powered flight. Animals like flying squirrels or sugar gliders only glide rather than fly."
    },
    {
        question: "In which city is the famous Gothic cathedral Notre-Dame situated?",
        options: ["Paris", "Rome", "Barcelona", "Vienna"],
        correctIndex: 0,
        explanation: "The Cathédrale Notre-Dame de Paris is a landmark medieval Catholic cathedral on the Île de la Cité in Paris, France, widely considered a masterpiece of Gothic architecture."
    },
    {
        question: "Which English mathematician is widely considered to have been the first computer programmer?",
        options: ["Ada Lovelace", "Grace Hopper", "Katherine Johnson", "Joan Clarke"],
        correctIndex: 0,
        explanation: "Ada Lovelace wrote the first algorithm intended to be carried out by Charles Babbage's mechanical Analytical Engine in 1843, making her the first programmer."
    }
];

// --- Game Engine Variables ---
let currentQuestionIndex = 0;
let totalScore = 0;
let userAnswers = []; // Store responses: { index, selected, correct, score, time, status }
let questionTimer = null;
const QUESTION_TIME_LIMIT = 20; // seconds
let timeLeft = QUESTION_TIME_LIMIT;
let timerStartTimestamp = null;
let isQuestionAnswered = false;

// --- DOM References ---
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

const soundToggleBtn = document.getElementById('sound-toggle');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const btnShare = document.getElementById('btn-share');

const questionNumText = document.getElementById('question-number');
const scoreDisplayText = document.getElementById('score-display');
const progressFill = document.getElementById('progress-fill');

const timerText = document.getElementById('timer-text');
const timerFill = document.getElementById('timer-fill');

const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const feedbackPanel = document.getElementById('feedback-panel');
const feedbackMsg = document.getElementById('feedback-msg');
const feedbackIconContainer = document.getElementById('feedback-icon-container');

// Results elements
const finalPercentage = document.getElementById('final-percentage');
const finalRawScore = document.getElementById('final-raw-score');
const rankTitle = document.getElementById('rank-title');
const rankDescription = document.getElementById('rank-description');
const statPoints = document.getElementById('stat-points');
const statSpeed = document.getElementById('stat-speed');
const scoreCircleFill = document.getElementById('score-circle-fill');
const toggleReviewBtn = document.getElementById('toggle-review-btn');
const reviewContainer = document.getElementById('review-container');

// --- Game Engine Functions ---

function init() {
    // Sound Setup
    soundToggleBtn.addEventListener('click', toggleSound);
    
    // Nav Buttons
    btnStart.addEventListener('click', startQuiz);
    btnRestart.addEventListener('click', resetQuiz);
    btnShare.addEventListener('click', copyResultCertificate);
    toggleReviewBtn.addEventListener('click', toggleReviewPanel);
    
    // Options Hook
    Array.from(optionsGrid.children).forEach(button => {
        button.addEventListener('click', () => {
            if (isQuestionAnswered) return;
            const index = parseInt(button.getAttribute('data-index'));
            selectOption(index);
        });
        button.addEventListener('mouseenter', () => {
            if (!isQuestionAnswered) {
                synth.playHover();
            }
        });
    });
}

function toggleSound() {
    const isSoundEnabled = synth.toggle();
    const icon = soundToggleBtn.querySelector('i');
    if (isSoundEnabled) {
        icon.className = 'fas fa-volume-up';
        soundToggleBtn.title = 'Mute Sound';
        // Play short click to show it's active
        synth.playClick();
    } else {
        icon.className = 'fas fa-volume-mute';
        soundToggleBtn.title = 'Unmute Sound';
    }
}

function showScreen(screenKey) {
    Object.keys(screens).forEach(key => {
        if (key === screenKey) {
            screens[key].classList.add('active');
            screens[key].classList.remove('hidden');
        } else {
            screens[key].classList.remove('active');
            screens[key].classList.add('hidden');
        }
    });
}

function startQuiz() {
    synth.playClick();
    currentQuestionIndex = 0;
    totalScore = 0;
    userAnswers = [];
    showScreen('quiz');
    loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
    isQuestionAnswered = false;
    currentQuestionIndex = index;
    
    const qData = questions[index];
    
    // UI Progress
    questionNumText.textContent = `Question ${index + 1} of ${questions.length}`;
    scoreDisplayText.textContent = `Score: ${totalScore}`;
    progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;
    
    // Question Text
    questionText.textContent = qData.question;
    
    // Options population
    const optionButtons = Array.from(optionsGrid.children);
    optionButtons.forEach((btn, idx) => {
        btn.className = 'option-btn';
        btn.removeAttribute('disabled');
        btn.querySelector('.option-content').textContent = qData.options[idx];
        // Reset option icon to checkmark template
        btn.querySelector('.option-status-icon').innerHTML = '<i class="fas fa-check"></i>';
    });
    
    // Feedback Panel Hide
    feedbackPanel.className = 'feedback-panel hidden';
    
    // Timer Reset
    timeLeft = QUESTION_TIME_LIMIT;
    timerFill.style.width = '100%';
    timerFill.className = 'timer-fill';
    timerText.textContent = `${QUESTION_TIME_LIMIT}s`;
    
    timerStartTimestamp = Date.now();
    startTimer();
}

function startTimer() {
    clearInterval(questionTimer);
    
    questionTimer = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(questionTimer);
            handleTimeout();
        }
        
        // Update Timer Visuals
        timerText.textContent = `${Math.ceil(timeLeft)}s`;
        timerFill.style.width = `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%`;
        
        if (timeLeft <= 5) {
            timerFill.classList.add('warning');
        }
    }, 100);
}

function selectOption(selectedIndex) {
    clearInterval(questionTimer);
    isQuestionAnswered = true;
    
    const timeTaken = (Date.now() - timerStartTimestamp) / 1000;
    const qData = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === qData.correctIndex;
    
    // Score Calculation
    let scoreEarned = 0;
    if (isCorrect) {
        // Base 1000 + Speed Bonus (up to 1000)
        const speedRatio = Math.max(0, timeLeft / QUESTION_TIME_LIMIT);
        scoreEarned = Math.round(1000 + (speedRatio * 1000));
        totalScore += scoreEarned;
    }
    
    // Store answer object
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selected: selectedIndex,
        correct: qData.correctIndex,
        score: scoreEarned,
        time: timeTaken,
        status: isCorrect ? 'correct' : 'incorrect'
    });
    
    // Update Option Button Classes
    const optionButtons = Array.from(optionsGrid.children);
    optionButtons.forEach((btn, idx) => {
        btn.setAttribute('disabled', 'true');
        if (idx === selectedIndex) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            if (isCorrect) {
                btn.classList.add('pulse-correct');
            } else {
                btn.classList.add('shake');
            }
        }
        if (idx === qData.correctIndex) {
            btn.classList.add('correct');
        }
    });
    
    // Show Feedback Message
    feedbackPanel.className = `feedback-panel ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`;
    feedbackMsg.innerHTML = isCorrect 
        ? `<strong>Correct!</strong> +${scoreEarned} pts. <span class="feedback-explanation">${qData.explanation}</span>` 
        : `<strong>Incorrect.</strong> <span class="feedback-explanation">${qData.explanation}</span>`;
    feedbackIconContainer.innerHTML = isCorrect 
        ? '<i class="fas fa-check-circle"></i>' 
        : '<i class="fas fa-times-circle"></i>';
    
    // Play Sound
    if (isCorrect) {
        synth.playCorrect();
    } else {
        synth.playIncorrect();
    }
    
    scoreDisplayText.textContent = `Score: ${totalScore}`;
    
    // Wait and progress
    setTimeout(progressGame, 3000);
}

function handleTimeout() {
    isQuestionAnswered = true;
    const qData = questions[currentQuestionIndex];
    
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selected: -1,
        correct: qData.correctIndex,
        score: 0,
        time: QUESTION_TIME_LIMIT,
        status: 'timeout'
    });
    
    const optionButtons = Array.from(optionsGrid.children);
    optionButtons.forEach((btn, idx) => {
        btn.setAttribute('disabled', 'true');
        if (idx === qData.correctIndex) {
            btn.classList.add('correct');
        }
    });
    
    feedbackPanel.className = 'feedback-panel timeout-feedback';
    feedbackMsg.innerHTML = `<strong>Time Expired.</strong> <span class="feedback-explanation">${qData.explanation}</span>`;
    feedbackIconContainer.innerHTML = '<i class="fas fa-hourglass-end"></i>';
    
    synth.playIncorrect();
    
    setTimeout(progressGame, 3000);
}

function progressGame() {
    if (currentQuestionIndex + 1 < questions.length) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        showResults();
    }
}

function showResults() {
    showScreen('results');
    synth.playComplete();
    
    const correctCount = userAnswers.filter(a => a.status === 'correct').length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    // Animate Score SVG Ring
    // Circumference = 2 * PI * r = 2 * 3.14159 * 70 = 439.82
    const circumference = 439.82;
    scoreCircleFill.style.strokeDasharray = circumference;
    scoreCircleFill.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        const offset = circumference - (percentage / 100) * circumference;
        scoreCircleFill.style.strokeDashoffset = offset;
    }, 150);
    
    // Text elements
    finalPercentage.textContent = `${percentage}%`;
    finalRawScore.textContent = `${correctCount}/${questions.length} Correct`;
    statPoints.textContent = totalScore.toLocaleString();
    
    // Avg Response Time
    const avgTime = userAnswers.reduce((sum, a) => sum + a.time, 0) / questions.length;
    statSpeed.textContent = `${avgTime.toFixed(1)}s`;
    
    // Ranks and descriptors
    let title = "";
    let desc = "";
    if (percentage === 100) {
        title = "The Paragon of Wisdom";
        desc = "A flawless display of erudition. Your intellectual reach is unbounded, and your recollection absolute.";
    } else if (percentage >= 80) {
        title = "The Grand Scholar";
        desc = "Your mastery of diverse domains is exemplary. The fire of curiosity burns bright in your mind.";
    } else if (percentage >= 60) {
        title = "The Polymath";
        desc = "A highly commendable showing. You possess a wide array of knowledge and a sharp, inquisitive mind.";
    } else if (percentage >= 40) {
        title = "The Aspirant";
        desc = "A respectworthy attempt. You display clear intellectual promise and a solid core of trivia awareness.";
    } else {
        title = "The Seeker";
        desc = "Every journey begins with a single question. Your quest for knowledge continues, rich with new discoveries to make.";
    }
    
    rankTitle.textContent = title;
    rankDescription.textContent = desc;
    
    // Render Review Section
    buildReviewHTML();
    
    // Reset toggle review button
    reviewContainer.classList.add('hidden');
    toggleReviewBtn.querySelector('span').textContent = 'Review Your Answers';
    toggleReviewBtn.querySelector('i').className = 'fas fa-chevron-down';
}

function buildReviewHTML() {
    reviewContainer.innerHTML = '';
    
    userAnswers.forEach((ans, idx) => {
        const qData = questions[ans.questionIndex];
        const itemDiv = document.createElement('div');
        itemDiv.className = `review-item ${ans.status}-item`;
        
        let statusBadgeClass = '';
        let statusLabel = '';
        if (ans.status === 'correct') {
            statusBadgeClass = 'review-status-correct';
            statusLabel = 'Correct';
        } else if (ans.status === 'incorrect') {
            statusBadgeClass = 'review-status-incorrect';
            statusLabel = 'Incorrect';
        } else {
            statusBadgeClass = 'review-status-timeout';
            statusLabel = 'Timed Out';
        }
        
        const userSelText = ans.selected >= 0 ? qData.options[ans.selected] : 'None (Timed Out)';
        const correctSelText = qData.options[ans.correct];
        
        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                <span class="review-status-badge ${statusBadgeClass}">${statusLabel}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">+${ans.score} pts (${ans.time.toFixed(1)}s)</span>
            </div>
            <div class="review-item-q">${idx + 1}. ${qData.question}</div>
            <div class="review-item-answers">
                <div>
                    <span class="review-ans-label">Your answer:</span>
                    <span class="review-user-ans">${userSelText}</span>
                </div>
                ${ans.status !== 'correct' ? `
                <div>
                    <span class="review-ans-label">Correct answer:</span>
                    <span class="review-correct-ans">${correctSelText}</span>
                </div>` : ''}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem; font-style: italic; border-top: 1px dashed rgba(255,255,255,0.03); padding-top: 0.25rem;">
                ${qData.explanation}
            </div>
        `;
        reviewContainer.appendChild(itemDiv);
    });
}

function toggleReviewPanel() {
    synth.playClick();
    const isHidden = reviewContainer.classList.contains('hidden');
    
    if (isHidden) {
        reviewContainer.classList.remove('hidden');
        toggleReviewBtn.querySelector('span').textContent = 'Hide Review';
        toggleReviewBtn.querySelector('i').className = 'fas fa-chevron-up';
        // Scroll review wrapper into view
        reviewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        reviewContainer.classList.add('hidden');
        toggleReviewBtn.querySelector('span').textContent = 'Review Your Answers';
        toggleReviewBtn.querySelector('i').className = 'fas fa-chevron-down';
    }
}

function copyResultCertificate() {
    synth.playClick();
    
    const correctCount = userAnswers.filter(a => a.status === 'correct').length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    const scoreVal = totalScore.toLocaleString();
    
    let certificateText = 
`Æ AETHERIA TRIVIA ASSESSMENT CERTIFICATE Æ
-----------------------------------------
Rank Earned: ${rankTitle.textContent}
Result Score: ${correctCount}/${questions.length} (${percentage}%)
Total Points Accumulation: ${scoreVal}
Average Velocity: ${statSpeed.textContent}

"Intellect is the guide of life."
Play Aetheria and test your mind.
-----------------------------------------`;
    
    navigator.clipboard.writeText(certificateText).then(() => {
        const origText = btnShare.querySelector('span').innerHTML;
        btnShare.querySelector('span').textContent = 'Copied to Clipboard!';
        btnShare.querySelector('i').className = 'fas fa-check';
        
        setTimeout(() => {
            btnShare.querySelector('span').innerHTML = origText;
            btnShare.querySelector('i').className = 'fas fa-share-alt';
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

function resetQuiz() {
    synth.playClick();
    startQuiz();
}

// --- Initialize Page ---
document.addEventListener('DOMContentLoaded', init);
