/**
 * THE single source of truth for the book catalogue.
 *
 * Rules:
 *  - Fill in only verified facts. Optional fields that are empty are simply not shown to visitors.
 *  - `price` is shown only when present. No price = no price on the site.
 *  - `samplePdf` (put the file in /public/samples/) enables the sample-pages action.
 *  - `contents` (full table of contents, optional) enables the "სარჩევი" section.
 *  - `slug` becomes the URL: /books/<slug>. Keep it unique, lowercase, latin, hyphenated.
 *
 * Cover files live in /public/images/books/ as <base>-800.webp and <base>-1400.webp.
 * They are resize-only exports of the original cover artwork (masters: /brand-source/covers/).
 */

export type BookStatus = 'in-preparation' | 'sample-available' | 'available'

export interface BookCoverImage {
  src: string
  srcSet: string
  alt: string
  /** Intrinsic pixel size of the original artwork (used only for the aspect ratio). */
  width: number
  height: number
}

export interface BookPart {
  /** Roman numeral of the part, as printed on the cover material. */
  numeral: string
  title: string
  /** e.g. "თავები 1-10" */
  chapters?: string
}

export interface Book {
  id: string
  slug: string
  /** Roman numeral of the volume, as on the cover. */
  volume: string
  title: string
  subtitle?: string
  /** One or two sentences for the catalogue. */
  summary?: string
  /** Paragraphs for the book page. */
  description?: string[]
  audience?: string[]
  objectives?: string[]
  topics?: string[]
  /** Parts of the volume with chapter ranges. */
  parts?: BookPart[]
  /** Full table of contents (optional, not yet supplied). */
  contents?: { title: string; items?: string[] }[]
  status: BookStatus
  cover?: BookCoverImage
  samplePdf?: string
  price?: { amount: number; currency: '₾' }
}

/** The three volumes share one series identity, printed on every cover. */
export const series = {
  title: 'პითონი',
  tagline: 'ნულიდან პროექტებამდე და ოლიმპიადამდე',
  label: 'სრული სახელმძღვანელო ქართულად',
}

const coverOf = (base: string, alt: string): BookCoverImage => ({
  src: `/images/books/${base}-1400.webp`,
  srcSet: `/images/books/${base}-800.webp 800w, /images/books/${base}-1400.webp 1400w`,
  alt,
  width: 2448,
  height: 3435,
})

