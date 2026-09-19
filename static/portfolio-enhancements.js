(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.getElementById('primary-menu');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll-spy active nav link ---------- */
  var sections = document.querySelectorAll('main .section, .hero');
  var navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navAnchors.forEach(function (a) {
          a.classList.toggle('active-link', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    document.querySelectorAll('main .section[id]').forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---------- Hero typing effect ---------- */
  var typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    var phrases = [
      'LLM & RAG Systems',
      'Multi-Agent Pipelines',
      'PyTorch & Computer Vision',
      'FastAPI Backends'
    ];
    var phraseIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      var current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(tick, 1400);
        }
      } else {
        charIndex--;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ---------- Hero photo parallax tilt ---------- */
  var heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto && window.matchMedia('(pointer: fine)').matches) {
    var frame = heroPhoto.querySelector('.photo-frame');
    heroPhoto.addEventListener('mousemove', function (e) {
      var rect = heroPhoto.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = 'rotateY(' + (x * 12) + 'deg) rotateX(' + (y * -12) + 'deg)';
    });
    heroPhoto.addEventListener('mouseleave', function () {
      frame.style.transform = '';
    });
  }

  /* ---------- Chat widget ---------- */
  var openChatBtn = document.getElementById('openChat');
  var closeChatBtn = document.getElementById('close-chat');
  var chatWidget = document.getElementById('chatWidget');
  var chatMessages = document.getElementById('chatMessages');
  var chatInput = document.getElementById('chatInput');
  var sendBtn = document.getElementById('sendBtn');

  if (openChatBtn && chatWidget) {
    openChatBtn.addEventListener('click', function () {
      chatWidget.classList.add('is-open');
      chatInput && chatInput.focus();
    });
  }
  if (closeChatBtn && chatWidget) {
    closeChatBtn.addEventListener('click', function () {
      chatWidget.classList.remove('is-open');
    });
  }

  // Lightweight, fully offline keyword-matched responder built from the
  // real content on this page — no external API calls, no invented claims.
  var knowledgeBase = [
    {
      keywords: ['stack', 'tech', 'technologies', 'skill', 'tools'],
      answer: 'His core stack is Python, PyTorch, LangChain, LangGraph and FAISS for AI work, plus FastAPI, Node.js, Express and React for backend/frontend. See the Skills section for the full list.'
    },
    {
      keywords: ['project', 'work', 'built', 'portfolio'],
      answer: 'A few highlights: Recruiter AI (multi-agent resume screening), a Nepali/English RAG assistant for Nepal Rastra Bank, a QLoRA fine-tuned constitutional Q&A assistant, and a PyTorch crop-disease detector. Scroll to Projects for all six.'
    },
    {
      keywords: ['nepali', 'language', 'multilingual'],
      answer: 'Yes — several projects handle Nepali, English and Romanized Nepali, including the NRB financial assistant and a Nepali text-to-speech voice agent.'
    },
    {
      keywords: ['hire', 'freelance', 'available', 'remote', 'contact'],
      answer: 'He is open to remote and freelance AI/ML work. Best route is the Hire Me form on this page, or email amirbhattrai861@gmail.com directly.'
    },
    {
      keywords: ['background', 'education', 'study', 'college', 'degree'],
      answer: 'He is a B.Sc. CSIT student at New Summit College in Kathmandu, working as an AI/ML engineer alongside his studies.'
    },
    {
      keywords: ['certif', 'course', 'bootcamp'],
      answer: 'He holds two verified Udemy certificates: the 100 Days of Code Python Pro Bootcamp and the Complete Web Development Bootcamp, both under Angela Yu. Links are in the Certifications section.'
    }
  ];

  function respond(userText) {
    var text = userText.toLowerCase();
    var match = knowledgeBase.find(function (entry) {
      return entry.keywords.some(function (k) { return text.indexOf(k) !== -1; });
    });
    return match
      ? match.answer
      : 'I can speak to Amir\u2019s stack, projects, Nepali-language work, certifications or availability — try asking about one of those, or use the Hire Me form for anything more specific.';
  }

  function addMessage(text, from) {
    var div = document.createElement('div');
    div.className = 'message ' + from;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleSend() {
    if (!chatInput || !chatInput.value.trim()) return;
    var value = chatInput.value.trim();
    addMessage(value, 'user');
    chatInput.value = '';
    setTimeout(function () {
      addMessage(respond(value), 'bot');
    }, 350);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (chatInput) {
    chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleSend();
    });
  }

  /* ---------- Hire form: mailto fallback ---------- */
  var hireForm = document.getElementById('hireForm');
  var hireStatus = document.getElementById('hireStatus');

  if (hireForm) {
    hireForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('hireName').value.trim();
      var email = document.getElementById('hireEmail').value.trim();
      var message = document.getElementById('hireMessage').value.trim();

      if (!name || !email || !message) {
        hireStatus.textContent = 'Please fill in every field before sending.';
        hireStatus.className = 'hire-status is-error';
        return;
      }

      var subject = encodeURIComponent('Project inquiry from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:amirbhattrai861@gmail.com?subject=' + subject + '&body=' + body;

      hireStatus.textContent = 'Opening your email client to send this to Amir\u2026';
      hireStatus.className = 'hire-status is-success';
      hireForm.reset();
    });
  }
})();