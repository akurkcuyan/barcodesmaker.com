import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "nav": {
                "generator": "Generator",
                "scanner": "Scanner",
                "about": "About",
                "create_now": "Create Now"
            },
            "hero": {
                "badge": "Professional Grade Tools",
                "title_main": "Generate & Scan",
                "title_gradient": "Barcodes Instantly.",
                "subtitle": "\"Professional Barcode & QR Tools for Everyone.\" High-resolution exports, real-time scanning, and full privacy compliance.",
                "start_btn": "Start Creating",
                "open_scanner": "Open Scanner",
                "scroll_down": "Scroll Down to Explore"
            },
            "modes": {
                "generator": "Generator",
                "scanner": "Scanner"
            },
            "barcode": {
                "format_selection": "Format Selection",
                "contents": "Barcode Contents",
                "example": "Example",
                "format_ready": "Format Ready",
                "no_data": "Please enter data to encode",
                "invalid_data": "Invalid data for",
                "more_options": "More Customization",
                "less_options": "Less Options",
                "reset": "Reset Defaults",
                "bar_color": "Bar Color",
                "background": "Background",
                "resolution": "Resolution (Scale)",
                "height": "Bar Height",
                "export_format": "Export Format",
                "download": "Download",
                "copy": "Copy Text",
                "copied": "Copied",
                "engine_ready": "Engine Ready",
                "industrial_grade": "Industrial Grade",
                "matrix_rendering": "High-Density Matrix Rendering",
                "type": "Type",
                "chars": "Chars",
                "placeholder": "Enter values to encode...",
                "vector_alert": "For AI/PS (Vector) editing, please use the SVG format which is fully compatible with professional design tools."
            },
            "qr": {
                "data_type": "QR Data Type",
                "details": "Details",
                "error_correction": "Damage Proof (Error Correction)",
                "security_check": "Security Check",
                "level": "Level",
                "active": "Active",
                "types": {
                    "text": "Regular text",
                    "url": "Hyperlink",
                    "phone": "Phone number",
                    "email": "E-mail address",
                    "mecard": "meCard",
                    "vcard": "vCard",
                    "wifi": "WiFi settings"
                },
                "placeholders": {
                    "text": "Enter plain text to encode...",
                    "url": "https://example.com",
                    "phone": "+1 234 567 89 00",
                    "email_to": "Recipient email",
                    "email_subject": "Subject",
                    "email_body": "Message body",
                    "name": "Full Name",
                    "org": "Organization",
                    "tel": "Phone",
                    "email": "Email Address",
                    "web": "Website URL",
                    "ssid": "Network SSID (Name)",
                    "pass": "Password"
                }
            },
            "features": {
                "hd": { "title": "Ultra High Res", "desc": "Download labels in pixel-perfect formats for professional printing." },
                "gs": { "title": "Global Standards", "desc": "Supporting EAN, Code 128, and many more industrial standards." },
                "pr": { "title": "Zero Storage", "desc": "No data is ever stored on our servers. Your privacy is paramount." }
            },
            "seo": {
                "why_title": "Why",
                "why_brand": "BarcodesMaker?",
                "sub_text": "BarcodesMaker.com is the definitive ecosystem for professional-grade barcode solutions. We combine cutting-edge browser technology with accessibility to provide a zero-cost, high-performance tool for businesses, developers, and individuals across the globe.",
                "ean_title": "EAN-13 & Retail Standards",
                "ean_text": "The **EAN-13** (European Article Number) barcode is the standard for global trade and retail. It consists of 13 digits and is globally unique, identifying not only the product but also the manufacturer and country of origin. At BarcodesMaker.com, we ensure every EAN-13 generated follows the strict checksum algorithms required for POS systems.",
                "code128_title": "Code 128 Architecture",
                "code128_text": "For industrial applications, logistics, and supply chain management, **Code 128** is the gold standard. Unlike retail-focused EAN codes, Code 128 is high-density and alphanumeric, capable of encoding complex data strings, serial numbers, and shipping identifiers.",
                "qr_title": "The QR Code Revolution",
                "qr_text": "Originally designed for automotive tracking, **QR Codes** (Quick Response Codes) have revolutionized how we interact with the physical world. From URLs and Wi-Fi credentials to complex digital business cards, our QR tool supports \"High Error Correction\" (Level H).",
                "browser_title": "Browser-Side Sovereignty",
                "browser_text": "We believe in privacy by design. Unlike other online tools that transmit your data to remote servers, BarcodesMaker.com runs 100% in your local browser environment. Your sensitive data never leaves your computer.",
                "quote": "BarcodesMaker.com provides the bridge between digital data and physical identity. As the global supply chain scales, our mission is to provide the reliable, professional, and accessible tools necessary for creators and businesses to thrive in the modern economy.",
                "vision": "The BarcodesMaker Vision",
                "how_title": "How to Generate a Barcode",
                "how_subtitle": "Create professional barcodes in under 60 seconds — no software, no signup, no cost.",
                "how_step1_title": "1. Choose Your Format",
                "how_step1_desc": "Select the barcode type that fits your use case: EAN-13 for retail, Code 128 for logistics, QR Code for URLs and contacts, or any of 12+ supported formats.",
                "how_step2_title": "2. Enter Your Data",
                "how_step2_desc": "Type or paste the content to encode — a product number, URL, plain text, phone number, Wi-Fi credentials, or digital business card.",
                "how_step3_title": "3. Download & Use",
                "how_step3_desc": "Click Download to save your barcode as JPG, PNG, or SVG. SVG is recommended for print and professional design tools like Adobe Illustrator.",
                "formats_title": "Supported Barcode Formats",
                "formats_subtitle": "From retail shelves to hospital rooms — we support every major barcode standard used across industries.",
                "faq_title": "Frequently Asked Questions",
                "faq_subtitle": "Everything you need to know about using BarcodesMaker.com.",
                "faq_q1": "Is BarcodesMaker.com completely free?",
                "faq_a1": "Yes. There is no sign-up, no subscription, and no hidden fees. Generate and download unlimited barcodes and QR codes at no cost, forever.",
                "faq_q2": "What barcode formats are supported?",
                "faq_a2": "We support EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF-14, MSI Plessey, Codabar, QR Code, and DataMatrix — covering retail, logistics, healthcare, and more.",
                "faq_q3": "Are the barcodes suitable for commercial use?",
                "faq_a3": "Absolutely. Our barcodes use industrial-grade encoding libraries and are compatible with all standard POS scanners. They are free for personal and commercial use with no attribution required.",
                "faq_q4": "Is my data private and secure?",
                "faq_a4": "Yes. All barcode generation and scanning happens 100% within your browser. No data is ever sent to any server. Your sensitive product codes and business data never leave your device.",
                "faq_q5": "What file formats can I download?",
                "faq_a5": "You can download in JPG, PNG, and SVG formats. SVG is ideal for professional printing and vector editing. PNG and JPG are perfect for web and digital use.",
                "faq_q6": "Can I scan barcodes with my camera?",
                "faq_a6": "Yes. The built-in scanner supports real-time scanning via webcam or mobile camera, and also lets you upload an image file for decoding. It recognizes EAN, Code 128, QR Codes, DataMatrix, and many more."
            },
            "footer": {
                "tagline": "Professional Barcode & QR Tools for Everyone. Generating, scanning, and managing barcodes has never been easier.",
                "links": "Quick Links",
                "legal": "Support & Legal",
                "rights": "All rights reserved.",
                "online": "System Online & Encrypted"
            },
            "scanner": {
                "signal_processing": "Signal Processing",
                "title_main": "Digital",
                "title_gradient": "Decoder",
                "scanned": "Scanned",
                "barcode": "Barcode",
                "qr": "QR Code",
                "new_scan": "New Scan",
                "standby": "Scanner Standby",
                "standby_desc": "Point camera or upload image to decode",
                "stop": "Stop Sensor",
                "controls": "Scanner Controls",
                "realtime": "Real-time",
                "import": "Import File",
                "decoded_signal": "Decoded Signal",
                "active_data": "Active Data",
                "waiting": "Sensors Calibrated...",
                "private_channel": "Private Signal Channel",
                "private_desc": "Direct browser-to-silicon decryption. No cloud data leakage.",
                "errors": {
                    "camera": "Camera access failed. Check permission/HTTPS.",
                    "detect": "Could not detect a valid code. Try another image."
                }
            }
        }
    },
    tr: {
        translation: {
            "nav": {
                "generator": "Oluşturucu",
                "scanner": "Tarayıcı",
                "about": "Hakkımızda",
                "create_now": "Hemen Başla"
            },
            "hero": {
                "badge": "Profesyonel Araçlar",
                "title_main": "Barkod Oluştur",
                "title_gradient": "& Anında Tara.",
                "subtitle": "\"Herkes İçin Profesyonel Barkod ve QR Araçları.\" Yüksek çözünürlüklü dışa aktarma, gerçek zamanlı tarama ve tam gizlilik uyumu.",
                "start_btn": "Oluşturmaya Başla",
                "open_scanner": "Tarayıcıyı Aç",
                "scroll_down": "Keşfetmek İçin Kaydır"
            },
            "modes": {
                "generator": "Oluşturucu",
                "scanner": "Tarayıcı"
            },
            "barcode": {
                "format_selection": "Format Seçimi",
                "contents": "Barkod İçeriği",
                "example": "Örnek",
                "format_ready": "Format Hazır",
                "no_data": "Lütfen kodlanacak veriyi girin",
                "invalid_data": "Şu format için geçersiz veri:",
                "more_options": "Gelişmiş Ayarlar",
                "less_options": "Daha Az Ayar",
                "reset": "Ayarları Sıfırla",
                "bar_color": "Barkod Rengi",
                "background": "Arka Plan",
                "resolution": "Çözünürlük (Ölçek)",
                "height": "Barkod Yüksekliği",
                "export_format": "Format Seç",
                "download": "İndir",
                "copy": "Metni Kopyala",
                "copied": "Kopyalandı",
                "engine_ready": "Motor Hazır",
                "industrial_grade": "Endüstriyel Kalite",
                "matrix_rendering": "Yüksek Yoğunluklu Render",
                "type": "TİP",
                "chars": "Karakter",
                "placeholder": "Kodlanacak değerleri girin...",
                "vector_alert": "Vektörel (AI/PS) düzenleme için lütfen profesyonel tasarım araçlarıyla tam uyumlu olan SVG formatını kullanın."
            },
            "qr": {
                "data_type": "QR Veri Tipi",
                "details": "Detaylar",
                "error_correction": "Hata Düzeltme Seviyesi",
                "security_check": "Güvenlik Kontrolü",
                "level": "Seviye",
                "active": "Aktif",
                "types": {
                    "text": "Düz Metin",
                    "url": "Bağlantı (Link)",
                    "phone": "Telefon No",
                    "email": "E-posta",
                    "mecard": "meCard",
                    "vcard": "Dijital Kart",
                    "wifi": "WiFi Ayarları"
                },
                "placeholders": {
                    "text": "Kodlanacak metni girin...",
                    "url": "https://ornek.com",
                    "phone": "+90 5XX XXX XX XX",
                    "email_to": "Alıcı e-posta",
                    "email_subject": "Konu",
                    "email_body": "Mesaj içeriği",
                    "name": "Ad Soyad",
                    "org": "Şirket/Kurum",
                    "tel": "Telefon",
                    "email": "E-posta Adresi",
                    "web": "Web Sitesi",
                    "ssid": "Ağ Adı (SSID)",
                    "pass": "Şifre"
                }
            },
            "features": {
                "hd": { "title": "Yüksek Çözünürlük", "desc": "Profesyonel baskı için piksel kusursuz formatlarda etiketler indirin." },
                "gs": { "title": "Global Standartlar", "desc": "EAN, Code 128 ve daha birçok endüstriyel standardı destekler." },
                "pr": { "title": "Sıfır Depolama", "desc": "Verileriniz asla sunucularımızda saklanmaz. Gizliliğiniz esastır." }
            },
            "seo": {
                "why_title": "Neden",
                "why_brand": "BarcodesMaker?",
                "sub_text": "BarcodesMaker.com, profesyonel kalitede barkod çözümleri için kesin ekosistemdir. İşletmeler, geliştiriciler ve bireyler için ücretsiz, yüksek performanslı bir araç sağlamak amacıyla en yeni tarayıcı teknolojilerini erişilebilirlikle birleştiriyoruz.",
                "ean_title": "EAN-13 & Perakende Standartları",
                "ean_text": "**EAN-13**, küresel ticaret ve perakende için standarttır. 13 haneden oluşur ve dünya çapında benzersizdir. BarcodesMaker'da oluşturulan her kodun POS sistemleri için gereken katı sağlama toplamı algoritmalarına uymasını sağlıyoruz.",
                "code128_title": "Code 128 Mimarisi",
                "code128_text": "Lojistik ve tedarik zinciri yönetimi için **Code 128** altın standarttır. Yüksek yoğunluklu ve alfanümerik olup, karmaşık veri dizilerini, seri numaralarını ve sevkiyat tanımlayıcılarını kodlayabilir.",
                "qr_title": "QR Kod Devrimi",
                "qr_text": "**QR Kodlar**, fiziksel dünyayla etkileşimimizi devrim niteliğinde değiştirdi. QR aracımız, sembolün %30'u hasar görse bile çalışmaya devam eden \"Yüksek Hata Düzeltme\" (H Seviyesi) özelliğini destekler.",
                "browser_title": "Tarayıcı Tarafı Güvenliği",
                "browser_text": "Tasarım gereği gizliliğe inanıyoruz. BarcodesMaker.com %100 yerel tarayıcı ortamınızda çalışır. Hassas verileriniz asla bilgisayarınızdan ayrılmaz.",
                "quote": "BarcodesMaker.com, dijital veri ile fiziksel kimlik arasındaki köprüyü kurar. Misyonumuz, içerik oluşturucuların ve işletmelerin modern ekonomide gelişmesi için gerekli güvenilir araçları sağlamaktır.",
                "vision": "BarcodesMaker Vizyonu",
                "how_title": "Nasıl Barkod Oluşturulur",
                "how_subtitle": "60 saniyeden kısa sürede profesyonel barkod oluşturun — yazılım gerekmez, kayıt gerekmez, ücret alınmaz.",
                "how_step1_title": "1. Format Seçin",
                "how_step1_desc": "Kullanım amacınıza uygun barkod tipini seçin: perakende için EAN-13, lojistik için Code 128, URL ve iletişim için QR Kod ya da 12'den fazla desteklenen formattan biri.",
                "how_step2_title": "2. Verilerinizi Girin",
                "how_step2_desc": "Kodlanacak içeriği yazın veya yapıştırın: ürün numarası, URL, düz metin, telefon numarası, WiFi bilgileri veya dijital kartvizit.",
                "how_step3_title": "3. İndirin ve Kullanın",
                "how_step3_desc": "JPG, PNG veya SVG olarak indirmek için İndir'e tıklayın. Baskı ve profesyonel tasarım araçları için SVG önerilir.",
                "formats_title": "Desteklenen Barkod Formatları",
                "formats_subtitle": "Perakendeden hastaneye — her sektörde kullanılan tüm önemli barkod standartlarını destekliyoruz.",
                "faq_title": "Sık Sorulan Sorular",
                "faq_subtitle": "BarcodesMaker.com hakkında merak ettiğiniz her şey.",
                "faq_q1": "BarcodesMaker.com tamamen ücretsiz mi?",
                "faq_a1": "Evet. Kayıt, abonelik veya gizli ücret gerektirmez. Sınırsız barkod ve QR kod oluşturup indirebilirsiniz.",
                "faq_q2": "Hangi barkod formatları destekleniyor?",
                "faq_a2": "EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF-14, MSI Plessey, Codabar, QR Kod ve DataMatrix formatlarını destekliyoruz.",
                "faq_q3": "Oluşturulan barkodlar ticari kullanım için uygun mu?",
                "faq_a3": "Kesinlikle. Barkodlarımız endüstriyel kalitede kodlama kütüphaneleri kullanır ve tüm standart POS okuyucularla uyumludur. Kişisel ve ticari kullanım için ücretsizdir.",
                "faq_q4": "Verilerim gizli ve güvende mi?",
                "faq_a4": "Evet. Tüm barkod oluşturma ve tarama işlemleri %100 tarayıcınızda gerçekleşir. Hiçbir veri sunucuya gönderilmez.",
                "faq_q5": "Hangi dosya formatlarında indirebilirim?",
                "faq_a5": "JPG, PNG ve SVG formatlarında indirebilirsiniz. Profesyonel baskı için SVG, dijital kullanım için PNG veya JPG önerilir.",
                "faq_q6": "Kamerayla barkod tarayabilir miyim?",
                "faq_a6": "Evet. Dahili tarayıcı, web kamerası veya mobil kamera ile gerçek zamanlı taramayı ve görüntü dosyası yüklemeyi destekler."
            },
            "footer": {
                "tagline": "Herkes için Profesyonel Barkod ve QR Araçları. Barkod oluşturmak, taramak ve yönetmek hiç bu kadar kolay olmamıştı.",
                "links": "Hızlı Bağlantılar",
                "legal": "Destek ve Yasal",
                "rights": "Tüm hakları saklıdır.",
                "online": "Sistem Çevrimiçi ve Şifreli"
            },
            "scanner": {
                "signal_processing": "Sinyal İşleme",
                "title_main": "Dijital",
                "title_gradient": "Çözücü",
                "scanned": "Tarandı",
                "barcode": "Barkod",
                "qr": "QR Kod",
                "new_scan": "Yeni Tarama",
                "standby": "Tarayıcı Hazır",
                "standby_desc": "Kod çözmek için kamerayı doğrultun veya dosya yükleyin",
                "stop": "Sensörü Durdur",
                "controls": "Tarayıcı Kontrolleri",
                "realtime": "Gerçek Zamanlı",
                "import": "Dosya Yükle",
                "decoded_signal": "Çözülen Sinyal",
                "active_data": "Aktif Veri",
                "waiting": "Sensörler Kalibre Ediliyor...",
                "private_channel": "Özel Sinyal Kanalı",
                "private_desc": "Donanım düzeyinde yerel kod çözme. Bulut veri sızıntısı yok.",
                "errors": {
                    "camera": "Kamera erişimi başarısız. İzinleri veya HTTPS bağlantısını kontrol edin.",
                    "detect": "Geçerli bir kod algılanamadı. Başka bir görsel deneyin."
                }
            }
        }
    },
    de: {
        translation: {
            "nav": {
                "generator": "Generator",
                "scanner": "Scanner",
                "about": "Über uns",
                "create_now": "Jetzt erstellen"
            },
            "hero": {
                "badge": "Professionelle Werkzeuge",
                "title_main": "Barcodes generieren",
                "title_gradient": "& sofort scannen.",
                "subtitle": "\"Professionelle Barcode- & QR-Tools für alle.\" Hochauflösende Exporte, Echtzeit-Scanning und vollständige Datenschutzkonformität.",
                "start_btn": "Jetzt erstellen",
                "open_scanner": "Scanner öffnen",
                "scroll_down": "Nach unten scrollen"
            },
            "modes": {
                "generator": "Generator",
                "scanner": "Scanner"
            },
            "barcode": {
                "format_selection": "Formatauswahl",
                "contents": "Barcode-Inhalt",
                "example": "Beispiel",
                "format_ready": "Format bereit",
                "no_data": "Bitte geben Sie Daten zum Codieren ein",
                "invalid_data": "Ungültige Daten für",
                "more_options": "Mehr Anpassungen",
                "less_options": "Weniger Optionen",
                "reset": "Zurücksetzen",
                "bar_color": "Balkenfarbe",
                "background": "Hintergrund",
                "resolution": "Auflösung (Skalierung)",
                "height": "Balkenhöhe",
                "export_format": "Exportformat",
                "download": "Herunterladen",
                "copy": "Text kopieren",
                "copied": "Kopiert",
                "engine_ready": "Engine bereit",
                "industrial_grade": "Industriequalität",
                "matrix_rendering": "Hochdichtes Matrix-Rendering",
                "type": "Typ",
                "chars": "Zeichen",
                "placeholder": "Werte zum Codieren eingeben...",
                "vector_alert": "Für Vektor-Bearbeitung (AI/PS) verwenden Sie bitte das SVG-Format."
            },
            "qr": {
                "data_type": "QR-Datentyp",
                "details": "Details",
                "error_correction": "Fehlerkorrektur",
                "security_check": "Sicherheitsprüfung",
                "level": "Ebene",
                "active": "Aktiv",
                "types": {
                    "text": "Normaler Text",
                    "url": "Hyperlink",
                    "phone": "Telefonnummer",
                    "email": "E-Mail-Adresse",
                    "mecard": "meCard",
                    "vcard": "vCard",
                    "wifi": "WLAN-Einstellungen"
                },
                "placeholders": {
                    "text": "Text zum Codieren eingeben...",
                    "url": "https://example.com",
                    "phone": "+49 123 456 7890",
                    "email_to": "Empfänger-E-Mail",
                    "email_subject": "Betreff",
                    "email_body": "Nachrichtentext",
                    "name": "Vollständiger Name",
                    "org": "Organisation",
                    "tel": "Telefon",
                    "email": "E-Mail-Adresse",
                    "web": "Website-URL",
                    "ssid": "Netzwerk-SSID (Name)",
                    "pass": "Passwort"
                }
            },
            "features": {
                "hd": { "title": "Ultra-Hochauflösung", "desc": "Labels in pixelgenauen Formaten für professionellen Druck herunterladen." },
                "gs": { "title": "Globale Standards", "desc": "Unterstützt EAN, Code 128 und viele weitere Industriestandards." },
                "pr": { "title": "Null Speicherung", "desc": "Keine Daten werden auf unseren Servern gespeichert. Ihre Privatsphäre hat Priorität." }
            },
            "seo": {
                "why_title": "Warum",
                "why_brand": "BarcodesMaker?",
                "sub_text": "BarcodesMaker.com ist das definitive Ökosystem für professionelle Barcode-Lösungen. Wir kombinieren modernste Browser-Technologie mit Zugänglichkeit.",
                "ean_title": "EAN-13 & Einzelhandelsstandards",
                "ean_text": "Der **EAN-13**-Barcode ist der Standard für den globalen Handel und Einzelhandel.",
                "code128_title": "Code 128 Architektur",
                "code128_text": "Für industrielle Anwendungen, Logistik und Supply-Chain-Management ist **Code 128** der Goldstandard.",
                "qr_title": "Die QR-Code-Revolution",
                "qr_text": "**QR-Codes** haben die Art und Weise, wie wir mit der physischen Welt interagieren, revolutioniert.",
                "browser_title": "Browser-seitige Souveränität",
                "browser_text": "Wir glauben an Datenschutz durch Design. BarcodesMaker.com läuft zu 100% in Ihrer lokalen Browserumgebung.",
                "quote": "BarcodesMaker.com bietet die Brücke zwischen digitalen Daten und physischer Identität.",
                "vision": "Die BarcodesMaker Vision",
                "how_title": "So erstellen Sie einen Barcode",
                "how_subtitle": "Professionelle Barcodes in unter 60 Sekunden — keine Software, keine Anmeldung, keine Kosten.",
                "how_step1_title": "1. Format wählen",
                "how_step1_desc": "Wählen Sie den Barcode-Typ für Ihren Anwendungsfall: EAN-13 für den Einzelhandel, Code 128 für die Logistik, QR-Code für URLs.",
                "how_step2_title": "2. Daten eingeben",
                "how_step2_desc": "Geben Sie den zu codierenden Inhalt ein: Produktnummer, URL, Text, Telefonnummer oder WLAN-Zugangsdaten.",
                "how_step3_title": "3. Herunterladen & verwenden",
                "how_step3_desc": "Klicken Sie auf Herunterladen, um Ihren Barcode als JPG, PNG oder SVG zu speichern. SVG wird für professionellen Druck empfohlen.",
                "formats_title": "Unterstützte Barcode-Formate",
                "formats_subtitle": "Vom Einzelhandel bis zur Medizin — wir unterstützen alle wichtigen Barcode-Standards.",
                "faq_title": "Häufig gestellte Fragen",
                "faq_subtitle": "Alles, was Sie über BarcodesMaker.com wissen müssen.",
                "faq_q1": "Ist BarcodesMaker.com völlig kostenlos?",
                "faq_a1": "Ja. Keine Anmeldung, kein Abonnement, keine versteckten Gebühren. Generieren und laden Sie unbegrenzt Barcodes und QR-Codes herunter.",
                "faq_q2": "Welche Barcode-Formate werden unterstützt?",
                "faq_a2": "EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF-14, MSI Plessey, Codabar, QR-Code und DataMatrix.",
                "faq_q3": "Sind die Barcodes für den kommerziellen Einsatz geeignet?",
                "faq_a3": "Absolut. Unsere Barcodes verwenden Bibliotheken in Industriequalität und sind mit allen Standard-POS-Scannern kompatibel.",
                "faq_q4": "Sind meine Daten privat und sicher?",
                "faq_a4": "Ja. Die gesamte Barcode-Erstellung und -Scanlösung erfolgt zu 100% in Ihrem Browser. Keine Daten werden an Server gesendet.",
                "faq_q5": "In welchen Dateiformaten kann ich herunterladen?",
                "faq_a5": "JPG, PNG und SVG. SVG empfiehlt sich für professionellen Druck und Vektorbearbeitung.",
                "faq_q6": "Kann ich Barcodes mit meiner Kamera scannen?",
                "faq_a6": "Ja. Der Scanner unterstützt Echtzeit-Scans über Webcam oder Handy-Kamera und das Hochladen von Bilddateien."
            },
            "footer": {
                "tagline": "Professionelle Barcode- & QR-Tools für alle.",
                "links": "Schnelllinks",
                "legal": "Support & Rechtliches",
                "rights": "Alle Rechte vorbehalten.",
                "online": "System online & verschlüsselt"
            },
            "scanner": {
                "signal_processing": "Signalverarbeitung",
                "title_main": "Digitaler",
                "title_gradient": "Decoder",
                "scanned": "Gescannt",
                "barcode": "Barcode",
                "qr": "QR-Code",
                "new_scan": "Neuer Scan",
                "standby": "Scanner-Bereitschaft",
                "standby_desc": "Kamera richten oder Bild hochladen zum Decodieren",
                "stop": "Sensor stoppen",
                "controls": "Scanner-Steuerung",
                "realtime": "Echtzeit",
                "import": "Datei importieren",
                "decoded_signal": "Decodiertes Signal",
                "active_data": "Aktive Daten",
                "waiting": "Sensoren kalibriert...",
                "private_channel": "Privater Signalkanal",
                "private_desc": "Direkte Browser-zu-Silicon-Entschlüsselung. Keine Cloud-Datenlecks.",
                "errors": {
                    "camera": "Kamerazugriff fehlgeschlagen. Berechtigung/HTTPS prüfen.",
                    "detect": "Kein gültiger Code erkannt. Anderes Bild versuchen."
                }
            }
        }
    },
    hi: {
        translation: {
            "nav": {
                "generator": "जेनरेटर",
                "scanner": "स्कैनर",
                "about": "हमारे बारे में",
                "create_now": "अभी बनाएं"
            },
            "hero": {
                "badge": "पेशेवर उपकरण",
                "title_main": "बारकोड बनाएं",
                "title_gradient": "& तुरंत स्कैन करें।",
                "subtitle": "\"सभी के लिए पेशेवर बारकोड & QR टूल्स।\" उच्च-रिज़ॉल्यूशन निर्यात, रियल-टाइम स्कैनिंग और पूर्ण गोपनीयता।",
                "start_btn": "बनाना शुरू करें",
                "open_scanner": "स्कैनर खोलें",
                "scroll_down": "नीचे स्क्रॉल करें"
            },
            "modes": {
                "generator": "जेनरेटर",
                "scanner": "स्कैनर"
            },
            "barcode": {
                "format_selection": "प्रारूप चयन",
                "contents": "बारकोड सामग्री",
                "example": "उदाहरण",
                "format_ready": "प्रारूप तैयार",
                "no_data": "कृपया एनकोड करने के लिए डेटा दर्ज करें",
                "invalid_data": "के लिए अमान्य डेटा",
                "more_options": "अधिक अनुकूलन",
                "less_options": "कम विकल्प",
                "reset": "डिफ़ॉल्ट रीसेट करें",
                "bar_color": "बार रंग",
                "background": "पृष्ठभूमि",
                "resolution": "रिज़ॉल्यूशन (स्केल)",
                "height": "बार ऊंचाई",
                "export_format": "निर्यात प्रारूप",
                "download": "डाउनलोड",
                "copy": "टेक्स्ट कॉपी करें",
                "copied": "कॉपी किया",
                "engine_ready": "इंजन तैयार",
                "industrial_grade": "औद्योगिक ग्रेड",
                "matrix_rendering": "हाई-डेंसिटी मैट्रिक्स रेंडरिंग",
                "type": "प्रकार",
                "chars": "वर्ण",
                "placeholder": "एनकोड करने के लिए मान दर्ज करें...",
                "vector_alert": "वेक्टर संपादन के लिए SVG प्रारूप का उपयोग करें।"
            },
            "qr": {
                "data_type": "QR डेटा प्रकार",
                "details": "विवरण",
                "error_correction": "त्रुटि सुधार",
                "security_check": "सुरक्षा जांच",
                "level": "स्तर",
                "active": "सक्रिय",
                "types": {
                    "text": "सामान्य पाठ",
                    "url": "हाइपरलिंक",
                    "phone": "फ़ोन नंबर",
                    "email": "ई-मेल पता",
                    "mecard": "meCard",
                    "vcard": "vCard",
                    "wifi": "WiFi सेटिंग्स"
                },
                "placeholders": {
                    "text": "एनकोड करने के लिए टेक्स्ट दर्ज करें...",
                    "url": "https://example.com",
                    "phone": "+91 98765 43210",
                    "email_to": "प्राप्तकर्ता ईमेल",
                    "email_subject": "विषय",
                    "email_body": "संदेश",
                    "name": "पूरा नाम",
                    "org": "संगठन",
                    "tel": "फ़ोन",
                    "email": "ईमेल पता",
                    "web": "वेबसाइट URL",
                    "ssid": "नेटवर्क SSID (नाम)",
                    "pass": "पासवर्ड"
                }
            },
            "features": {
                "hd": { "title": "अल्ट्रा हाई रेज़", "desc": "पेशेवर प्रिंटिंग के लिए पिक्सल-परफेक्ट फ़ॉर्मेट में लेबल डाउनलोड करें।" },
                "gs": { "title": "वैश्विक मानक", "desc": "EAN, Code 128 और कई औद्योगिक मानकों का समर्थन।" },
                "pr": { "title": "शून्य संग्रहण", "desc": "हमारे सर्वर पर कोई डेटा संग्रहीत नहीं किया जाता। आपकी गोपनीयता सर्वोपरि है।" }
            },
            "seo": {
                "why_title": "क्यों",
                "why_brand": "BarcodesMaker?",
                "sub_text": "BarcodesMaker.com पेशेवर बारकोड समाधानों के लिए एक निश्चित पारिस्थितिकी तंत्र है।",
                "ean_title": "EAN-13 & खुदरा मानक",
                "ean_text": "**EAN-13** वैश्विक व्यापार और खुदरा के लिए मानक है।",
                "code128_title": "Code 128 आर्किटेक्चर",
                "code128_text": "लॉजिस्टिक्स के लिए **Code 128** स्वर्ण मानक है।",
                "qr_title": "QR कोड क्रांति",
                "qr_text": "**QR कोड** ने भौतिक दुनिया के साथ हमारी बातचीत में क्रांति ला दी है।",
                "browser_title": "ब्राउज़र-साइड संप्रभुता",
                "browser_text": "BarcodesMaker.com 100% आपके स्थानीय ब्राउज़र में चलता है। आपका डेटा कभी नहीं जाता।",
                "quote": "BarcodesMaker.com डिजिटल डेटा और भौतिक पहचान के बीच पुल प्रदान करता है।",
                "vision": "BarcodesMaker विजन",
                "how_title": "बारकोड कैसे बनाएं",
                "how_subtitle": "60 सेकंड से कम में पेशेवर बारकोड बनाएं — कोई सॉफ्टवेयर नहीं, कोई साइनअप नहीं, कोई शुल्क नहीं।",
                "how_step1_title": "1. फ़ॉर्मेट चुनें",
                "how_step1_desc": "अपने उपयोग के लिए बारकोड प्रकार चुनें: रिटेल के लिए EAN-13, लॉजिस्टिक्स के लिए Code 128, URL के लिए QR Code।",
                "how_step2_title": "2. डेटा दर्ज करें",
                "how_step2_desc": "एनकोड करने के लिए सामग्री टाइप या पेस्ट करें — उत्पाद नंबर, URL, टेक्स्ट, फोन नंबर या WiFi क्रेडेंशियल।",
                "how_step3_title": "3. डाउनलोड करें और उपयोग करें",
                "how_step3_desc": "JPG, PNG या SVG के रूप में सहेजने के लिए डाउनलोड पर क्लिक करें। प्रिंट के लिए SVG अनुशंसित है।",
                "formats_title": "समर्थित बारकोड फ़ॉर्मेट",
                "formats_subtitle": "रिटेल से अस्पताल तक — हम सभी प्रमुख बारकोड मानकों का समर्थन करते हैं।",
                "faq_title": "अक्सर पूछे जाने वाले प्रश्न",
                "faq_subtitle": "BarcodesMaker.com के बारे में आपको जो कुछ जानना है।",
                "faq_q1": "क्या BarcodesMaker.com पूरी तरह मुफ्त है?",
                "faq_a1": "हाँ। कोई साइनअप नहीं, कोई सदस्यता नहीं, कोई छिपी फीस नहीं। असीमित बारकोड और QR कोड बनाएं और डाउनलोड करें।",
                "faq_q2": "कौन से बारकोड फ़ॉर्मेट समर्थित हैं?",
                "faq_a2": "EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF-14, MSI Plessey, Codabar, QR Code और DataMatrix।",
                "faq_q3": "क्या बारकोड व्यावसायिक उपयोग के लिए उपयुक्त हैं?",
                "faq_a3": "बिल्कुल। हमारे बारकोड औद्योगिक-ग्रेड लाइब्रेरी का उपयोग करते हैं और सभी मानक POS स्कैनर के साथ संगत हैं।",
                "faq_q4": "क्या मेरा डेटा निजी और सुरक्षित है?",
                "faq_a4": "हाँ। सभी बारकोड निर्माण और स्कैनिंग 100% आपके ब्राउज़र में होती है। कोई डेटा सर्वर पर नहीं भेजा जाता।",
                "faq_q5": "मैं किन फ़ाइल फ़ॉर्मेट में डाउनलोड कर सकता हूं?",
                "faq_a5": "JPG, PNG और SVG। पेशेवर प्रिंट के लिए SVG, डिजिटल उपयोग के लिए PNG अनुशंसित।",
                "faq_q6": "क्या मैं कैमरे से बारकोड स्कैन कर सकता हूं?",
                "faq_a6": "हाँ। अंतर्निहित स्कैनर वेबकैम या मोबाइल कैमरे के माध्यम से रीयल-टाइम स्कैनिंग और छवि फ़ाइल अपलोड का समर्थन करता है।"
            },
            "footer": {
                "tagline": "सभी के लिए पेशेवर बारकोड & QR टूल्स।",
                "links": "त्वरित लिंक",
                "legal": "सहायता & कानूनी",
                "rights": "सर्वाधिकार सुरक्षित।",
                "online": "सिस्टम ऑनलाइन & एन्क्रिप्टेड"
            },
            "scanner": {
                "signal_processing": "सिग्नल प्रोसेसिंग",
                "title_main": "डिजिटल",
                "title_gradient": "डीकोडर",
                "scanned": "स्कैन किया",
                "barcode": "बारकोड",
                "qr": "QR कोड",
                "new_scan": "नया स्कैन",
                "standby": "स्कैनर स्टैंडबाय",
                "standby_desc": "डीकोड करने के लिए कैमरा इशारा करें या छवि अपलोड करें",
                "stop": "सेंसर बंद करें",
                "controls": "स्कैनर नियंत्रण",
                "realtime": "रियल-टाइम",
                "import": "फ़ाइल आयात करें",
                "decoded_signal": "डीकोड किया गया सिग्नल",
                "active_data": "सक्रिय डेटा",
                "waiting": "सेंसर कैलिब्रेट हो रहे हैं...",
                "private_channel": "निजी सिग्नल चैनल",
                "private_desc": "सीधे ब्राउज़र-टू-सिलिकॉन डिक्रिप्शन। कोई क्लाउड डेटा लीक नहीं।",
                "errors": {
                    "camera": "कैमरा एक्सेस विफल। अनुमति/HTTPS जांचें।",
                    "detect": "कोई मान्य कोड नहीं मिला। दूसरी छवि आज़माएं।"
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