export const books: Book[] = [
  {
    id: 'python-1',
    slug: 'python-1-pitonis-safudzvlebi',
    volume: 'I',
    title: 'პითონის საფუძვლები',
    subtitle: 'ნულიდან ობიექტებამდე, ფაილებამდე და ტესტირებამდე',
    summary:
      'სამტომეულის პირველი ტომი პროგრამირებას ნულიდან გასწავლის. პირველი გვერდიდან ბოლომდე ყველა პროგრამა ნამდვილად გაშვებულია, მისი შედეგი კი შემოწმებული.',
    description: [
      'სამტომეულის პირველი ტომი პროგრამირებას ნულიდან გასწავლის. პირველი გვერდიდან ბოლომდე ყველა პროგრამა ნამდვილად გაშვებულია, მისი შედეგი კი შემოწმებული.',
      'ცვლადებიდან და ციკლებიდან კლასებამდე, ფაილებამდე და ტესტირებამდე: ყოველი თავი ერთ ჩარჩოს მისდევს. მასში არის მიზნები, ახსნა, მაგალითები, ხშირი შეცდომები, სავარჯიშოები სამ დონეზე და გამეორების კითხვები.',
    ],
    audience: ['დამწყებისთვის და მათთვის, ვინც C++ იცის და პითონის გაცნობა სურს.'],
    topics: ['ცვლადები და ციკლები', 'ფუნქციები და კოდის ორგანიზება', 'ობიექტზე ორიენტირებული პროგრამირება', 'ფაილები და სტანდარტული ბიბლიოთეკა', 'ტესტირება'],
    parts: [
      { numeral: 'I', title: 'საფუძვლები', chapters: 'თავები 1-10' },
      { numeral: 'II', title: 'ფუნქციები და კოდის ორგანიზება', chapters: 'თავები 11-16' },
      { numeral: 'III', title: 'ობიექტზე ორიენტირებული პროგრამირება', chapters: 'თავები 17-22' },
      { numeral: 'IV', title: 'ფაილები და სტანდარტული ბიბლიოთეკა', chapters: 'თავები 23-28' },
    ],
    status: 'in-preparation',
    cover: coverOf('python-1-pitonis-safudzvlebi', 'პითონი, I ტომი — „პითონის საფუძვლები“. წიგნის გარეკანი'),
  },
  {
    id: 'python-2',
    slug: 'python-2-algoritmebi-da-monacemta-damushaveba',
    volume: 'II',
    title: 'ალგორითმები და მონაცემთა დამუშავება',
    subtitle: 'ოლიმპიადური პითონი, numpy, pandas და ვიზუალიზაცია',
    summary: 'მეორე ტომში პითონი ორ დიდ საქმეს ემსახურება: ოლიმპიადურ ამოცანებსა და მონაცემთა დამუშავებას.',
    description: [
      'მეორე ტომში პითონი ორ დიდ საქმეს ემსახურება: ოლიმპიადურ ამოცანებსა და მონაცემთა დამუშავებას.',
      'V ნაწილი სირთულის შეფასებით იწყება და დახარისხებას, გრაფებს, დინამიურ პროგრამირებას, ხეებსა და DSU-ს გადის. სწრაფი ამოხსნის ნელ, მაგრამ აშკარად სწორ ამოხსნასთან შედარებას აქ საკუთარი სტრეს-ტესტი ამოწმებს.',
      'VI ნაწილში numpy-ით, pandas-ითა და matplotlib-ით მონაცემებს დავამუშავებთ და გრაფიკებად ვაქცევთ, ინტერნეტიდან მონაცემების მიღებასაც ვისწავლით.',
      'ტომი პირველი ტომის ცოდნას ეყრდნობა.',
    ],
    topics: ['სირთულის შეფასება', 'დახარისხება', 'გრაფები', 'დინამიური პროგრამირება', 'ხეები და DSU', 'სტრეს-ტესტი', 'numpy, pandas და matplotlib', 'მონაცემების მიღება ინტერნეტიდან'],
    parts: [
      { numeral: 'V', title: 'ალგორითმები პითონზე', chapters: 'თავები 29-38' },
      { numeral: 'VI', title: 'მონაცემთა დამუშავება', chapters: 'თავები 39-42' },
    ],
    status: 'in-preparation',
    cover: coverOf('python-2-algoritmebi-da-monacemta-damushaveba', 'პითონი, II ტომი — „ალგორითმები და მონაცემთა დამუშავება“. წიგნის გარეკანი'),
  },
  {
    id: 'python-3',
    slug: 'python-3-veb-avtomatizacia-da-proeqtebi',
    volume: 'III',
    title: 'ვებ, ავტომატიზაცია და პროექტები',
    subtitle: 'სკრიპტებიდან Flask-ამდე და სამ სრულ პროექტამდე',
    summary: 'მესამე ტომი სამტომეულის პრაქტიკული ფინალია: აქ ნასწავლი პითონი რეალურ პროგრამებად იქცევა.',
    description: [
      'მესამე ტომი სამტომეულის პრაქტიკული ფინალია: აქ ნასწავლი პითონი რეალურ პროგრამებად იქცევა.',
      'VII ნაწილში ავტომატიზაციის სკრიპტებს ვწერთ, Flask-ით ვებ-აპლიკაციას ვაშენებთ, SQLite ბაზასთან ვმუშაობთ და Telegram-ბოტს ვქმნით.',
      'VIII ნაწილში სამი სრული პროექტი გველის: ტექსტური თავგადასავლის თამაში, ხარჯების მართვის აპლიკაცია და ოლიმპიადური ამოცანების ავტომატური ტესტერი. ბოლო თავი კოდის ხარისხს, Git-სა და შემდგომ გზას ეძღვნება.',
      'ტომი პირველი ტომის ცოდნას ეყრდნობა.',
    ],
    topics: ['ავტომატიზაციის სკრიპტები', 'Flask-ით ვებ-აპლიკაცია', 'SQLite ბაზა', 'Telegram-ბოტი', 'ტექსტური თავგადასავლის თამაში', 'ხარჯების მართვის აპლიკაცია', 'ოლიმპიადური ამოცანების ავტომატური ტესტერი', 'კოდის ხარისხი და Git'],
    parts: [
      { numeral: 'VII', title: 'ვებ და ავტომატიზაცია', chapters: 'თავები 43-46' },
      { numeral: 'VIII', title: 'დასკვნითი პროექტები', chapters: 'თავები 47-50' },
    ],
    status: 'in-preparation',
    cover: coverOf('python-3-veb-avtomatizacia-da-proeqtebi', 'პითონი, III ტომი — „ვებ, ავტომატიზაცია და პროექტები“. წიგნის გარეკანი'),
  },
]

export const statusLabels: Record<BookStatus, string> = {
  'in-preparation': 'მზადდება',
  'sample-available': 'ნიმუში ხელმისაწვდომია',
  available: 'ხელმისაწვდომია',
}

export const volumeLabel = (b: Book) => `${series.title} · ${b.volume} ტომი`
export const findBook = (slug: string | undefined) => books.find((b) => b.slug === slug)
