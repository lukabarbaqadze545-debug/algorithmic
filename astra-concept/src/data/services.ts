import type { L10n, L10nList } from '../i18n/types'
import type { PriceId } from './clinic'

export type ServiceId =
  | 'general' | 'implants' | 'orthodontics' | 'pediatric' | 'surgery'
  | 'whitening' | 'prosthetics' | 'diagnostics' | 'periodontology'

export type GroupId = 'everyday' | 'restorative' | 'aesthetic' | 'children'

export interface Service {
  id: ServiceId
  group: GroupId
  name: L10n
  summary: L10n
  includes: L10nList
  /** Stems used by the concierge to recognise the service in free text (any language). */
  keywords: string[]
  prices?: PriceId[]
}

/**
 * Service areas come from the sales brief. The descriptions below are neutral, generic
 * copy written for this concept. They make no outcome claims and must be replaced or
 * approved by the clinic before any real use.
 */
export const services: Service[] = [
  {
    id: 'general',
    group: 'everyday',
    name: { en: 'General dentistry', ka: 'ზოგადი სტომატოლოგია', ru: 'Терапевтическая стоматология' },
    summary: {
      en: 'Routine and restorative care for everyday dental needs, including caries treatment and fillings.',
      ka: 'ყოველდღიური სტომატოლოგიური საჭიროებების მკურნალობა, მათ შორის კარიესის მკურნალობა და პლომბირება.',
      ru: 'Лечение зубов при повседневных обращениях, в том числе лечение кариеса и пломбирование.',
    },
    includes: {
      en: ['Examination and consultation', 'Caries treatment and fillings', 'Endodontic (root canal) treatment', 'Crown restoration after endodontic treatment'],
      ka: ['გასინჯვა და კონსულტაცია', 'კარიესის მკურნალობა და პლომბირება', 'ენდოდონტიური მკურნალობა (არხების მკურნალობა)', 'გვირგვინით აღდგენა ენდოდონტიური მკურნალობის შემდეგ'],
      ru: ['Осмотр и консультация', 'Лечение кариеса и пломбирование', 'Эндодонтическое лечение (лечение каналов)', 'Восстановление коронкой после эндодонтического лечения'],
    },
    keywords: ['general', 'caries', 'cavity', 'cavities', 'filling', 'root canal', 'endodon', 'ზოგად', 'კარიეს', 'პლომბ', 'არხ', 'терапев', 'кариес', 'пломб', 'канал', 'эндодонт'],
    prices: ['filling', 'endo1', 'endo34'],
  },
  {
    id: 'implants',
    group: 'restorative',
    name: { en: 'Dental implants', ka: 'სტომატოლოგიური იმპლანტები', ru: 'Дентальная имплантация' },
    summary: {
      en: 'Replacement of missing teeth with implant-supported restorations. Suitability and the treatment plan are decided after examination.',
      ka: 'ჩაკარგული კბილების აღდგენა იმპლანტებზე დაყრდნობილი კონსტრუქციებით. შესაფერისობას და მკურნალობის გეგმას გასინჯვის შემდეგ განსაზღვრავს ექიმი.',
      ru: 'Восстановление отсутствующих зубов с опорой на импланты. Возможность лечения и его план определяются после осмотра.',
    },
    includes: {
      en: ['Consultation and treatment planning', 'Implant placement', 'Restoration on the implant'],
      ka: ['კონსულტაცია და მკურნალობის დაგეგმვა', 'იმპლანტის ჩადგმა', 'იმპლანტზე კონსტრუქციის დამზადება'],
      ru: ['Консультация и планирование лечения', 'Установка импланта', 'Протезирование на импланте'],
    },
    keywords: ['implant', 'იმპლანტ', 'имплант'],
  },
  {
    id: 'orthodontics',
    group: 'aesthetic',
    name: { en: 'Orthodontics', ka: 'ორთოდონტია', ru: 'Ортодонтия' },
    summary: {
      en: 'Care for bite and tooth alignment. Options are discussed at the consultation.',
      ka: 'კბილთა თანკბილვისა და განლაგების მკურნალობა. შესაძლო ვარიანტებს კონსულტაციაზე განიხილავთ.',
      ru: 'Лечение прикуса и положения зубов. Возможные варианты обсуждаются на консультации.',
    },
    includes: {
      en: ['Orthodontic consultation', 'Treatment planning', 'Fitting of the chosen appliance and follow-up visits'],
      ka: ['ორთოდონტის კონსულტაცია', 'მკურნალობის დაგეგმვა', 'არჩეული აპარატის მორგება და განმეორებითი ვიზიტები'],
      ru: ['Консультация ортодонта', 'Планирование лечения', 'Установка выбранной аппаратуры и контрольные визиты'],
    },
    keywords: ['orthodon', 'braces', 'bite', 'aligner', 'ორთოდონტ', 'ბრეკეტ', 'თანკბილვ', 'ортодонт', 'брекет', 'прикус', 'элайнер'],
  },
  {
    id: 'pediatric',
    group: 'children',
    name: { en: 'Pediatric dentistry', ka: 'საბავშვო სტომატოლოგია', ru: 'Детская стоматология' },
    summary: {
      en: 'Dental care for children, from check-ups to treatment.',
      ka: 'ბავშვთა კბილების მოვლა და მკურნალობა — პროფილაქტიკური გასინჯვიდან მკურნალობამდე.',
      ru: 'Стоматологическая помощь детям — от профилактических осмотров до лечения.',
    },
    includes: {
      en: ['Check-ups for children', 'Treatment of baby and permanent teeth', 'Home-care guidance for parents'],
      ka: ['ბავშვთა პროფილაქტიკური გასინჯვა', 'რძისა და მუდმივი კბილების მკურნალობა', 'რჩევები მშობლებს ყოველდღიური მოვლის შესახებ'],
      ru: ['Профилактические осмотры детей', 'Лечение молочных и постоянных зубов', 'Рекомендации родителям по домашнему уходу'],
    },
    keywords: ['pediatr', 'paediatr', 'child', 'kid', 'baby', 'ბავშვ', 'საბავშვ', 'ребен', 'ребён', 'дет'],
  },
  {
    id: 'surgery',
    group: 'restorative',
    name: { en: 'Oral surgery', ka: 'ორალური ქირურგია', ru: 'Хирургическая стоматология' },
    summary: {
      en: 'Surgical procedures in the mouth, planned and explained in advance.',
      ka: 'პირის ღრუს ქირურგიული ჩარევები, რომლებიც წინასწარ იგეგმება და განიმარტება.',
      ru: 'Хирургические вмешательства в полости рта, которые планируются и объясняются заранее.',
    },
    includes: {
      en: ['Consultation and examination', 'Tooth extraction when required', 'Other procedures as advised by the surgeon'],
      ka: ['კონსულტაცია და გასინჯვა', 'კბილის ამოღება საჭიროების შემთხვევაში', 'სხვა ჩარევები ქირურგის რეკომენდაციით'],
      ru: ['Консультация и осмотр', 'Удаление зуба при необходимости', 'Другие вмешательства по рекомендации хирурга'],
    },
    keywords: ['surgery', 'surgeon', 'extract', 'ქირურგ', 'ამოღებ', 'хирург', 'удален'],
  },
  {
    id: 'whitening',
    group: 'aesthetic',
    name: { en: 'Teeth whitening', ka: 'კბილების გათეთრება', ru: 'Отбеливание зубов' },
    summary: {
      en: 'Professional treatment to lighten the shade of the teeth. Suitability is checked first.',
      ka: 'პროფესიული პროცედურა კბილების ტონის გასაღიავებლად. ჯერ მოწმდება, არის თუ არა პროცედურა თქვენთვის შესაფერისი.',
      ru: 'Профессиональная процедура для осветления оттенка зубов. Сначала оценивается, подходит ли она вам.',
    },
    includes: {
      en: ['Suitability check', 'Whitening procedure', 'Aftercare guidance'],
      ka: ['შესაფერისობის შემოწმება', 'გათეთრების პროცედურა', 'რეკომენდაციები პროცედურის შემდეგ'],
      ru: ['Проверка показаний', 'Процедура отбеливания', 'Рекомендации по уходу после процедуры'],
    },
    keywords: ['whiten', 'bleach', 'გათეთრ', 'отбел'],
  },
  {
    id: 'prosthetics',
    group: 'restorative',
    name: { en: 'Dental prosthetics', ka: 'სტომატოლოგიური პროთეზირება', ru: 'Ортопедическая стоматология' },
    summary: {
      en: 'Restoration of damaged or missing teeth with crowns, bridges and dentures.',
      ka: 'დაზიანებული ან ჩაკარგული კბილების აღდგენა გვირგვინებით, ხიდისებრი და მოხსნადი პროთეზებით.',
      ru: 'Восстановление повреждённых или отсутствующих зубов коронками, мостовидными и съёмными протезами.',
    },
    includes: {
      en: ['Crowns', 'Bridges', 'Removable dentures'],
      ka: ['გვირგვინები', 'ხიდისებრი პროთეზები', 'მოხსნადი პროთეზები'],
      ru: ['Коронки', 'Мостовидные протезы', 'Съёмные протезы'],
    },
    keywords: ['prosthe', 'denture', 'crown', 'bridge', 'პროთეზ', 'გვირგვინ', 'ხიდისებრ', 'протез', 'коронк', 'ортопед'],
  },
  {
    id: 'diagnostics',
    group: 'everyday',
    name: { en: 'Diagnostics', ka: 'დიაგნოსტიკა', ru: 'Диагностика' },
    summary: {
      en: 'Examination and imaging to understand your oral health and plan treatment.',
      ka: 'გასინჯვა და გამოსახულებითი კვლევები პირის ღრუს მდგომარეობის შესაფასებლად და მკურნალობის დასაგეგმად.',
      ru: 'Осмотр и визуализирующие исследования для оценки состояния полости рта и планирования лечения.',
    },
    includes: {
      en: ['Clinical examination', 'Dental imaging when required', 'Discussion of the treatment plan'],
      ka: ['კლინიკური გასინჯვა', 'კბილის სურათი საჭიროების შემთხვევაში', 'მკურნალობის გეგმის განხილვა'],
      ru: ['Клинический осмотр', 'Снимки зубов при необходимости', 'Обсуждение плана лечения'],
    },
    keywords: ['diagnos', 'x-ray', 'xray', 'scan', 'imaging', 'examination', 'დიაგნოს', 'რენტგენ', 'ვიზიოგრაფ', 'გასინჯვ', 'диагност', 'рентген', 'снимок', 'осмотр'],
  },
  {
    id: 'periodontology',
    group: 'everyday',
    name: { en: 'Periodontology', ka: 'პაროდონტოლოგია', ru: 'Пародонтология' },
    summary: {
      en: 'Care for the gums and the tissues that support the teeth.',
      ka: 'ღრძილებისა და კბილის გარშემო მდებარე საყრდენი ქსოვილების მოვლა და მკურნალობა.',
      ru: 'Уход за деснами и тканями, поддерживающими зубы, и их лечение.',
    },
    includes: {
      en: ['Gum examination', 'Treatment of gum conditions as advised by the dentist', 'Guidance on maintaining gum health'],
      ka: ['ღრძილების გასინჯვა', 'ღრძილების მდგომარეობის მკურნალობა ექიმის რეკომენდაციით', 'რჩევები ღრძილების ჯანმრთელობის შესანარჩუნებლად'],
      ru: ['Осмотр дёсен', 'Лечение заболеваний дёсен по рекомендации врача', 'Рекомендации по поддержанию здоровья дёсен'],
    },
    keywords: ['periodon', 'gum', 'ღრძილ', 'პაროდონტ', 'десн', 'пародонт'],
  },
]

export const priceLabels: Record<PriceId, L10n> = {
  filling: { en: 'Caries filling', ka: 'კარიესის პლომბირება', ru: 'Пломбирование при кариесе' },
  endo1: {
    en: 'Single-canal endodontic treatment with crown restoration',
    ka: 'ერთარხიანი ენდოდონტიური მკურნალობა გვირგვინით აღდგენით',
    ru: 'Эндодонтическое лечение одного канала с восстановлением коронки',
  },
  endo34: {
    en: '3–4 canal endodontic treatment',
    ka: '3–4 არხიანი ენდოდონტიური მკურნალობა',
    ru: 'Эндодонтическое лечение 3–4 каналов',
  },
}

export const groups: GroupId[] = ['everyday', 'restorative', 'aesthetic', 'children']
