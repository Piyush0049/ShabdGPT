
// Hindi learning data

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: number;
  xpReward: number;
  content: LessonContent;
}

export interface LessonContent {
  introduction: string;
  examples: Example[];
  exercises: Exercise[];
}

export interface Example {
  hindi: string;
  transliteration: string;
  english: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'matching' | 'fill-in-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
}

// Hindi alphabet lessons (vowels)
export const hindiLessons: Lesson[] = [
  {
    id: 'vowels-1',
    title: 'Hindi Vowels - Part 1',
    description: 'Learn the first set of Hindi vowels',
    level: 1,
    xpReward: 10,
    content: {
      introduction: 'Hindi has 11 vowels. Each vowel has two forms: an independent form and a dependent form. Let\'s start with the first 5 vowels.',
      examples: [
        {
          hindi: 'अ',
          transliteration: 'a',
          english: 'Short "a" as in "America"'
        },
        {
          hindi: 'आ',
          transliteration: 'aa',
          english: 'Long "a" as in "father"'
        },
        {
          hindi: 'इ',
          transliteration: 'i',
          english: 'Short "i" as in "it"'
        },
        {
          hindi: 'ई',
          transliteration: 'ee',
          english: 'Long "i" as in "machine"'
        },
        {
          hindi: 'उ',
          transliteration: 'u',
          english: 'Short "u" as in "put"'
        }
      ],
      exercises: [
        {
          id: 'vowels-1-ex1',
          type: 'multiple-choice',
          question: 'Which of these is the Hindi vowel "aa"?',
          options: ['अ', 'आ', 'इ', 'ई'],
          correctAnswer: 'आ',
          hint: 'It looks like अ but with an extra vertical line'
        },
        {
          id: 'vowels-1-ex2',
          type: 'multiple-choice',
          question: 'What is the English equivalent sound for "इ"?',
          options: [
            'Long "a" as in "father"',
            'Short "a" as in "America"',
            'Short "i" as in "it"',
            'Long "i" as in "machine"'
          ],
          correctAnswer: 'Short "i" as in "it"',
          hint: 'It\'s similar to the "i" in "it" or "bit"'
        }
      ]
    }
  },
  {
    id: 'vowels-2',
    title: 'Hindi Vowels - Part 2',
    description: 'Learn the second set of Hindi vowels',
    level: 1,
    xpReward: 10,
    content: {
      introduction: 'Now let\'s continue with the remaining Hindi vowels.',
      examples: [
        {
          hindi: 'ऊ',
          transliteration: 'oo',
          english: 'Long "u" as in "boot"'
        },
        {
          hindi: 'ए',
          transliteration: 'e',
          english: 'Long "a" as in "cake"'
        },
        {
          hindi: 'ऐ',
          transliteration: 'ai',
          english: '"ai" as in "bat"'
        },
        {
          hindi: 'ओ',
          transliteration: 'o',
          english: 'Long "o" as in "boat"'
        },
        {
          hindi: 'औ',
          transliteration: 'au',
          english: '"au" as in "caught"'
        }
      ],
      exercises: [
        {
          id: 'vowels-2-ex1',
          type: 'multiple-choice',
          question: 'Which of these is the Hindi vowel "e"?',
          options: ['ऊ', 'ए', 'ऐ', 'ओ'],
          correctAnswer: 'ए',
          hint: 'This vowel looks like a curved line with a small diagonal line at the top'
        },
        {
          id: 'vowels-2-ex2',
          type: 'multiple-choice',
          question: 'What is the English equivalent sound for "औ"?',
          options: [
            'Long "o" as in "boat"',
            '"au" as in "caught"',
            '"ai" as in "bat"',
            'Long "u" as in "boot"'
          ],
          correctAnswer: '"au" as in "caught"',
          hint: 'It sounds similar to "ow" sound in "how" or "cow"'
        }
      ]
    }
  },
  {
    id: 'consonants-1',
    title: 'Hindi Consonants - Part 1',
    description: 'Learn the first set of Hindi consonants',
    level: 1,
    xpReward: 15,
    content: {
      introduction: 'Hindi has 33 consonants. Let\'s start with the first 5 consonants, which are called "ka-varga" (क-वर्ग).',
      examples: [
        {
          hindi: 'क',
          transliteration: 'ka',
          english: 'k as in "kite"'
        },
        {
          hindi: 'ख',
          transliteration: 'kha',
          english: 'kh as in "khaki"'
        },
        {
          hindi: 'ग',
          transliteration: 'ga',
          english: 'g as in "go"'
        },
        {
          hindi: 'घ',
          transliteration: 'gha',
          english: 'gh as in "ghost"'
        },
        {
          hindi: 'ङ',
          transliteration: 'nga',
          english: 'ng as in "sing"'
        }
      ],
      exercises: [
        {
          id: 'consonants-1-ex1',
          type: 'multiple-choice',
          question: 'Which of these is the Hindi consonant "ga"?',
          options: ['क', 'ख', 'ग', 'घ'],
          correctAnswer: 'ग',
          hint: 'This consonant looks like a backward "3" with a vertical line'
        },
        {
          id: 'consonants-1-ex2',
          type: 'multiple-choice',
          question: 'What is the English equivalent sound for "क"?',
          options: [
            'k as in "kite"',
            'g as in "go"',
            'kh as in "khaki"',
            'ng as in "sing"'
          ],
          correctAnswer: 'k as in "kite"',
          hint: 'It\'s the basic "k" sound like in "keep" or "key"'
        }
      ]
    }
  }
];

// Basic Hindi phrases
export const basicPhrases = [
  {
    hindi: 'नमस्ते',
    transliteration: 'Namaste',
    english: 'Hello/Hi',
  },
  {
    hindi: 'आप कैसे हैं?',
    transliteration: 'Aap kaise hain?',
    english: 'How are you?',
  },
  {
    hindi: 'मैं ठीक हूँ',
    transliteration: 'Main theek hoon',
    english: 'I am fine',
  },
  {
    hindi: 'धन्यवाद',
    transliteration: 'Dhanyavaad',
    english: 'Thank you',
  },
  {
    hindi: 'हाँ',
    transliteration: 'Haan',
    english: 'Yes',
  },
  {
    hindi: 'नहीं',
    transliteration: 'Nahin',
    english: 'No',
  },
  {
    hindi: 'अलविदा',
    transliteration: 'Alvida',
    english: 'Goodbye',
  },
];
