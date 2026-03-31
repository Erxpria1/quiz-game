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
      en: "According to the lecture notes, how are precast concrete elements handled on the construction site?",
      tr: "Ders notlarına göre, prekast beton elemanlar şantiyede nasıl işleme alınır?",
    },
    options: {
      en: [
        "They are cast and cured directly in their final position",
        "They are lifted into place and assembled into structural assemblies",
        "They are only used for non-structural decorative purposes",
        "They are always cast onsite using temporary formwork",
      ],
      tr: [
        "Doğrudan nihai konumlarında dökülür ve kürlenirler",
        "Yerlerine kaldırılarak yapısal gruplar halinde monte edilirler",
        "Sadece yapısal olmayan dekoratif amaçlarla kullanılırlar",
        "Her zaman geçici kalıplar kullanılarak yerinde dökülürler",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "As per Slide 4, precast elements are manufactured in a plant, transported, then lifted and assembled on-site, similar to structural steel.",
      tr: "Slayt 4'e göre, prekast elemanlar fabrikada üretilir, taşınır ve ardından çelik yapılara benzer bir süreçle şantiyede kaldırılıp monte edilir.",
    },
  },
  {
    id: 2,
    category: "advantages",
    question: {
      en: "Which of the following is cited as a reason for improved quality in precast structures?",
      tr: "Aşağıdakilerden hangisi prekast yapılarda kalitenin artmasının bir nedeni olarak gösterilmiştir?",
    },
    options: {
      en: [
        "Increased use of manual labor on-site",
        "Production in an indoor environment with better working conditions",
        "Use of natural wooden moulds for all elements",
        "Dependency on weather conditions during casting",
      ],
      tr: [
        "Şantiyede manuel işçilik kullanımının artması",
        "Daha iyi çalışma koşullarına sahip kapalı bir ortamda üretim",
        "Tüm elemanlar için doğal ahşap kalıpların kullanılması",
        "Döküm sırasında hava koşullarına bağımlılık",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 10 highlights that production in an indoor environment results in better working conditions and higher productivity/quality.",
      tr: "Slayt 10, kapalı bir ortamda üretimin daha iyi çalışma koşulları, daha yüksek verim ve kalite sağladığını vurgular.",
    },
  },
  {
    id: 3,
    category: "advantages",
    question: {
      en: "How does precasting contribute to lower production costs regarding material savings?",
      tr: "Prekast üretim, malzeme tasarrufu açısından üretim maliyetlerinin düşmesine nasıl katkı sağlar?",
    },
    options: {
      en: [
        "By using thicker rectangular sections for all loads",
        "By using thin component cross-sections like double-T or hollow-core",
        "By avoiding the use of reinforcement steel",
        "By increasing the radius of the precasting plant",
      ],
      tr: [
        "Tüm yükler için daha kalın dikdörtgen kesitler kullanarak",
        "Çift-T veya boşluklu döşeme gibi ince bileşenli kesitler kullanarak",
        "Donatı çeliği kullanımından kaçınarak",
        "Prefabrik üretim tesisinin yarıçapını artırarak",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 11 explains that material savings arise from using thin cross-sections like double-T, T-sections, or hollow-core slabs instead of solid slabs.",
      tr: "Slayt 11, masif plaklar yerine çift-T, T-kesitleri veya boşluklu döşemeler gibi ince kesitlerin kullanılmasıyla malzeme tasarrufu sağlandığını açıklar.",
    },
  },
  {
    id: 4,
    category: "disadvantages",
    question: {
      en: "Which of the following is a disadvantage of precast structures?",
      tr: "Aşağıdakilerden hangisi prekast yapıların olumsuz yanlarından biridir?",
    },
    options: {
      en: [
        "Fast construction time",
        "Need for large cranes to lift heavy panels",
        "Low maintenance costs",
        "Better quality control",
      ],
      tr: [
        "Hızlı inşaat süresi",
        "Ağır panelleri kaldırmak için büyük vinçlere ihtiyaç duyulması",
        "Düşük bakım maliyetleri",
        "Daha iyi kalite kontrolü",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 15 lists 'Very heavy members' and 'Cranes are required to lift panels' as primary disadvantages.",
      tr: "Slayt 15, 'Oldukça ağır elemanlar' ve 'Panelleri kaldırmak için vinç gerekliliği'ni temel dezavantajlar olarak listeler.",
    },
  },
  {
    id: 5,
    category: "history",
    question: {
      en: "In which year did the first serious trials with structural precast reinforced concrete take place?",
      tr: "Yapısal prekast betonarme ile ilk ciddi denemeler hangi yılda gerçekleşmiştir?",
    },
    options: {
      en: ["1850", "1891", "1945", "1960"],
      tr: ["1850", "1891", "1945", "1960"],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 16 states that trials took place around 1900, specifically mentioning Coignet's casino in 1891.",
      tr: "Slayt 16, denemelerin 1900'ler civarında başladığını ve özellikle 1891'deki Coignet kumarhanesini belirtir.",
    },
  },
  {
    id: 6,
    category: "classification",
    question: {
      en: "Which precast system type involves vertical and horizontal elements that are both load-bearing?",
      tr: "Hangi prekast sistem tipinde hem dikey hem de yatay elemanların her ikisi de taşıyıcıdır?",
    },
    options: {
      en: [
        "Frame systems",
        "Large-panel systems",
        "Lift-Slab systems",
        "Skeletal frames",
      ],
      tr: [
        "Çerçeve sistemler",
        "Büyük panel sistemler",
        "Döşeme kaldırmalı (Lift-Slab) sistemler",
        "İskelet sistemler",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 19 defines Large-panel systems as those where both vertical and horizontal elements are load-bearing.",
      tr: "Slayt 19, Büyük panel sistemleri hem dikey hem de yatay elemanların taşıyıcı olduğu sistemler olarak tanımlar.",
    },
  },
  {
    id: 7,
    category: "structural-systems",
    question: {
      en: "What is a characteristic of 'Cell systems' (Hücre sistemler)?",
      tr: "'Hücre sistemlerin' (Cell systems) bir özelliği nedir?",
    },
    options: {
      en: [
        "They only consist of linear beams",
        "They consist of closed or open cell elements (three-dimensional)",
        "They are always cast onsite",
        "They cannot be used for multi-story buildings",
      ],
      tr: [
        "Sadece doğrusal kirişlerden oluşurlar",
        "Kapalı veya açık hücre elemanlarından (üç boyutlu) oluşurlar",
        "Her zaman yerinde dökülürler",
        "Çok katlı binalar için kullanılamazlar",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 24 illustrates cell systems as closed or open three-dimensional units used in construction.",
      tr: "Slayt 24, hücre sistemlerini inşaatta kullanılan kapalı veya açık üç boyutlu birimler olarak gösterir.",
    },
  },
  {
    id: 8,
    category: "structural-systems",
    question: {
      en: "In 'Lift-Slab' systems, where are the slabs typically cast?",
      tr: "'Lift-Slab' (Döşeme kaldırmalı) sistemlerde, döşemeler tipik olarak nerede dökülür?",
    },
    options: {
      en: [
        "In a remote factory only",
        "On the ground, one on top of the other",
        "Directly at their final floor height",
        "In a temporary onsite furnace",
      ],
      tr: [
        "Sadece uzak bir fabrikada",
        "Zeminde, biri diğerinin üstünde",
        "Doğrudan nihai kat yüksekliklerinde",
        "Geçici bir saha fırınında",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 28 states that in Lift-Slab systems, slabs are cast on the ground (one on top of the other) then lifted with cranes or elevators.",
      tr: "Slayt 28, Lift-Slab sistemlerinde döşemelerin zeminde (üst üste) döküldüğünü ve ardından vinçlerle kaldırıldığını belirtir.",
    },
  },
  {
    id: 9,
    category: "industrial",
    question: {
      en: "Which of the following is a key factor in planning the traffic route for precast shipments?",
      tr: "Prekast sevkiyatları için ulaşım güzergahı planlamasında temel faktörlerden biri hangisidir?",
    },
    options: {
      en: [
        "The color of the transporter vehicle",
        "The maximum vertical extension (gabari) of the shipment",
        "The speed of the crane on-site",
        "The number of workers at the plant",
      ],
      tr: [
        "Nakliye aracının rengi",
        "Sevkiyatın maksimum düşey yüksekliği (gabari)",
        "Şantiyedeki vincin hızı",
        "Fabrikadaki işçi sayısı",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 31 lists 'maximum vertical extension (gabari)' as a critical planning factor for traffic routes.",
      tr: "Slayt 31, ulaşım güzergahları için 'maksimum düşey yükseklik (gabari)' değerini kritik bir planlama faktörü olarak listeler.",
    },
  },
  {
    id: 10,
    category: "earthquake",
    question: {
      en: "Regarding the position of cores/shear walls, which layout is generally considered 'bad' for building stability?",
      tr: "Çekirdek/perde duvarların konumuyla ilgili olarak, bina stabilitesi için genellikle hangi yerleşim 'kötü' kabul edilir?",
    },
    options: {
      en: [
        "Centrally located cores",
        "Symmetrical layouts",
        "Asymmetrical or eccentric layouts (e.g., core at one far end)",
        "Distributing cores evenly across the plan",
      ],
      tr: [
        "Merkezi konumlu çekirdekler",
        "Simetrik yerleşimler",
        "Asimetrik veya eksantrik yerleşimler (örneğin, çekirdek bir uçta)",
        "Çekirdeklerin plana eşit şekilde dağıtılması",
      ],
    },
    correctAnswer: 2,
    explanation: {
      en: "Slide 32 illustrates that asymmetrical positions of cores (like examples 'e' and 'f') are 'bad' for building plan stability.",
      tr: "Slayt 32, çekirdeklerin asimetrik konumlarının ('e' ve 'f' örnekleri gibi) bina plan stabilitesi için 'kötü' olduğunu gösterir.",
    },
  },
  {
    id: 11,
    category: "structural-systems",
    question: {
      en: "What role do roof and floor elements play in the structural system's force paths?",
      tr: "Çatı ve döşeme elemanlarının taşıyıcı sistemin yük yörüngesindeki (force paths) rolü nedir?",
    },
    options: {
      en: [
        "They only provide insulation",
        "They resist vertical loads and transfer them to beams and columns",
        "They are only responsible for horizontal forces",
        "They have no role in transferring loads to the foundation",
      ],
      tr: [
        "Sadece yalıtım sağlarlar",
        "Düşey yüklere direnir ve bunları kiriş ile kolonlara aktarırlar",
        "Sadece yatay kuvvetlerden sorumludurlar",
        "Yüklerin temele aktarılmasında hiçbir rolleri yoktur",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 33 states that vertical loads are resisted by roof and floor elements, beams, and supporting elements.",
      tr: "Slayt 33, düşey yüklerin çatı ve döşeme elemanları, kirişler ve taşıyıcı elemanlar tarafından karşılandığını belirtir.",
    },
  },
  {
    id: 12,
    category: "components",
    question: {
      en: "Which type of precast slab uses large, hollow plastic balls to reduce weight?",
      tr: "Hangi prekast döşeme tipi ağırlığı azaltmak için büyük, içi boş plastik toplar kullanır?",
    },
    options: {
      en: ["Hollow core slab", "Double Tee beam", "Bubble Deck", "Solid flat slab"],
      tr: ["Boşluklu döşeme", "Çift T kiriş", "Balonlu Döşeme (Bubble Deck)", "Masif plak döşeme"],
    },
    correctAnswer: 2,
    explanation: {
      en: "Slide 52 defines 'Bubble Deck' as a system that makes floor slabs lighter by incorporating large, hollow plastic balls in a lattice of steel.",
      tr: "Slayt 52, 'Bubble Deck'i (Balonlu Döşeme), çelik bir kafes içine büyük, içi boş plastik toplar yerleştirerek döşeme plakalarını hafifleten bir sistem olarak tanımlar.",
    },
  },
  {
    id: 13,
    category: "advantages",
    question: {
      en: "What is a reported advantage of the Bubble Deck system?",
      tr: "Bubble Deck (Balonlu döşeme) sisteminin bildirilen bir avantajı nedir?",
    },
    options: {
      en: [
        "Increased weight by 40%",
        "Need for more beams",
        "Reduction in CO2 emission and sustainability",
        "Slower construction time",
      ],
      tr: [
        "Ağırlığın %40 artması",
        "Daha fazla kirişe ihtiyaç duyulması",
        "CO2 emisyonunda azalma ve sürdürülebilirlik",
        "Daha yavaş inşaat süresi",
      ],
    },
    correctAnswer: 2,
    explanation: {
      en: "Slide 53 lists 'Reducing CO2 emission, sustainability' and 'Less weight (%40)' as advantages of Bubble Deck.",
      tr: "Slayt 53, Bubble Deck'in avantajları arasında 'CO2 emisyonunun azaltılması, sürdürülebilirlik' ve '%40 daha az ağırlık' maddelerini listeler.",
    },
  },
  {
    id: 14,
    category: "structural-systems",
    question: {
      en: "Which frame system variant is shown as having a 'Pinned connection of beam end'?",
      tr: "Hangi çerçeve sistem varyantı 'kiriş ucunda mafsallı birleşim' (pinned connection) şeklinde gösterilmiştir?",
    },
    options: {
      en: ["Ters U Sistemler", "L Sistemler", "H Sistemler", "Monolithic systems"],
      tr: ["Ters U Sistemler", "L Sistemler", "H Sistemler", "Monolitik sistemler"],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 58 shows that 'L Sistemler' typically involve a pinned connection of the beam end to the column.",
      tr: "Slayt 58, 'L Sistemler'in tipik olarak kiriş ucunun kolona mafsallı birleşimini içerdiğini gösterir.",
    },
  },
  {
    id: 15,
    category: "components",
    question: {
      en: "What are the common cross-section shapes for precast beams mentioned in the notes?",
      tr: "Ders notlarında prekast kirişler için bahsedilen yaygın kesit şekilleri nelerdir?",
    },
    options: {
      en: [
        "Only Circular and Triangular",
        "Rectangular, L-shaped, Inverted Tee, and AASHTO",
        "Only Solid Square",
        "Hollow spheres and Hexagons",
      ],
      tr: [
        "Sadece Dairesel ve Üçgen",
        "Dikdörtgen, L-şekilli, Ters T ve AASHTO",
        "Sadece Masif Kare",
        "İçi boş küreler ve Altıgenler",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 63 illustrates Rectangular, L-shaped, Inverted Tee, and AASHTO beams as standard precast beam types.",
      tr: "Slayt 63; Dikdörtgen, L-şekilli, Ters T ve AASHTO kirişlerini standart prekast kiriş tipleri olarak gösterir.",
    },
  },
  {
    id: 16,
    category: "connections",
    question: {
      en: "What material is typically used as a 'pad' in precast structure supports to allow for rotation and loads?",
      tr: "Prekast yapı mesnetlerinde dönme ve yüklere izin vermek için tipik olarak 'ped' (pad) olarak hangi malzeme kullanılır?",
    },
    options: {
      en: ["Hard steel plates", "Neoprene or rubber", "Dry sand", "Wooden blocks"],
      tr: ["Sert çelik plakalar", "Neopren veya kauçuk", "Kuru kum", "Ahşap bloklar"],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 67 identifies 'Neoprene pad' and 'Neoprene rubber bearing' as components used in precast beam-to-column supports.",
      tr: "Slayt 67, prekast kiriş-kolon mesnetlerinde kullanılan bileşenler olarak 'Neopren ped' ve 'Neopren kauçuk yatak'ı tanımlar.",
    },
  },
  {
    id: 17,
    category: "structural-systems",
    question: {
      en: "In a precast frame system, what is the 'Corbel' used for?",
      tr: "Prekast çerçeve sisteminde 'Kısa Konsol' (Corbel) ne için kullanılır?",
    },
    options: {
      en: [
        "To provide thermal insulation",
        "To support the seating of beams on the pillars (columns)",
        "To serve as a decorative roof element",
        "To increase the height of the foundation",
      ],
      tr: [
        "Isı yalıtımı sağlamak için",
        "Kirişlerin kolonlara (pillars) oturmasını desteklemek için",
        "Dekoratif bir çatı elemanı olarak görev yapmak için",
        "Temel yüksekliğini artırmak için",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 26 and 65 mention that beams are seated on corbels of the pillars, often with hinged or rigid joints.",
      tr: "Slayt 26 ve 65, kirişlerin genellikle mafsallı veya rijit birleşimlerle kolonların kısa konsollarına (corbels) oturtulduğunu belirtir.",
    },
  },
  {
    id: 18,
    category: "advantages",
    question: {
      en: "Which sustainability aspect is mentioned regarding precast structures?",
      tr: "Prekast yapılarla ilgili hangi sürdürülebilirlik yönünden bahsedilmiştir?",
    },
    options: {
      en: [
        "Thermal mass / energy storage and less wastage",
        "Increased use of single-use plastic",
        "Higher noise pollution during construction",
        "Difficulty in recycling components",
      ],
      tr: [
        "Termal kütle / enerji depolaması ve daha az atık",
        "Tek kullanımlık plastik kullanımının artması",
        "İnşaat sırasında daha yüksek gürültü kirliliği",
        "Bileşenlerin geri dönüştürülmesindeki zorluk",
      ],
    },
    correctAnswer: 0,
    explanation: {
      en: "Slide 14 lists Thermal mass, less wastage, and the ability to reuse/recycle as sustainability advantages.",
      tr: "Slayt 14; termal kütle, daha az atık ve yeniden kullanım/geri dönüşüm yeteneğini sürdürülebilirlik avantajları olarak listeler.",
    },
  },
  {
    id: 19,
    category: "history",
    question: {
      en: "What characterized the second phase (1960-1973) of precast development?",
      tr: "Prekast gelişiminin ikinci aşaması (1960-1973) ne ile karakterize edilmiştir?",
    },
    options: {
      en: [
        "A decline in housing demand",
        "Growth in prosperity leading to high-standard owner-occupied housing",
        "The first invention of reinforced concrete",
        "The transition to only using wooden structures",
      ],
      tr: [
        "Konut talebinde düşüş",
        "Refah artışıyla birlikte yüksek standartlı mülk sahibi konutlarına yönelim",
        "Betonarmenin ilk icadı",
        "Sadece ahşap yapıların kullanımına geçiş",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 17 notes that between 1960 and 1973, growing prosperity led to a rise in demand for higher standard housing.",
      tr: "Slayt 17, 1960-1973 yılları arasında artan refahın daha yüksek standartlı konut talebinde artışa yol açtığını belirtir.",
    },
  },
  {
    id: 20,
    category: "structural-systems",
    question: {
      en: "What is 'Diaphragm Action' in the context of precast floors?",
      tr: "Prekast döşemeler bağlamında 'Diyafram Etkisi' (Diaphragm Action) nedir?",
    },
    options: {
      en: [
        "The movement of air through hollow cores",
        "The ability of the floor to transfer horizontal forces to stabilizing units",
        "The process of lifting slabs during construction",
        "The acoustic insulation property of the slab",
      ],
      tr: [
        "Havanın boşluklu kanallardan hareketi",
        "Döşemenin yatay kuvvetleri dengeleyici birimlere aktarma yeteneği",
        "İnşaat sırasında döşemelerin kaldırılması süreci",
        "Döşemenin akustik yalıtım özelliği",
      ],
    },
    correctAnswer: 1,
    explanation: {
      en: "Slide 37 and 38 explain that diaphragm action in floors helps in the stabilization of the structure by transferring forces.",
      tr: "Slayt 37 ve 38, döşemelerdeki diyafram etkisinin kuvvetleri aktararak yapının stabilizasyonuna yardımcı olduğunu açıklar.",
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
