export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Prefabrik yapı nedir?",
    options: [
      "Şantiyede yerinde dökülen yapı",
      "Fabrikada ön üretim yapılarak şantiyede monte edilen yapı",
      "Ahşap malzemeyle inşa edilen yapı",
      "Betonarme olmayan yapı"
    ],
    correctAnswer: 1,
    explanation: "Prefabrik yapılar, fabrikada üretilen yapı elemanlarının şantiyede birleştirilmesiyle oluşturulan yapılardır. Bu yöntem hızlı ve kontrollü üretim sağlar."
  },
  {
    id: 2,
    question: "Prefabrik elemanların avantajları arasında hangisi yoktur?",
    options: [
      "Hızlı inşaat",
      "Düşük maliyet",
      "Kalite kontrolü",
      "Şantiyede daha fazla işçilik"
    ],
    correctAnswer: 3,
    explanation: "Prefabrik yapıların en büyük avantajı şantiyede daha az işçilik gerektirmesidir. Fabrikada kontrollü üretim sayesinde kalite artar."
  },
  {
    id: 3,
    question: "Taşıyıcı sistem türleri hangi sınıfa göre belirlenir?",
    options: [
      "Ekonomik duruma göre",
      "Yapının kullanım amacına göre",
      "Yüksekliğe göre",
      "Malzeme cinsine göre"
    ],
    correctAnswer: 1,
    explanation: "Taşıyıcı sistem türleri, yapının kullanım amacına (konut, endüstriyel, ticari vb.) göre belirlenir ve buna göre tasarlanır."
  },
  {
    id: 4,
    question: "Kolon-Kiriş sistemi ne tür yapılarda tercih edilir?",
    options: [
      "Konut yapılarında",
      "Endüstriyel ve ticari yapılarda",
      "Tarımsal yapılarda",
      "Müstakil evlerde"
    ],
    correctAnswer: 1,
    explanation: "Kolon-kiriş sistemi, büyük açıklıklar gerektiren endüstriyel ve ticari yapılarda tercih edilir çünkü esneklik ve dayanıklılık sağlar."
  },
  {
    id: 5,
    question: "Panel sistemi hangi tür yapılarda kullanılır?",
    options: [
      "Gökdelenlerde",
      "Okul ve hastane gibi yapılarda",
      "Sadece köprülerde",
      "Konutlarda ve işyerlerinde"
    ],
    correctAnswer: 3,
    explanation: "Panel sistemi, duvar ve döşeme panellerinin kullanıldığı konutlar, işyerleri ve çeşitli yapılarda yaygın olarak kullanılır."
  },
  {
    id: 6,
    question: "Çerçeve sistem nedir?",
    options: [
      "Duvar taşıyan sistem",
      "Kolon ve kirişlerin yükleri taşıdığı sistem",
      "Ahşap iskelet sistemi",
      "Temel sistemi"
    ],
    correctAnswer: 1,
    explanation: "Çerçeve sistem, kolon ve kirişlerin tüm yükleri taşıdığı ve duvar taşıyıcı olmayan bir taşıyıcı sistem türüdür."
  },
  {
    id: 7,
    question: "Endüstriyel yapıların en belirgin özelliği nedir?",
    options: [
      "Dekoratif görünüm",
      "Büyük açıklıklar ve yüksek tavanlar",
      "Küçük boyutlar",
      "Sadece tek katlı olması"
    ],
    correctAnswer: 1,
    explanation: "Endüstriyel yapılar genellikle büyük makinaların ve ekipmanların yerleştirilmesi için büyük açıklıklar ve yüksek tavanlara sahiptir."
  },
  {
    id: 8,
    question: "Tek katlı endüstriyel yapıların tavan yüksekliği kaç metredir?",
    options: [
      "3-4 metre",
      "5-6 metre",
      "8-10 metre ve üzeri",
      "2-3 metre"
    ],
    correctAnswer: 2,
    explanation: "Tek katlı endüstriyel yapılarda tavan yüksekliği genellikle 8-10 metre ve üzeridir, bu da büyük ekipmanların rahatça yerleştirilmesini sağlar."
  },
  {
    id: 9,
    question: "Çok katlı endüstriyel yapılarda hangi sistem kullanılır?",
    options: [
      "Kagir sistem",
      "Betonarme çerçeve sistem",
      "Ahşap sistem",
      "Çelik olmayan sistem"
    ],
    correctAnswer: 1,
    explanation: "Çok katlı endüstriyel yapılarda dayanıklılık ve güvenlik için betonarme çerçeve sistem tercih edilir."
  },
  {
    id: 10,
    question: "Özel tip endüstriyel yapılara örnek hangisidir?",
    options: [
      "Konutlar",
      "Okullar",
      "Silolar ve bunkeler",
      "Dükkanlar"
    ],
    correctAnswer: 2,
    explanation: "Silolar ve bunkeler, özel tip endüstriyel yapılara örnektir. Depolama amaçlı kullanılırlar."
  },
  {
    id: 11,
    question: "Yüksek yapıların taşıyıcı sistemi nasıl olmalıdır?",
    options: [
      "Zayıf ve esnek",
      "Rijit ve dayanıklı",
      "Sadece ahşap",
      "Geçici sistemler"
    ],
    correctAnswer: 1,
    explanation: "Yüksek yapıların taşıyıcı sistemi rijit ve dayanıklı olmalıdır, böylece rüzgar ve deprem gibi yüklere karşı direnç sağlar."
  },
  {
    id: 12,
    question: "Köprü ve viyadükler hangi sınıfa girer?",
    options: [
      "Endüstriyel yapılar",
      "Tek katlı yapılar",
      "Ulaşım yapıları",
      "Konut yapıları"
    ],
    correctAnswer: 2,
    explanation: "Köprü ve viyadükler, ulaşım yapıları sınıfına girer ve özel mühendislik gerektiren yapılardır."
  },
  {
    id: 13,
    question: "Deprem davranışı açısından en önemli faktör nedir?",
    options: [
      "Binanın rengi",
      "Taşıyıcı sistemin düzeni",
      "Binanın cephesi",
      "Pencerelerin boyutu"
    ],
    correctAnswer: 1,
    explanation: "Taşıyıcı sistemin düzeni, deprem davranışı açısından en önemli faktördür. Düzgün ve simetrik tasarım depremde daha güvenli olur."
  },
  {
    id: 14,
    question: "Temel tasarımında en önemli etken hangisidir?",
    options: [
      "Zemin cinsi",
      "Binanın rengi",
      "Çatı malzemesi",
      "Duvar kalınlığı"
    ],
    correctAnswer: 0,
    explanation: "Zemin cinsi, temel tasarımında en önemli etkendir. Zeminin taşıma kapasitesi temel tipini ve boyutlarını belirler."
  },
  {
    id: 15,
    question: "İzolasyon sistemleri hangi amaçla kullanılır?",
    options: [
      "Dekorasyon",
      "Ses ve ısı yalıtımı",
      "Maliyet artırma",
      "Görsel güzellik"
    ],
    correctAnswer: 1,
    explanation: "İzolasyon sistemleri, ses ve ısı yalıtımı için kullanılır. Bu sistemler enerji verimliliği ve konfor sağlar."
  },
  {
    id: 16,
    question: "Prefabrik yapılarda birleşim noktaları neden önemlidir?",
    options: [
      "Sadece görünüm için",
      "Yapısal bütünlük ve dayanıklılık için",
      "Maliyet düşürmek için",
      "Renk değişikliği için"
    ],
    correctAnswer: 1,
    explanation: "Prefabrik yapılarda birleşim noktaları, yapısal bütünlük ve dayanıklılık için kritik öneme sahiptir."
  },
  {
    id: 17,
    question: "Betonarme prefabrik elemanlarda donatı hangi amaçla kullanılır?",
    options: [
      "Ağırlık artırmak",
      "Çekme dayanımını artırmak",
      "Rengi değiştirmek",
      "Yüzeyi pürüzlü yapmak"
    ],
    correctAnswer: 1,
    explanation: "Donatı, betonda çekme dayanımını artırmak için kullanılır. Beton basınca dayanıklı, donatı ise çekmeye dayanıklıdır."
  },
  {
    id: 18,
    question: "Endüstriyel yapılarda tavan arası nerede bulunur?",
    options: [
      "Bodrum katta",
      "Çatı ile tavan arasında",
      "Temelde",
      "Sadece çok katlı yapılarda"
    ],
    correctAnswer: 1,
    explanation: "Tavan arası, çatı ile tavan arasındaki boşluktur. Genellikle teknik ekipman ve havalandırma sistemleri için kullanılır."
  },
  {
    id: 19,
    question: "Kagir sistem duvarları hangi malzemeden yapılır?",
    options: [
      "Beton",
      "Tuğla veya briket",
      "Ahşap",
      "Cam"
    ],
    correctAnswer: 1,
    explanation: "Kagir sistem duvarları, tuğla veya briket gibi küçük birimlerden örülerek yapılır ve yük taşıyıcı duvarlardır."
  },
  {
    id: 20,
    question: "Prefabrik yapıların ömrü ne kadardır?",
    options: [
      "5-10 yıl",
      "20-30 yıl",
      "50 yıl ve üzeri",
      "1-2 yıl"
    ],
    correctAnswer: 2,
    explanation: "Doğru tasarlanmış ve inşa edilmiş prefabrik yapıların ömrü 50 yıl ve üzeridir, hatta bazıları 100 yıla kadar dayanabilir."
  }
];
