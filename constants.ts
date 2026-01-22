
import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'animals', name: 'Zwierzęta', icon: '🐶', color: 'bg-orange-400' },
  { id: 'food', name: 'Jedzenie', icon: '🍎', color: 'bg-red-400' },
  { id: 'colors', name: 'Kolory', icon: '🎨', color: 'bg-purple-400' },
  { id: 'numbers', name: 'Liczby', icon: '🔢', color: 'bg-blue-400' },
  { id: 'family', name: 'Rodzina', icon: '👨‍👩‍👧', color: 'bg-green-400' },
  { id: 'body', name: 'Ciało', icon: '🖐️', color: 'bg-yellow-400' },
  { id: 'clothes', name: 'Ubrania', icon: '👕', color: 'bg-pink-400' },
  { id: 'school', name: 'Szkoła', icon: '🎒', color: 'bg-indigo-400' },
  { id: 'home', name: 'Dom', icon: '🏠', color: 'bg-teal-400' },
  { id: 'toys', name: 'Zabawki', icon: '🧸', color: 'bg-rose-400' },
  { id: 'nature', name: 'Natura', icon: '🌳', color: 'bg-emerald-500' },
  { id: 'actions', name: 'Czynności', icon: '🏃', color: 'bg-violet-400' },
  { id: 'adjectives', name: 'Opisy', icon: '✨', color: 'bg-amber-500' },
  { id: 'time', name: 'Dni i Czas', icon: '📅', color: 'bg-sky-500' },
  { id: 'weather', name: 'Pogoda', icon: '☁️', color: 'bg-slate-400' },
  { id: 'city', name: 'Miasto', icon: '🏙️', color: 'bg-neutral-500' },
  { id: 'jobs', name: 'Zawody', icon: '👨‍⚕️', color: 'bg-cyan-600' },
  { id: 'phrases', name: 'Zwroty', icon: '💬', color: 'bg-orange-500' },
  { id: 'prepositions', name: 'Gdzie?', icon: '📍', color: 'bg-red-500' },
  { id: 'shapes', name: 'Kształty', icon: '📐', color: 'bg-blue-600' },
];

