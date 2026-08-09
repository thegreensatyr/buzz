/* Satyr Arcana Quiz — 15 outcomes, one per song, built from the Show Bible */
(function () {
  'use strict';

  // ─── QUESTIONS ──────────────────────────────────────────────────────────────
  // Each answer maps card keys to weighted point values (higher = stronger match)

  var QUESTIONS = [
    {
      q: 'What energy do you carry into a room?',
      options: [
        { text: 'A warm presence — people feel safe to fall apart around me', scores: { AMother: 12, Perspective: 8 } },
        { text: 'Magnetic certainty — people trust me before they know why', scores: { SheKnew: 12, Devil: 8 } },
        { text: 'A mission — I came here with something to carry forward', scores: { Message: 12, RightOn: 8 } },
        { text: 'Quiet solidity — I notice what needs doing and I do it', scores: { Anchor: 12, Reconfiguration: 8 } },
      ],
    },
    {
      q: 'What drives you most?',
      options: [
        { text: 'Keeping the people I love alive — in memory, in music, in story', scores: { DreamTraveler: 15, Message: 8 } },
        { text: 'Finding where I truly belong — and making sure others can get there too', scores: { RightOn: 12, FWB: 8 } },
        { text: 'Turning pain into something that protects the next person who faces it', scores: { Spark: 12, AMother: 10 } },
        { text: 'Understanding the traps — because I\'ve been inside them', scores: { Devil: 12, KarmicJustice: 8 } },
      ],
    },
    {
      q: 'How do you love?',
      options: [
        { text: 'Without armor — I want someone who knows all of me and stays', scores: { SheKnew: 15, FWB: 8 } },
        { text: 'Like a warm room — I hold space and ask nothing in return', scores: { AMother: 12, Perspective: 10 } },
        { text: 'Freely — the deepest love doesn\'t have to come wrapped in possession', scores: { FWB: 15, RightOn: 8 } },
        { text: 'Faithfully — I\'ll stay through the grief, the absences, the hard seasons', scores: { Perspective: 15, Anchor: 8 } },
      ],
    },
    {
      q: 'What is your shadow?',
      options: [
        { text: 'I carry so much for others that I lose track of what I need', scores: { AMother: 10, Message: 10 } },
        { text: 'I\'ve been through enough that I forget others are still in the middle of it', scores: { Spark: 10, Devil: 10 } },
        { text: 'I hold grief quietly — long past when I should have let some of it go', scores: { DreamTraveler: 12, Temperance: 10 } },
        { text: 'I get stuck waiting for the right moment instead of making one', scores: { Fate: 12, Reconfiguration: 8 } },
      ],
    },
    {
      q: 'What is your gift?',
      options: [
        { text: 'I see what needs doing — and I quietly go do it', scores: { Anchor: 15, Perspective: 8 } },
        { text: 'I navigate spaces that were never built for how I think', scores: { Reconfiguration: 15, RightOn: 8 } },
        { text: 'I move between worlds — the visible and the unseen', scores: { DreamTraveler: 12, SantaMuerte: 12 } },
        { text: 'I can name the pattern. I\'ve lived it. I know how it ends.', scores: { Devil: 12, KarmicJustice: 10 } },
      ],
    },
    {
      q: 'What do you believe about cycles?',
      options: [
        { text: 'They can break. The wheel can stop. You just have to know that it can.', scores: { Fate: 15, Spark: 8 } },
        { text: 'What you put out returns — every act of love, every act of cruelty', scores: { KarmicJustice: 15, Anchor: 8 } },
        { text: 'Some cycles need healing backward through time, for people who never got to heal themselves', scores: { Temperance: 15, AMother: 8 } },
        { text: 'Every ending makes room. Transformation isn\'t death — it\'s the door.', scores: { SantaMuerte: 15, DreamTraveler: 8 } },
      ],
    },
    {
      q: 'What is your relationship with those who are gone?',
      options: [
        { text: 'I visit them in dreams. We\'re still in conversation.', scores: { DreamTraveler: 15, SantaMuerte: 8 } },
        { text: 'I honor them by carrying their stories further than they could carry them alone', scores: { Message: 12, Temperance: 10 } },
        { text: 'I move through the world with one foot here and one foot somewhere else entirely', scores: { SantaMuerte: 12, DreamTraveler: 8 } },
        { text: 'I make sure they aren\'t forgotten — even if I\'m the last one who remembers', scores: { Temperance: 15, SheKnew: 8 } },
      ],
    },
    {
      q: 'When someone is suffering, you...',
      options: [
        { text: 'Stay. Without explanation, without a timeline.', scores: { Perspective: 15, Anchor: 10 } },
        { text: 'Find every resource and every open door you know of', scores: { Spark: 12, AMother: 10 } },
        { text: 'Sit in silence — sometimes witness is the only medicine', scores: { SheKnew: 12, Temperance: 10 } },
        { text: 'Name what\'s happening and remind them the cycle can break', scores: { Fate: 12, KarmicJustice: 10 } },
      ],
    },
    {
      q: 'What moment changed you?',
      options: [
        { text: 'When I found the room where I belonged — and someone held the door', scores: { RightOn: 15, FWB: 8 } },
        { text: 'When someone stayed longer than anyone had a right to expect', scores: { Perspective: 12, SheKnew: 10 } },
        { text: 'When I realized my story could protect someone still living inside theirs', scores: { Spark: 12, Devil: 10 } },
        { text: 'When grief became something I could carry into a room full of strangers', scores: { DreamTraveler: 12, Message: 12 } },
      ],
    },
    {
      q: 'What are you building?',
      options: [
        { text: 'A myth — something that outlasts me and carries the people I love inside it', scores: { DreamTraveler: 12, Message: 12 } },
        { text: 'A space — where the people who were always left out finally belong', scores: { RightOn: 12, AMother: 10 } },
        { text: 'A witness record — because I am the last person who remembers certain things', scores: { Temperance: 15, SheKnew: 8 } },
        { text: 'An understanding of how the game works — so I can teach others to escape it', scores: { Devil: 12, KarmicJustice: 10 } },
      ],
    },
    {
      q: 'Which symbol calls to you most?',
      options: [
        { text: 'The bridge — connecting the world you can see to the one you can\'t', scores: { SantaMuerte: 12, DreamTraveler: 10 } },
        { text: 'The anchor — steady, immovable, holding everything together below the surface', scores: { Anchor: 15, Perspective: 8 } },
        { text: 'The lantern — carried alone through the dark to light a path you had to find yourself', scores: { Reconfiguration: 12, Temperance: 8 } },
        { text: 'The thread — the invisible line that runs between people who chose each other', scores: { SheKnew: 10, FWB: 12 } },
      ],
    },
    {
      q: 'What is your calling?',
      options: [
        { text: 'To be the one who knows — and loves completely anyway', scores: { SheKnew: 12, AMother: 8 } },
        { text: 'To be the one who carries — the stories, the music, the people', scores: { Message: 12, DreamTraveler: 10 } },
        { text: 'To be the one who stays — through the darkness, the grief, the impossible', scores: { Perspective: 12, Anchor: 8 } },
        { text: 'To be the one who survived the trap — and teaches others how to leave', scores: { Devil: 12, Spark: 10 } },
      ],
    },
  ];

  // ─── OUTCOMES (15 — one per song, in album order) ───────────────────────────

  var OUTCOMES = [
    {
      key: 'DreamTraveler',
      slug: 'dream-traveler',
      number: 'I',
      name: 'The Dream Traveler',
      tagline: 'You walk between worlds.',
      meaning: 'A medium between the living and the remembered. You carry the people you love into every room you enter — they travel with you wherever you go.',
      shadow: 'Living more in memory than in the present',
      gift: 'Keeping love alive across every threshold',
      mood: 'Astral, slick, rhythmic — a spell cast on the dancefloor',
      color: '#D4AF37',
      art: 'assets/card-dream-traveler.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-dream-traveler',
    },
    {
      key: 'SheKnew',
      slug: 'she-knew',
      number: 'II',
      name: 'She Knew',
      tagline: 'You already know.',
      meaning: 'You hold people\'s darkest corners with grace. The most private, shameful, tender parts of those you love are safe with you — and you love them deeper for knowing.',
      shadow: 'Carrying everyone else\'s truth until it gets heavy',
      gift: 'Unconditional, all-knowing love',
      mood: 'Hypnotic, moonlit, minimal',
      color: '#9B59B6',
      art: 'assets/card-she-knew.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/she-knew',
    },
    {
      key: 'AMother',
      slug: 'a-mother-to-them',
      number: 'III',
      name: 'A Mother to Them',
      tagline: 'Your love is unconditional.',
      meaning: 'You are the warm room. You sit with people the world has decided don\'t deserve it — and you remind them that they do. Your love is not rationed. It is not earned.',
      shadow: 'Giving until there is nothing left for yourself',
      gift: 'Radical, non-judgmental presence',
      mood: 'Soulful, warm, unhurried',
      color: '#27AE60',
      art: 'assets/card-mother.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/mother-to-them',
    },
    {
      key: 'Anchor',
      slug: 'the-anchor',
      number: 'IV',
      name: 'The Anchor in the Room',
      tagline: 'Steady. True. Unshakeable.',
      meaning: 'You are the quiet force that holds everything together. You observe what others miss. You act without fanfare, without credit, without lying — not once, not about anything.',
      shadow: 'Stubbornness when the situation has already changed',
      gift: 'Immovable integrity',
      mood: 'Heavy, percussive, deeply grounded',
      color: '#8B7355',
      art: 'assets/card-anchor.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-anchor-in-the-room',
    },
    {
      key: 'RightOn',
      slug: 'right-on',
      number: 'V',
      name: 'Right On',
      tagline: 'You open doors others didn\'t know were theirs.',
      meaning: 'You initiate. You introduce. You are the person who made someone else possible — and that lineage of becoming runs through everything you touch.',
      shadow: 'Confusing the door for the destination',
      gift: 'Making belonging possible for others',
      mood: 'Ritualistic, slow-building, communal',
      color: '#F39C12',
      art: 'assets/card-right-on.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/right-on',
    },
    {
      key: 'FWB',
      slug: 'fwb',
      number: 'VI',
      name: 'F.W.B.',
      tagline: 'Chosen intimacy without chains.',
      meaning: 'The most profound intimacy in your life doesn\'t always come wrapped in romance. You know how to be fully close — without performance, without possession, without armor.',
      shadow: 'Avoiding the depth you\'re actually capable of',
      gift: 'Intimacy without possession',
      mood: 'Warm, sensual, free',
      color: '#E91E8C',
      art: 'assets/card-fwb.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/f-w-b',
    },
    {
      key: 'Message',
      slug: 'the-message',
      number: 'VII',
      name: 'The Message',
      tagline: 'You carry it forward.',
      meaning: 'Your vehicle is whatever you do best — music, words, presence, action. Stories travel through you into places grief alone could never reach. The mission lives in you.',
      shadow: 'Losing yourself inside the mission',
      gift: 'Carrying stories further than one person could go alone',
      mood: 'Kinetic, forward-moving, adrenaline-charged',
      color: '#00C8FF',
      art: 'assets/card-message.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-message',
    },
    {
      key: 'Spark',
      slug: 'the-spark',
      number: 'VIII',
      name: 'The Spark',
      tagline: 'Gentle but unbreakable.',
      meaning: 'You have faced the hardest things — and came out knowing the way through. Your courage is quiet, and you use it to make the path a little easier for the next person who walks it.',
      shadow: 'Carrying survival as an identity when the crisis has passed',
      gift: 'Turning personal pain into collective protection',
      mood: 'Warm, steady, purposeful',
      color: '#FF6B35',
      art: 'assets/card-spark.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-spark',
    },
    {
      key: 'Reconfiguration',
      slug: 'reconfiguration',
      number: 'IX',
      name: 'Reconfiguration',
      tagline: 'You carry your own light.',
      meaning: 'You navigate a world that wasn\'t built for the way you process it — and the wisdom you\'ve earned from figuring it out from scratch is something most people never develop.',
      shadow: 'Isolation when connection is actually possible',
      gift: 'Hard-won illumination',
      mood: 'Minimal, echoing, introspective',
      color: '#95A5A6',
      art: 'assets/card-reconfiguration.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/reconfiguration',
    },
    {
      key: 'Fate',
      slug: 'fate',
      number: 'X',
      name: 'Fate',
      tagline: 'The cycle can break.',
      meaning: 'You were made for people trapped in cycles they can\'t yet see the exit from — and you know from the inside that the wheel doesn\'t have to keep turning. It can stop.',
      shadow: 'Waiting for permission that was never coming',
      gift: 'Seeing exit doors others can\'t find yet',
      mood: 'Pulsing, circular, building toward release',
      color: '#8E44AD',
      art: 'assets/card-fate.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/fate',
    },
    {
      key: 'KarmicJustice',
      slug: 'karmic-justice',
      number: 'XI',
      name: 'Karmic Justice',
      tagline: 'What you put out returns.',
      meaning: 'You know the wheel doesn\'t forget — every act of love, every act of cruelty finds its way back. You live accordingly: with care, with precision, with trust in the long arc.',
      shadow: 'Becoming the judge when you meant to be the witness',
      gift: 'Living in deep alignment with consequence',
      mood: 'Sharp, clean, symmetrical',
      color: '#F1C40F',
      art: 'assets/card-karma.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/karmic-justice',
    },
    {
      key: 'Perspective',
      slug: 'perspective',
      number: 'XII',
      name: 'Perspective',
      tagline: 'You surrender to see clearly.',
      meaning: 'You turned your world upside down — willingly, for love — and found that the view from there was the only one that made sense. You stay when staying is the most impossible thing.',
      shadow: 'Confusing surrender with defeat',
      gift: 'Faithfulness through grief and the impossible',
      mood: 'Suspended, atmospheric, aching',
      color: '#1ABC9C',
      art: 'assets/card-perspective.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/perspective',
    },
    {
      key: 'SantaMuerte',
      slug: 'santa-muerte',
      number: 'XIII',
      name: 'Santa Muerte',
      tagline: 'You walk the threshold.',
      meaning: 'You move through the world with one foot in the visible and one foot somewhere else entirely. Transformation doesn\'t frighten you. Every ending makes room for what comes next.',
      shadow: 'Getting lost between the worlds',
      gift: 'Serenity at every threshold',
      mood: 'Dark, pulsing, liminal',
      color: '#BDC3C7',
      art: 'assets/card-santa-muerte.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/santa-muerte',
    },
    {
      key: 'Temperance',
      slug: 'temperance',
      number: 'XIV',
      name: 'Temperance',
      tagline: 'The last witness remembers.',
      meaning: 'You are an ancestral healer. You carry people who were silenced — who could only whisper when they weren\'t allowed to speak — and you give them the balance and power they never had in life.',
      shadow: 'The weight of being the last one who knows',
      gift: 'Healing backward through time',
      mood: 'Quiet, reverent, ancestral',
      color: '#5D8AA8',
      art: 'assets/card-temperance.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/temperance',
    },
    {
      key: 'Devil',
      slug: 'the-devil',
      number: 'XV',
      name: 'The Devil',
      tagline: 'You survived the trick.',
      meaning: 'You are not the villain of this deck. You\'re the one who survived the villain\'s best tricks and came out knowing the playbook — and now you use that knowledge to help others get free.',
      shadow: 'Using the playbook for power instead of liberation',
      gift: 'Seeing through every illusion',
      mood: 'Seductive, knowing, sharp-edged',
      color: '#C0392B',
      art: 'assets/card-de-ville.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-devil',
    },
  ];

  // ─── SCORING ─────────────────────────────────────────────────────────────────

  function computeResult(answers) {
    var totals = {};
    OUTCOMES.forEach(function (o) { totals[o.key] = 0; });
    answers.forEach(function (ans) {
      if (!ans) return;
      Object.keys(ans.scores).forEach(function (k) {
        totals[k] = (totals[k] || 0) + ans.scores[k];
      });
    });
    var winner = OUTCOMES[0];
    var highest = -1;
    OUTCOMES.forEach(function (o) {
      if (totals[o.key] > highest) {
        highest = totals[o.key];
        winner = o;
      }
    });
    return winner;
  }

  // ─── STATE ────────────────────────────────────────────────────────────────────

  var qIndex   = 0;
  var answers  = new Array(QUESTIONS.length).fill(null);
  var selected = null;
  var result   = null;

  // ─── ELEMENTS ─────────────────────────────────────────────────────────────────

  function $(id) { return document.getElementById(id); }

  var elIntro       = $('qz-intro');
  var elQuiz        = $('qz-quiz');
  var elEmail       = $('qz-email');
  var elResult      = $('qz-result');
  var elCount       = $('qz-count');
  var elPct         = $('qz-pct');
  var elBar         = $('qz-bar');
  var elCardNum     = $('qz-card-num');
  var elQuestion    = $('qz-question');
  var elOptions     = $('qz-options');
  var elBack        = $('qz-back');
  var elNext        = $('qz-next');
  var elForm        = $('qz-form');
  var elResultField = $('qz-result-field');
  var elSkip        = $('qz-skip');
  var elRetake      = $('qz-retake');
  var elReveal      = $('qz-reveal');
  var elEmailInput  = $('qz-email-input');
  var elShCopy      = $('sh-copy');
  var elShX         = $('sh-x');
  var elShFb        = $('sh-fb');

  // ─── SHOW / HIDE ─────────────────────────────────────────────────────────────

  function show(el) { if (el) el.classList.remove('hidden'); }
  function hide(el) { if (el) el.classList.add('hidden'); }

  function showStep(step) {
    hide(elIntro);
    hide(elQuiz);
    hide(elEmail);
    hide(elResult);
    if (step === 'intro')  show(elIntro);
    if (step === 'quiz')   show(elQuiz);
    if (step === 'email')  show(elEmail);
    if (step === 'result') show(elResult);
  }

  // ─── RENDER QUESTION ─────────────────────────────────────────────────────────

  function renderQuestion() {
    var q   = QUESTIONS[qIndex];
    var pct = Math.round((qIndex / QUESTIONS.length) * 100);

    if (elCount)    elCount.textContent    = 'Question ' + (qIndex + 1) + ' of ' + QUESTIONS.length;
    if (elPct)      elPct.textContent      = pct + '% complete';
    if (elBar)      elBar.style.width      = pct + '%';
    if (elCardNum)  elCardNum.textContent  = 'Q' + (qIndex + 1);
    if (elQuestion) elQuestion.textContent = q.q;

    if (!elOptions) return;
    elOptions.innerHTML = '';
    var letters = ['A', 'B', 'C', 'D'];
    q.options.forEach(function (opt, i) {
      var isChosen = selected && selected.text === opt.text;
      var btn = document.createElement('button');
      btn.className = 'q-option' + (isChosen ? ' chosen' : '');
      btn.innerHTML =
        '<span class="letter">' + letters[i] + '</span>' +
        '<span class="q-text">' + opt.text + '</span>';
      btn.addEventListener('click', function () {
        selected = opt;
        if (elNext) { elNext.disabled = false; elNext.style.opacity = '1'; }
        renderQuestion();
      });
      elOptions.appendChild(btn);
    });

    if (elNext) {
      elNext.disabled     = !selected;
      elNext.style.opacity = selected ? '1' : '.35';
    }
  }

  // ─── RENDER RESULT ───────────────────────────────────────────────────────────

  function renderResult(r) {
    if ($('rc-num'))     $('rc-num').textContent     = r.number;
    if ($('rc-name'))    $('rc-name').textContent    = r.name;
    if ($('rc-tag'))     $('rc-tag').textContent     = '“' + r.tagline + '”';
    if ($('rc-meaning')) $('rc-meaning').textContent = r.meaning;
    if ($('rc-shadow'))  $('rc-shadow').textContent  = r.shadow;
    if ($('rc-gift'))    $('rc-gift').textContent    = r.gift;
    if ($('rc-mood'))    $('rc-mood').textContent    = 'Track mood: ' + r.mood;

    var rcArt = $('rc-art');
    if (rcArt) {
      rcArt.src = r.art;
      rcArt.alt = r.name + ' — Satyr Arcana ' + r.number;
      rcArt.classList.remove('hidden');
    }

    var listen = $('rc-listen');
    if (listen) {
      listen.href             = r.bandcampUrl;
      listen.style.background = r.color;
      listen.style.borderColor = r.color;
      listen.style.boxShadow  = '0 0 24px ' + r.color + '40';
    }

    var rc = $('rc');
    if (rc) {
      rc.style.borderColor = r.color + '50';
      rc.style.boxShadow   = '0 0 80px ' + r.color + '12';
      rc.style.background  = 'linear-gradient(135deg, ' + r.color + '08 0%, rgba(5,10,5,0.97) 60%)';
    }

    if ($('rc-num'))  $('rc-num').style.color  = r.color;
    if ($('rc-name')) $('rc-name').style.color = r.color;

    // upsell
    var upsellName = $('rc-upsell-name');
    if (upsellName) upsellName.textContent = r.name;

    // merch
    var mi = $('rc-merch-img');
    var mt = $('rc-merch-text');
    if (mi) mi.src = r.art;
    if (mt) mt.textContent = r.number + ' — ' + r.name + ' print available now.';

    // deck grid
    var deck = $('rc-deck');
    if (deck) {
      deck.innerHTML = '';
      OUTCOMES.forEach(function (o) {
        var d = document.createElement('div');
        d.className        = 'deck-item';
        d.style.border     = '1px solid ' + (o.key === r.key ? o.color + '60' : o.color + '15');
        d.style.background = o.key === r.key ? o.color + '10' : o.color + '04';
        d.innerHTML =
          '<p class="mono" style="font-size:.65rem;color:' + o.color +
          ';opacity:' + (o.key === r.key ? '1' : '.5') + ';margin-bottom:.2rem">' + o.number + '</p>' +
          '<p style="font-size:.7rem;color:' + (o.key === r.key ? '#e8e8e8' : 'rgba(232,232,232,.4)') +
          ';line-height:1.3">' + o.name + '</p>';
        deck.appendChild(d);
      });
    }

    // share
    var shareUrl  = 'https://greensatyr.buzz/satyr-arcana/card/' + r.slug + '/';
    var shareText = 'I took the Satyr Arcana ritual — my card is ' + r.number + ' — ' + r.name + '. “' + r.tagline + '” Find yours at GreenSatyr.Buzz';
    if (elShCopy) {
      elShCopy.onclick = function () {
        navigator.clipboard.writeText(shareText + ' ' + shareUrl).then(function () {
          elShCopy.textContent = 'Copied!';
          setTimeout(function () { elShCopy.textContent = 'Copy to Share'; }, 2000);
        });
      };
    }
    if (elShX)  elShX.href  = 'https://x.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(shareUrl);
    if (elShFb) elShFb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl);
  }

  // ─── RESET ───────────────────────────────────────────────────────────────────

  function reset() {
    qIndex   = 0;
    answers  = new Array(QUESTIONS.length).fill(null);
    selected = null;
    result   = null;
    showStep('intro');
  }

  // ─── WIRE UP EVENTS ──────────────────────────────────────────────────────────

  var startBtn = $('qz-start');
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      showStep('quiz');
      renderQuestion();
    });
  }

  if (elNext) {
    elNext.addEventListener('click', function () {
      if (!selected) return;
      answers[qIndex] = selected;
      selected = null;

      if (qIndex < QUESTIONS.length - 1) {
        qIndex++;
        renderQuestion();
      } else {
        if (elResultField) elResultField.value = computeResult(answers).key;
        showStep('email');
      }
    });
  }

  if (elBack) {
    elBack.addEventListener('click', function () {
      if (qIndex === 0) {
        showStep('intro');
        return;
      }
      qIndex--;
      selected = answers[qIndex];
      renderQuestion();
    });
  }

  function revealCard() {
    result = computeResult(answers);
    if (elResultField) elResultField.value = result.key;
    try {
      var data = new FormData(elForm);
      fetch('/', { method: 'POST', body: data });
    } catch (err) { /* non-critical */ }
    renderResult(result);
    showStep('result');
  }

  // Primary path: a plain button (not type=submit) can never trigger a native
  // form submission, so there is nothing for JS to race against. This is what
  // fixes the "no card" bug — previously a native submit could sometimes beat
  // the JS handler (slow connection, in-app browsers) and reload the page,
  // wiping all quiz state before the card ever rendered.
  if (elReveal) {
    elReveal.addEventListener('click', function (e) {
      e.preventDefault();
      if (elEmailInput && !elEmailInput.checkValidity()) {
        elEmailInput.reportValidity();
        return;
      }
      revealCard();
    });
  }

  // Fallback path: pressing Enter in the email field still fires a native
  // 'submit' event even though the button itself is no longer type=submit.
  // Intercept it the same way so Enter-to-reveal still works.
  if (elForm) {
    elForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (elEmailInput && !elEmailInput.checkValidity()) {
        elEmailInput.reportValidity();
        return;
      }
      revealCard();
    });
  }

  if (elSkip) {
    elSkip.addEventListener('click', function () {
      result = computeResult(answers);
      renderResult(result);
      showStep('result');
    });
  }

  if (elRetake) {
    elRetake.addEventListener('click', reset);
  }

})();
