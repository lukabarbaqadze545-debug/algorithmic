import type { IntentId } from './types'

/**
 * Keyword stems per intent. Matching is substring-based on normalised text, so stems cover
 * inflected Georgian and Russian forms. Latin-script Georgian ("fasi", "rodis") is included
 * because many visitors type that way on phones.
 */
export const intentStems: Record<IntentId, string[]> = {
  services: ['service', 'treatment', 'what do you', 'offer', 'procedure', 'სერვის', 'მომსახურ', 'მკურნალობ', 'რას გთავაზ', 'რა სერვის', 'услуг', 'лечени', 'процедур', 'что вы'],
  prices: ['price', 'cost', 'how much', 'cheap', 'fee', 'ფას', 'ღირ', 'რა ღირს', 'fasi', 'fasebi', 'ra girs', 'цен', 'стоим', 'сколько', 'прайс'],
  hours: ['hour', 'open', 'close', 'schedule', 'saturday', 'sunday', 'weekend', 'when are', 'სამუშაო', 'საათ', 'მუშაობ', 'შაბათ', 'კვირა', 'ღიაა', 'გახსნ', 'rodis', 'часы', 'работаете', 'график', 'режим', 'суббот', 'воскрес', 'выходн', 'открыт'],
  location: ['where', 'address', 'location', 'map', 'direction', 'find you', 'didgori', 'მისამართ', 'სად არის', 'სად მდებარ', 'სადაა', 'რუკა', 'დიდგორ', 'sad aris', 'адрес', 'где', 'как добраться', 'находитесь', 'дидгори', 'карта'],
  contact: ['phone', 'number', 'call', 'whatsapp', 'contact', 'email', 'ტელეფონ', 'ნომერ', 'დარეკ', 'კონტაქტ', 'телефон', 'позвон', 'номер', 'контакт', 'связат'],
  booking: ['book', 'appointment', 'reserve', 'register', 'consultation', 'visit', 'schedule a', 'ჩაწერ', 'ვიზიტ', 'კონსულტაც', 'დაჯავშნ', 'ჯავშან', 'запис', 'прием', 'приём', 'консультац', 'визит', 'забронир'],
  staff: ['human', 'staff', 'operator', 'person', 'talk to', 'speak to', 'manager', 'ადამიან', 'ოპერატორ', 'პერსონალ', 'მენეჯერ', 'человек', 'оператор', 'сотрудник', 'менеджер'],
  doctors: ['doctor', 'dentist', 'specialist', 'surgeon', 'who treats', 'ექიმ', 'სტომატოლოგ', 'სპეციალისტ', 'врач', 'доктор', 'специалист', 'стоматолог'],
  languages: ['ენებზე', 'ენაზე', 'языках', 'языки', 'language', 'english', 'russian', 'georgian', 'speak', 'ენა', 'ენებ', 'ინგლის', 'რუსუ', 'ქართუ', 'язык', 'по-русски', 'по-английски', 'грузин'],
}

/** Medical wording: never answered, always handed to staff. */
export const medicalStems = [
  ' pain', 'hurt', ' ache', 'toothache', 'headache', 'swell', 'swollen', 'bleed', 'blood', 'antibiotic', 'medicine', 'medication', ' pill', 'painkiller', 'diagnosis', 'diagnose',
  'infection', 'fever', 'pregnan', 'allerg', 'sensitiv', 'abscess', 'do i need', 'is it safe', 'side effect', ' risk', 'wisdom tooth',
  'ტკივ', 'სისხლ', 'შეშუპ', 'ანტიბიოტ', 'წამალ', 'ტაბლეტ', 'დიაგნოზ', 'ინფექცი', 'ცხელებ', 'ორსულ', 'ალერგი', 'მგრძნობიარ', 'ჩირქ', 'ასატკივარ',
  ' боль ', 'болит', 'болят', 'больно', 'болев', 'опух', 'отёк', 'отек', 'кровотеч', 'кровь', 'антибиот', 'лекарств', 'таблет', 'обезбол', 'диагноз', 'инфекци', 'температур', 'беремен', 'аллерг', 'чувствительн', 'флюс', 'нагноен', 'нужно ли',
]

/** Wording that suggests an emergency: adds the 112 line to the hand-off. */
export const urgentStems = [
  'severe', 'unbearable', 'cannot breathe', "can't breathe", 'difficulty breathing', 'swollen face', 'face is swollen', 'heavy bleeding', 'emergency', 'urgent',
  'ძლიერი', 'ვერ ვისუნთქ', 'სუნთქვა', 'სასწრაფო', 'გადაუდებელ', 'სახე გამეშუპ',
  'сильн', 'невыносим', 'не могу дышать', 'трудно дышать', 'срочно', 'экстренн', 'опухло лицо',
]

export const greetingStems = [' hello', ' hi ', ' hey', 'good morning', 'good evening', ' გამარჯობა', ' სალამი', ' გაუმარჯოს', ' привет', ' здравствуй', 'добрый день', 'добрый вечер']
export const thanksStems = ['thank', 'thanks', 'მადლობ', 'გმადლობ', 'спасибо', 'благодар']
export const byeStems = [' bye ', ' goodbye', ' ნახვამდის', 'до свидания', ' пока ']
export const cancelStems = ['cancel', 'stop', 'never mind', 'გაუქმ', 'გაჩერ', 'არ მინდა', 'отмена', 'отмени', 'стоп', 'не надо']
export const yesStems = [' yes ', ' yep ', ' sure ', ' ok ', ' okay ', 'confirm', ' დიახ', ' კი ', ' კარგი', 'დადას', ' да ', ' ага ', 'подтвержд', ' хорошо']
export const noStems = [' no ', ' nope ', ' არა ', ' нет ']

export function normalise(text: string): string {
  return ` ${text.toLowerCase().replace(/[.,!?;:()"'«»]/g, ' ').replace(/\s+/g, ' ').trim()} `
}

export function hasAny(norm: string, stems: string[]): boolean {
  return stems.some((s) => norm.includes(s.toLowerCase()))
}

export function score(norm: string, stems: string[]): number {
  return stems.reduce((n, s) => (norm.includes(s.toLowerCase()) ? n + Math.min(s.length, 8) : n), 0)
}
