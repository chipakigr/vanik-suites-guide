import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Wifi, Copy, Check, MessageCircle, Phone, Mail, MapPin, Clock, KeyRound,
  Waves, Wind, Tv, Droplets, Utensils, Coffee, Mountain, ShieldAlert,
  Car, Plane, Star, ChevronRight, Languages, Home, Trash2
} from 'lucide-react';
import './styles.css';

const DATA = {
  property: {
    name: 'Vanik Suites',
    location: 'Faliraki · Rhodes',
    address: 'Iras, Faliraki 85100 Rhodes',
    maps: 'https://www.google.com/maps/search/?api=1&query=Vanik%20Suites%20Faliraki%20Rhodes',
    booking: 'https://vanikliving.reserve-online.net',
  },
  wifi: {
    network: 'vanik suites',
    password: 'vanik2021',
  },
  contact: {
    whatsapp: '+306943799850',
    phone: '+302241002553',
    hostPhone: '+306943799850',
    email: 'info@vanikliving.com',
  },
  times: {
    checkin: '15:00',
    checkout: '11:00',
    quiet: '23:00 — 09:00',
    pool: '08:00 — 20:00',
  },
};

const TEXT = {
  en: {
    langName: 'English',
    welcome: 'Welcome to',
    subtitle: 'Your private digital guide for a smooth, relaxed stay.',
    quickTitle: 'What guests need most',
    wifi: 'Wi‑Fi',
    copyPassword: 'Copy password',
    copied: 'Copied',
    checkin: 'Check‑in',
    checkout: 'Check‑out',
    contact: 'Contact',
    whatsapp: 'Message on WhatsApp',
    callHost: 'Call host',
    directions: 'Open location',
    arrival: 'Arrival',
    arrivalText: 'On the reception counter you will find an envelope with your reservation name. Inside is the access card for your suite.',
    departure: 'Before you leave',
    departureText: 'Check‑out is until 11:00. Please leave the access cards in the return box at reception and make sure the door is closed.',
    room: 'Suite guide',
    ac: 'Air conditioning',
    acText: 'The remote control is in the suite. Recommended temperature: 24–26°C. Please turn it off when doors/windows are open.',
    tv: 'Smart TV',
    tvText: 'Streaming apps are available. Please remember to log out from your personal accounts before check‑out.',
    hotWater: 'Hot water',
    hotWaterText: 'Hot water is available 24/7. No action is required from you.',
    pool: 'Pool',
    poolText: 'The shared pool is available daily 08:00–20:00. No lifeguard is on duty; swimming is at your own responsibility.',
    jacuzzi: 'Jacuzzi',
    jacuzziText: 'If your suite includes a jacuzzi, fill it using the tap next to it. Please do not add soap, oils or foam.',
    rules: 'House rules',
    quiet: 'Quiet hours',
    quietText: 'Please keep noise low between 23:00 and 09:00.',
    smoking: 'No smoking indoors',
    smokingText: 'Smoking is not allowed inside the suite. Please use outdoor areas only.',
    trash: 'Trash',
    trashText: 'Please place trash in the bins outside the complex.',
    food: 'Host recommendations',
    beaches: 'Beaches',
    transport: 'Transport',
    emergency: 'Emergency',
    emergencyText: 'For urgent help call 112. For anything related to your stay, contact us directly.',
    bookDirect: 'Book direct next time',
    bookText: 'Best available price, no platform commissions.',
    checkAvailability: 'Check availability',
  },
  el: {
    langName: 'Ελληνικά',
    welcome: 'Καλωσήρθατε στο',
    subtitle: 'Ο προσωπικός online οδηγός σας για μια άνετη και χαλαρή διαμονή.',
    quickTitle: 'Τα πιο χρήσιμα για τον επισκέπτη',
    wifi: 'Wi‑Fi',
    copyPassword: 'Αντιγραφή κωδικού',
    copied: 'Αντιγράφηκε',
    checkin: 'Άφιξη',
    checkout: 'Αναχώρηση',
    contact: 'Επικοινωνία',
    whatsapp: 'Μήνυμα στο WhatsApp',
    callHost: 'Κλήση host',
    directions: 'Άνοιγμα τοποθεσίας',
    arrival: 'Άφιξη',
    arrivalText: 'Στον πάγκο της υποδοχής θα βρείτε φάκελο με το όνομα της κράτησής σας. Μέσα είναι η κάρτα πρόσβασης για τη σουίτα σας.',
    departure: 'Πριν φύγετε',
    departureText: 'Το check‑out είναι έως τις 11:00. Παρακαλώ αφήστε τις κάρτες στο κουτί επιστροφής στην υποδοχή και βεβαιωθείτε ότι η πόρτα είναι κλειστή.',
    room: 'Οδηγός σουίτας',
    ac: 'Κλιματισμός',
    acText: 'Το τηλεκοντρόλ βρίσκεται στη σουίτα. Προτεινόμενη θερμοκρασία: 24–26°C. Παρακαλώ κλείστε το όταν οι πόρτες/παράθυρα είναι ανοιχτά.',
    tv: 'Smart TV',
    tvText: 'Υπάρχουν εφαρμογές streaming. Παρακαλώ αποσυνδεθείτε από τους προσωπικούς λογαριασμούς σας πριν το check‑out.',
    hotWater: 'Ζεστό νερό',
    hotWaterText: 'Το ζεστό νερό είναι διαθέσιμο 24/7. Δεν χρειάζεται κάποια ενέργεια από εσάς.',
    pool: 'Πισίνα',
    poolText: 'Η κοινόχρηστη πισίνα είναι διαθέσιμη καθημερινά 08:00–20:00. Δεν υπάρχει ναυαγοσώστης· η χρήση γίνεται με δική σας ευθύνη.',
    jacuzzi: 'Jacuzzi',
    jacuzziText: 'Αν η σουίτα σας διαθέτει jacuzzi, γεμίστε το από τη βρύση δίπλα του. Παρακαλώ μη χρησιμοποιείτε σαπούνια, έλαια ή αφρό.',
    rules: 'Κανόνες σπιτιού',
    quiet: 'Ώρες ησυχίας',
    quietText: 'Παρακαλώ κρατήστε χαμηλή ένταση από 23:00 έως 09:00.',
    smoking: 'Απαγορεύεται το κάπνισμα μέσα',
    smokingText: 'Το κάπνισμα δεν επιτρέπεται μέσα στη σουίτα. Μπορείτε να χρησιμοποιήσετε μόνο εξωτερικούς χώρους.',
    trash: 'Σκουπίδια',
    trashText: 'Παρακαλώ τοποθετήστε τα σκουπίδια στους κάδους έξω από το συγκρότημα.',
    food: 'Προτάσεις host',
    beaches: 'Παραλίες',
    transport: 'Μετακίνηση',
    emergency: 'Έκτακτη ανάγκη',
    emergencyText: 'Για άμεση βοήθεια καλέστε 112. Για οτιδήποτε αφορά τη διαμονή σας, επικοινωνήστε απευθείας μαζί μας.',
    bookDirect: 'Κλείστε απευθείας την επόμενη φορά',
    bookText: 'Καλύτερη διαθέσιμη τιμή, χωρίς προμήθειες πλατφορμών.',
    checkAvailability: 'Δείτε διαθεσιμότητα',
  }
};

