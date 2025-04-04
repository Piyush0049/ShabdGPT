// Reusing the same interfaces from the Chatbot component
export interface Message {
    text: string;
    isUser: boolean;
    timestamp: Date;
    isLoading?: boolean;
    audioUrl?: string;
}

export interface LearningLevel {
    id: number;
    name: string;
    description: string;
    challenges: Challenge[];
    isUnlocked: boolean;
    isCompleted: boolean;
}

export interface Challenge {
    id: number;
    type: 'word' | 'sentence' | 'paragraph';
    hindi: string;
    english: string;
    pronunciation?: string;
}
export const learningLevels: LearningLevel[] = [
    {
        id: 1,
        name: "Basic Words",
        description: "Learn essential Hindi words",
        isUnlocked: true,
        isCompleted: false,
        challenges: [
            { id: 1, type: 'word', hindi: "नमस्ते", english: "Hello", pronunciation: "Namaste" },
            { id: 2, type: 'word', hindi: "धन्यवाद", english: "Thank you", pronunciation: "Dhanyavaad" },
            { id: 3, type: 'word', hindi: "हाँ", english: "Yes", pronunciation: "Haan" },
            { id: 4, type: 'word', hindi: "नहीं", english: "No", pronunciation: "Nahi" },
            { id: 5, type: 'word', hindi: "माफ़ कीजिए", english: "Sorry", pronunciation: "Maaf kijiye" },
        ]
    },
    {
        id: 2,
        name: "Simple Sentences",
        description: "Practice basic Hindi sentences",
        isUnlocked: false,
        isCompleted: false,
        challenges: [
            { id: 1, type: 'sentence', hindi: "आप कैसे हैं?", english: "How are you?", pronunciation: "Aap kaise hain?" },
            { id: 2, type: 'sentence', hindi: "मेरा नाम राहुल है।", english: "My name is Rahul.", pronunciation: "Mera naam Rahul hai." },
            { id: 3, type: 'sentence', hindi: "मुझे हिंदी सीखना है।", english: "I want to learn Hindi.", pronunciation: "Mujhe Hindi seekhna hai." },
        ]
    },
    {
        id: 3,
        name: "Paragraphs",
        description: "Master longer Hindi passages",
        isUnlocked: false,
        isCompleted: false,
        challenges: [
            {
                id: 1,
                type: 'paragraph',
                hindi: "नमस्ते! मेरा नाम अमित है। मैं भारत से हूँ। मुझे हिंदी बोलना पसंद है। मैं एक छात्र हूँ और मैं विज्ञान पढ़ता हूँ।",
                english: "Hello! My name is Amit. I am from India. I like speaking Hindi. I am a student and I study science.",
                pronunciation: "Namaste! Mera naam Amit hai. Main Bharat se hoon. Mujhe Hindi bolna pasand hai. Main ek chhatra hoon aur main vigyan padhta hoon."
            },
        ]
    }
];
