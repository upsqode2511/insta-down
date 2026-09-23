import fs from 'fs';

let content = fs.readFileSync('src/dictionaries.ts', 'utf8');

const replacements = {
  // Nav
  '"home": "Home"': '"home": "Startseite"',
  '"features": "Features"': '"features": "Funktionen"',
  '"howItWorks": "How it Works"': '"howItWorks": "Wie es funktioniert"',
  '"faq": "FAQ"': '"faq": "Häufige Fragen"',
  '"blog": "Blog"': '"blog": "Blog"',
  
  // Features
  '"f1_title": "Super Fast"': '"f1_title": "Superschnell"',
  '"f1_desc": "Our optimized servers ensure your downloads finish in just a few seconds. No waiting around."': '"f1_desc": "Unsere optimierten Server sorgen dafür, dass Ihre Downloads in nur wenigen Sekunden abgeschlossen sind. Keine Wartezeit."',
  '"f2_title": "High Quality"': '"f2_title": "Hohe Qualität"',
  '"f2_desc": "Download content in its original high-resolution format. No compression, no quality loss."': '"f2_desc": "Laden Sie Inhalte in ihrem ursprünglichen hochauflösenden Format herunter. Keine Komprimierung, kein Qualitätsverlust."',
  '"f3_title": "Safe & Secure"': '"f3_title": "Sicher & Geschützt"',
  '"f3_desc": "We value your privacy. No login required, and we don\'t store any of your downloaded media."': '"f3_desc": "Wir schätzen Ihre Privatsphäre. Kein Login erforderlich und wir speichern keine Ihrer heruntergeladenen Medien."',
  
  // Downloader
  '"paste": "Paste"': '"paste": "Einfügen"',
  '"download": "Download"': '"download": "Herunterladen"',
  '"placeholder": "Search or paste Instagram link here"': '"placeholder": "Suchen oder Instagram-Link hier einfügen"',
  '"check1": "100% Free"': '"check1": "100% Kostenlos"',
  '"check2": "No Login Required"': '"check2": "Kein Login erforderlich"',
  '"check3": "Works on All Devices"': '"check3": "Funktioniert auf allen Geräten"',
  
  // Tabs
  '"video": "Video"': '"video": "Video"',
  '"photo": "Photo"': '"photo": "Foto"',
  '"story": "Story"': '"story": "Story"',
  '"reel": "Reel"': '"reel": "Reel"',
  '"profile": "Profile"': '"profile": "Profil"',
  
  // Pages
  '"videoTitle": "Instagram Video Downloader"': '"videoTitle": "Instagram Video Downloader"',
  '"videoSubtitle": "Download Instagram Videos, Photos, Reels, Stories online with ease"': '"videoSubtitle": "Instagram Videos, Fotos, Reels und Storys ganz einfach online herunterladen"',
  '"photoTitle": "Instagram Photo Downloader"': '"photoTitle": "Instagram Foto Downloader"',
  '"photoSubtitle": "Easily obtain Instagram photos"': '"photoSubtitle": "Holen Sie sich ganz einfach Instagram-Fotos"',
  '"reelsTitle": "Instagram Reels Downloader HD"': '"reelsTitle": "Instagram Reels Downloader HD"',
  '"reelsSubtitle": "Download Instagram Reels videos in high quality MP4 format"': '"reelsSubtitle": "Laden Sie Instagram Reels-Videos im hochwertigen MP4-Format herunter"',
  '"storyTitle": "Instagram Story Downloader"': '"storyTitle": "Instagram Story Downloader"',
  '"storySubtitle": "Download Instagram Stories and Highlights anonymously and for free"': '"storySubtitle": "Laden Sie Instagram-Storys und Highlights anonym und kostenlos herunter"',
  '"profileTitle": "Instagram Profile Downloader"': '"profileTitle": "Instagram Profil Downloader"',
  '"profileSubtitle": "View and download Instagram profile pictures in full resolution"': '"profileSubtitle": "Sehen Sie sich Instagram-Profilbilder in voller Auflösung an und laden Sie sie herunter"',

  // Info Content P1-P4
  'InstaDown is a simple and free Instagram video downloader designed to help you save Instagram videos quickly and easily. Whether you want to download Instagram video for offline viewing or save a video you like, Insta Downloader makes the process easy.': 'InstaDown ist ein einfacher und kostenloser Instagram-Video-Downloader, der Ihnen hilft, Instagram-Videos schnell und einfach zu speichern. Egal, ob Sie Instagram-Videos für die Offline-Anzeige herunterladen oder ein Video speichern möchten, das Ihnen gefällt, Insta Downloader macht den Prozess einfach.',
  'With our Instagram downloader, you can download Instagram videos directly from your browser without complicated steps. There is no need to install additional software or do any login or signup. Simply copy the link of the Instagram video you want to save, paste the URL into InstaDown\\\'s search box, and download your video.': 'Mit unserem Instagram-Downloader können Sie Instagram-Videos ohne komplizierte Schritte direkt über Ihren Browser herunterladen. Es ist nicht erforderlich, zusätzliche Software zu installieren oder sich anzumelden oder zu registrieren. Kopieren Sie einfach den Link des Instagram-Videos, das Sie speichern möchten, fügen Sie die URL in das Suchfeld von InstaDown ein und laden Sie Ihr Video herunter.',
  'Our service is designed to work on a variety of devices, including smartphones, tablets, laptops, and desktop computers. This makes it easy for you to download Instagram video content whenever you need it.': 'Unser Service ist so konzipiert, dass er auf einer Vielzahl von Geräten funktioniert, einschließlich Smartphones, Tablets, Laptops und Desktop-Computern. Dies macht es Ihnen leicht, Instagram-Videoinhalte herunterzuladen, wann immer Sie sie benötigen.',
  'Insta Video Download focuses on providing a clean and user-friendly experience. If you are looking for an Instagram downloader that makes downloading video content fast and easy, InstaDown offers you a simple solution.': 'Insta Video Download konzentriert sich darauf, eine saubere und benutzerfreundliche Erfahrung zu bieten. Wenn Sie nach einem Instagram-Downloader suchen, der das Herunterladen von Videoinhalten schnell und einfach macht, bietet Ihnen InstaDown eine einfache Lösung.',
  
  // Reels Info P1-P3
  'InstaDown is a simple and free Instagram Reels downloader that helps you quickly save Instagram Reels without complex procedures. Whether you want to save an entertaining Reel, keep an inspiring video to watch later, or download content for offline viewing, our Insta Reel downloader makes the process incredibly easy.': 'InstaDown ist ein einfacher und kostenloser Instagram Reels Downloader, mit dem Sie Instagram Reels ohne komplexe Verfahren schnell speichern können. Egal, ob Sie ein unterhaltsames Reel speichern, ein inspirierendes Video zum späteren Ansehen aufbewahren oder Inhalte zum Offline-Ansehen herunterladen möchten, unser Insta Reel Downloader macht den Vorgang unglaublich einfach.',
  'With the Reel downloader, you can download Instagram Reels using their public URLs. There is no need to install additional software or navigate complex settings. Simply copy the link of the Instagram Reel you like, paste it into our downloader, and download the video to your device.': 'Mit dem Reel Downloader können Sie Instagram Reels über ihre öffentlichen URLs herunterladen. Es ist keine Installation zusätzlicher Software oder die Navigation durch komplexe Einstellungen erforderlich. Kopieren Sie einfach den Link des gewünschten Instagram Reels, fügen Sie ihn in unseren Downloader ein und laden Sie das Video auf Ihr Gerät herunter.',
  'Our Instagram Reels download is designed to work on smartphones, tablets, laptops, and desktop computers. Its simple interface ensures ease of use for both new and regular Instagram users. You can use Instadown whenever you need to quickly and easily save publicly available Instagram Reel videos. Since this service is web-based, you can use it without installing any separate application.': 'Unser Instagram Reels-Download ist für die Nutzung auf Smartphones, Tablets, Laptops und Desktop-Computern konzipiert. Seine einfache Benutzeroberfläche gewährleistet eine einfache Bedienung sowohl für neue als auch für regelmäßige Instagram-Benutzer. Sie können Instadown immer dann verwenden, wenn Sie schnell und einfach öffentlich zugängliche Instagram Reel-Videos speichern möchten. Da dieser Dienst webbasiert ist, können Sie ihn ohne die Installation einer separaten Anwendung verwenden.'
};

let startIndex = content.indexOf('de: {');
let endIndex = content.indexOf('it: {');

if (startIndex !== -1 && endIndex !== -1) {
    let section = content.substring(startIndex, endIndex);
    for (const [eng, tr] of Object.entries(replacements)) {
        section = section.replace(eng, tr);
    }
    content = content.substring(0, startIndex) + section + content.substring(endIndex);
    fs.writeFileSync('src/dictionaries.ts', content, 'utf8');
    console.log('Successfully translated DE section.');
} else {
    console.log('Could not find boundaries.');
}
