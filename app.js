// Sections
const sections = {
  home: document.getElementById('home'),
  lectures: document.getElementById('lectures'),
  quiz: document.getElementById('quiz'),
  progress: document.getElementById('progress'),
  result: document.getElementById('result')
};

// Function to show a section
function show(id) {
  Object.values(sections).forEach(s => s.hidden = true);
  sections[id].hidden = false;
}

// Navigation buttons
document.getElementById('nav-home').onclick = () => show('home');
document.getElementById('nav-lectures').onclick = () => show('lectures');
document.getElementById('nav-quiz').onclick = () => show('quiz');
document.getElementById('nav-progress').onclick = () => show('progress');
document.getElementById('goto-lectures').onclick = () => show('lectures');
document.getElementById('goto-quiz').onclick = () => show('quiz');
document.getElementById('goto-progress').onclick = () => show('progress');
document.getElementById('back-from-lectures').onclick = () => show('home');
document.getElementById('back-from-quiz').onclick = () => show('home');
document.getElementById('back-from-progress').onclick = () => show('home');
document.getElementById('back-from-result').onclick = () => show('home');

// Lectures
const lectures = [
  { title: 'HCI Lecture 1 - Introduction', content: 'Basics of HCI principles.' },
  { title: 'HCI Lecture 2 - Design Principles', content: 'Visibility, feedback, consistency, accessibility.' },
  { title: 'HCI Lecture 3 - Usability Testing', content: 'Heuristic evaluation & user testing.' }
];
const lectureList = document.getElementById('lecture-list');
lectures.forEach(l => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${l.title}</strong> <button class="primary">View</button>`;
  lectureList.appendChild(li);
  li.querySelector('button').onclick = () => alert(l.content);
});

// Quiz
const quizQuestions = [
  { q: 'Which principle emphasizes showing system status?', options: ['Consistency', 'Visibility and Feedback', 'Accessibility', 'Aesthetics'], a: 1 },
  { q: 'What reduces cognitive load for users?', options: ['Too many options', 'Clear layout and chunking', 'Hidden feedback', 'Random navigation'], a: 1 },
  { q: 'A usability test primarily checks:', options: ['System performance', 'User experience', 'Database design', 'Server uptime'], a: 1 }
];
const quizContainer = document.getElementById('quiz-container');
quizQuestions.forEach((qq, idx) => {
  const div = document.createElement('div'); 
  div.className = 'quiz-question';
  div.innerHTML = `<strong>Q${idx+1}.</strong> ${qq.q}`;
  qq.options.forEach((opt, oi) => {
    const label = document.createElement('label'); 
    label.className = 'option';
    label.innerHTML = `<input type="radio" name="q${idx}" value="${oi}"/> ${opt}`;
    div.appendChild(label);
  });
  quizContainer.appendChild(div);
});

// Submit quiz and show result section
document.getElementById('submit-quiz').onclick = () => {
  let score = 0; 
  const details = [];
  
  quizQuestions.forEach((qq, idx) => {
    const sel = document.querySelector(`input[name="q${idx}"]:checked`);
    const userAns = sel ? parseInt(sel.value) : -1;
    if(userAns === qq.a) {
      score++;
      details.push(`Q${idx+1}: Correct ✅`);
    } else {
      const correctText = qq.options[qq.a];
      const userText = userAns >= 0 ? qq.options[userAns] : "No answer";
      details.push(`Q${idx+1}: Wrong ❌ (Your answer: ${userText}, Correct: ${correctText})`);
    }
  });

  show('result');

  document.getElementById('result-score').textContent = `Your Score: ${score}/${quizQuestions.length}`;

  const resultList = document.getElementById('result-details');
  resultList.innerHTML = '';
  details.forEach(d => {
    const li = document.createElement('li');
    li.textContent = d;
    if(d.includes('Correct')) li.style.color = 'green';
    else li.style.color = 'red';
    resultList.appendChild(li);
  });
};

// Reset quiz
document.getElementById('reset-quiz').onclick = () => {
  quizQuestions.forEach((qq, idx) => {
    const sel = document.querySelectorAll(`input[name="q${idx}"]`);
    sel.forEach(s => s.checked = false);
  });
};

// Progress
let progress = parseInt(localStorage.getItem('smart_progress') || 0);

function updateProgressUI() {
  document.getElementById('progress-percent').textContent = progress + '%';
  document.getElementById('progress-fill').style.width = progress + '%';
}

updateProgressUI();

document.getElementById('increase-progress').onclick = () => {
  progress = Math.min(progress + 20, 100);
  localStorage.setItem('smart_progress', progress);
  updateProgressUI();
};

document.getElementById('reset-progress').onclick = () => {
  progress = 0;
  localStorage.setItem('smart_progress', progress);
  updateProgressUI();
};
