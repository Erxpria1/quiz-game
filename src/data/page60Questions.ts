export interface Page60Question {
  id: number;
  question: Record<string, string>;
  options: Record<string, string[]>;
  correctAnswer: number;
  explanation: Record<string, string>;
}

export const page60Questions: Page60Question[] = [
  {
    id: 1,
    question: {
      en: "In the frame system cross-section (Slide 60), what is element #12?",
      tr: "Çerçeve sistem kesitinde (Slayt 60), 12 numaralı eleman hangisidir?",
    },
    options: {
      en: ["Hollow-core slab", "Double T beam", "Internal rectangular beam", "Side beam"],
      tr: ["Boşluklu döşeme", "Çift T kirişi", "İç dikdörtgen kiriş", "Yan kiriş"],
    },
    correctAnswer: 1,
    explanation: {
      en: "Element #12 in the frame system diagram is the 'Çift T kirişi' (Double T beam), a commonly used precast structural element.",
      tr: "Çerçeve sistem diyagramında 12 numaralı eleman 'Çift T kirişi'dir, yaygın kullanılan bir prekast yapısal elemandır.",
    },
  },
  {
    id: 2,
    question: {
      en: "In the frame system diagram, what does element #2 represent?",
      tr: "Çerçeve sistem diyagramında 2 numaralı eleman neyi temsil eder?",
    },
    options: {
      en: ["Solid flat slab", "Hollow-core slab (Boşluklu döşme)", "Bubble deck", "Waffle slab"],
      tr: ["Masif plak döşeme", "Boşluklu döşme", "Balonlu döşeme", "Asmolen döşeme"],
    },
    correctAnswer: 1,
    explanation: {
      en: "Element #2 is 'Boşluklu döşme' (Hollow-core slab), a standard precast floor/roof element with longitudinal voids.",
      tr: "2 numaralı eleman 'Boşluklu döşme'dir, boyuna boşluklara sahip standart bir prekast döşeme/çatı elemanıdır.",
    },
  },
  {
    id: 3,
    question: {
      en: "Which element in the frame system is labeled as the column (Kolon)?",
      tr: "Çerçeve sisteminde hangi eleman kolon olarak etiketlenmiştir?",
    },
    options: {
      en: ["Element #5", "Element #8", "Element #10", "Element #13"],
      tr: ["5 numaralı eleman", "8 numaralı eleman", "10 numaralı eleman", "13 numaralı eleman"],
    },
    correctAnswer: 2,
    explanation: {
      en: "Element #10 is labeled as 'Kolon' (Column), the primary vertical load-bearing element in the frame system.",
      tr: "10 numaralı eleman 'Kolon' olarak etiketlenmiştir, çerçeve sistemindeki temel dikey taşıyıcı elemandır.",
    },
  },
  {
    id: 4,
    question: {
      en: "What is element #8 in the frame system cross-section?",
      tr: "Çerçeve sistem kesitinde 8 numaralı eleman nedir?",
    },
    options: {
      en: ["Landing beam", "Stairs and landing (Merdiven ve sahanlık)", "Tie beam", "Side beam"],
      tr: ["Sahanlık kirişi", "Merdiven ve sahanlık", "Bağ kirişi", "Yan kiriş"],
    },
    correctAnswer: 1,
    explanation: {
      en: "Element #8 is 'Merdiven ve sahanlık' (Stairs and landing), the vertical circulation component in the precast frame system.",
      tr: "8 numaralı eleman 'Merdiven ve sahanlık'tır, prekast çerçeve sistemindeki dikey sirkülasyon bileşenidir.",
    },
  },
  {
    id: 5,
    question: {
      en: "In the frame system, what is element #3?",
      tr: "Çerçeve sisteminde 3 numaralı eleman nedir?",
    },
    options: {
      en: ["Side beam", "Main edge beam", "Internal rectangular beam (İç dikdörtgen kiriş)", "Double T beam"],
      tr: ["Yan kiriş", "Ana kenar kiriş", "İç dikdörtgen kiriş", "Çift T kirişi"],
    },
    correctAnswer: 2,
    explanation: {
      en: "Element #3 is 'İç dikdörtgen kiriş' (Internal rectangular beam), an internal beam with a rectangular cross-section.",
      tr: "3 numaralı eleman 'İç dikdörtgen kiriş'tir, dikdörtgen kesitli bir iç kiriştir.",
    },
  },
  {
    id: 6,
    question: {
      en: "Which elements are labeled as 'Yan kiriş' (Side beam) in the frame system?",
      tr: "Çerçeve sisteminde hangi elemanlar 'Yan kiriş' olarak etiketlenmiştir?",
    },
    options: {
      en: ["Elements #1 and #6", "Elements #4 and #5", "Elements #9 and #14", "Elements #11 and #13"],
      tr: ["1 ve 6 numaralı elemanlar", "4 ve 5 numaralı elemanlar", "9 ve 14 numaralı elemanlar", "11 ve 13 numaralı elemanlar"],
    },
    correctAnswer: 1,
    explanation: {
      en: "Elements #4 and #5 are both labeled as 'Yan kiriş' (Side beam) in the frame system cross-section diagram.",
      tr: "4 ve 5 numaralı elemanların her ikisi de çerçeve sistem kesit diyagramında 'Yan kiriş' olarak etiketlenmiştir.",
    },
  },
  {
    id: 7,
    question: {
      en: "What is element #14 in the frame system?",
      tr: "Çerçeve sisteminde 14 numaralı eleman nedir?",
    },
    options: {
      en: ["Main side beam", "Internal beam", "Tie beam", "Main edge beam (Ana kenar kiriş)"],
      tr: ["Ana yan kiriş", "İç kiriş", "Bağ kirişi", "Ana kenar kiriş"],
    },
    correctAnswer: 3,
    explanation: {
      en: "Element #14 is 'Ana kenar kiriş' (Main edge beam), the primary perimeter beam in the frame system.",
      tr: "14 numaralı eleman 'Ana kenar kiriş'tir, çerçeve sistemindeki temel çevre kirişidir.",
    },
  },
  {
    id: 8,
    question: {
      en: "How many distinct elements are labeled in the frame system cross-section on Slide 60?",
      tr: "Slayt 60'taki çerçeve sistem kesitinde kaç farklı eleman etiketlenmiştir?",
    },
    options: {
      en: ["10", "12", "14", "16"],
      tr: ["10", "12", "14", "16"],
    },
    correctAnswer: 2,
    explanation: {
      en: "The frame system cross-section on Slide 60 labels 14 distinct structural elements, from main side beams to edge beams.",
      tr: "Slayt 60'taki çerçeve sistem kesiti, ana yan kirişlerden kenar kirişlerine kadar 14 farklı yapısal elemanı etiketler.",
    },
  },
  {
    id: 9,
    question: {
      en: "In the frame system, what is element #9?",
      tr: "Çerçeve sisteminde 9 numaralı eleman nedir?",
    },
    options: {
      en: ["Landing beam", "Wall", "Tie beam (Bağ kirişi)", "Stairs"],
      tr: ["Sahanlık kirişi", "Duvar", "Bağ kirişi", "Merdiven"],
    },
    correctAnswer: 2,
    explanation: {
      en: "Element #9 is 'Bağ kirişi' (Tie beam), used to connect and stabilize structural elements in the frame system.",
      tr: "9 numaralı eleman 'Bağ kirişi'dir, çerçeve sisteminde yapısal elemanları birbirine bağlamak ve stabilize etmek için kullanılır.",
    },
  },
  {
    id: 10,
    question: {
      en: "Which element in the frame system represents the wall (Duvar)?",
      tr: "Çerçeve sisteminde hangi eleman duvarı (Duvar) temsil eder?",
    },
    options: {
      en: ["Element #7", "Element #10", "Element #11", "Element #13"],
      tr: ["7 numaralı eleman", "10 numaralı eleman", "11 numaralı eleman", "13 numaralı eleman"],
    },
    correctAnswer: 2,
    explanation: {
      en: "Element #11 is labeled as 'Duvar' (Wall), a vertical enclosure or load-bearing element in the precast frame system.",
      tr: "11 numaralı eleman 'Duvar' olarak etiketlenmiştir, prekast çerçeve sisteminde dikey bir çevreleme veya taşıyıcı elemandır.",
    },
  },
];