const recommendations = [
  { icon: Coffee, title: 'Mythos Bakery Cafe', text: 'Breakfast · coffee · pastries', url: 'https://www.google.com/maps/search/?api=1&query=Mythos%20Bakery%20Cafe%20Faliraki' },
  { icon: Utensils, title: 'Dimitra Restaurant', text: 'Beachfront · lunch · dinner', url: 'https://www.google.com/maps/search/?api=1&query=Dimitra%20Restaurant%20Faliraki' },
  { icon: Utensils, title: 'Doloma', text: 'Fresh fish · local taverna', url: 'https://www.google.com/maps/search/?api=1&query=Doloma%20Restaurant%20Faliraki' },
  { icon: Star, title: 'ETEON', text: 'Fine dining · special night', url: 'https://www.google.com/maps/search/?api=1&query=ETEON%20Faliraki' },
];

const beaches = [
  { title: 'Kathara Beach', text: 'Host’s pick · sandy · calm water', url: 'https://www.google.com/maps/search/?api=1&query=Kathara%20Beach%20Faliraki' },
  { title: 'Faliraki Beach', text: '2 min walk · organised beach', url: 'https://www.google.com/maps/search/?api=1&query=Faliraki%20Beach' },
  { title: 'Anthony Quinn Bay', text: 'Crystal water · snorkeling', url: 'https://www.google.com/maps/search/?api=1&query=Anthony%20Quinn%20Bay' },
];

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      window.prompt('Copy password:', text);
    }
  };
  return { copied, copy };
}

function Card({ icon: Icon, title, children, action }) {
  return (
    <section className="card">
      <div className="card-head">
        <div className="icon"><Icon size={20} /></div>
        <h2>{title}</h2>
      </div>
      <div className="card-body">{children}</div>
      {action}
    </section>
  );
}

function LinkRow({ icon: Icon, title, text, href }) {
  return (
    <a className="link-row" href={href} target="_blank" rel="noreferrer">
      <div className="small-icon"><Icon size={18} /></div>
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <ChevronRight size={18} />
    </a>
  );
}

