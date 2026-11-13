/* Satyr Arcana Quiz — 30 outcomes, one per song, across both released decks.
   Part I (15 cards, Beltane 2026) + Part II (15 cards, Samhain 2026).
   Every question is a forced this-or-that choice; each option scores exactly
   one Part I card and one Part II card together, so every answer moves both
   decks at once and every one of the 30 cards is reachable. */
(function () {
  'use strict';

  // ─── QUESTIONS (15 — binary, built from the real lyrics & show bible) ──────

  var QUESTIONS = [
    {
      q: 'When grief or hard change shows up, what actually happens in you?',
      options: [
        { text: 'I go somewhere else for a while — I visit the people I\'ve lost and let the world rebuild itself without me.', scores: { DreamTraveler: 14, Tower: 14 } },
        { text: 'I turn what I survived into proof, for someone else, that it gets better.', scores: { Spark: 14, Star: 14 } },
      ],
    },
    {
      q: 'What\'s the quality people trust you with first?',
      options: [
        { text: 'I\'m the one who already knew, who already saw it coming — and loved you anyway.', scores: { SheKnew: 14, Star2: 14 } },
        { text: 'I read the room before I say a word. I figure my own way through — I always have.', scores: { Reconfiguration: 14, WiseWoman: 14 } },
      ],
    },
    {
      q: 'How do you actually protect the people you love?',
      options: [
        { text: 'I hold space without judgment, and I notice what\'s really going on before anyone says a word.', scores: { AMother: 14, WiseWoman2: 14 } },
        { text: 'I say the thing out loud that everyone else is too scared to say.', scores: { Fate: 14, Champion: 14 } },
      ],
    },
    {
      q: 'When something is wrong in the room, what do you do?',
      options: [
        { text: 'I stand my ground and say what needs saying — quietly, but completely.', scores: { Anchor: 14, Champion2: 14 } },
        { text: 'I trust it comes back around eventually, and I ache for anyone still lost, looking for their way home.', scores: { KarmicJustice: 14, LaLuna: 14 } },
      ],
    },
    {
      q: 'What does “home” actually feel like to you?',
      options: [
        { text: 'A door that opens right when I need it — even if I had to wander in the dark a while to find it.', scores: { RightOn: 14, LaLuna2: 14 } },
        { text: 'Someone who stays no matter how many times the world falls apart — and still greets me smiling.', scores: { Perspective: 14, Sun: 14 } },
      ],
    },
    {
      q: 'What\'s your idea of real intimacy?',
      options: [
        { text: 'Warmth without the performance. Real closeness, no armor, easy laughter.', scores: { FWB: 14, Sun2: 14 } },
        { text: 'Trust built slow, hand by hand, that doesn\'t flinch even while everything is changing.', scores: { SantaMuerte: 14, Builder: 14 } },
      ],
    },
    {
      q: 'What are you actually here to do?',
      options: [
        { text: 'Carry something forward with my own two hands — a story, a sound, a cause built to outlast me.', scores: { Message: 14, Builder2: 14 } },
        { text: 'Remember the ones who got overlooked, and raise whoever needs raising — blood or not.', scores: { Temperance: 14, MothersOfCreation: 14 } },
      ],
    },
    {
      q: 'Your hardest season taught you —',
      options: [
        { text: '— how to turn my own worst chapter into protection for someone still living inside theirs.', scores: { Spark2: 14, MothersOfCreation2: 14 } },
        { text: '— to spot the trap before it closes, because I\'ve already lived through it once.', scores: { Devil: 14, Experience: 14 } },
      ],
    },
    {
      q: 'How do you move through a world that wasn\'t built for you?',
      options: [
        { text: 'I figure it out from scratch, and I keep my footing — mile after mile.', scores: { Reconfiguration2: 14, Experience2: 14 } },
        { text: 'I keep walking anyway, even into the night, even half-sure the story isn\'t over.', scores: { DreamTraveler2: 14, Fool: 14 } },
      ],
    },
    {
      q: 'What do you believe about second chances?',
      options: [
        { text: 'The cycle isn\'t permanent. Even after the worst night, you can still get up and walk.', scores: { Fate2: 14, Fool2: 14 } },
        { text: 'Some bonds don\'t need explaining. You just know who actually shows up at 2am.', scores: { SheKnew2: 14, KingOfPentacles: 14 } },
      ],
    },
    {
      q: 'What matters more, in the end — fairness or loyalty?',
      options: [
        { text: 'Fairness. What goes around comes around, and that includes who actually stayed loyal.', scores: { KarmicJustice2: 14, KingOfPentacles2: 14 } },
        { text: 'Loyalty with a backbone. I\'ll love you, and I\'ll still hold the line.', scores: { AMother2: 14, KingOfSwords: 14 } },
      ],
    },
    {
      q: 'What kind of strength do you respect most?',
      options: [
        { text: 'The strength to stay through the impossible without ever having to raise your voice.', scores: { Perspective2: 14, KingOfSwords2: 14 } },
        { text: 'The strength to keep choosing someone, over and over, long after the easy part is over.', scores: { Anchor2: 14, KnightOfCups: 14 } },
      ],
    },
    {
      q: 'How do you feel about endings?',
      options: [
        { text: 'Every ending is a threshold, not a closure. I\'d rather try to rekindle it than walk away.', scores: { SantaMuerte2: 14, KnightOfCups2: 14 } },
        { text: 'I found the place I belonged, and the people who stayed taught me what “staying” even means.', scores: { RightOn2: 14, KingOfCups: 14 } },
      ],
    },
    {
      q: 'What do you want people to actually remember about you?',
      options: [
        { text: 'That I gave the overlooked ones their dignity back — and that I simply never left.', scores: { Temperance2: 14, KingOfCups2: 14 } },
        { text: 'That I brought the music. That I turned up the joy in every room, and loved without needing to own anyone.', scores: { FWB2: 14, KingOfWands: 14 } },
      ],
    },
    {
      q: 'What\'s your relationship to chaos?',
      options: [
        { text: 'I\'ve survived the trap. Now I know the whole playbook — and I still keep the party alive.', scores: { Devil2: 14, KingOfWands2: 14 } },
        { text: 'I carry the signal through the noise. When the whole tower comes down, I\'m still transmitting.', scores: { Message2: 14, Tower2: 14 } },
      ],
    },
  ];

  // ─── OUTCOMES — PART I (15, album order, unchanged from the Show Bible) ────

  var OUTCOMES_1 = [
    {
      key: 'DreamTraveler', slug: 'dream-traveler', part: 1, number: 'I', name: 'The Dream Traveler',
      tagline: 'You walk between worlds.',
      meaning: 'A medium between the living and the remembered. You carry the people you love into every room you enter — they travel with you wherever you go.',
      shadow: 'Living more in memory than in the present', gift: 'Keeping love alive across every threshold',
      mood: 'Astral, slick, rhythmic — a spell cast on the dancefloor', color: '#D4AF37',
      art: '/satyr-arcana/assets/card-dream-traveler.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-dream-traveler',
    },
    {
      key: 'SheKnew', slug: 'she-knew', part: 1, number: 'II', name: 'She Knew',
      tagline: 'You already know.',
      meaning: 'You hold people\'s darkest corners with grace. The most private, shameful, tender parts of those you love are safe with you — and you love them deeper for knowing.',
      shadow: 'Carrying everyone else\'s truth until it gets heavy', gift: 'Unconditional, all-knowing love',
      mood: 'Hypnotic, moonlit, minimal', color: '#9B59B6',
      art: '/satyr-arcana/assets/card-she-knew.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/she-knew',
    },
    {
      key: 'AMother', slug: 'a-mother-to-them', part: 1, number: 'III', name: 'Mother to Them',
      tagline: 'Your love is unconditional.',
      meaning: 'You are the warm room. You sit with people the world has decided don\'t deserve it — and you remind them that they do. Your love is not rationed. It is not earned.',
      shadow: 'Giving until there is nothing left for yourself', gift: 'Radical, non-judgmental presence',
      mood: 'Soulful, warm, unhurried', color: '#27AE60',
      art: '/satyr-arcana/assets/card-mother.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/mother-to-them',
    },
    {
      key: 'Anchor', slug: 'the-anchor', part: 1, number: 'IV', name: 'The Anchor in the Room',
      tagline: 'Steady. True. Unshakeable.',
      meaning: 'You are the quiet force that holds everything together. You observe what others miss. You act without fanfare, without credit, without lying — not once, not about anything.',
      shadow: 'Stubbornness when the situation has already changed', gift: 'Immovable integrity',
      mood: 'Heavy, percussive, deeply grounded', color: '#8B7355',
      art: '/satyr-arcana/assets/card-anchor.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-anchor-in-the-room',
    },
    {
      key: 'RightOn', slug: 'right-on', part: 1, number: 'V', name: 'RIGHT ON',
      tagline: 'You open doors others didn\'t know were theirs.',
      meaning: 'You initiate. You introduce. You are the person who made someone else possible — and that lineage of becoming runs through everything you touch.',
      shadow: 'Confusing the door for the destination', gift: 'Making belonging possible for others',
      mood: 'Ritualistic, slow-building, communal', color: '#F39C12',
      art: '/satyr-arcana/assets/card-right-on.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/right-on',
    },
    {
      key: 'FWB', slug: 'fwb', part: 1, number: 'VI', name: 'F.W.B.',
      tagline: 'Chosen intimacy without chains.',
      meaning: 'The most profound intimacy in your life doesn\'t always come wrapped in romance. You know how to be fully close — without performance, without possession, without armor.',
      shadow: 'Avoiding the depth you\'re actually capable of', gift: 'Intimacy without possession',
      mood: 'Warm, sensual, free', color: '#E91E8C',
      art: '/satyr-arcana/assets/card-fwb.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/f-w-b',
    },
    {
      key: 'Message', slug: 'the-message', part: 1, number: 'VII', name: 'The Message',
      tagline: 'You carry it forward.',
      meaning: 'Your vehicle is whatever you do best — music, words, presence, action. Stories travel through you into places grief alone could never reach. The mission lives in you.',
      shadow: 'Losing yourself inside the mission', gift: 'Carrying stories further than one person could go alone',
      mood: 'Kinetic, forward-moving, adrenaline-charged', color: '#00C8FF',
      art: '/satyr-arcana/assets/card-message.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-message',
    },
    {
      key: 'Spark', slug: 'the-spark', part: 1, number: 'VIII', name: 'The Spark',
      tagline: 'Gentle but unbreakable.',
      meaning: 'You have faced the hardest things — and came out knowing the way through. Your courage is quiet, and you use it to make the path a little easier for the next person who walks it.',
      shadow: 'Carrying survival as an identity when the crisis has passed', gift: 'Turning personal pain into collective protection',
      mood: 'Warm, steady, purposeful', color: '#FF6B35',
      art: '/satyr-arcana/assets/card-spark.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-spark',
    },
    {
      key: 'Reconfiguration', slug: 'reconfiguration', part: 1, number: 'IX', name: 'Reconfiguration',
      tagline: 'You carry your own light.',
      meaning: 'You navigate a world that wasn\'t built for the way you process it — and the wisdom you\'ve earned from figuring it out from scratch is something most people never develop.',
      shadow: 'Isolation when connection is actually possible', gift: 'Hard-won illumination',
      mood: 'Minimal, echoing, introspective', color: '#95A5A6',
      art: '/satyr-arcana/assets/card-reconfiguration.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/reconfiguration',
    },
    {
      key: 'Fate', slug: 'fate', part: 1, number: 'X', name: 'Fate',
      tagline: 'The cycle can break.',
      meaning: 'You were made for people trapped in cycles they can\'t yet see the exit from — and you know from the inside that the wheel doesn\'t have to keep turning. It can stop.',
      shadow: 'Waiting for permission that was never coming', gift: 'Seeing exit doors others can\'t find yet',
      mood: 'Pulsing, circular, building toward release', color: '#8E44AD',
      art: '/satyr-arcana/assets/card-fate.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/fate',
    },
    {
      key: 'KarmicJustice', slug: 'karmic-justice', part: 1, number: 'XI', name: 'Karmic Justice',
      tagline: 'What you put out returns.',
      meaning: 'You know the wheel doesn\'t forget — every act of love, every act of cruelty finds its way back. You live accordingly: with care, with precision, with trust in the long arc.',
      shadow: 'Becoming the judge when you meant to be the witness', gift: 'Living in deep alignment with consequence',
      mood: 'Sharp, clean, symmetrical', color: '#F1C40F',
      art: '/satyr-arcana/assets/card-karma.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/karmic-justice',
    },
    {
      key: 'Perspective', slug: 'perspective', part: 1, number: 'XII', name: 'Perspective',
      tagline: 'You surrender to see clearly.',
      meaning: 'You turned your world upside down — willingly, for love — and found that the view from there was the only one that made sense. You stay when staying is the most impossible thing.',
      shadow: 'Confusing surrender with defeat', gift: 'Faithfulness through grief and the impossible',
      mood: 'Suspended, atmospheric, aching', color: '#1ABC9C',
      art: '/satyr-arcana/assets/card-perspective.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/perspective',
    },
    {
      key: 'SantaMuerte', slug: 'santa-muerte', part: 1, number: 'XIII', name: 'Santa Muerte',
      tagline: 'You walk the threshold.',
      meaning: 'You move through the world with one foot in the visible and one foot somewhere else entirely. Transformation doesn\'t frighten you. Every ending makes room for what comes next.',
      shadow: 'Getting lost between the worlds', gift: 'Serenity at every threshold',
      mood: 'Dark, pulsing, liminal', color: '#BDC3C7',
      art: '/satyr-arcana/assets/card-santa-muerte.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/santa-muerte',
    },
    {
      key: 'Temperance', slug: 'temperance', part: 1, number: 'XIV', name: 'Temperance',
      tagline: 'The last witness remembers.',
      meaning: 'You are an ancestral healer. You carry people who were silenced — who could only whisper when they weren\'t allowed to speak — and you give them the balance and power they never had in life.',
      shadow: 'The weight of being the last one who knows', gift: 'Healing backward through time',
      mood: 'Quiet, reverent, ancestral', color: '#5D8AA8',
      art: '/satyr-arcana/assets/card-temperance.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/temperance',
    },
    {
      key: 'Devil', slug: 'the-devil', part: 1, number: 'XV', name: 'The Devil',
      tagline: 'You survived the trick.',
      meaning: 'You are not the villain of this deck. You\'re the one who survived the villain\'s best tricks and came out knowing the playbook — and now you use that knowledge to help others get free.',
      shadow: 'Using the playbook for power instead of liberation', gift: 'Seeing through every illusion',
      mood: 'Seductive, knowing, sharp-edged', color: '#C0392B',
      art: '/satyr-arcana/assets/card-de-ville.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-devil',
    },
  ];

  // ─── OUTCOMES — PART II (15, album order, released Samhain Oct 31 2026) ────
  // Meanings drawn only from the released lyrics and Dustin's own one-line
  // captions for this rollout — no invented backstory. Three cards (La Luna,
  // King of Wands) keep their subjects private by design; Fate (Part I) stays
  // anonymous the same way.

  var OUTCOMES_2 = [
    {
      key: 'Tower', slug: 'tower', part: 2, number: null, name: 'Tower',
      tagline: 'What rises after the fall.',
      meaning: 'Everything you built can fall, and you\'re the one left standing in what\'s left of it, past the point where words explain anything — so you let the sound do it instead. The Tower doesn\'t warn you before it comes down. It just leaves you deciding what gets rebuilt.',
      shadow: 'Mistaking the collapse for the whole story', gift: 'Clearing the ground for what actually matters',
      mood: 'Wordless, operatic, seismic', color: '#6C5CE7',
      art: '/satyr-arcana/assets/card2-tower.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/tower',
    },
    {
      key: 'Star', slug: 'the-star', part: 2, number: null, name: 'The Star',
      tagline: 'You kept hoping anyway.',
      meaning: 'You sang your biggest dream quiet to keep the peace at home — and kept hoping anyway, long after it stopped being reasonable to. The Star is the card for the one who stayed soft when the world handed them every reason not to.',
      shadow: 'Hope that curdles into waiting', gift: 'Keeping faith lit when no one else will',
      mood: 'Open, aching, luminous', color: '#3EC6E0',
      art: '/satyr-arcana/assets/card2-star.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-star',
    },
    {
      key: 'WiseWoman', slug: 'wise-woman', part: 2, number: null, name: 'The Wise Woman',
      tagline: 'She already knows.',
      meaning: 'She reads a room before she ever opens her mouth — gauging who\'s safe, who\'s performing, who actually needs her. By the time she speaks, she already knows. This card belongs to the one who sees everything first and says only what matters.',
      shadow: 'Withholding warmth while you\'re still sizing people up', gift: 'Knowing exactly who someone is before they\'ve finished the sentence',
      mood: 'Watchful, patient, unhurried', color: '#8E7CC3',
      art: '/satyr-arcana/assets/card2-wise-woman.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-wise-woman-2',
    },
    {
      key: 'Champion', slug: 'the-champion', part: 2, number: null, name: 'The Champion',
      tagline: 'She speaks when the room goes silent.',
      meaning: 'This card was written for the one who spoke up when the whole room went quiet and froze. She didn\'t wait for someone braver to go first. The Champion doesn\'t fight for herself — she fights for whoever the room just failed.',
      shadow: 'Carrying other people\'s battles until your own voice gets lost in it', gift: 'The courage that shows up exactly when everyone else goes silent',
      mood: 'Defiant, clear, unwavering', color: '#4C7EA8',
      art: '/satyr-arcana/assets/card2-champion.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-champion',
    },
    {
      key: 'LaLuna', slug: 'la-luna', part: 2, number: null, name: 'La Luna',
      tagline: 'Moon, take me home.',
      meaning: 'Luna, llévame — moon, take me. This card isn\'t about one person; it\'s about the ache itself. The nights you can\'t see the way and you call out to something bigger than yourself anyway, trusting it to bring you home even when you can\'t see the road.',
      shadow: 'Getting lost in the longing instead of the arriving', gift: 'Trusting the pull even in the dark',
      mood: 'Nocturnal, howling, tidal', color: '#9AA5D1',
      art: '/satyr-arcana/assets/card2-la-luna.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/la-luna',
    },
    {
      key: 'Sun', slug: 'the-sun', part: 2, number: null, name: 'The Sun',
      tagline: 'The one who never wore a mask.',
      meaning: 'Their smile meets you at the door before you\'ve said a word, and the whole room gets easier to breathe in. The Sun is for the one who never needed a mask — who stayed exactly, uncomplicatedly themselves, on Halloween and every other night.',
      shadow: 'Performing lightness when you actually need to be held too', gift: 'Being the warmth a room didn\'t know it needed',
      mood: 'Bright, playful, generous', color: '#F2C14E',
      art: '/satyr-arcana/assets/card2-sun.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-sun',
    },
    {
      key: 'Builder', slug: 'the-builder', part: 2, number: null, name: 'The Builder',
      tagline: 'Trust, built by hand.',
      meaning: 'You noticed the roughness of his hands before you trusted anything else about him — and trust, for the Builder, is never handed over. It\'s constructed slow, one proof at a time, until what you\'ve built together is sturdier than anything either of you could\'ve made alone.',
      shadow: 'Needing everything proven before you\'ll believe it\'s real', gift: 'Building something that actually holds weight',
      mood: 'Grounded, patient, tactile', color: '#B98B4E',
      art: '/satyr-arcana/assets/card2-builder.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-builder',
      spanish: { key: 'builder-es', url: 'https://djgreensatyr.bandcamp.com/track/el-coraz-n-de-un-constructor', label: 'Also available in Spanish — El Corazón de un Constructor' },
    },
    {
      key: 'MothersOfCreation', slug: 'mothers-of-creation', part: 2, number: null, name: 'Mothers of Creation',
      tagline: 'Raised by a whole grove of mothers.',
      meaning: 'Three women, one grove — this is the card for everyone who was ever raised by people who weren\'t theirs by blood. Three voices rising together in the dark, spinning the thread, striking the fire, holding wisdom that never came from one mother alone.',
      shadow: 'Forgetting you\'re allowed to need raising too', gift: 'Mothering that multiplies instead of running out',
      mood: 'Chant-like, communal, rooted', color: '#4E8B5A',
      art: '/satyr-arcana/assets/card2-mothers-of-creation.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/mothers-of-creation',
      spanish: { key: 'mothers-es', url: 'https://djgreensatyr.bandcamp.com/track/madres-de-la-creacion', label: 'Also available in Spanish — Madres de la Creación' },
    },
    {
      key: 'Experience', slug: 'experience', part: 2, number: null, name: 'Experience',
      tagline: 'Steady, because he\'s already lived it.',
      meaning: 'He\'s already been through it, long before you were. He doesn\'t rush and he doesn\'t panic — he steps in steady, tuned to a rhythm only time teaches you to hear. This card is for the one whose calm was earned the hard way.',
      shadow: 'Mistaking “I’ve seen this before” for “there’s nothing left to learn”', gift: 'Steadiness that was actually earned, not performed',
      mood: 'Unhurried, grounded, wise', color: '#A67C52',
      art: '/satyr-arcana/assets/card2-experience.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/experience',
    },
    {
      key: 'Fool', slug: 'the-fool', part: 2, number: '0', name: 'The Fool',
      tagline: 'Still walking, eyes open.',
      meaning: 'He\'s already been through it. He\'s still walking anyway, like the night isn\'t finished with him yet and he\'s decided to meet it standing up. The Fool isn\'t naive — the Fool is the one who goes first, every time, knowing exactly what going first can cost.',
      shadow: 'Mistaking momentum for direction', gift: 'Going first so somebody has to, and it might as well be someone brave',
      mood: 'Bouncy, defiant, wide awake', color: '#39FF14',
      art: '/satyr-arcana/assets/card2-fool.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-fool',
    },
    {
      key: 'KingOfPentacles', slug: 'king-of-pentacles', part: 2, number: null, name: 'King of Pentacles — Needed a Friend',
      tagline: 'He built a life out of showing up.',
      meaning: 'You built something that outlasted the night it started — closed bars, neon skies, a friendship that never needed a reason, just someone who turned out to be exactly the friend you needed. The King of Pentacles builds a life out of showing up.',
      shadow: 'Measuring your worth only by what you\'ve built', gift: 'Making a home out of ordinary nights with the right people in them',
      mood: 'Late-night, golden, unhurried', color: '#7A9B57',
      art: '/satyr-arcana/assets/card2-king-of-pentacles.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/king-of-pentacles-needed-a-friend',
    },
    {
      key: 'KingOfSwords', slug: 'king-of-swords', part: 2, number: null, name: 'King of Swords — Hold the Line',
      tagline: 'He never had to raise his voice.',
      meaning: 'He didn\'t raise his voice. He just never backed down. The King of Swords thinks it through before he speaks, draws the line clean, and holds it — not out of stubbornness, but because somebody has to keep the air honest.',
      shadow: 'Holding the line even after the fight\'s already over', gift: 'Keeping things honest without needing to be loud about it',
      mood: 'Cutting, deliberate, controlled', color: '#6E8898',
      art: '/satyr-arcana/assets/card2-king-of-swords.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/king-of-swords-hold-the-line',
    },
    {
      key: 'KnightOfCups', slug: 'knight-of-cups', part: 2, number: null, name: 'Knight of Cups — Bring Back the Romance',
      tagline: 'He remembers the flame.',
      meaning: 'He doesn\'t chase. He remembers — the flame, the pull, the part he played in the distance that grew. The Knight of Cups says it plainly: I know I\'m the one who let this drift, and I want to bring it back.',
      shadow: 'Romanticizing the rekindling more than doing the repair', gift: 'Owning your part, out loud, before asking for anything back',
      mood: 'Lush, pleading, romantic', color: '#D98BA0',
      art: '/satyr-arcana/assets/card2-knight-of-cups.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/knight-of-cups-bring-back-the-romance',
    },
    {
      key: 'KingOfCups', slug: 'king-of-cups', part: 2, number: null, name: 'King of Cups — The One Who Stays',
      tagline: 'Everyone else left. He didn\'t.',
      meaning: 'He learned how to stand steady long before the world made any sense to him. Everyone else left. He didn\'t. The King of Cups carries quiet burdens with a heart that doesn\'t announce itself — he\'s simply, reliably, still there.',
      shadow: 'Staying so quietly that no one notices what it\'s costing you', gift: 'Being the one person who never left',
      mood: 'Deep, steady, unshowy', color: '#2E8B8B',
      art: '/satyr-arcana/assets/card2-king-of-cups.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/king-of-cups-the-one-who-stays',
    },
    {
      key: 'KingOfWands', slug: 'king-of-wands', part: 2, number: null, name: 'King of Wands — He Brought the Music',
      tagline: 'He brought the music.',
      meaning: 'He built a kingdom out of vinyl and turntables, rooted in rhythm — because every grove needs someone who turns the volume up on joy. The King of Wands doesn\'t just attend the party. He\'s the reason there\'s a party at all.',
      shadow: 'Needing the room loud to feel like yourself', gift: 'Turning up the joy in every room you walk into',
      mood: 'Driving, celebratory, magnetic', color: '#E8832E',
      art: '/satyr-arcana/assets/card2-king-of-wands.jpg',
      bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/king-of-wands-he-brought-the-music',
    },
  ];

  var OUTCOMES = OUTCOMES_1.concat(OUTCOMES_2);
  var BY_KEY = {};
  OUTCOMES.forEach(function (o) { BY_KEY[o.key] = o; });

  // Scoring aliases let the same card accumulate points from two different
  // questions without the pairing repeating — see the key2/number suffixes
  // used in QUESTIONS above (e.g. "Star2", "Champion2" both resolve to Star/Champion).
  function resolveKey(rawKey) {
    return BY_KEY[rawKey] ? rawKey : rawKey.replace(/\d+$/, '');
  }

  // ─── SCORING ─────────────────────────────────────────────────────────────────

  function computeResult(answers) {
    var totals = {};
    OUTCOMES.forEach(function (o) { totals[o.key] = 0; });
    // A stable hash of which option was picked on which question, used only
    // to break ties fairly — otherwise Part I would win every tie just for
    // appearing first in the OUTCOMES array, which is not a real signal.
    var hash = 0;
    answers.forEach(function (ans, i) {
      if (!ans) return;
      var q = QUESTIONS[i];
      var optIndex = q ? q.options.indexOf(ans) : 0;
      hash += (optIndex + 1) * (i + 7);
      Object.keys(ans.scores).forEach(function (rawKey) {
        var key = resolveKey(rawKey);
        totals[key] = (totals[key] || 0) + ans.scores[rawKey];
      });
    });
    var highest = -1;
    var tied = [];
    OUTCOMES.forEach(function (o) {
      if (totals[o.key] > highest) {
        highest = totals[o.key];
        tied = [o];
      } else if (totals[o.key] === highest) {
        tied.push(o);
      }
    });
    if (tied.length === 1) return tied[0];
    return tied[hash % tied.length];
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
  var elEmailError  = $('qz-email-error');
  var elShCopy      = $('sh-copy');
  var elFollowupRule  = $('rc-followup-rule');
  var elFollowup      = $('rc-followup');
  var elFollowupAsk   = $('rc-followup-ask');
  var elFollowupForm  = $('rc-followup-form');
  var elFollowupEmail = $('rc-followup-email');
  var elFollowupBtn   = $('rc-followup-btn');
  var elFollowupDone  = $('rc-followup-done');
  var subscribed = false;

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

  // ─── RENDER RESULT (Satyr Arcana Result design, Oct 2026) ────────────────────

  // Traditional archetype behind each Part I card (the song title is the
  // public card name). Part II cards keep their released titles as-is.
  var ARCHETYPE = {
    I: 'The Magician', II: 'The High Priestess', III: 'The Empress',
    IV: 'The Emperor', V: 'The Hierophant', VI: 'The Lovers',
    VII: 'The Chariot', VIII: 'Strength', IX: 'The Hermit',
    X: 'Wheel of Fortune', XI: 'Justice', XII: 'The Hanged Man',
    XIII: 'Death', XIV: 'Temperance', XV: 'The Devil'
  };
  // Per-card canvas print on the Printful store (verified Oct 14, 2026) —
  // Part I only; Part II prints are not yet confirmed, so those fall back
  // to the main store front instead of guessing a product slug.
  var STORE_HOME = 'https://greensatyr.printful.me/';
  var CANVAS = {
    DreamTraveler: 'dream-traveler-canvas-print', SheKnew: 'she-knew-canvas-print',
    AMother: 'a-mother-to-them', Anchor: 'the-anchor-canvas-print', RightOn: 'thin-canvas',
    FWB: 'fwb-canvas-print', Message: 'the-message-canvas-print', Spark: 'the-spark-canvas-print',
    Reconfiguration: 'reconfiguration-canvas-print', Fate: 'fate-canvas-print', KarmicJustice: 'karma-canvas-print',
    Perspective: 'perspective-canvas-print', SantaMuerte: 'santa-muerte-canvas-print',
    Temperance: 'temperance-canvas-print', Devil: 'the-devil-canvas-print'
  };
  var ALT = {
    AMother: { url: 'https://djgreensatyr.bandcamp.com/track/una-madre-para-ellos',
               label: 'Also available in Spanish — Una Madre Para Ellos' }
  };
  OUTCOMES_2.forEach(function (o) { if (o.spanish) ALT[o.key] = { url: o.spanish.url, label: o.spanish.label }; });

  var ALBUM = {
    1: { url: 'https://djgreensatyr.bandcamp.com/album/satyr-arcana-i', name: 'Satyr Arcana (I)', tracks: 16, cards: 15, price: '$16' },
    2: { url: 'https://djgreensatyr.bandcamp.com/album/satyr-arcana-part-2', name: 'Satyr Arcana — Part 2', tracks: 17, cards: 15, price: '$20' },
  };

  function cardUrl(r) {
    return 'https://greensatyr.buzz/satyr-arcana/card/' + r.slug + '/';
  }

  function renderResult(r) {
    // Reset the post-reveal signup nudge each time (retakes, skip vs. reveal).
    if (elFollowupAsk) show(elFollowupAsk);
    if (elFollowupForm) show(elFollowupForm);
    if (elFollowupDone) hide(elFollowupDone);
    if (elFollowupEmail) elFollowupEmail.value = '';
    if (subscribed) { hide(elFollowupRule); hide(elFollowup); }
    else { show(elFollowupRule); show(elFollowup); }

    var album = ALBUM[r.part];
    var idxInPart = (r.part === 1 ? OUTCOMES_1 : OUTCOMES_2).indexOf(r);
    var name = r.name;
    var arch = r.part === 1 ? ARCHETYPE[r.number] : null;

    var art = $('rc-art');
    if (art) {
      art.src = r.art;
      art.alt = name + ' — Satyr Arcana card art';
    }
    if ($('rc-track'))   $('rc-track').textContent = album.name + ' · Track ' + (idxInPart + 1) + ' of ' + album.tracks;
    if ($('rc-name'))    $('rc-name').textContent  = name;
    if ($('rc-song'))    $('rc-song').textContent  = (arch && arch !== name) ? 'Card ' + r.number + ' · in the place of ' + arch : (r.number ? 'Card ' + r.number : '');
    if ($('rc-meaning')) $('rc-meaning').textContent = r.meaning;

    var listen = $('rc-listen');
    if (listen) listen.href = r.bandcampUrl;

    var store = $('rc-store');
    if (store) store.href = (r.part === 1 && CANVAS[r.key]) ? STORE_HOME + 'product/' + CANVAS[r.key] : STORE_HOME;

    var alt = $('rc-alt');
    if (alt) {
      var a = ALT[r.key];
      if (a) {
        alt.href = a.url;
        if ($('rc-alt-label')) $('rc-alt-label').textContent = a.label;
        alt.classList.remove('hidden');
      } else {
        alt.classList.add('hidden');
      }
    }

    var deck = $('rc-deck');
    if (deck) {
      deck.href = album.url;
      if ($('rc-deck-title')) $('rc-deck-title').textContent = 'Or take the whole deck';
      if ($('rc-deck-sub'))   $('rc-deck-sub').textContent   = album.name + ' — ' + album.tracks + ' tracks, ' + album.cards + ' cards, ' + album.price + ' on Bandcamp';
    }

    // share: native share sheet on phones, clipboard everywhere else
    var shareUrl  = cardUrl(r);
    var shareText = 'I drew ' + name + ' in the Satyr Arcana. Draw yours at GreenSatyr.Buzz';
    if (elShCopy) {
      elShCopy.textContent = 'Share your card';
      elShCopy.onclick = function () {
        if (navigator.share) {
          navigator.share({ title: name + ' — Satyr Arcana', text: shareText, url: shareUrl }).catch(function () {});
          return;
        }
        var done = function () {
          elShCopy.textContent = 'Link copied';
          setTimeout(function () { elShCopy.textContent = 'Share your card'; }, 2000);
        };
        try {
          navigator.clipboard.writeText(shareText + ' ' + shareUrl).then(done, function () { window.prompt('Copy your card link:', shareUrl); });
        } catch (e) { window.prompt('Copy your card link:', shareUrl); }
      };
    }

    // Bring the card into view. On phones the on-screen keyboard is usually
    // still open (focus was just on the email field) and its close animation
    // resizes the viewport; scrolling too early lands on the pre-close layout
    // and the card can end up looking like it never appeared. Blur the input
    // and wait for the viewport to settle (or a fixed fallback) before scrolling.
    if (elEmailInput) { try { elEmailInput.blur(); } catch (e) {} }
    var scrolled = false;
    function scrollToResult() {
      if (scrolled) return;
      scrolled = true;
      if (elResult && elResult.scrollIntoView) {
        elResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    if (window.visualViewport) {
      var vv = window.visualViewport;
      var onVVResize = function () {
        vv.removeEventListener('resize', onVVResize);
        setTimeout(scrollToResult, 60);
      };
      vv.addEventListener('resize', onVVResize);
      setTimeout(scrollToResult, 450); // fallback if no resize ever fires
    } else {
      setTimeout(scrollToResult, 350);
    }
  }

  // ─── RESET ───────────────────────────────────────────────────────────────────

  function reset() {
    qIndex   = 0;
    answers  = new Array(QUESTIONS.length).fill(null);
    selected = null;
    result   = null;
    showStep('intro');
    var qz = document.getElementById('quiz');
    if (qz && qz.scrollIntoView) qz.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    subscribed = true;
    renderResult(result);
    showStep('result');
  }

  // Validate with our own regex rather than relying on checkValidity() /
  // reportValidity(). The native validation bubble is browser UI, not
  // something a page controls — several in-app browsers (Instagram, TikTok,
  // Facebook) silently skip rendering it. In those, an invalid email used to
  // make the Reveal button a dead no-op: checkValidity() returns false,
  // reportValidity() shows nothing, and the user sees nothing happen at all.
  // This puts a visible, in-page message there instead, which works the same
  // in every browser.
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || '').trim());
  }

  function tryReveal() {
    if (elEmailInput && !isValidEmail(elEmailInput.value)) {
      if (elEmailError) show(elEmailError);
      if (elEmailInput) elEmailInput.focus();
      return;
    }
    if (elEmailError) hide(elEmailError);
    revealCard();
  }

  if (elEmailInput) {
    elEmailInput.addEventListener('input', function () {
      if (elEmailError) hide(elEmailError);
    });
  }

  // Primary path: a plain button (not type=submit) can never trigger a native
  // form submission, so there is nothing for JS to race against. This is what
  // fixes the "no card" bug — previously a native submit could sometimes beat
  // the JS handler (slow connection, in-app browsers) and reload the page,
  // wiping all quiz state before the card ever rendered.
  if (elReveal) {
    elReveal.addEventListener('click', function (e) {
      e.preventDefault();
      tryReveal();
    });
  }

  // Fallback path: pressing Enter in the email field still fires a native
  // 'submit' event even though the button itself is no longer type=submit.
  // Intercept it the same way so Enter-to-reveal still works.
  if (elForm) {
    elForm.addEventListener('submit', function (e) {
      e.preventDefault();
      tryReveal();
    });
  }

  if (elSkip) {
    elSkip.addEventListener('click', function () {
      result = computeResult(answers);
      subscribed = false;
      renderResult(result);
      showStep('result');
    });
  }

  if (elRetake) {
    elRetake.addEventListener('click', function () {
      subscribed = false;
      reset();
    });
  }

  // Second chance to capture email for anyone who used Skip — shown only
  // then (renderResult toggles it based on `subscribed`).
  if (elFollowupBtn) {
    elFollowupBtn.addEventListener('click', function () {
      var v = elFollowupEmail ? elFollowupEmail.value : '';
      if (!isValidEmail(v)) {
        if (elFollowupEmail) elFollowupEmail.focus();
        return;
      }
      try {
        var fd = new FormData();
        fd.append('form-name', 'circle');
        fd.append('source', 'arcana_quiz_post_reveal');
        fd.append('result', result ? result.key : '');
        fd.append('email', v);
        fetch('/', { method: 'POST', body: fd });
      } catch (e) { /* non-critical */ }
      if (elFollowupAsk) hide(elFollowupAsk);
      if (elFollowupForm) hide(elFollowupForm);
      if (elFollowupDone) show(elFollowupDone);
    });
  }

})();
