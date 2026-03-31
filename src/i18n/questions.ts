export interface Question {
  id: number;
  question: Record<string, string>;
  options: Record<string, string[]>;
  correctAnswer: number;
  explanation: Record<string, string>;
  category: string;
}

export const questions: Question[] = [
  {
    id: 1,
    category: "definition",
    question: {
      en: "What is a prefabricated structure?",
      tr: "Prefabrik yapı nedir?",
    },
    options: {
      en: [
        "A structure cast on-site at the construction site",
        "A structure where components are factory-produced and assembled on-site",
        "A structure built with wood materials",
        "A non-reinforced concrete structure",
      ],
      tr: [
        "Şantiyede yerinde dökülen yapı",
        "Fabrikada ön üretim yapılarak şantiyede monte edilen yapı",
        "Ahşap malzemeyle inşa edilen yapı",
        "Betonarme olmayan yapı",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Prefabricated structures are buildings created by assembling factory-produced structural elements on the construction site. This method provides fast and controlled production.",
      tr: "Prefabrik yapılar, fabrikada üretilen yapı elemanlarının şantiyede birleştirilmesiyle oluşturulan yapılardır. Bu yöntem hızlı ve kontrollü üretim sağlar.",
    },
  },
  {
    id: 2,
    category: "advantages",
    question: {
      en: "Which is NOT an advantage of prefabricated elements?",
      tr: "Prefabrik elemanların avantajları arasında hangisi yoktur?",
    },
    options: {
      en: [
        "Fast construction",
        "Lower cost",
        "Quality control",
        "More on-site labor",
      ],
      tr: [
        "Hızlı inşaat",
        "Düşük maliyet",
        "Kalite kontrolü",
        "Şantiyede daha fazla işçilik",
      ],
    },
    correctAnswer: 3,
    explanation: {
      en: "The greatest advantage of prefabricated structures is that they require less on-site labor. Controlled factory production increases quality.",
      tr: "Prefabrik yapıların en büyük avantajı şantiyede daha az işçilik gerektirmesidir. Fabrikada kontrollü üretim sayesinde kalite artar.",
    },
  },
  {
    id: 3,
    category: "structural-systems",
    question: {
      en: "Structural system types are determined based on which classification?",
      tr: "Taşıyıcı sistem türleri hangi sınıfa göre belirlenir?",
    },
    options: {
      en: [
        "Based on economic conditions",
        "Based on the building's intended use",
        "Based on height",
        "Based on material type",
      ],
      tr: [
        "Ekonomik duruma göre",
        "Yapının kullanım amacına göre",
        "Yüksekliğe göre",
        "Malzeme cinsine göre",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Structural system types are determined based on the building's intended use (residential, industrial, commercial, etc.) and designed accordingly.",
      tr: "Taşıyıcı sistem türleri, yapının kullanım amacına (konut, endüstriyel, ticari vb.) göre belirlenir ve buna göre tasarlanır.",
    },
  },
  {
    id: 4,
    category: "structural-systems",
    question: {
      en: "In which type of buildings is the column-beam system preferred?",
      tr: "Kolon-Kiriş sistemi ne tür yapılarda tercih edilir?",
    },
    options: {
      en: [
        "Residential buildings",
        "Industrial and commercial buildings",
        "Agricultural buildings",
        "Detached houses",
      ],
      tr: [
        "Konut yapılarında",
        "Endüstriyel ve ticari yapılarda",
        "Tarımsal yapılarda",
        "Müstakil evlerde",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "The column-beam system is preferred in industrial and commercial buildings that require large spans, as it provides flexibility and durability.",
      tr: "Kolon-kiriş sistemi, büyük açıklıklar gerektiren endüstriyel ve ticari yapılarda tercih edilir çünkü esneklik ve dayanıklılık sağlar.",
    },
  },
  {
    id: 5,
    category: "structural-systems",
    question: {
      en: "In which type of buildings is the panel system used?",
      tr: "Panel sistemi hangi tür yapılarda kullanılır?",
    },
    options: {
      en: [
        "Skyscrapers",
        "Schools and hospitals",
        "Only bridges",
        "Residences and workplaces",
      ],
      tr: [
        "Gökdelenlerde",
        "Okul ve hastane gibi yapılarda",
        "Sadece köprülerde",
        "Konutlarda ve işyerlerinde",
      ],
    },
    correctAnswer: 3,
    explanation: {
      en: "The panel system, which uses wall and floor panels, is widely used in residences, workplaces, and various other buildings.",
      tr: "Panel sistemi, duvar ve döşeme panellerinin kullanıldığı konutlar, işyerleri ve çeşitli yapılarda yaygın olarak kullanılır.",
    },
  },
  {
    id: 6,
    category: "structural-systems",
    question: {
      en: "What is a frame system?",
      tr: "Çerçeve sistem nedir?",
    },
    options: {
      en: [
        "A wall-bearing system",
        "A system where columns and beams carry loads",
        "A wooden skeleton system",
        "A foundation system",
      ],
      tr: [
        "Duvar taşıyan sistem",
        "Kolon ve kirişlerin yükleri taşıdığı sistem",
        "Ahşap iskelet sistemi",
        "Temel sistemi",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "A frame system is a structural system type where columns and beams carry all loads, and walls are non-load-bearing.",
      tr: "Çerçeve sistem, kolon ve kirişlerin tüm yükleri taşıdığı ve duvar taşıyıcı olmayan bir taşıyıcı sistem türüdür.",
    },
  },
  {
    id: 7,
    category: "industrial",
    question: {
      en: "What is the most distinctive feature of industrial buildings?",
      tr: "Endüstriyel yapıların en belirgin özelliği nedir?",
    },
    options: {
      en: [
        "Decorative appearance",
        "Large spans and high ceilings",
        "Small dimensions",
        "Being only single-story",
      ],
      tr: [
        "Dekoratif görünüm",
        "Büyük açıklıklar ve yüksek tavanlar",
        "Küçük boyutlar",
        "Sadece tek katlı olması",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Industrial buildings typically have large spans and high ceilings to accommodate large machinery and equipment.",
      tr: "Endüstriyel yapılar genellikle büyük makinaların ve ekipmanların yerleştirilmesi için büyük açıklıklar ve yüksek tavanlara sahiptir.",
    },
  },
  {
    id: 8,
    category: "industrial",
    question: {
      en: "What is the ceiling height of single-story industrial buildings?",
      tr: "Tek katlı endüstriyel yapıların tavan yüksekliği kaç metredir?",
    },
    options: {
      en: [
        "3-4 meters",
        "5-6 meters",
        "8-10 meters and above",
        "2-3 meters",
      ],
      tr: [
        "3-4 metre",
        "5-6 metre",
        "8-10 metre ve üzeri",
        "2-3 metre",
      ],
    },
    correctAnswer: 2,
    explanation: {
      en: "In single-story industrial buildings, the ceiling height is typically 8-10 meters or more, allowing large equipment to be placed comfortably.",
      tr: "Tek katlı endüstriyel yapılarda tavan yüksekliği genellikle 8-10 metre ve üzeridir, bu da büyük ekipmanların rahatça yerleştirilmesini sağlar.",
    },
  },
  {
    id: 9,
    category: "industrial",
    question: {
      en: "Which system is used in multi-story industrial buildings?",
      tr: "Çok katlı endüstriyel yapılarda hangi sistem kullanılır?",
    },
    options: {
      en: [
        "Masonry system",
        "Reinforced concrete frame system",
        "Wooden system",
        "Non-steel system",
      ],
      tr: [
        "Kagir sistem",
        "Betonarme çerçeve sistem",
        "Ahşap sistem",
        "Çelik olmayan sistem",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Reinforced concrete frame systems are preferred in multi-story industrial buildings for durability and safety.",
      tr: "Çok katlı endüstriyel yapılarda dayanıklılık ve güvenlik için betonarme çerçeve sistem tercih edilir.",
    },
  },
  {
    id: 10,
    category: "industrial",
    question: {
      en: "Which is an example of special-type industrial buildings?",
      tr: "Özel tip endüstriyel yapılara örnek hangisidir?",
    },
    options: {
      en: [
        "Residences",
        "Schools",
        "Silos and bunkers",
        "Shops",
      ],
      tr: [
        "Konutlar",
        "Okullar",
        "Silolar ve bunkeler",
        "Dükkanlar",
      ],
    },
    correctAnswer: 2,
    explanation: {
      en: "Silos and bunkers are examples of special-type industrial buildings. They are used for storage purposes.",
      tr: "Silolar ve bunkeler, özel tip endüstriyel yapılara örnektir. Depolama amaçlı kullanılırlar.",
    },
  },
  {
    id: 11,
    category: "high-rise",
    question: {
      en: "What should the structural system of high-rise buildings be like?",
      tr: "Yüksek yapıların taşıyıcı sistemi nasıl olmalıdır?",
    },
    options: {
      en: [
        "Weak and flexible",
        "Rigid and durable",
        "Only wood",
        "Temporary systems",
      ],
      tr: [
        "Zayıf ve esnek",
        "Rijit ve dayanıklı",
        "Sadece ahşap",
        "Geçici sistemler",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "The structural system of high-rise buildings must be rigid and durable to resist loads such as wind and earthquakes.",
      tr: "Yüksek yapıların taşıyıcı sistemi rijit ve dayanıklı olmalıdır, böylece rüzgar ve deprem gibi yüklere karşı direnç sağlar.",
    },
  },
  {
    id: 12,
    category: "classification",
    question: {
      en: "Which category do bridges and viaducts fall under?",
      tr: "Köprü ve viyadükler hangi sınıfa girer?",
    },
    options: {
      en: [
        "Industrial buildings",
        "Single-story buildings",
        "Transportation structures",
        "Residential buildings",
      ],
      tr: [
        "Endüstriyel yapılar",
        "Tek katlı yapılar",
        "Ulaşım yapıları",
        "Konut yapıları",
      ],
    },
    correctAnswer: 2,
    explanation: {
      en: "Bridges and viaducts fall under the category of transportation structures and require specialized engineering.",
      tr: "Köprü ve viyadükler, ulaşım yapıları sınıfına girer ve özel mühendislik gerektiren yapılardır.",
    },
  },
  {
    id: 13,
    category: "earthquake",
    question: {
      en: "What is the most important factor for earthquake behavior?",
      tr: "Deprem davranışı açısından en önemli faktör nedir?",
    },
    options: {
      en: [
        "The building's color",
        "The layout of the structural system",
        "The building's facade",
        "Window sizes",
      ],
      tr: [
        "Binanın rengi",
        "Taşıyıcı sistemin düzeni",
        "Binanın cephesi",
        "Pencerelerin boyutu",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "The layout of the structural system is the most important factor for earthquake behavior. Regular and symmetrical design is safer during earthquakes.",
      tr: "Taşıyıcı sistemin düzeni, deprem davranışı açısından en önemli faktördür. Düzgün ve simetrik tasarım depremde daha güvenli olur.",
    },
  },
  {
    id: 14,
    category: "foundation",
    question: {
      en: "What is the most important factor in foundation design?",
      tr: "Temel tasarımında en önemli etken hangisidir?",
    },
    options: {
      en: [
        "Soil type",
        "Building color",
        "Roof material",
        "Wall thickness",
      ],
      tr: [
        "Zemin cinsi",
        "Binanın rengi",
        "Çatı malzemesi",
        "Duvar kalınlığı",
      ],
    },
    correctAnswer: 0,
    explanation: {
      en: "Soil type is the most important factor in foundation design. The soil's bearing capacity determines the foundation type and dimensions.",
      tr: "Zemin cinsi, temel tasarımında en önemli etkendir. Zeminin taşıma kapasitesi temel tipini ve boyutlarını belirler.",
    },
  },
  {
    id: 15,
    category: "insulation",
    question: {
      en: "What is the purpose of insulation systems?",
      tr: "İzolasyon sistemleri hangi amaçla kullanılır?",
    },
    options: {
      en: [
        "Decoration",
        "Sound and thermal insulation",
        "Increasing cost",
        "Visual beauty",
      ],
      tr: [
        "Dekorasyon",
        "Ses ve ısı yalıtımı",
        "Maliyet artırma",
        "Görsel güzellik",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Insulation systems are used for sound and thermal insulation. These systems provide energy efficiency and comfort.",
      tr: "İzolasyon sistemleri, ses ve ısı yalıtımı için kullanılır. Bu sistemler enerji verimliliği ve konfor sağlar.",
    },
  },
  {
    id: 16,
    category: "connections",
    question: {
      en: "Why are connection points important in prefabricated structures?",
      tr: "Prefabrik yapılarda birleşim noktaları neden önemlidir?",
    },
    options: {
      en: [
        "Only for appearance",
        "For structural integrity and durability",
        "To reduce cost",
        "For color changes",
      ],
      tr: [
        "Sadece görünüm için",
        "Yapısal bütünlük ve dayanıklılık için",
        "Maliyet düşürmek için",
        "Renk değişikliği için",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Connection points in prefabricated structures are critically important for structural integrity and durability.",
      tr: "Prefabrik yapılarda birleşim noktaları, yapısal bütünlük ve dayanıklılık için kritik öneme sahiptir.",
    },
  },
  {
    id: 17,
    category: "materials",
    question: {
      en: "What is the purpose of reinforcement bars (rebar) in reinforced concrete prefabricated elements?",
      tr: "Betonarme prefabrik elemanlarda donatı hangi amaçla kullanılır?",
    },
    options: {
      en: [
        "To increase weight",
        "To increase tensile strength",
        "To change color",
        "To make the surface rough",
      ],
      tr: [
        "Ağırlık artırmak",
        "Çekme dayanımını artırmak",
        "Rengi değiştirmek",
        "Yüzeyi pürüzlü yapmak",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Rebar is used to increase tensile strength in concrete. Concrete is strong in compression, while rebar is strong in tension.",
      tr: "Donatı, betonda çekme dayanımını artırmak için kullanılır. Beton basınca dayanıklı, donatı ise çekmeye dayanıklıdır.",
    },
  },
  {
    id: 18,
    category: "components",
    question: {
      en: "Where is the attic located in industrial buildings?",
      tr: "Endüstriyel yapılarda tavan arası nerede bulunur?",
    },
    options: {
      en: [
        "In the basement",
        "Between the roof and ceiling",
        "In the foundation",
        "Only in multi-story buildings",
      ],
      tr: [
        "Bodrum katta",
        "Çatı ile tavan arasında",
        "Temelde",
        "Sadece çok katlı yapılarda",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "The attic is the space between the roof and the ceiling. It is typically used for technical equipment and ventilation systems.",
      tr: "Tavan arası, çatı ile tavan arasındaki boşluktur. Genellikle teknik ekipman ve havalandırma sistemleri için kullanılır.",
    },
  },
  {
    id: 19,
    category: "materials",
    question: {
      en: "What material are masonry system walls made of?",
      tr: "Kagir sistem duvarları hangi malzemeden yapılır?",
    },
    options: {
      en: [
        "Concrete",
        "Brick or block",
        "Wood",
        "Glass",
      ],
      tr: [
        "Beton",
        "Tuğla veya briket",
        "Ahşap",
        "Cam",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Masonry system walls are built by laying small units such as bricks or blocks and are load-bearing walls.",
      tr: "Kagir sistem duvarları, tuğla veya briket gibi küçük birimlerden örülerek yapılır ve yük taşıyıcı duvarlardır.",
    },
  },
  {
    id: 20,
    category: "durability",
    question: {
      en: "What is the lifespan of prefabricated structures?",
      tr: "Prefabrik yapıların ömrü ne kadardır?",
    },
    options: {
      en: [
        "5-10 years",
        "20-30 years",
        "50 years and above",
        "1-2 years",
      ],
      tr: [
        "5-10 yıl",
        "20-30 yıl",
        "50 yıl ve üzeri",
        "1-2 yıl",
      ],
    },
    correctAnswer: 2,
    explanation: {
      en: "Properly designed and constructed prefabricated structures have a lifespan of 50 years or more, and some can even last up to 100 years.",
      tr: "Doğru tasarlanmış ve inşa edilmiş prefabrik yapıların ömrü 50 yıl ve üzeridir, hatta bazıları 100 yıla kadar dayanabilir.",
    },
  },
];

export function getQuestions(locale: string) {
  return questions.map((q) => ({
    id: q.id,
    question: q.question[locale] ?? q.question.en,
    options: q.options[locale] ?? q.options.en,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation[locale] ?? q.explanation.en,
    category: q.category,
  }));
}

export type LocalizedQuestion = ReturnType<typeof getQuestions>[number];