export const FALLBACK_WORDS: Record<string, { english: string; polish: string }[]> = {
  animals: [
    { english: 'Dog', polish: 'Pies' }, { english: 'Cat', polish: 'Kot' }, { english: 'Bird', polish: 'Ptak' },
    { english: 'Fish', polish: 'Ryba' }, { english: 'Lion', polish: 'Lew' }, { english: 'Elephant', polish: 'Słoń' },
    { english: 'Tiger', polish: 'Tygrys' }, { english: 'Monkey', polish: 'Małpa' }, { english: 'Horse', polish: 'Koń' },
    { english: 'Cow', polish: 'Krowa' }, { english: 'Pig', polish: 'Świnia' }, { english: 'Sheep', polish: 'Owca' },
    { english: 'Chicken', polish: 'Kurczak' }, { english: 'Duck', polish: 'Kaczka' }, { english: 'Bear', polish: 'Niedźwiedź' },
    { english: 'Mouse', polish: 'Mysz' }, { english: 'Rabbit', polish: 'Królik' }, { english: 'Frog', polish: 'Żaba' },
    { english: 'Spider', polish: 'Pająk' }, { english: 'Snake', polish: 'Wąż' }, { english: 'Giraffe', polish: 'Żyrafa' },
    { english: 'Zebra', polish: 'Zebra' }, { english: 'Wolf', polish: 'Wilk' }, { english: 'Fox', polish: 'Lis' },
    { english: 'Bee', polish: 'Pszczoła' }, { english: 'Ant', polish: 'Mrówka' }, { english: 'Butterfly', polish: 'Motyl' },
    { english: 'Bat', polish: 'Nietoperz' }, { english: 'Crab', polish: 'Krab' }, { english: 'Dolphin', polish: 'Delfin' },
    { english: 'Whale', polish: 'Wieloryb' }, { english: 'Shark', polish: 'Rekin' }, { english: 'Owl', polish: 'Sowa' },
    { english: 'Penguin', polish: 'Pingwin' }, { english: 'Turtle', polish: 'Żółw' }, { english: 'Parrot', polish: 'Papuga' },
    { english: 'Hamster', polish: 'Chomik' }, { english: 'Goat', polish: 'Koza' }, { english: 'Donkey', polish: 'Osioł' },
    { english: 'Camel', polish: 'Wielbłąd' }, { english: 'Hippopotamus', polish: 'Hipopotam' }, { english: 'Crocodile', polish: 'Krokodyl' }
  ],
  food: [
    { english: 'Apple', polish: 'Jabłko' }, { english: 'Banana', polish: 'Banan' }, { english: 'Orange', polish: 'Pomarańcza' },
    { english: 'Bread', polish: 'Chleb' }, { english: 'Milk', polish: 'Mleko' }, { english: 'Egg', polish: 'Jajko' },
    { english: 'Cheese', polish: 'Ser' }, { english: 'Water', polish: 'Woda' }, { english: 'Juice', polish: 'Sok' },
    { english: 'Pizza', polish: 'Pizza' }, { english: 'Pasta', polish: 'Makaron' }, { english: 'Meat', polish: 'Mięso' },
    { english: 'Rice', polish: 'Ryż' }, { english: 'Butter', polish: 'Masło' }, { english: 'Sugar', polish: 'Cukier' },
    { english: 'Salt', polish: 'Sól' }, { english: 'Tea', polish: 'Herbata' }, { english: 'Coffee', polish: 'Kawa' },
    { english: 'Cake', polish: 'Ciasto' }, { english: 'Cookie', polish: 'Ciastko' }, { english: 'Chocolate', polish: 'Czekolada' },
    { english: 'Ice cream', polish: 'Lody' }, { english: 'Strawberry', polish: 'Truskawka' }, { english: 'Tomato', polish: 'Pomidor' },
    { english: 'Potato', polish: 'Ziemniak' }, { english: 'Carrot', polish: 'Marchewka' }, { english: 'Cucumber', polish: 'Ogórek' },
    { english: 'Onion', polish: 'Cebula' }, { english: 'Soup', polish: 'Zupa' }, { english: 'Ham', polish: 'Szynka' },
    { english: 'Fruit', polish: 'Owoce' }, { english: 'Vegetables', polish: 'Warzywa' }, { english: 'Lemon', polish: 'Cytryna' },
    { english: 'Grapes', polish: 'Winogrona' }, { english: 'Pear', polish: 'Gruszka' }, { english: 'Peach', polish: 'Brzoskwinia' },
    { english: 'Honey', polish: 'Miód' }, { english: 'Sandwich', polish: 'Kanapka' }, { english: 'Burger', polish: 'Burger' },
    { english: 'Chips', polish: 'Frytki' }, { english: 'Salad', polish: 'Sałatka' }, { english: 'Fish', polish: 'Ryba' }
  ],
  colors: [
    { english: 'Red', polish: 'Czerwony' }, { english: 'Blue', polish: 'Niebieski' }, { english: 'Green', polish: 'Zielony' },
    { english: 'Yellow', polish: 'Żółty' }, { english: 'Orange', polish: 'Pomarańczowy' }, { english: 'Purple', polish: 'Fioletowy' },
    { english: 'Pink', polish: 'Różowy' }, { english: 'Black', polish: 'Czarny' }, { english: 'White', polish: 'Biały' },
    { english: 'Brown', polish: 'Brązowy' }, { english: 'Grey', polish: 'Szary' }, { english: 'Gold', polish: 'Złoty' },
    { english: 'Silver', polish: 'Srebrny' }, { english: 'Dark blue', polish: 'Granatowy' }, { english: 'Bright', polish: 'Jasny' },
    { english: 'Dark', polish: 'Ciemny' }, { english: 'Beige', polish: 'Beżowy' }, { english: 'Turquoise', polish: 'Turkusowy' },
    { english: 'Violet', polish: 'Fiolet' }, { english: 'Rainbow', polish: 'Tęcza' }
  ],
  numbers: [
    { english: 'Zero', polish: 'Zero' }, { english: 'One', polish: 'Jeden' }, { english: 'Two', polish: 'Dwa' },
    { english: 'Three', polish: 'Trzy' }, { english: 'Four', polish: 'Cztery' }, { english: 'Five', polish: 'Pięć' },
    { english: 'Six', polish: 'Sześć' }, { english: 'Seven', polish: 'Siedem' }, { english: 'Eight', polish: 'Osiem' },
    { english: 'Nine', polish: 'Dziewięć' }, { english: 'Ten', polish: 'Dziesięć' }, { english: 'Eleven', polish: 'Jedenaście' },
    { english: 'Twelve', polish: 'Dwanaście' }, { english: 'Thirteen', polish: 'Trzynaście' }, { english: 'Fourteen', polish: 'Czternaście' },
    { english: 'Fifteen', polish: 'Piętnaście' }, { english: 'Sixteen', polish: 'Szesnaście' }, { english: 'Seventeen', polish: 'Siedemnaście' },
    { english: 'Eighteen', polish: 'Osiemnaście' }, { english: 'Nineteen', polish: 'Dziewiętnaście' }, { english: 'Twenty', polish: 'Dwadzieścia' },
    { english: 'Twenty-one', polish: 'Dwadzieścia jeden' }, { english: 'Thirty', polish: 'Trzydzieści' }, { english: 'Forty', polish: 'Czterdzieści' },
    { english: 'Fifty', polish: 'Pięćdziesiąt' }, { english: 'Sixty', polish: 'Sześćdziesiąt' }, { english: 'Seventy', polish: 'Siedemdziesiąt' },
    { english: 'Eighty', polish: 'Osiemdziesiąt' }, { english: 'Ninety', polish: 'Dziewięćdziesiąt' }, { english: 'Hundred', polish: 'Sto' },
    { english: 'One hundred one', polish: 'Sto jeden' }, { english: 'Two hundred', polish: 'Dwieście' }, { english: 'Five hundred', polish: 'Pięćset' },
    { english: 'Thousand', polish: 'Tysiąc' }, { english: 'First', polish: 'Pierwszy' }, { english: 'Second', polish: 'Drugi' },
    { english: 'Third', polish: 'Trzeci' }, { english: 'Fourth', polish: 'Czwarty' }, { english: 'Fifth', polish: 'Piąty' }
  ],
  family: [
    { english: 'Mother', polish: 'Matka' }, { english: 'Father', polish: 'Ojciec' }, { english: 'Brother', polish: 'Brat' },
    { english: 'Sister', polish: 'Siostra' }, { english: 'Grandma', polish: 'Babcia' }, { english: 'Grandpa', polish: 'Dziadek' },
    { english: 'Baby', polish: 'Dziecko' }, { english: 'Son', polish: 'Syn' }, { english: 'Daughter', polish: 'Córka' },
    { english: 'Aunt', polish: 'Ciocia' }, { english: 'Uncle', polish: 'Wujek' }, { english: 'Cousin', polish: 'Kuzyn' },
    { english: 'Family', polish: 'Rodzina' }, { english: 'Parents', polish: 'Rodzice' }, { english: 'Wife', polish: 'Żona' },
    { english: 'Husband', polish: 'Mąż' }, { english: 'Friend', polish: 'Przyjaciel' }, { english: 'Children', polish: 'Dzieci' },
    { english: 'Boy', polish: 'Chłopiec' }, { english: 'Girl', polish: 'Dziewczynka' }, { english: 'Man', polish: 'Mężczyzna' },
    { english: 'Woman', polish: 'Kobieta' }, { english: 'Niece', polish: 'Siostrzenica' }, { english: 'Nephew', polish: 'Siostrzeniec' }
  ],
  body: [
    { english: 'Head', polish: 'Głowa' }, { english: 'Eyes', polish: 'Oczy' }, { english: 'Ears', polish: 'Uszy' },
    { english: 'Nose', polish: 'Nos' }, { english: 'Mouth', polish: 'Usta' }, { english: 'Hair', polish: 'Włosy' },
    { english: 'Hand', polish: 'Ręka' }, { english: 'Foot', polish: 'Stopa' }, { english: 'Leg', polish: 'Noga' },
    { english: 'Arm', polish: 'Ramię' }, { english: 'Finger', polish: 'Palec' }, { english: 'Back', polish: 'Plecy' },
    { english: 'Stomach', polish: 'Brzuch' }, { english: 'Face', polish: 'Twarz' }, { english: 'Teeth', polish: 'Zęby' },
    { english: 'Shoulder', polish: 'Ramię/Bark' }, { english: 'Knee', polish: 'Kolano' }, { english: 'Toe', polish: 'Palec u nogi' },
    { english: 'Neck', polish: 'Szyja' }, { english: 'Chest', polish: 'Klatka piersiowa' }, { english: 'Elbow', polish: 'Łokieć' },
    { english: 'Tongue', polish: 'Język' }, { english: 'Lips', polish: 'Wargi' }, { english: 'Skin', polish: 'Skóra' },
    { english: 'Bone', polish: 'Kość' }, { english: 'Heart', polish: 'Serce' }, { english: 'Blood', polish: 'Krew' }
  ],
  clothes: [
    { english: 'Shirt', polish: 'Koszula' }, { english: 'Pants', polish: 'Spodnie' }, { english: 'Dress', polish: 'Sukienka' },
    { english: 'Skirt', polish: 'Spódnica' }, { english: 'Shoes', polish: 'Buty' }, { english: 'Socks', polish: 'Skarpetki' },
    { english: 'Hat', polish: 'Czapka' }, { english: 'Jacket', polish: 'Kurtka' }, { english: 'Coat', polish: 'Płaszcz' },
    { english: 'Sweater', polish: 'Sweter' }, { english: 'T-shirt', polish: 'Koszulka' }, { english: 'Gloves', polish: 'Rękawiczki' },
    { english: 'Glasses', polish: 'Okulary' }, { english: 'Watch', polish: 'Zegarek' }, { english: 'Scarf', polish: 'Szalik' },
    { english: 'Belt', polish: 'Pasek' }, { english: 'Boots', polish: 'Kozaki' }, { english: 'Sandals', polish: 'Sandały' },
    { english: 'Jeans', polish: 'Dżinsy' }, { english: 'Pyjamas', polish: 'Piżama' }, { english: 'Suit', polish: 'Garnitur' },
    { english: 'Tie', polish: 'Krawat' }, { english: 'Cap', polish: 'Czapka z daszkiem' }, { english: 'Raincoat', polish: 'Płaszcz przeciwdeszczowy' }
  ],
  school: [
    { english: 'Pen', polish: 'Długopis' }, { english: 'Pencil', polish: 'Ołówek' }, { english: 'Book', polish: 'Książka' },
    { english: 'Paper', polish: 'Papier' }, { english: 'Bag', polish: 'Torba' }, { english: 'Chair', polish: 'Krzesło' },
    { english: 'Table', polish: 'Stół' }, { english: 'Teacher', polish: 'Nauczyciel' }, { english: 'Student', polish: 'Uczeń' },
    { english: 'Notebook', polish: 'Zeszyt' }, { english: 'Map', polish: 'Mapa' }, { english: 'Board', polish: 'Tablica' },
    { english: 'Ruler', polish: 'Linijka' }, { english: 'Eraser', polish: 'Gumka' }, { english: 'Computer', polish: 'Komputer' },
    { english: 'Lesson', polish: 'Lekcja' }, { english: 'Question', polish: 'Pytanie' }, { english: 'Answer', polish: 'Odpowiedź' },
    { english: 'Classroom', polish: 'Klasa' }, { english: 'Desk', polish: 'Biurko' }, { english: 'Schoolbus', polish: 'Autobus szkolny' },
    { english: 'Homework', polish: 'Zadanie domowe' }, { english: 'Glue', polish: 'Klej' }, { english: 'Scissors', polish: 'Nożyczki' },
    { english: 'Backpack', polish: 'Plecak' }, { english: 'Marker', polish: 'Mazak' }, { english: 'Test', polish: 'Sprawdzian' }
  ],
  home: [
    { english: 'House', polish: 'Dom' }, { english: 'Door', polish: 'Drzwi' }, { english: 'Window', polish: 'Okno' },
    { english: 'Bed', polish: 'Łóżko' }, { english: 'Kitchen', polish: 'Kuchnia' }, { english: 'Bathroom', polish: 'Łazienka' },
    { english: 'Room', polish: 'Pokój' }, { english: 'Garden', polish: 'Ogród' }, { english: 'Wall', polish: 'Ściana' },
    { english: 'Floor', polish: 'Podłoga' }, { english: 'Clock', polish: 'Zegar' }, { english: 'Key', polish: 'Klucz' },
    { english: 'Lamp', polish: 'Lampa' }, { english: 'Mirror', polish: 'Lustro' }, { english: 'TV', polish: 'Telewizor' },
    { english: 'Sofa', polish: 'Kanapa' }, { english: 'Shower', polish: 'Prysznic' }, { english: 'Toilet', polish: 'Toaleta' },
    { english: 'Stairs', polish: 'Schody' }, { english: 'Roof', polish: 'Dach' }, { english: 'Armchair', polish: 'Fotel' },
    { english: 'Fridge', polish: 'Lodówka' }, { english: 'Cooker', polish: 'Kuchenka' }, { english: 'Curtain', polish: 'Zasłona' },
    { english: 'Rug', polish: 'Dywanik' }, { english: 'Plate', polish: 'Talerz' }, { english: 'Cup', polish: 'Kubek' },
    { english: 'Fork', polish: 'Widelec' }, { english: 'Spoon', polish: 'Łyżka' }, { english: 'Knife', polish: 'Nóż' }
  ],
  toys: [
    { english: 'Doll', polish: 'Lalka' }, { english: 'Ball', polish: 'Piłka' }, { english: 'Car', polish: 'Samochód' },
    { english: 'Train', polish: 'Pociąg' }, { english: 'Teddy bear', polish: 'Pluszowy miś' }, { english: 'Game', polish: 'Gra' },
    { english: 'Bike', polish: 'Rower' }, { english: 'Blocks', polish: 'Klocki' }, { english: 'Puzzle', polish: 'Puzzle' },
    { english: 'Kite', polish: 'Latawiec' }, { english: 'Robot', polish: 'Robot' }, { english: 'Swing', polish: 'Huśtawka' },
    { english: 'Slide', polish: 'Zjeżdżalnia' }, { english: 'Plane', polish: 'Samolot' }, { english: 'Boat', polish: 'Łódka' },
    { english: 'Rocket', polish: 'Rakieta' }, { english: 'Drum', polish: 'Bębenek' }, { english: 'Puppet', polish: 'Pacynka' }
  ],
  nature: [
    { english: 'Sun', polish: 'Słońce' }, { english: 'Moon', polish: 'Księżyc' }, { english: 'Star', polish: 'Gwiazda' },
    { english: 'Sky', polish: 'Niebo' }, { english: 'Tree', polish: 'Drzewo' }, { english: 'Flower', polish: 'Kwiat' },
    { english: 'Grass', polish: 'Trawa' }, { english: 'Rain', polish: 'Deszcz' }, { english: 'Snow', polish: 'Śnieg' },
    { english: 'Sea', polish: 'Morze' }, { english: 'River', polish: 'Rzeka' }, { english: 'Mountain', polish: 'Góra' },
    { english: 'Forest', polish: 'Las' }, { english: 'Sand', polish: 'Piasek' }, { english: 'Leaf', polish: 'Liść' },
    { english: 'Plant', polish: 'Roślina' }, { english: 'Lake', polish: 'Jezioro' }, { english: 'Wind', polish: 'Wiatr' },
    { english: 'Beach', polish: 'Plaża' }, { english: 'Island', polish: 'Wyspa' }, { english: 'Ocean', polish: 'Ocean' },
    { english: 'Rock', polish: 'Skała' }, { english: 'Earth', polish: 'Ziemia' }, { english: 'Cloud', polish: 'Chmura' },
    { english: 'Rainbow', polish: 'Tęcza' }, { english: 'Fire', polish: 'Ogień' }, { english: 'Garden', polish: 'Ogród' }
  ],
  actions: [
    { english: 'Run', polish: 'Biegać' }, { english: 'Jump', polish: 'Skakać' }, { english: 'Walk', polish: 'Chodzić' },
    { english: 'Eat', polish: 'Jeść' }, { english: 'Drink', polish: 'Pić' }, { english: 'Sleep', polish: 'Spać' },
    { english: 'Read', polish: 'Czytać' }, { english: 'Write', polish: 'Pisać' }, { english: 'Sing', polish: 'Śpiewać' },
    { english: 'Dance', polish: 'Tańczyć' }, { english: 'Play', polish: 'Grać' }, { english: 'Swim', polish: 'Pływać' },
    { english: 'Listen', polish: 'Słuchać' }, { english: 'Talk', polish: 'Rozmawiać' }, { english: 'Look', polish: 'Patrzeć' },
    { english: 'Smile', polish: 'Uśmiechać się' }, { english: 'Laugh', polish: 'Śmiać się' }, { english: 'Cry', polish: 'Płakać' },
    { english: 'Cook', polish: 'Gotować' }, { english: 'Wash', polish: 'Myć' }, { english: 'Sit', polish: 'Siedzieć' },
    { english: 'Stand', polish: 'Stać' }, { english: 'Help', polish: 'Pomagać' }, { english: 'Learn', polish: 'Uczyć się' },
    { english: 'Draw', polish: 'Rysować' }, { english: 'Fly', polish: 'Latać' }, { english: 'Ride', polish: 'Jeździć' },
    { english: 'Open', polish: 'Otwierać' }, { english: 'Close', polish: 'Zamykać' }, { english: 'Come', polish: 'Przychodzić' },
    { english: 'Go', polish: 'Iść' }, { english: 'Give', polish: 'Dawać' }, { english: 'Take', polish: 'Brać' },
    { english: 'Wait', polish: 'Czekać' }, { english: 'Stop', polish: 'Zatrzymać się' }, { english: 'Start', polish: 'Zacząć' }
  ],
  adjectives: [
    { english: 'Big', polish: 'Duży' }, { english: 'Small', polish: 'Mały' }, { english: 'Good', polish: 'Dobry' },
    { english: 'Bad', polish: 'Zły' }, { english: 'Hot', polish: 'Gorący' }, { english: 'Cold', polish: 'Zimny' },
    { english: 'Happy', polish: 'Szczęśliwy' }, { english: 'Sad', polish: 'Smutny' }, { english: 'Beautiful', polish: 'Piękny' },
    { english: 'New', polish: 'Nowy' }, { english: 'Old', polish: 'Stary' }, { english: 'Fast', polish: 'Szybki' },
    { english: 'Slow', polish: 'Wolny' }, { english: 'Easy', polish: 'Łatwy' }, { english: 'Difficult', polish: 'Trudny' },
    { english: 'Hungry', polish: 'Głodny' }, { english: 'Thirsty', polish: 'Spragniony' }, { english: 'Tired', polish: 'Zmęczony' },
    { english: 'Angry', polish: 'Zły/Gniewny' }, { english: 'Clean', polish: 'Czysty' }, { english: 'Dirty', polish: 'Brudny' },
    { english: 'Long', polish: 'Długi' }, { english: 'Short', polish: 'Krótki' }, { english: 'Strong', polish: 'Silny' },
    { english: 'Weak', polish: 'Słaby' }, { english: 'Rich', polish: 'Bogaty' }, { english: 'Poor', polish: 'Biedny' },
    { english: 'Clean', polish: 'Czysty' }, { english: 'Messy', polish: 'Bałaganiarski' }, { english: 'Quiet', polish: 'Cichy' },
    { english: 'Loud', polish: 'Głośny' }, { english: 'Funny', polish: 'Zabawny' }, { english: 'Brave', polish: 'Odważny' }
  ],
  time: [
    { english: 'Monday', polish: 'Poniedziałek' }, { english: 'Tuesday', polish: 'Wtorek' }, { english: 'Wednesday', polish: 'Środa' },
    { english: 'Thursday', polish: 'Czwartek' }, { english: 'Friday', polish: 'Piątek' }, { english: 'Saturday', polish: 'Sobota' },
    { english: 'Sunday', polish: 'Niedziela' }, { english: 'January', polish: 'Styczeń' }, { english: 'February', polish: 'Luty' },
    { english: 'March', polish: 'Marzec' }, { english: 'April', polish: 'Kwiecień' }, { english: 'May', polish: 'Maj' },
    { english: 'June', polish: 'Czerwiec' }, { english: 'July', polish: 'Lipiec' }, { english: 'August', polish: 'Sierpień' },
    { english: 'September', polish: 'Wrzesień' }, { english: 'October', polish: 'Październik' }, { english: 'November', polish: 'Listopad' },
    { english: 'December', polish: 'Grudzień' }, { english: 'Spring', polish: 'Wiosna' }, { english: 'Summer', polish: 'Lato' },
    { english: 'Autumn', polish: 'Jesień' }, { english: 'Winter', polish: 'Zima' }, { english: 'Morning', polish: 'Ranek' },
    { english: 'Afternoon', polish: 'Popołudnie' }, { english: 'Evening', polish: 'Wieczór' }, { english: 'Night', polish: 'Noc' },
    { english: 'Today', polish: 'Dzisiaj' }, { english: 'Tomorrow', polish: 'Jutro' }, { english: 'Yesterday', polish: 'Wczoraj' },
    { english: 'Week', polish: 'Tydzień' }, { english: 'Month', polish: 'Miesiąc' }, { english: 'Year', polish: 'Rok' },
    { english: 'Hour', polish: 'Godzina' }, { english: 'Minute', polish: 'Minuta' }, { english: 'Second', polish: 'Sekunda' }
  ],
  weather: [
    { english: 'Sunny', polish: 'Słonecznie' }, { english: 'Rainy', polish: 'Deszczowo' }, { english: 'Cloudy', polish: 'Pochmurno' },
    { english: 'Windy', polish: 'Wietrznie' }, { english: 'Snowy', polish: 'Śnieżnie' }, { english: 'Storm', polish: 'Burza' },
    { english: 'Rainbow', polish: 'Tęcza' }, { english: 'Foggy', polish: 'Mgliście' }, { english: 'Cold', polish: 'Zimno' },
    { english: 'Warm', polish: 'Ciepło' }, { english: 'Lightning', polish: 'Piorun' }, { english: 'Thunder', polish: 'Grzmot' },
    { english: 'Ice', polish: 'Lód' }, { english: 'Degree', polish: 'Stopień' }, { english: 'Wet', polish: 'Mokro' },
    { english: 'Dry', polish: 'Sucho' }, { english: 'Forecast', polish: 'Prognoza' }
  ],
  city: [
    { english: 'Street', polish: 'Ulica' }, { english: 'Car', polish: 'Samochód' }, { english: 'Bus', polish: 'Autobus' },
    { english: 'Park', polish: 'Park' }, { english: 'Shop', polish: 'Sklep' }, { english: 'Restaurant', polish: 'Restauracja' },
    { english: 'Hospital', polish: 'Szpital' }, { english: 'Police', polish: 'Policja' }, { english: 'Station', polish: 'Stacja' },
    { english: 'Bridge', polish: 'Most' }, { english: 'Cinema', polish: 'Kino' }, { english: 'Bank', polish: 'Bank' },
    { english: 'Building', polish: 'Budynek' }, { english: 'Airport', polish: 'Lotnisko' }, { english: 'Hotel', polish: 'Hotel' },
    { english: 'Library', polish: 'Biblioteka' }, { english: 'Museum', polish: 'Muzeum' }, { english: 'Square', polish: 'Plac' },
    { english: 'Church', polish: 'Kościół' }, { english: 'Market', polish: 'Rynek' }, { english: 'Pharmacy', polish: 'Apteka' }
  ],
  jobs: [
    { english: 'Doctor', polish: 'Lekarz' }, { english: 'Nurse', polish: 'Pielęgniarka' }, { english: 'Teacher', polish: 'Nauczyciel' },
    { english: 'Police officer', polish: 'Policjant' }, { english: 'Driver', polish: 'Kierowca' }, { english: 'Cook', polish: 'Kucharz' },
    { english: 'Artist', polish: 'Artysta' }, { english: 'Singer', polish: 'Piosenkarz' }, { english: 'Farmer', polish: 'Rolnik' },
    { english: 'Shop assistant', polish: 'Sprzedawca' }, { english: 'Dentist', polish: 'Dentysta' }, { english: 'Pilot', polish: 'Pilot' },
    { english: 'Firefighter', polish: 'Strażak' }, { english: 'Baker', polish: 'Piekarz' }, { english: 'Chef', polish: 'Szef kuchni' },
    { english: 'Dancer', polish: 'Tancerz' }, { english: 'Actor', polish: 'Aktor' }, { english: 'Writer', polish: 'Pisarz' },
    { english: 'Vet', polish: 'Weterynarz' }
  ],
  phrases: [
    { english: 'Hello', polish: 'Cześć/Dzień dobry' }, { english: 'Goodbye', polish: 'Do widzenia' }, { english: 'Thank you', polish: 'Dziękuję' },
    { english: 'Please', polish: 'Proszę' }, { english: 'Sorry', polish: 'Przepraszam' }, { english: 'Yes', polish: 'Tak' },
    { english: 'No', polish: 'Nie' }, { english: 'How are you?', polish: 'Jak się masz?' }, { english: 'I am fine', polish: 'Mam się dobrze' },
    { english: 'Nice to meet you', polish: 'Miło cię poznać' }, { english: 'Good morning', polish: 'Dzień dobry (rano)' },
    { english: 'Good night', polish: 'Dobranoc' }, { english: 'Excuse me', polish: 'Przepraszam (zaczepiając)' },
    { english: 'Welcome', polish: 'Witaj' }, { english: 'Bless you', polish: 'Na zdrowie' }, { english: 'No problem', polish: 'Nie ma problemu' },
    { english: 'See you later', polish: 'Do zobaczenia później' }, { english: 'I dont know', polish: 'Nie wiem' }, { english: 'I love you', polish: 'Kocham cię' }
  ],
  prepositions: [
    { english: 'In', polish: 'W (środku)' }, { english: 'On', polish: 'Na' }, { english: 'Under', polish: 'Pod' },
    { english: 'Next to', polish: 'Obok' }, { english: 'Behind', polish: 'Za' }, { english: 'In front of', polish: 'Przed' },
    { english: 'Between', polish: 'Między' }, { english: 'Up', polish: 'W górę' }, { english: 'Down', polish: 'W dół' },
    { english: 'Left', polish: 'Lewo' }, { english: 'Right', polish: 'Prawo' }, { english: 'Near', polish: 'Blisko' },
    { english: 'Far', polish: 'Daleko' }, { english: 'Above', polish: 'Nad' }, { english: 'Below', polish: 'Poniżej' },
    { english: 'Into', polish: 'Do środka' }, { english: 'Out', polish: 'Na zewnątrz' }
  ],
  shapes: [
    { english: 'Circle', polish: 'Koło' }, { english: 'Square', polish: 'Kwadrat' }, { english: 'Triangle', polish: 'Trójkąt' },
    { english: 'Rectangle', polish: 'Prostokąt' }, { english: 'Star', polish: 'Gwiazda' }, { english: 'Heart', polish: 'Serce' },
    { english: 'Diamond', polish: 'Diament' }, { english: 'Oval', polish: 'Owal' }, { english: 'Line', polish: 'Linia' },
    { english: 'Cross', polish: 'Krzyż' }
  ]
};