function App() {
  const [lang, setLang] = useState('en');
  const { copied, copy } = useCopy();
  const t = TEXT[lang];

  const waText = encodeURIComponent('Hello! I am a guest at Vanik Suites and I would like to ask...');
  const whatsappUrl = `https://wa.me/${DATA.contact.whatsapp.replace('+', '')}?text=${waText}`;

  const quick = useMemo(() => [
    { icon: Wifi, title: t.wifi, text: `${DATA.wifi.network} · ${DATA.wifi.password}`, action: () => copy(DATA.wifi.password) },
    { icon: Clock, title: t.checkin, text: DATA.times.checkin },
    { icon: Clock, title: t.checkout, text: DATA.times.checkout },
    { icon: MessageCircle, title: 'WhatsApp', text: DATA.contact.hostPhone, href: whatsappUrl },
  ], [t, whatsappUrl]);

  return (
    <main>
      <a className="floating-wa" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <MessageCircle size={24} />
      </a>

      <header className="hero">
        <div className="topbar">
          <div className="brand-mini">VANIK <span>SUITES</span></div>
          <button className="lang" onClick={() => setLang(lang === 'en' ? 'el' : 'en')}>
            <Languages size={16} /> {TEXT[lang === 'en' ? 'el' : 'en'].langName}
          </button>
        </div>

        <div className="hero-content">
          <p>{DATA.property.location}</p>
          <h1>{t.welcome}<br />{DATA.property.name}</h1>
          <span>{t.subtitle}</span>
          <div className="hero-actions">
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} />{t.whatsapp}</a>
            <a href={DATA.property.maps} target="_blank" rel="noreferrer"><MapPin size={18} />{t.directions}</a>
          </div>
        </div>
      </header>

      <section className="quick">
        <h2>{t.quickTitle}</h2>
        <div className="quick-grid">
          {quick.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon size={22} />
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </>
            );
            if (item.href) return <a key={item.title} className="quick-card" href={item.href} target="_blank" rel="noreferrer">{content}</a>;
            return <button key={item.title} className="quick-card" onClick={item.action}>{content}</button>;
          })}
        </div>
      </section>

      <div className="container">
        <Card icon={Wifi} title={t.wifi}>
          <div className="wifi-box">
            <div><span>Network</span><strong>{DATA.wifi.network}</strong></div>
            <div><span>Password</span><strong>{DATA.wifi.password}</strong></div>
          </div>
          <button className="primary" onClick={() => copy(DATA.wifi.password)}>
            {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? t.copied : t.copyPassword}
          </button>
        </Card>

        <Card icon={KeyRound} title={t.arrival}>
          <p>{t.arrivalText}</p>
        </Card>

        <Card icon={Home} title={t.departure}>
          <p>{t.departureText}</p>
        </Card>

        <Card icon={Droplets} title={t.room}>
          <div className="info-list">
            <LinkRow icon={Wind} title={t.ac} text={t.acText} href="#ac" />
            <LinkRow icon={Tv} title={t.tv} text={t.tvText} href="#tv" />
            <LinkRow icon={Droplets} title={t.hotWater} text={t.hotWaterText} href="#water" />
            <LinkRow icon={Waves} title={t.pool} text={t.poolText} href="#pool" />
          </div>
          <p className="note">{t.jacuzziText}</p>
        </Card>

        <Card icon={ShieldAlert} title={t.rules}>
          <div className="rules">
            <div><Clock size={18}/><strong>{t.quiet}</strong><span>{t.quietText}</span></div>
            <div><ShieldAlert size={18}/><strong>{t.smoking}</strong><span>{t.smokingText}</span></div>
            <div><Trash2 size={18}/><strong>{t.trash}</strong><span>{t.trashText}</span></div>
          </div>
        </Card>

        <Card icon={Utensils} title={t.food}>
          <div className="stack">
            {recommendations.map((r) => <LinkRow key={r.title} icon={r.icon} title={r.title} text={r.text} href={r.url} />)}
          </div>
        </Card>

        <Card icon={Waves} title={t.beaches}>
          <div className="stack">
            {beaches.map((b) => <LinkRow key={b.title} icon={Waves} title={b.title} text={b.text} href={b.url} />)}
          </div>
        </Card>

        <Card icon={Car} title={t.transport}>
          <div className="rules">
            <div><Plane size={18}/><strong>Airport</strong><span>Diagoras Airport is about 17 km away.</span></div>
            <div><Car size={18}/><strong>Parking</strong><span>Public parking is available next to the suites and on the street.</span></div>
          </div>
        </Card>

        <Card icon={ShieldAlert} title={t.emergency}>
          <p>{t.emergencyText}</p>
          <div className="emergency-grid">
            <a href="tel:112">112</a>
            <a href={`tel:${DATA.contact.hostPhone}`}>{t.callHost}</a>
          </div>
        </Card>

        <section className="book">
          <h2>{t.bookDirect}</h2>
          <p>{t.bookText}</p>
          <a href={DATA.property.booking} target="_blank" rel="noreferrer">{t.checkAvailability}</a>
        </section>
      </div>

      <footer>
        <strong>Vanik Suites</strong>
        <span>{DATA.property.address}</span>
        <a href={`mailto:${DATA.contact.email}`}>{DATA.contact.email}</a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
