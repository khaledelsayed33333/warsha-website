/* ============================================================================
   WARSHA (ورشة) — Interactive 3D Engine, Exact Calculator Sandbox & App Portal
   All formulas match lib/logic/*.dart in the Flutter application.
   ============================================================================ */

(function () {
  'use strict';

  const CONFIG = window.WARSHA_CONFIG || {
    version: '1.2.2',
    buildNumber: 6,
    whatsappNumber: '201207847099',
    whatsappDisplay: '01207847099',
    platforms: {}
  };

  let currentLang = 'ar';
  let currentDeptFilter = 'all';
  let currentCalc = 'helicalDiameter';
  let labModeState = {
    gearCount: 4,
    holeMode: 'spacing',
    beltOrTiming: 'belt',
    beltUnit: 'metric'
  };

  // ==========================================================================
  // I18N DICTIONARY
  // ==========================================================================
  const I18N = {
    ar: {
      'brand.sub': 'أدوات الخراطة والتروس والمثقاب',
      'nav.tools': 'الأقسام والأدوات',
      'nav.lab': 'معاينة الأدوات',
      'nav.preview': 'شاشات التطبيق',
      'nav.features': 'المزايا الهندسية',
      'nav.download': 'التحميل',
      'nav.cta': 'تحميل التطبيق',
      'hero.eyebrow': 'متاح الآن لـ Android · Windows · iOS',
      'hero.titleLead': 'دقة الورش والمخارط',
      'hero.titleHighlight': 'في حسابات لحظية بلا أخطاء',
      'hero.desc':
        'تطبيق <strong>ورشة (WARSHA)</strong> هو رفيقك الهندسي اليومي في الخراطة والتفريز وتصنيع التروس وتقسيم الثقوب — يجمع 11 أداة حسابية متخصصة تشمل نظام Gleason للتروس المخروطية وحساب مجموعات التروس حتى 4 تروس، مع عمل متواصل أوفلاين على الموبايل والكمبيوتر.',
      'hero.smartDownload': 'تحميل التطبيق لنظامك',
      'hero.smartDownloadSub': 'APK أندرويد · Windows · iOS',
      'hero.tryLab': 'استعرض الأدوات في 3D',
      'hero.ctaPrimary': 'حمّل نسختك الآن',
      'hero.m1': 'أداة تشغيل متخصصة',
      'hero.m2': 'منصات أصلية متزامنة',
      'hero.m3Val': '30 يوم',
      'hero.m3': 'تشغيل أوفلاين بالورشة',
      'hero.m4': 'دقة كسرية بلا تقريب',
      'stage.tabGears': '⚙ التروس',
      'stage.tabLathe': '▥ السلبة',
      'stage.tabDrill': '◎ الثقوب',
      'stage.wireBtn': 'CAD Wire',
      'stage.solidBtn': '3D Solid',
      'stage.dragHint': 'اسحب لتدوير المجسم 360°',
      'stage.hudGearsTitle': 'MESHING HELICAL TRAIN',
      'stage.inAppBadge': 'AVAILABLE IN APP',
      'stage.ctrlTeeth1': 'أسنان القائد Z₁',
      'stage.ctrlAngle': 'زاوية الحلزون β',
      'stage.ctrlSpeed': 'سرعة الدوران',
      'tools.kicker': 'WORKSHOP SUITE // 11 PRECISION MODULES',
      'tools.title': 'كل أدوات الورشة في 3 أقسام رئيسية',
      'tools.subtitle':
        'كل بطاقة هنا تمثل أداة حقيقية داخل تطبيق ورشة مع مدخلاتها ومخرجاتها الفعلية — استعرضها أو انقر «معاينة الأداة» لفتح شكل الحساب والتنزيل.',
      'dept.allTitle': 'جميع الأدوات',
      'dept.allDesc': 'عرض كافة حسابات التروس والمخرطة والمثقاب',
      'dept.gearsTitle': 'التروس (8)',
      'dept.gearsDesc': 'حلزوني · مخروطي عدل وGleason · دودة · سير · كاتينة',
      'dept.latheTitle': 'المخرطة (2)',
      'dept.latheDesc': 'قانون السلبة (° ′ ″) · قطر جزء من الدائرة',
      'dept.drillTitle': 'المثقاب (1)',
      'dept.drillDesc': 'تقسيم الثقوب والمسافة بين الأخرام وقطر الداير',
      'lab.kicker': 'INTERACTIVE APP PREVIEW // 11 PRECISION MODULES',
      'lab.title': 'شاهد كيف تعمل أدوات الحساب داخل تطبيق ورشة',
      'lab.subtitle':
        'اختر الأداة التي تحتاجها وتعرّف على المدخلات والمخطط الهندسي التفاعلي — وعند الضغط على زر «النتيجة» تنتقل مباشرة للتطبيق لتحميله والحصول على النتيجة الدقيقة.',
      'lab.reset': 'قيم افتراضية',
      'calc.tabHelicalDia': 'حسابات الترس الحلزوني',
      'calc.tabGearSet': 'مجموعة الترس الحلزوني (2/4)',
      'calc.tabTaper': 'قانون السلبة (° ′ ″)',
      'calc.tabCirclePart': 'قطر جزء من دائرة',
      'calc.tabHoleDiv': 'تقسيم الثقوب',
      'calc.tabBeltTiming': 'ترس السير والكاتينة',
      'preview.kicker': 'ADAPTIVE INTERFACE // MOBILE & DESKTOP',
      'preview.title': 'تصميم واحد مريح للعين... يتكيف مع هاتفك وشاشة الكمبيوتر',
      'preview.subtitle':
        'تصفح الواجهة الليلية الفعلية لتطبيق ورشة على الموبايل (Android وiOS) أو انتقل لمعاينة نسخة سطح المكتب (Windows) ذات القائمة الجانبية والبحث الفوري.',
      'preview.mobileBtn': '📱 واجهة الموبايل',
      'preview.desktopBtn': '🖥 واجهة Windows',
      'mock.search': 'البحث عن أداة في جميع الأقسام...',
      'mock.mainSections': 'الأقسام الرئيسية',
      'mock.gears': 'التروس',
      'mock.gearsSub': 'كل حسابات التروس (8 أدوات)',
      'mock.lathe': 'المخرطة',
      'mock.latheSub': 'حسابات المخرطة والتشغيل',
      'mock.drill': 'المثقاب',
      'mock.drillSub': 'حسابات الثقوب والبنط',
      'preview.c1Title': 'وضع ليلي ونهاري + تكبير الخط',
      'preview.c1Desc': 'مقروئية ممتازة وسط إضاءة الورشة مع خيارات تكبير الخط وحفظ الاختيار محليًا.',
      'preview.c2Title': 'بحث ذكي بالعربي والإنجليزي',
      'preview.c2Desc': 'اكتب «حلزوني» أو «Gleason» أو «سلبة» أو «خرم» للانتقال المباشر لأي أداة.',
      'preview.c3Title': 'حماية كاملة وترخيص 30 يوم أوفلاين',
      'preview.c3Desc': 'يعمل دون إنترنت داخل المصنع أو المخرطة مع عداد واضح لموعد التحقق القادم.',
      'win.home': 'الرئيسية',
      'win.gears': 'التروس',
      'win.lathe': 'المخرطة',
      'win.drill': 'المثقاب',
      'win.user': 'حساب المشترك',
      'win.license': 'ترخيص نشط · 30 يوم',
      'win.sub': 'اختر القسم المناسب للوصول إلى أدوات الحسابات الميكانيكية',
      'feat.kicker': 'ENGINEERED FOR THE SHOP FLOOR',
      'feat.title': 'لماذا يعتمد الصنايعية والمهندسون على تطبيق ورشة؟',
      'feat.f1Tag': 'ISOLATE COMPUTE ENGINE',
      'feat.f1Title': 'بحث فوري في آلاف توليفات التروس بدون تهنيج',
      'feat.f1Desc':
        'حساب مجموعات التروس الثنائية والرباعية (من 23 إلى 100 سنة) يعمل في مسار معالجة مستقل (Isolate) لفرز أفضل 50 توليفة بدقة كسرية تصل إلى 10 أرقام بعد العلامة دون أي تقريب عشوائي.',
      'feat.f2Tag': 'OFFLINE 30 DAYS',
      'feat.f2Title': 'تشغيل أوفلاين 30 يومًا',
      'feat.f2Desc':
        'يعمل التطبيق داخل الورشة والمخرطة حتى عند ضعف الشبكة، مع تجديد تلقائي لصلاحية الـ 30 يومًا بمجرد اتصالك بالإنترنت.',
      'feat.f3Tag': 'CENTER DISTANCE SOLVER',
      'feat.f3Title': 'موازن المسافة المركزية التلقائي',
      'feat.f3Desc':
        'في الترس الحلزوني وترس الدودة، أدخل المسافة المركزية المطلوبة وسيختبر التطبيق معاملات التعديل (-1.00 إلى +1.00) لاقتراح أنسب تطابق.',
      'feat.f4Tag': 'NO-SMS LOGIN',
      'feat.f4Title': 'دخول بالموبايل أو Google',
      'feat.f4Desc':
        'تسجيل سريع بالاسم ورقم الموبايل المصري أو حساب Google مع ربط آمن بالجهاز واعتماد من الإدارة، بدون انتظار رسائل SMS.',
      'feat.f5Tag': 'SMART UPDATES + WHATSAPP SUPPORT',
      'feat.f5Title': 'نظام تحديثات ذكي ودعم مباشر',
      'feat.f5Desc':
        'يتحقق التطبيق تلقائيًا من توفر إصدارات أحدث لكل نظام (Android / Windows / iOS) ويوجهك فورًا لصفحة التحميل، مع زر تواصل مباشر عبر واتساب.',
      'dl.kicker': 'OFFICIAL RELEASES // ALL PLATFORMS',
      'dl.title': 'حمّل تطبيق ورشة لجهازك',
      'dl.subtitle':
        'اختر نظام التشغيل الخاص بك لتحميل النسخة الرسمية المجهزة بالكامل لأجهزة Android وWindows وiOS.',
      'dl.detectedLabel': 'تم التعرف على جهازك:',
      'act.s1t': 'نزّل النسخة',
      'act.s1d': 'اختر APK أو Windows أو iOS',
      'act.s2t': 'سجّل بياناتك',
      'act.s2d': 'رقم الموبايل والاسم أو Google',
      'act.s3t': 'اعتماد الإدارة',
      'act.s3d': 'تفعيل سريع وربط آمن بالجهاز',
      'act.s4t': 'ابدأ الشغل فورًا',
      'act.s4d': '30 يوم عمل مستمر أوفلاين',
      'wa.title': 'تحتاج مساعدة في التحميل أو تفعيل الحساب؟',
      'wa.desc': 'تواصل مباشرة مع فريق ورشة عبر واتساب للحصول على النسخة أو تفعيل حساب جهازك.',
      'wa.btn': 'تواصل واتساب',
      'footer.tagline': 'تطبيق ورشة للأدوات الهندسية وحسابات الخراطة والتروس والمثقاب.',
      'footer.copy': '© 2026 ورشة (WARSHA). جميع الحقوق محفوظة.'
    },
    en: {
      'brand.sub': 'Gears, Lathe & Drilling Workshop Tools',
      'nav.tools': 'Tools',
      'nav.lab': '3D Preview',
      'nav.preview': 'App UI',
      'nav.features': 'Capabilities',
      'nav.download': 'Download',
      'nav.cta': 'Download App',
      'hero.eyebrow': 'Available for Android · Windows · iOS',
      'hero.titleLead': 'Machinist Precision',
      'hero.titleHighlight': 'Instant Calculations. Zero Guesswork.',
      'hero.desc':
        '<strong>WARSHA</strong> is your shop-floor companion for turning, milling, gear cutting, and bolt-circle drilling—uniting 11 specialized tools including Gleason spiral bevel geometry and 4-gear train solvers, engineered to run offline on mobile and desktop.',
      'hero.smartDownload': 'Download for Your Device',
      'hero.smartDownloadSub': 'Android APK · Windows x64 · iOS',
      'hero.tryLab': 'Explore 3D Tool Previews',
      'hero.ctaPrimary': 'Download Now',
      'hero.m1': 'Precision Modules',
      'hero.m2': 'Native Platforms',
      'hero.m3Val': '30 Days',
      'hero.m3': 'Offline Shop License',
      'hero.m4': 'Exact Fraction Precision',
      'stage.tabGears': '⚙ Gears',
      'stage.tabLathe': '▥ Taper',
      'stage.tabDrill': '◎ Holes PCD',
      'stage.wireBtn': 'CAD Wire',
      'stage.solidBtn': '3D Solid',
      'stage.dragHint': 'Drag to orbit 360°',
      'stage.hudGearsTitle': 'MESHING HELICAL TRAIN',
      'stage.inAppBadge': 'AVAILABLE IN APP',
      'stage.ctrlTeeth1': 'Driver Teeth Z₁',
      'stage.ctrlAngle': 'Helix Angle β',
      'stage.ctrlSpeed': 'RPM Speed',
      'tools.kicker': 'WORKSHOP SUITE // 11 PRECISION MODULES',
      'tools.title': 'Every Workshop Tool Across 3 Core Departments',
      'tools.subtitle':
        'Each card represents a real calculator inside the WARSHA app—browse the modules or preview the inputs and launch inside the app.',
      'dept.allTitle': 'All Tools',
      'dept.allDesc': 'View every gear, lathe, and drilling calculator',
      'dept.gearsTitle': 'Gears (8)',
      'dept.gearsDesc': 'Helical · Straight & Gleason Bevel · Worm · Belt · Chain',
      'dept.latheTitle': 'Lathe (2)',
      'dept.latheDesc': 'Taper Rule (° ′ ″) · Arc Circle Diameter',
      'dept.drillTitle': 'Drill (1)',
      'dept.drillDesc': 'Hole Division chord spacing & Pitch Circle Diameter',
      'lab.kicker': 'INTERACTIVE APP PREVIEW // 11 PRECISION MODULES',
      'lab.title': 'See How Every Calculator Works Inside WARSHA',
      'lab.subtitle':
        'Pick any module to inspect its required dimensions and interactive CAD blueprint—tap the Result button to download and unlock exact answers inside the app.',
      'lab.reset': 'Reset Defaults',
      'calc.tabHelicalDia': 'Helical Dimensions',
      'calc.tabGearSet': 'Helical Gear Set (2/4)',
      'calc.tabTaper': 'Taper Rule (° ′ ″)',
      'calc.tabCirclePart': 'Circle Arc Diameter',
      'calc.tabHoleDiv': 'Hole Division',
      'calc.tabBeltTiming': 'Belt & Chain Gears',
      'preview.kicker': 'ADAPTIVE INTERFACE // MOBILE & DESKTOP',
      'preview.title': 'One High-Contrast Dark Interface Built for Phones & Desktops',
      'preview.subtitle':
        'Preview the authentic dark UI on Android/iOS phones or switch to the native Windows desktop workspace with quick sidebar navigation.',
      'preview.mobileBtn': '📱 Mobile UI',
      'preview.desktopBtn': '🖥 Windows UI',
      'mock.search': 'Search any tool across all sections...',
      'mock.mainSections': 'Main Sections',
      'mock.gears': 'Gears',
      'mock.gearsSub': 'All gear calculations (8 tools)',
      'mock.lathe': 'Lathe',
      'mock.latheSub': 'Turning & taper calculations',
      'mock.drill': 'Drill',
      'mock.drillSub': 'Hole division & PCD tools',
      'preview.c1Title': 'Dark/Light Theme + Font Scaling',
      'preview.c1Desc': 'Crisp legibility next to machines with configurable font scaling saved locally.',
      'preview.c2Title': 'Instant Bilingual Search',
      'preview.c2Desc': 'Search Arabic or English keywords like "Gleason", "Helical", or "Taper" immediately.',
      'preview.c3Title': 'Device-Bound 30-Day Offline Access',
      'preview.c3Desc': 'Keep calculating on the shop floor for 30 days offline with live countdown status.',
      'win.home': 'Home',
      'win.gears': 'Gears',
      'win.lathe': 'Lathe',
      'win.drill': 'Drill',
      'win.user': 'Workshop Account',
      'win.license': 'Active License · 30d',
      'win.sub': 'Choose a section to open mechanical machining calculators',
      'feat.kicker': 'ENGINEERED FOR THE SHOP FLOOR',
      'feat.title': 'Why Machinists & Engineers Rely on WARSHA',
      'feat.f1Tag': 'ISOLATE COMPUTE ENGINE',
      'feat.f1Title': 'Zero-Lag Search Across Thousands of Gear Trains',
      'feat.f1Desc':
        '2-gear and 4-gear combinations (23–100 teeth) run on a background isolate to rank the top 50 exact matches up to 10 decimal places.',
      'feat.f2Tag': 'OFFLINE 30 DAYS',
      'feat.f2Title': '30-Day Offline Workshop Mode',
      'feat.f2Desc':
        'Keep working inside noisy workshops without signal; licenses auto-renew automatically whenever you reconnect.',
      'feat.f3Tag': 'CENTER DISTANCE SOLVER',
      'feat.f3Title': 'Automatic Center Distance Matching',
      'feat.f3Desc':
        'For helical and worm gear pairs, enter a target center distance and WARSHA scans addendum shift factors (-1.00 to +1.00) to match it.',
      'feat.f4Tag': 'NO-SMS LOGIN',
      'feat.f4Title': 'Phone Number or Google Sign-In',
      'feat.f4Desc':
        'Fast sign-up via phone number or Google without SMS delays, backed by single-device binding and admin approval.',
      'feat.f5Tag': 'SMART UPDATES + WHATSAPP SUPPORT',
      'feat.f5Title': 'Built-In Update Checker & Support',
      'feat.f5Desc':
        'Checks per-platform releases automatically (Android, Windows, iOS) and connects directly to WhatsApp support.',
      'dl.kicker': 'OFFICIAL RELEASES // ALL PLATFORMS',
      'dl.title': 'Download WARSHA for Your Platform',
      'dl.subtitle':
        'Pick your operating system to download the official WARSHA release built for Android, Windows, and iOS.',
      'dl.detectedLabel': 'Detected Device:',
      'act.s1t': 'Download Build',
      'act.s1d': 'Choose Android APK, Windows, or iOS',
      'act.s2t': 'Create Account',
      'act.s2d': 'Sign up with Phone or Google',
      'act.s3t': 'Admin Approval',
      'act.s3d': 'Fast activation & device binding',
      'act.s4t': 'Start Machining',
      'act.s4d': '30 days uninterrupted offline work',
      'wa.title': 'Need help downloading or activating your account?',
      'wa.desc': 'Message the WARSHA team directly on WhatsApp for build files or device activation.',
      'wa.btn': 'WhatsApp Support',
      'footer.tagline': 'WARSHA — Precision machining calculators for gears, lathes, and drills.',
      'footer.copy': '© 2026 WARSHA. All rights reserved.'
    }
  };

  // ==========================================================================
  // ALL 11 AUTHENTIC TOOLS DATA (Matches lib/data/app_tools.dart)
  // ==========================================================================
  const TOOLS_DATA = [
    {
      id: 'helicalGear',
      dept: 'gears',
      deptAr: 'التروس',
      deptEn: 'Gears',
      image: './assets/helical_gear.jpg',
      titleAr: 'مجموعة الترس الحلزوني',
      titleEn: 'Helical Gear Train Solver',
      descAr: 'إيجاد أفضل 50 مجموعة تروس (2 أو 4 تروس من 23 إلى 100 سنة) حسب ثابت الماكينة والموديول وزاوية الميل.',
      descEn: 'Searches 23–100T gears to find the top 50 two- or four-gear trains for machine constant, module, and helix angle.',
      specsAr: ['2 أو 4 تروس', 'أسنان 23–100', 'دقة نسبة فورية'],
      specsEn: ['2 or 4 Gears', '23–100 Teeth', 'Instant Accuracy %'],
      tag: '2 / 4 GEARS · 23–100T',
      labTarget: 'helicalSet'
    },
    {
      id: 'helicalDiameter',
      dept: 'gears',
      deptAr: 'التروس',
      deptEn: 'Gears',
      image: './assets/helical_diameter.jpg',
      titleAr: 'حسابات الترس الحلزوني',
      titleEn: 'Helical Gear Dimensions',
      descAr: 'حساب قطر دائرة الخطوة والقطر الخارجي والعمق وعدد الأسنان المقاسة والمقاس وخطوة الفريزة والهوب، مع موازن المسافة المركزية.',
      descEn: 'Computes pitch & outside diameters, depth, span measurement, cutter/hob helix leads, and 2-gear center distance matching.',
      specsAr: ['قطر الخطوة والخارجي', 'المقاس والأسنان', 'تعديل المسافة المركزية'],
      specsEn: ['Pitch & OD', 'Span Measurement', 'Center Distance Match'],
      tag: 'HELICAL DIMENSIONS',
      labTarget: 'helicalDiameter'
    },
    {
      id: 'helicalTeeth',
      dept: 'gears',
      deptAr: 'التروس',
      deptEn: 'Gears',
      image: './assets/gear_teeth.jpg',
      titleAr: 'حساب مجموعة التروس لعدد الأسنان',
      titleEn: 'Exact Teeth Indexing Gear Set',
      descAr: 'حساب مجموعة التروس المناسبة لثابت الماكينة وعدد الأسنان باستخدام كسور دقيقة حتى 10 خانات عشرية دون أي تقريب.',
      descEn: 'Finds exact two- or four-gear sets for machine constant and tooth count using exact rational arithmetic to 10 decimal places.',
      specsAr: ['حساب كسري دقيق', '2 أو 4 تروس', '10 خانات بدون تقريب'],
      specsEn: ['Exact Fractions', '2 or 4 Gears', '10-Digit Precision'],
      tag: 'EXACT FRACTION ENGINE',
      labTarget: 'helicalSet'
    },
    {
      id: 'beltGear',
      dept: 'gears',
      deptAr: 'التروس',
      deptEn: 'Gears',
      image: './assets/belt_gear.jpg',
      titleAr: 'ترس السير',
      titleEn: 'Timing Belt Pulley (Metric & Inch)',
      descAr: 'حساب القطر الخارجي لترس السير بدقة لكل مقاسات الـ Pitch المترية (1 إلى 20 مم) والإنش (1/5, 3/8, 1/2, 2/25) مع ثوابت N.',
      descEn: 'Calculates outside diameter for metric (1–20 mm) and inch (1/5, 3/8, 1/2, 2/25) belt pitches using calibrated N constants.',
      specsAr: ['متري 1–20 مم', 'إنش معتمد', 'القطر الخارجي OD'],
      specsEn: ['Metric 1–20mm', 'Inch Pitches', 'Outside Diameter'],
      tag: 'METRIC & INCH BELTS',
      labTarget: 'beltTiming'
    },
    {
      id: 'straightBevelGear',
      dept: 'gears',
      deptAr: 'التروس',
      deptEn: 'Gears',
      image: './assets/bevel_gear.jpg',
      titleAr: 'ترس مخروطي عدل',
      titleEn: 'Straight Bevel Gear Geometry',
      descAr: 'حساب زاوية مخروط الخطوة وزاوية الخراطة وزاوية الفريزة وطول المخروط وأصغر قطر والقطر الخارجي لزوج التروس المخروطية.',
      descEn: 'Calculates pitch cone angle, turning angle, milling angle, cone distance, small end diameter, and outside diameter.',
      specsAr: ['زاوية الخراطة', 'زاوية الفريزة', 'الأقطار المخروطية'],
      specsEn: ['Turning Angle', 'Milling Angle', 'Cone Diameters'],
      tag: 'BEVEL CONE GEOMETRY',
      labTarget: 'helicalDiameter'
    },
    {
      id: 'spiralBevelGear',
      dept: 'gears',
      deptAr: 'التروس',
      deptEn: 'Gears',
      image: './assets/spiral_bevel_gear.jpg',
      titleAr: 'ترس مخروطي حلزوني — Gleason',
      titleEn: 'Spiral Bevel Gear (Gleason System)',
      descAr: 'حساب كامل بيانات الترس الصغير والكبير بنظام Gleason: الزوايا، طول الرأس، التفريج، ارتفاع القمة والجذر، الخطوة الحلزونية ونسبة التخفيض.',
      descEn: 'Full Gleason 90° shaft calculations for pinion and wheel: cone distance, addendum/dedendum, root & turning angles, spiral lead.',
      specsAr: ['نظام Gleason 90°', 'للترس الصغير والكبير', '13 مخرج هندسي'],
      specsEn: ['Gleason 90° Spec', 'Pinion & Gear', '13 Geometry Outputs'],
      tag: 'GLEASON 90° SYSTEM',
      labTarget: 'helicalDiameter'
    },
    {
      id: 'timingGear',
      dept: 'gears',
      deptAr: 'التروس',
      deptEn: 'Gears',
      image: './assets/timing_gear.jpg',
      titleAr: 'ترس الكاتينة',
      titleEn: 'Roller Chain Sprocket',
      descAr: 'حساب القطر الخارجي والقطر الداخلي وعمق السنة لترس الكاتينة / السلسلة حسب عدد الأسنان وقيمة الإنش وقطر البلية.',
      descEn: 'Computes outside diameter, root diameter, and tooth depth for chain sprockets from teeth count, inch pitch, and roller diameter.',
      specsAr: ['القطر الخارجي', 'القطر الداخلي', 'عمق السنة'],
      specsEn: ['Outside Dia', 'Root Dia', 'Tooth Depth'],
      tag: 'CHAIN SPROCKET',
      labTarget: 'beltTiming'
    },
    {
      id: 'wormGear',
      dept: 'gears',
      deptAr: 'التروس',
      deptEn: 'Gears',
      image: './assets/worm_gear.jpg',
      titleAr: 'ترس الدودة',
      titleEn: 'Worm & Worm Wheel Calculator',
      descAr: 'حساب قطر الخطوة للدودة والترس، زاوية الترس، الموديول الفعلي، القطر الصغير والكبير، والمسافة المركزية مع البحث في معامل التعديل.',
      descEn: 'Calculates worm & gear pitch diameters, lead angle, effective module, throat/outer diameters, and center distance correction.',
      specsAr: ['الدودة والترس', 'عدد الأبواب', 'موازنة المسافة المركزية'],
      specsEn: ['Worm & Wheel', 'Multi-Start', 'Center Distance Match'],
      tag: 'WORM & WHEEL MATCH',
      labTarget: 'helicalDiameter'
    },
    {
      id: 'taperRule',
      dept: 'lathe',
      deptAr: 'المخرطة',
      deptEn: 'Lathe',
      image: './assets/taper_rule.jpg',
      titleAr: 'قانون السلبة',
      titleEn: 'Lathe Taper Angle (° ′ ″)',
      descAr: 'حساب زاوية السلبة بدقة بالدرجات والدقائق والثواني لضبط راسمة المخرطة مباشرة من القطر الكبير والقطر الصغير والطول.',
      descEn: 'Calculates compound rest taper angle in exact Degrees, Minutes, and Seconds (° ′ ″) from large diameter, small diameter, and length.',
      specsAr: ['درجات · دقائق · ثواني', 'فرز تلقائي للأقطار', 'جاهز للمخرطة'],
      specsEn: ['Deg · Min · Sec', 'Auto Dia Sort', 'Compound Rest Ready'],
      tag: 'TAPER DMS (° ′ ″)',
      labTarget: 'taper'
    },
    {
      id: 'circlePartDiameter',
      dept: 'lathe',
      deptAr: 'المخرطة',
      deptEn: 'Lathe',
      image: './assets/circle_part_diameter.jpg',
      titleAr: 'قطر جزء من دائرة',
      titleEn: 'Broken Arc / Segment Diameter',
      descAr: 'حساب القطر الكامل لأي قطعة دائرية أو ترس مكسور من قياس طول الوتر والارتفاع بالبوكليز فقط.',
      descEn: 'Recovers the full diameter of any partial arc or broken ring by measuring only chord length and sagitta height.',
      specsAr: ['طول الوتر W', 'الارتفاع h', 'استنتاج القطر D'],
      specsEn: ['Chord Width W', 'Arc Height h', 'Full Diameter D'],
      tag: 'ARC RECOVERY',
      labTarget: 'circlePart'
    },
    {
      id: 'holeDivision',
      dept: 'drill',
      deptAr: 'المثقاب',
      deptEn: 'Drill',
      image: './assets/hole_division.jpg',
      titleAr: 'تقسيم الثقوب',
      titleEn: 'Bolt Circle Hole Division (PCD)',
      descAr: 'حساب المسافة المستقيمة بين كل ثقب واللي بعده أو حساب قطر الداير (PCD) بمعلومية عدد الثقوب والمسافة.',
      descEn: 'Calculates straight-line chord spacing between adjacent flange holes or recovers pitch circle diameter (PCD) from spacing.',
      specsAr: ['حساب المسافة بين الثقوب', 'حساب قطر الداير', 'أفقيات الفلانشات'],
      specsEn: ['Hole-to-Hole Chord', 'PCD Recovery', 'Flange Drilling'],
      tag: 'PCD HOLE DIVISION',
      labTarget: 'holeDivision'
    }
  ];

  // Pitch dropdown options for Belt UI preview only (no calculation constants)
  const BELT_METRIC_PITCHES = [1, 2, 2.5, 3, 5, 8, 10, 14, 20];
  const BELT_INCH_PITCHES = ['3/8', '1/5', '1/2', '2/25'];

  // ==========================================================================
  // 3D SOFTWARE CANVAS RENDERER (HERO INTERACTIVE STAGE)
  // ==========================================================================
  const Hero3D = (function () {
    const canvas = document.getElementById('hero3dCanvas');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');

    let scene = 'gears';
    let wireframe = false;
    let width = 600;
    let height = 390;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let rotX = -0.36;
    let rotY = 0.42;
    let targetRotX = -0.36;
    let targetRotY = 0.42;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let phase = 0;

    // Interactive scene parameters
    const params = {
      gears: { p1: 24, p2: 18, p3: 1.0 }, // Z1, helix angle beta, speed
      lathe: { p1: 68, p2: 34, p3: 1.0 }, // D1, D2, speed
      drill: { p1: 8, p2: 110, p3: 1.0 } // Holes N, PCD mm, speed
    };

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = Math.max(260, rect.width);
      height = Math.max(260, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rotatePoint(p, rx, ry) {
      // Rotate Y then X
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    }

    function project(p, fov = 560, dist = 420) {
      const depth = dist + p.z;
      const scale = fov / Math.max(60, depth);
      return {
        x: width * 0.5 + p.x * scale,
        y: height * 0.5 + p.y * scale,
        z: p.z,
        scale
      };
    }

    function drawShadedPolygons(polys) {
      // Light vector from top-front-right
      const lx = 0.42;
      const ly = -0.62;
      const lz = -0.66;

      polys.sort((a, b) => b.depth - a.depth);

      for (let i = 0; i < polys.length; i++) {
        const poly = polys[i];
        const pts = poly.pts;
        if (pts.length < 3) continue;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let j = 1; j < pts.length; j++) {
          ctx.lineTo(pts[j].x, pts[j].y);
        }
        ctx.closePath();

        if (wireframe) {
          ctx.fillStyle = poly.isAccent
            ? 'rgba(224, 155, 50, 0.08)'
            : 'rgba(32, 214, 194, 0.06)';
          ctx.fill();
          ctx.strokeStyle = poly.isAccent
            ? 'rgba(224, 155, 50, 0.72)'
            : 'rgba(32, 214, 194, 0.62)';
          ctx.lineWidth = 0.85;
          ctx.stroke();
          continue;
        }

        const n = poly.normal;
        const diffuse = Math.max(0.12, -(n.x * lx + n.y * ly + n.z * lz));
        const rim = Math.pow(Math.max(0, 1 - Math.abs(n.z)), 2) * 0.32;
        const base = poly.color || [22, 64, 66];
        const r = Math.min(255, Math.round(base[0] * (0.38 + diffuse * 0.95) + rim * 40));
        const g = Math.min(255, Math.round(base[1] * (0.38 + diffuse * 0.95) + rim * 205));
        const b = Math.min(255, Math.round(base[2] * (0.38 + diffuse * 0.95) + rim * 190));

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(32, 214, 194, ${poly.isEdge ? 0.34 : 0.14})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    function addExtrudedGearMesh(polys, opts) {
      const {
        teeth,
        pitchRadius,
        thickness,
        offsetX,
        offsetY,
        spinAngle,
        helixAngleDeg,
        boreRadius,
        tint
      } = opts;

      const addendum = Math.min(12, Math.max(5.5, (pitchRadius / teeth) * 1.95));
      const dedendum = addendum * 1.2;
      const rOut = pitchRadius + addendum;
      const rRoot = Math.max(boreRadius + 8, pitchRadius - dedendum);
      const twist = ((helixAngleDeg * Math.PI) / 180) * 0.55;
      const halfT = thickness * 0.5;

      const segs = teeth * 4;
      const frontRing = [];
      const backRing = [];
      const frontBore = [];
      const backBore = [];

      for (let i = 0; i < segs; i++) {
        const sub = i % 4;
        const theta = (i / segs) * Math.PI * 2 + spinAngle;
        let rad = rRoot;
        if (sub === 1 || sub === 2) {
          rad = rOut;
        }
        // Slight tooth taper for involute feel
        const toothOffset = sub === 1 ? 0.014 : sub === 2 ? -0.014 : 0;

        const aFront = theta + toothOffset + twist * 0.5;
        const aBack = theta + toothOffset - twist * 0.5;

        frontRing.push(
          rotatePoint(
            {
              x: offsetX + Math.cos(aFront) * rad,
              y: offsetY + Math.sin(aFront) * rad,
              z: halfT
            },
            rotX,
            rotY
          )
        );

        backRing.push(
          rotatePoint(
            {
              x: offsetX + Math.cos(aBack) * rad,
              y: offsetY + Math.sin(aBack) * rad,
              z: -halfT
            },
            rotX,
            rotY
          )
        );

        frontBore.push(
          rotatePoint(
            {
              x: offsetX + Math.cos(aFront) * boreRadius,
              y: offsetY + Math.sin(aFront) * boreRadius,
              z: halfT
            },
            rotX,
            rotY
          )
        );

        backBore.push(
          rotatePoint(
            {
              x: offsetX + Math.cos(aBack) * boreRadius,
              y: offsetY + Math.sin(aBack) * boreRadius,
              z: -halfT
            },
            rotX,
            rotY
          )
        );
      }

      const pushQuad = (v0, v1, v2, v3, color, isAccent = false, isEdge = false) => {
        const ux = v1.x - v0.x,
          uy = v1.y - v0.y,
          uz = v1.z - v0.z;
        const vx = v3.x - v0.x,
          vy = v3.y - v0.y,
          vz = v3.z - v0.z;
        const nx = uy * vz - uz * vy;
        const ny = uz * vx - ux * vz;
        const nz = ux * vy - uy * vx;
        const len = Math.hypot(nx, ny, nz) || 1;
        const normal = { x: nx / len, y: ny / len, z: nz / len };

        // Backface cull for solid mode
        if (!wireframe && normal.z > 0.14) return;

        const p0 = project(v0),
          p1 = project(v1),
          p2 = project(v2),
          p3 = project(v3);
        const depth = (v0.z + v1.z + v2.z + v3.z) * 0.25;
        polys.push({ pts: [p0, p1, p2, p3], depth, normal, color, isAccent, isEdge });
      };

      const faceColor = tint || [52, 92, 95];
      const toothColor = tint ? [208, 146, 52] : [28, 138, 128];

      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        const sub = i % 4;
        const isTip = sub === 1;

        // Front web face
        pushQuad(frontBore[i], frontRing[i], frontRing[next], frontBore[next], faceColor, false, false);
        // Back web face
        pushQuad(backBore[next], backRing[next], backRing[i], backBore[i], faceColor, false, false);
        // Outer tooth flank / tip
        pushQuad(
          frontRing[i],
          backRing[i],
          backRing[next],
          frontRing[next],
          isTip ? toothColor : [76, 118, 120],
          isTip && Boolean(tint),
          isTip
        );
        // Inner bore wall
        pushQuad(backBore[i], frontBore[i], frontBore[next], backBore[next], [22, 48, 50], false, false);
      }
    }

    function renderGearsScene() {
      const z1 = Math.round(params.gears.p1);
      const helix = params.gears.p2;
      const z2 = Math.max(18, Math.round(z1 * 1.45));
      const r1 = 68;
      const r2 = (r1 * z2) / z1;
      const centerSpan = r1 + r2 + 6;
      const shiftX = (r2 - r1) * 0.35;

      const polys = [];
      // Driver gear (Steel + Teal flank)
      addExtrudedGearMesh(polys, {
        teeth: z1,
        pitchRadius: r1,
        thickness: 34,
        offsetX: -centerSpan * 0.5 + shiftX,
        offsetY: -12,
        spinAngle: phase,
        helixAngleDeg: helix,
        boreRadius: 20,
        tint: null
      });

      // Driven gear (Machined Bronze/Steel contrast)
      const ratio = z1 / z2;
      const meshAlign = Math.PI / z2;
      addExtrudedGearMesh(polys, {
        teeth: z2,
        pitchRadius: r2,
        thickness: 34,
        offsetX: centerSpan * 0.5 + shiftX,
        offsetY: -12,
        spinAngle: -phase * ratio + meshAlign,
        helixAngleDeg: -helix,
        boreRadius: 26,
        tint: [130, 96, 52]
      });

      drawShadedPolygons(polys);
      drawBlueprintFloorGrid();
    }

    function renderLatheScene() {
      const d1 = params.lathe.p1;
      const d2 = Math.min(d1 - 6, params.lathe.p2);
      const r1 = 22 + (d1 - 30) * 0.7;
      const r2 = 16 + (d2 - 12) * 0.7;
      const len = 185;
      const segs = 22;
      const polys = [];

      const pushQuad = (v0, v1, v2, v3, color, isAccent = false) => {
        const ux = v1.x - v0.x,
          uy = v1.y - v0.y,
          uz = v1.z - v0.z;
        const vx = v3.x - v0.x,
          vy = v3.y - v0.y,
          vz = v3.z - v0.z;
        const nx = uy * vz - uz * vy;
        const ny = uz * vx - ux * vz;
        const nz = ux * vy - uy * vx;
        const l = Math.hypot(nx, ny, nz) || 1;
        const normal = { x: nx / l, y: ny / l, z: nz / l };
        if (!wireframe && normal.z > 0.14) return;
        polys.push({
          pts: [project(v0), project(v1), project(v2), project(v3)],
          depth: (v0.z + v1.z + v2.z + v3.z) * 0.25,
          normal,
          color,
          isAccent,
          isEdge: true
        });
      };

      const addCylinderSlice = (x0, x1, ra, rb, col) => {
        const ringA = [];
        const ringB = [];
        for (let i = 0; i < segs; i++) {
          const a = (i / segs) * Math.PI * 2 + phase * 1.4;
          ringA.push(rotatePoint({ x: x0, y: Math.cos(a) * ra, z: Math.sin(a) * ra }, rotX, rotY));
          ringB.push(rotatePoint({ x: x1, y: Math.cos(a) * rb, z: Math.sin(a) * rb }, rotX, rotY));
        }
        for (let i = 0; i < segs; i++) {
          const n = (i + 1) % segs;
          const sheen = i % 3 === 0 ? [col[0] + 28, col[1] + 35, col[2] + 35] : col;
          pushQuad(ringA[i], ringB[i], ringB[n], ringA[n], sheen);
        }
      };

      // Chuck body
      addCylinderSlice(-148, -98, 72, 72, [44, 72, 74]);
      // Tapered shaft D1 -> D2
      addCylinderSlice(-98, -98 + len, r1, r2, [82, 128, 130]);
      // Tailstock live center cone
      addCylinderSlice(-98 + len, -98 + len + 44, 6, 28, [160, 114, 48]);

      // 3 Chuck Jaws rotating
      for (let j = 0; j < 3; j++) {
        const a = (j / 3) * Math.PI * 2 + phase * 1.4;
        const cy = Math.cos(a) * 58;
        const cz = Math.sin(a) * 58;
        const pA = rotatePoint({ x: -102, y: cy - 8, z: cz - 8 }, rotX, rotY);
        const pB = rotatePoint({ x: -82, y: cy - 8, z: cz - 8 }, rotX, rotY);
        const pC = rotatePoint({ x: -82, y: cy + 8, z: cz + 8 }, rotX, rotY);
        const pD = rotatePoint({ x: -102, y: cy + 8, z: cz + 8 }, rotX, rotY);
        pushQuad(pA, pB, pC, pD, [210, 146, 52], true);
      }

      drawShadedPolygons(polys);

      // Draw animated carbide tool tip touching taper profile
      const tPos = ((Math.sin(phase * 0.9) + 1) * 0.5) * len;
      const currR = r1 + ((r2 - r1) * tPos) / len;
      const tip3 = rotatePoint({ x: -98 + tPos, y: currR + 3, z: 4 }, rotX, rotY);
      const holder3 = rotatePoint({ x: -98 + tPos + 16, y: currR + 54, z: 36 }, rotX, rotY);
      const pTip = project(tip3);
      const pHolder = project(holder3);

      ctx.save();
      ctx.strokeStyle = '#e09b32';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(pTip.x, pTip.y);
      ctx.lineTo(pHolder.x, pHolder.y);
      ctx.stroke();

      ctx.fillStyle = '#20d6c2';
      ctx.beginPath();
      ctx.arc(pTip.x, pTip.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      drawBlueprintFloorGrid();
    }

    function renderDrillScene() {
      const holeCount = Math.round(params.drill.p1);
      const pcd = params.drill.p2;
      const outerR = Math.min(132, pcd * 0.88);
      const pcdR = outerR * 0.72;
      const boreR = outerR * 0.3;
      const segs = 36;
      const thick = 28;
      const polys = [];

      const pushQuad = (v0, v1, v2, v3, color, isAccent = false) => {
        const ux = v1.x - v0.x,
          uy = v1.y - v0.y,
          uz = v1.z - v0.z;
        const vx = v3.x - v0.x,
          vy = v3.y - v0.y,
          vz = v3.z - v0.z;
        const nx = uy * vz - uz * vy;
        const ny = uz * vx - ux * vz;
        const nz = ux * vy - uy * vx;
        const l = Math.hypot(nx, ny, nz) || 1;
        const normal = { x: nx / l, y: ny / l, z: nz / l };
        if (!wireframe && normal.z > 0.14) return;
        polys.push({
          pts: [project(v0), project(v1), project(v2), project(v3)],
          depth: (v0.z + v1.z + v2.z + v3.z) * 0.25,
          normal,
          color,
          isAccent,
          isEdge: false
        });
      };

      const topOut = [],
        botOut = [],
        topIn = [],
        botIn = [];
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2 + phase * 0.28;
        topOut.push(rotatePoint({ x: Math.cos(a) * outerR, y: -thick * 0.5, z: Math.sin(a) * outerR }, rotX, rotY));
        botOut.push(rotatePoint({ x: Math.cos(a) * outerR, y: thick * 0.5, z: Math.sin(a) * outerR }, rotX, rotY));
        topIn.push(rotatePoint({ x: Math.cos(a) * boreR, y: -thick * 0.5, z: Math.sin(a) * boreR }, rotX, rotY));
        botIn.push(rotatePoint({ x: Math.cos(a) * boreR, y: thick * 0.5, z: Math.sin(a) * boreR }, rotX, rotY));
      }

      for (let i = 0; i < segs; i++) {
        const n = (i + 1) % segs;
        pushQuad(topIn[i], topOut[i], topOut[n], topIn[n], [62, 108, 110]);
        pushQuad(botOut[i], botIn[i], botIn[n], botOut[n], [34, 66, 68]);
        pushQuad(topOut[i], botOut[i], botOut[n], topOut[n], [44, 88, 90]);
        pushQuad(botIn[i], topIn[i], topIn[n], botIn[n], [22, 48, 50]);
      }

      drawShadedPolygons(polys);

      // Draw Pitch Circle & Precision Divided Holes on Top Face
      const pcdPts = [];
      for (let i = 0; i <= 48; i++) {
        const a = (i / 48) * Math.PI * 2;
        pcdPts.push(
          project(
            rotatePoint({ x: Math.cos(a) * pcdR, y: -thick * 0.5 - 1, z: Math.sin(a) * pcdR }, rotX, rotY)
          )
        );
      }
      ctx.save();
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(32, 214, 194, 0.72)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      pcdPts.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();
      ctx.setLineDash([]);

      const holeScreen = [];
      for (let i = 0; i < holeCount; i++) {
        const a = (i / holeCount) * Math.PI * 2 + phase * 0.28;
        const p = project(
          rotatePoint({ x: Math.cos(a) * pcdR, y: -thick * 0.5 - 1.5, z: Math.sin(a) * pcdR }, rotX, rotY)
        );
        holeScreen.push(p);

        ctx.fillStyle = '#020c0e';
        ctx.strokeStyle = i === 0 || i === 1 ? '#e09b32' : '#20d6c2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, 7.5 * p.scale, 5.2 * p.scale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Highlight adjacent hole chord distance S
      if (holeScreen.length >= 2) {
        ctx.strokeStyle = '#e09b32';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(holeScreen[0].x, holeScreen[0].y);
        ctx.lineTo(holeScreen[1].x, holeScreen[1].y);
        ctx.stroke();
      }

      // Animated twist drill descending above hole 0
      if (holeScreen.length > 0) {
        const h0 = holeScreen[0];
        const lift = 36 + Math.sin(phase * 2.2) * 18;
        ctx.strokeStyle = '#9af5ea';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(h0.x, h0.y - lift);
        ctx.lineTo(h0.x, h0.y - lift - 65);
        ctx.stroke();
        ctx.fillStyle = '#20d6c2';
        ctx.beginPath();
        ctx.moveTo(h0.x, h0.y - lift + 10);
        ctx.lineTo(h0.x - 4, h0.y - lift);
        ctx.lineTo(h0.x + 4, h0.y - lift);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      drawBlueprintFloorGrid();
    }

    function drawBlueprintFloorGrid() {
      ctx.save();
      ctx.strokeStyle = 'rgba(32, 214, 194, 0.08)';
      ctx.lineWidth = 1;
      for (let g = -160; g <= 160; g += 40) {
        const a = project(rotatePoint({ x: g, y: 120, z: -160 }, rotX, rotY));
        const b = project(rotatePoint({ x: g, y: 120, z: 160 }, rotX, rotY));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        const c = project(rotatePoint({ x: -160, y: 120, z: g }, rotX, rotY));
        const d = project(rotatePoint({ x: 160, y: 120, z: g }, rotX, rotY));
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    function updateStageHUD() {
      const hudPrimaryLabel = document.getElementById('hudPrimaryLabel');
      const hudPrimaryVal = document.getElementById('hudPrimaryVal');
      const hudSecondaryVal = document.getElementById('hudSecondaryVal');
      if (!hudPrimaryVal) return;

      const isAr = currentLang === 'ar';
      if (scene === 'gears') {
        hudPrimaryLabel.textContent = 'HELICAL GEAR TRAIN 3D';
        hudPrimaryVal.textContent = isAr ? 'محاكاة تعشيق التروس الحلزونية' : '3D Helical Meshing Preview';
        hudSecondaryVal.textContent = isAr ? 'الحساب داخل التطبيق' : 'AVAILABLE IN APP';
      } else if (scene === 'lathe') {
        hudPrimaryLabel.textContent = 'LATHE TAPER SPINDLE 3D';
        hudPrimaryVal.textContent = isAr ? 'محاكاة زاوية السلبة (° ′ ″)' : '3D Taper Angle Preview';
        hudSecondaryVal.textContent = isAr ? 'الحساب داخل التطبيق' : 'AVAILABLE IN APP';
      } else {
        hudPrimaryLabel.textContent = 'BOLT CIRCLE PCD FLANGE 3D';
        hudPrimaryVal.textContent = isAr ? 'محاكاة تقسيم الثقوب PCD' : '3D Bolt Circle Preview';
        hudSecondaryVal.textContent = isAr ? 'الحساب داخل التطبيق' : 'AVAILABLE IN APP';
      }
    }

    function tick() {
      const speed = params[scene].p3;
      phase += 0.016 * speed;

      if (!dragging) {
        targetRotY += 0.0022;
      }
      rotX += (targetRotX - rotX) * 0.12;
      rotY += (targetRotY - rotY) * 0.12;

      ctx.clearRect(0, 0, width, height);
      if (scene === 'gears') renderGearsScene();
      else if (scene === 'lathe') renderLatheScene();
      else renderDrillScene();

      requestAnimationFrame(tick);
    }

    // Pointer orbit interaction
    canvas.addEventListener('pointerdown', (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      targetRotY += dx * 0.009;
      targetRotX = Math.max(-1.25, Math.min(0.85, targetRotX + dy * 0.009));
      lastX = e.clientX;
      lastY = e.clientY;
    });
    const endDrag = () => {
      dragging = false;
    };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    window.addEventListener('resize', resize);
    resize();
    updateStageHUD();
    requestAnimationFrame(tick);

    return {
      setScene(next) {
        scene = next;
        targetRotX = next === 'drill' ? -0.68 : -0.34;
        updateStageHUD();
      },
      toggleWireframe() {
        wireframe = !wireframe;
        return wireframe;
      },
      setParam(index, value) {
        params[scene][`p${index}`] = parseFloat(value);
        updateStageHUD();
      },
      getSceneConfig() {
        return { scene, params: params[scene] };
      },
      refreshHUD() {
        updateStageHUD();
      }
    };
  })();

  // ==========================================================================
  // STAGE CONTROLS & SLIDERS SYNC
  // ==========================================================================
  function syncStageControlsUI(sceneName) {
    const c1 = document.getElementById('ctrl1Slider');
    const c2 = document.getElementById('ctrl2Slider');
    const c3 = document.getElementById('ctrl3Slider');
    const l1 = document.getElementById('ctrl1Label');
    const l2 = document.getElementById('ctrl2Label');
    const l3 = document.getElementById('ctrl3Label');
    const v1 = document.getElementById('ctrl1Val');
    const v2 = document.getElementById('ctrl2Val');
    const v3 = document.getElementById('ctrl3Val');
    if (!c1 || !Hero3D) return;

    const cfg = Hero3D.getSceneConfig().params;
    const isAr = currentLang === 'ar';

    if (sceneName === 'gears') {
      l1.textContent = isAr ? 'أسنان القائد Z₁' : 'Driver Teeth Z₁';
      c1.min = 16;
      c1.max = 42;
      c1.step = 1;
      c1.value = cfg.p1;
      v1.textContent = cfg.p1;

      l2.textContent = isAr ? 'زاوية الحلزون β' : 'Helix Angle β';
      c2.min = 0;
      c2.max = 35;
      c2.step = 1;
      c2.value = cfg.p2;
      v2.textContent = `${cfg.p2}°`;
    } else if (sceneName === 'lathe') {
      l1.textContent = isAr ? 'القطر الكبير D₁' : 'Large Dia D₁';
      c1.min = 40;
      c1.max = 95;
      c1.step = 1;
      c1.value = cfg.p1;
      v1.textContent = `${cfg.p1}mm`;

      l2.textContent = isAr ? 'القطر الصغير D₂' : 'Small Dia D₂';
      c2.min = 14;
      c2.max = 60;
      c2.step = 1;
      c2.value = cfg.p2;
      v2.textContent = `${cfg.p2}mm`;
    } else {
      l1.textContent = isAr ? 'عدد الثقوب N' : 'Hole Count N';
      c1.min = 3;
      c1.max = 16;
      c1.step = 1;
      c1.value = cfg.p1;
      v1.textContent = cfg.p1;

      l2.textContent = isAr ? 'قطر الداير PCD' : 'Pitch Dia PCD';
      c2.min = 50;
      c2.max = 160;
      c2.step = 5;
      c2.value = cfg.p2;
      v2.textContent = `${cfg.p2}mm`;
    }

    l3.textContent = isAr ? 'سرعة الدوران' : 'RPM Speed';
    c3.value = cfg.p3;
    v3.textContent = `${Number(cfg.p3).toFixed(1)}×`;
  }

  function bindStageControls() {
    const tabs = document.querySelectorAll('.stage-tab');
    let activeScene = 'gears';
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        activeScene = tab.dataset.scene;
        Hero3D && Hero3D.setScene(activeScene);
        syncStageControlsUI(activeScene);
      });
    });

    const wireBtn = document.getElementById('wireframeToggle');
    const wireLabel = document.getElementById('wireToggleLabel');
    if (wireBtn && Hero3D) {
      wireBtn.addEventListener('click', () => {
        const isWire = Hero3D.toggleWireframe();
        wireBtn.classList.toggle('is-active', isWire);
        wireLabel.textContent = isWire ? I18N[currentLang]['stage.solidBtn'] : I18N[currentLang]['stage.wireBtn'];
      });
    }

    ['ctrl1Slider', 'ctrl2Slider', 'ctrl3Slider'].forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        Hero3D && Hero3D.setParam(idx + 1, el.value);
        syncStageControlsUI(activeScene);
      });
    });

    syncStageControlsUI('gears');
  }

  // ==========================================================================
  // RENDER ALL 11 TOOLS GRID
  // ==========================================================================
  function renderToolsGrid() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    const isAr = currentLang === 'ar';
    const filtered =
      currentDeptFilter === 'all'
        ? TOOLS_DATA
        : TOOLS_DATA.filter((t) => t.dept === currentDeptFilter);

    grid.innerHTML = filtered
      .map((tool) => {
        const title = isAr ? tool.titleAr : tool.titleEn;
        const desc = isAr ? tool.descAr : tool.descEn;
        const deptLabel = isAr ? tool.deptAr : tool.deptEn;
        const specs = isAr ? tool.specsAr : tool.specsEn;
        const tryTxt = isAr ? 'معاينة الأداة ←' : 'Preview Tool →';

        return `
          <article class="tool-showcase-card" data-tilt>
            <div class="tool-media">
              <span class="tool-dept-pill">${deptLabel}</span>
              <img src="${tool.image}" alt="${title}" loading="lazy">
            </div>
            <div class="tool-body">
              <h3>${title}</h3>
              <p>${desc}</p>
              <div class="tool-specs">
                ${specs.map((s) => `<span class="spec-chip">${s}</span>`).join('')}
              </div>
              <div class="tool-card-footer">
                <span class="tool-formula-mini mono-val">${tool.tag}</span>
                <button type="button" class="tool-try-btn" data-open-lab="${tool.labTarget}">${tryTxt}</button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    grid.querySelectorAll('[data-open-lab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.openLab;
        switchLabCalculator(target);
        document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    bindTiltCards();
  }

  // ==========================================================================
  // INTERACTIVE CALCULATOR SANDBOX + BLUEPRINT VISUALIZER
  // ==========================================================================
  const LAB_DEFS = {
    helicalDiameter: {
      badge: 'HELICAL DIAMETER',
      titleAr: 'حسابات الترس الحلزوني والمسافة المركزية',
      titleEn: 'Helical Gear & Center Distance Calculator',
      descAr: 'أدخل مواصفات الترس وشاهد المدخلات المطلوبة — واضغط «النتيجة» للانتقال للتطبيق.',
      descEn: 'Explore required gear inputs and CAD preview—tap Result to open in WARSHA App.',
      tag: 'OUTPUT IN WARSHA APP',
      defaults: { teeth: 32, module: 2.5, angle: 18, correction: 0.0, hob: 40, teeth2: 48 },
      fields: [
        { key: 'teeth', labelAr: 'عدد أسنان الترس 1', labelEn: 'Gear 1 Teeth (Z₁)', step: '1', min: '6' },
        { key: 'module', labelAr: 'الموديول (mm)', labelEn: 'Module (m)', step: '0.25', min: '0.2' },
        { key: 'angle', labelAr: 'زاوية الميل (°)', labelEn: 'Helix Angle (°)', step: '0.5', min: '1', max: '60' },
        { key: 'correction', labelAr: 'معامل التعديل (-1 إلى +1)', labelEn: 'Correction Factor x₁', step: '0.05', min: '-1', max: '1' },
        { key: 'hob', labelAr: 'ثابت المكنة / الهوب', labelEn: 'Hob Machine Constant', step: '1', min: '1' },
        { key: 'teeth2', labelAr: 'أسنان الترس 2 (للمركزية)', labelEn: 'Gear 2 Teeth (Z₂)', step: '1', min: '6' }
      ],
      outputsAr: ['القطر الخارجي (OD)', 'قطر دائرة الخطوة', 'العمق وعدد الأسنان المقاسة', 'خطوة الفريزة والهوب والمسافة المركزية'],
      outputsEn: ['Outside Diameter (OD)', 'Pitch Diameter', 'Depth & Span Measurement', 'Cutter/Hob Lead & Center Distance']
    },
    helicalSet: {
      badge: 'ISOLATE GEAR TRAIN SOLVER',
      titleAr: 'حساب مجموعة الترس الحلزوني (2 أو 4 تروس)',
      titleEn: 'Helical Change-Gear Set Finder (23–100T)',
      descAr: 'يبحث في توليفات التروس (من 23 إلى 100 سنة) داخل التطبيق لإعطاء أدق نسبة تركيب.',
      descEn: 'Searches 23–100T gears inside the app to match the highest-accuracy ratio.',
      tag: '50 GEAR SETS IN APP',
      defaults: { constant: 40, module: 2.5, angle: 15 },
      fields: [
        { key: 'constant', labelAr: 'ثابت الماكينة (C)', labelEn: 'Machine Constant (C)', step: '1', min: '1' },
        { key: 'module', labelAr: 'الموديول (m)', labelEn: 'Module (m)', step: '0.25', min: '0.2' },
        { key: 'angle', labelAr: 'زاوية الميل β (°)', labelEn: 'Helix Angle β (°)', step: '0.5', min: '1', max: '85' }
      ],
      outputsAr: ['النسبة المطلوبة بدقة', 'أفضل 50 مجموعة تروس', 'خيار ترسين أو 4 تروس', 'نسبة الدقة لكل توليفة %'],
      outputsEn: ['Exact Target Ratio', 'Top 50 Gear Trains', '2-Gear & 4-Gear Modes', 'Per-Match Accuracy %']
    },
    taper: {
      badge: 'LATHE TAPER RULE',
      titleAr: 'قانون السلبة بالدرجات والدقائق والثواني',
      titleEn: 'Taper Rule Angle (° ′ ″)',
      descAr: 'حدّد القطر الكبير والقطر الصغير والطول ثم افتح التطبيق للحصول على زاوية الراسمة فورًا.',
      descEn: 'Set D₁, D₂, and Taper Length, then open the app for exact Degrees, Minutes, and Seconds.',
      tag: 'ANGLE (° ′ ″) IN APP',
      defaults: { d1: 68, d2: 44, length: 160 },
      fields: [
        { key: 'd1', labelAr: 'القطر الكبير D₁ (mm)', labelEn: 'Large Diameter D₁ (mm)', step: '0.5', min: '1' },
        { key: 'd2', labelAr: 'القطر الصغير D₂ (mm)', labelEn: 'Small Diameter D₂ (mm)', step: '0.5', min: '0.5' },
        { key: 'length', labelAr: 'طول السلبة L (mm)', labelEn: 'Taper Length L (mm)', step: '1', min: '1' }
      ],
      outputsAr: ['الدرجات (°)', 'الدقائق (′)', 'الثواني (″)', 'الفرز التلقائي للأقطار'],
      outputsEn: ['Degrees (°)', 'Minutes (′)', 'Seconds (″)', 'Auto Diameter Sort']
    },
    circlePart: {
      badge: 'ARC DIAMETER RECOVERY',
      titleAr: 'حساب قطر جزء من الدائرة',
      titleEn: 'Circle Diameter from Arc Chord & Height',
      descAr: 'أدخل طول الوتر والارتفاع للقطعة الدائرية واحصل على القطر الكامل داخل تطبيق ورشة.',
      descEn: 'Enter chord width and arc height, then calculate the full circle diameter inside WARSHA.',
      tag: 'FULL DIAMETER IN APP',
      defaults: { chord: 120, height: 24 },
      fields: [
        { key: 'chord', labelAr: 'طول الوتر W (mm)', labelEn: 'Chord Length W (mm)', step: '1', min: '1' },
        { key: 'height', labelAr: 'الارتفاع h (mm)', labelEn: 'Arc Height h (mm)', step: '0.5', min: '0.5' }
      ],
      outputsAr: ['القطر الكامل للدائرة (D)', 'حساب فوري بدون تقريب'],
      outputsEn: ['Full Circle Diameter (D)', 'Instant Exact Output']
    },
    holeDivision: {
      badge: 'PCD DRILLING & SPACING',
      titleAr: 'تقسيم الثقوب على محيط الدائرة',
      titleEn: 'Hole Division & Pitch Circle Diameter',
      descAr: 'اختر وضع الحساب (المسافة بين الثقوب أو قطر الداير) ثم انتقل للتطبيق لعرض النتيجة.',
      descEn: 'Choose spacing or PCD mode, then continue to the app for the exact machining result.',
      tag: 'PCD & CHORD IN APP',
      defaults: { value: 140, holes: 8 },
      fields: [],
      outputsAr: ['المسافة بين كل ثقب واللي بعده', 'أو قطر الداير (PCD)'],
      outputsEn: ['Hole-to-Hole Chord Spacing', 'Or Pitch Circle Diameter (PCD)']
    },
    beltTiming: {
      badge: 'BELT & CHAIN SPROCKETS',
      titleAr: 'حسابات ترس السير وترس الكاتينة',
      titleEn: 'Belt Pulley & Roller Chain Sprocket',
      descAr: 'معاينة مدخلات ترس السير (متري/إنش) وترس الكاتينة — النتيجة الدقيقة تظهر داخل التطبيق.',
      descEn: 'Preview Belt Pulley & Chain Sprocket inputs—exact diameters unlock inside WARSHA.',
      tag: 'OD / ID / DEPTH IN APP',
      defaults: { pitchMetric: 5, pitchInch: '3/8', teeth: 30, timingInch: 0.5, ball: 8.51 },
      fields: [],
      outputsAr: ['القطر الخارجي (OD)', 'القطر الداخلي والعمق (للكاتينة)'],
      outputsEn: ['Outside Diameter (OD)', 'Root Dia & Depth (Chain)']
    }
  };

  let labValues = {};

  function getLabValues(calcKey) {
    if (!labValues[calcKey]) {
      labValues[calcKey] = { ...LAB_DEFS[calcKey].defaults };
    }
    return labValues[calcKey];
  }

  function renderLab() {
    const def = LAB_DEFS[currentCalc];
    const vals = getLabValues(currentCalc);
    const isAr = currentLang === 'ar';

    document.getElementById('labToolBadge').textContent = def.badge;
    document.getElementById('labToolTitle').textContent = isAr ? def.titleAr : def.titleEn;
    document.getElementById('labToolDesc').textContent = isAr ? def.descAr : def.descEn;
    document.getElementById('blueprintFormula').textContent = def.tag;

    const form = document.getElementById('labForm');
    let formHTML = '';

    if (currentCalc === 'helicalSet') {
      formHTML += `
        <div class="lab-field is-full">
          <label>${isAr ? 'عدد التروس في المجموعة' : 'Gear Train Size'}</label>
          <div class="lab-segmented">
            <button type="button" class="seg-btn ${labModeState.gearCount === 2 ? 'is-active' : ''}" data-seg="gearCount" data-val="2">${isAr ? 'ترسين (Z₁ / Z₂)' : '2 Gears'}</button>
            <button type="button" class="seg-btn ${labModeState.gearCount === 4 ? 'is-active' : ''}" data-seg="gearCount" data-val="4">${isAr ? '4 تروس (Z₁×Z₃ / Z₂×Z₄)' : '4 Gears'}</button>
          </div>
        </div>
      `;
    } else if (currentCalc === 'holeDivision') {
      formHTML += `
        <div class="lab-field is-full">
          <label>${isAr ? 'وضع الحساب' : 'Calculation Mode'}</label>
          <div class="lab-segmented">
            <button type="button" class="seg-btn ${labModeState.holeMode === 'spacing' ? 'is-active' : ''}" data-seg="holeMode" data-val="spacing">${isAr ? 'حساب المسافة بين الثقوب' : 'Hole-to-Hole Spacing'}</button>
            <button type="button" class="seg-btn ${labModeState.holeMode === 'diameter' ? 'is-active' : ''}" data-seg="holeMode" data-val="diameter">${isAr ? 'حساب قطر الداير PCD' : 'Find Pitch Dia (PCD)'}</button>
          </div>
        </div>
        <div class="lab-field">
          <label>${labModeState.holeMode === 'spacing' ? (isAr ? 'قطر الداير PCD (mm)' : 'Pitch Circle Dia (mm)') : isAr ? 'المسافة بين ثقبين (mm)' : 'Chord Spacing (mm)'}</label>
          <input type="number" data-lab-key="value" step="0.5" min="1" value="${vals.value}">
        </div>
        <div class="lab-field">
          <label>${isAr ? 'عدد الثقوب (N)' : 'Number of Holes (N)'}</label>
          <input type="number" data-lab-key="holes" step="1" min="2" max="72" value="${vals.holes}">
        </div>
      `;
    } else if (currentCalc === 'beltTiming') {
      formHTML += `
        <div class="lab-field is-full">
          <label>${isAr ? 'نوع الترس' : 'Gear Type'}</label>
          <div class="lab-segmented">
            <button type="button" class="seg-btn ${labModeState.beltOrTiming === 'belt' ? 'is-active' : ''}" data-seg="beltOrTiming" data-val="belt">${isAr ? 'ترس السير (Belt)' : 'Belt Pulley'}</button>
            <button type="button" class="seg-btn ${labModeState.beltOrTiming === 'timing' ? 'is-active' : ''}" data-seg="beltOrTiming" data-val="timing">${isAr ? 'ترس الكاتينة (Chain)' : 'Chain Sprocket'}</button>
          </div>
        </div>
      `;
      if (labModeState.beltOrTiming === 'belt') {
        formHTML += `
          <div class="lab-field is-full">
            <label>${isAr ? 'نظام الـ Pitch' : 'Pitch System'}</label>
            <div class="lab-segmented">
              <button type="button" class="seg-btn ${labModeState.beltUnit === 'metric' ? 'is-active' : ''}" data-seg="beltUnit" data-val="metric">${isAr ? 'متري (mm)' : 'Metric (mm)'}</button>
              <button type="button" class="seg-btn ${labModeState.beltUnit === 'inch' ? 'is-active' : ''}" data-seg="beltUnit" data-val="inch">${isAr ? 'إنش (Inch)' : 'Inch'}</button>
            </div>
          </div>
          <div class="lab-field">
            <label>${isAr ? 'قيمة الـ Pitch' : 'Pitch Value'}</label>
            ${
              labModeState.beltUnit === 'metric'
                ? `<select data-lab-key="pitchMetric">${BELT_METRIC_PITCHES
                    .map((p) => `<option value="${p}" ${Number(vals.pitchMetric) === Number(p) ? 'selected' : ''}>${p} mm</option>`)
                    .join('')}</select>`
                : `<select data-lab-key="pitchInch">${BELT_INCH_PITCHES
                    .map((p) => `<option value="${p}" ${vals.pitchInch === p ? 'selected' : ''}>${p} inch</option>`)
                    .join('')}</select>`
            }
          </div>
          <div class="lab-field">
            <label>${isAr ? 'عدد الأسنان (Z)' : 'Teeth Count (Z)'}</label>
            <input type="number" data-lab-key="teeth" step="1" min="6" value="${vals.teeth}">
          </div>
        `;
      } else {
        formHTML += `
          <div class="lab-field">
            <label>${isAr ? 'عدد الأسنان (Z)' : 'Teeth Count (Z)'}</label>
            <input type="number" data-lab-key="teeth" step="1" min="6" value="${vals.teeth}">
          </div>
          <div class="lab-field">
            <label>${isAr ? 'الإنش (مثل 0.5 أو 0.375)' : 'Chain Pitch (inch)'}</label>
            <input type="number" data-lab-key="timingInch" step="0.125" min="0.125" value="${vals.timingInch}">
          </div>
          <div class="lab-field is-full">
            <label>${isAr ? 'قطر البلية (mm)' : 'Roller Diameter (mm)'}</label>
            <input type="number" data-lab-key="ball" step="0.1" min="1" value="${vals.ball}">
          </div>
        `;
      }
    }

    if (def.fields.length) {
      formHTML += def.fields
        .map(
          (f) => `
          <div class="lab-field">
            <label>${isAr ? f.labelAr : f.labelEn}</label>
            <input type="number" data-lab-key="${f.key}" step="${f.step || 'any'}" ${f.min !== undefined ? `min="${f.min}"` : ''} ${f.max !== undefined ? `max="${f.max}"` : ''} value="${vals[f.key]}">
          </div>
        `
        )
        .join('');
    }

    form.innerHTML = formHTML;

    form.querySelectorAll('[data-lab-key]').forEach((input) => {
      input.addEventListener('input', () => {
        const key = input.dataset.labKey;
        vals[key] = input.tagName === 'SELECT' && isNaN(Number(input.value)) ? input.value : parseFloat(input.value);
        computeAndDrawLab();
      });
    });

    form.querySelectorAll('[data-seg]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const seg = btn.dataset.seg;
        const val = btn.dataset.val;
        labModeState[seg] = seg === 'gearCount' ? parseInt(val, 10) : val;
        renderLab();
      });
    });

    computeAndDrawLab();
  }

  function redirectToAppDownload() {
    const detected = detectVisitorPlatform();
    const targetSection = document.getElementById('download');
    const targetCard = document.getElementById(`plat-${detected}`);
    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (targetCard) {
      targetCard.classList.remove('is-highlighted');
      void targetCard.offsetWidth;
      targetCard.classList.add('is-highlighted');
      setTimeout(() => targetCard.classList.remove('is-highlighted'), 1800);
    }
  }

  function computeAndDrawLab() {
    const resEl = document.getElementById('labResults');
    const footerEl = document.getElementById('blueprintFooter');
    const def = LAB_DEFS[currentCalc];
    const vals = getLabValues(currentCalc);
    const isAr = currentLang === 'ar';
    const outputs = isAr ? def.outputsAr : def.outputsEn;

    resEl.innerHTML = `
      <div class="locked-result-card">
        <div class="locked-result-head">
          <div class="locked-result-title">
            <span>🔒</span>
            <span>${isAr ? 'النتيجة' : 'Result'}</span>
          </div>
          <span class="locked-badge">${isAr ? 'متاح داخل التطبيق' : 'IN WARSHA APP'}</span>
        </div>
        <div class="locked-outputs-grid">
          ${outputs
            .map(
              (label) => `
              <div class="locked-out-pill">
                <span>${label}</span>
                <strong>•••</strong>
              </div>
            `
            )
            .join('')}
        </div>
        <button type="button" class="btn-goto-app" id="labGoToAppBtn">
          <span>${isAr ? 'النتيجة — افتح داخل التطبيق' : 'Show Result in WARSHA App'}</span>
          <span>↓</span>
        </button>
      </div>
    `;

    document.getElementById('labGoToAppBtn')?.addEventListener('click', redirectToAppDownload);

    let blueprintState = {};
    if (currentCalc === 'helicalDiameter') {
      const z = Math.min(48, Math.max(8, Math.round(Number(vals.teeth) || 32)));
      footerEl.innerHTML = `<span>${isAr ? 'الحساب الدقيق:' : 'Exact Output:'} <strong class="mono-val">${isAr ? 'داخل تطبيق ورشة' : 'Inside WARSHA App'}</strong></span><span>${isAr ? 'المدخلات:' : 'Inputs:'} <strong class="mono-val">Z=${z} · m=${vals.module}</strong></span>`;
      blueprintState = { type: 'helical', z };
    } else if (currentCalc === 'helicalSet') {
      const four = labModeState.gearCount === 4;
      footerEl.innerHTML = `<span>${isAr ? 'نطاق التروس:' : 'Gear Range:'} <strong class="mono-val">23 – 100T</strong></span><span>${isAr ? 'الوضع:' : 'Mode:'} <strong class="mono-val">${four ? '4 Gears' : '2 Gears'}</strong></span>`;
      blueprintState = { type: 'gearSet', four };
    } else if (currentCalc === 'taper') {
      footerEl.innerHTML = `<span>D₁ = <strong class="mono-val">${vals.d1} mm</strong></span><span>D₂ = <strong class="mono-val">${vals.d2} mm</strong></span><span>L = <strong class="mono-val">${vals.length} mm</strong></span>`;
      blueprintState = { type: 'taper', largeD: Number(vals.d1) || 68, smallD: Number(vals.d2) || 44 };
    } else if (currentCalc === 'circlePart') {
      footerEl.innerHTML = `<span>${isAr ? 'الوتر W:' : 'Chord W:'} <strong class="mono-val">${vals.chord} mm</strong></span><span>${isAr ? 'الارتفاع h:' : 'Height h:'} <strong class="mono-val">${vals.height} mm</strong></span>`;
      blueprintState = { type: 'circlePart', chord: vals.chord, height: vals.height };
    } else if (currentCalc === 'holeDivision') {
      const holes = Math.min(36, Math.max(2, Math.round(Number(vals.holes) || 8)));
      footerEl.innerHTML = `<span>N = <strong class="mono-val">${holes}</strong></span><span>${isAr ? 'النتيجة الدقيقة داخل التطبيق' : 'Exact spacing inside app'}</span>`;
      blueprintState = { type: 'holeDivision', holes };
    } else if (currentCalc === 'beltTiming') {
      const z = Math.min(48, Math.max(8, Math.round(Number(vals.teeth) || 30)));
      footerEl.innerHTML = `<span>Z = <strong class="mono-val">${z}</strong></span><span>${isAr ? 'النتيجة الدقيقة داخل التطبيق' : 'Exact output inside app'}</span>`;
      blueprintState = { type: 'belt', z };
    }

    drawLabBlueprint(blueprintState);
  }

  function drawLabBlueprint(state) {
    const canvas = document.getElementById('labBlueprintCanvas');
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.max(260, rect.width);
    const h = Math.max(240, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // CAD sub-grid
    ctx.strokeStyle = 'rgba(32, 214, 194, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w * 0.5;
    const cy = h * 0.5;
    const inAppLabel = currentLang === 'ar' ? 'النتيجة داخل التطبيق' : 'RESULT IN APP';

    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';

    if (state.type === 'helical' || state.type === 'belt') {
      const teeth = Math.min(60, Math.max(8, state.z || 24));
      const rOut = Math.min(w, h) * 0.34;
      const rPitch = rOut * 0.89;
      const rRoot = rOut * 0.78;
      const rBore = rOut * 0.28;

      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a0 = (i / teeth) * Math.PI * 2;
        const step = (Math.PI * 2) / teeth;
        const p1 = { x: cx + Math.cos(a0) * rRoot, y: cy + Math.sin(a0) * rRoot };
        const p2 = { x: cx + Math.cos(a0 + step * 0.22) * rOut, y: cy + Math.sin(a0 + step * 0.22) * rOut };
        const p3 = { x: cx + Math.cos(a0 + step * 0.52) * rOut, y: cy + Math.sin(a0 + step * 0.52) * rOut };
        const p4 = { x: cx + Math.cos(a0 + step * 0.74) * rRoot, y: cy + Math.sin(a0 + step * 0.74) * rRoot };
        if (i === 0) ctx.moveTo(p1.x, p1.y);
        else ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 137, 123, 0.14)';
      ctx.fill();
      ctx.strokeStyle = '#20d6c2';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#e09b32';
      ctx.beginPath();
      ctx.arc(cx, cy, rPitch, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#031214';
      ctx.beginPath();
      ctx.arc(cx, cy, rBore, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#20d6c2';
      ctx.stroke();

      ctx.strokeStyle = 'rgba(241, 245, 244, 0.7)';
      ctx.beginPath();
      ctx.moveTo(cx - rOut, cy - rOut - 18);
      ctx.lineTo(cx + rOut, cy - rOut - 18);
      ctx.stroke();
      ctx.fillStyle = '#e09b32';
      ctx.fillText(`OD = ?  (${inAppLabel})`, cx, cy - rOut - 24);
    } else if (state.type === 'gearSet') {
      const gears = state.four ? ['Z₁', 'Z₂', 'Z₃', 'Z₄'] : ['Z₁', 'Z₂'];
      const gap = w / (gears.length + 1);
      gears.forEach((label, idx) => {
        const gx = gap * (idx + 1);
        const gy = cy + (idx % 2 === 0 ? -18 : 24);
        const rad = 36 + (idx % 2) * 10;
        ctx.fillStyle = idx % 2 === 0 ? 'rgba(32, 214, 194, 0.15)' : 'rgba(224, 155, 50, 0.15)';
        ctx.strokeStyle = idx % 2 === 0 ? '#20d6c2' : '#e09b32';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(gx, gy, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#f1f5f4';
        ctx.fillText(`${label} = ?`, gx, gy + 4);
      });
    } else if (state.type === 'taper') {
      const maxH = h * 0.56;
      const halfLarge = maxH * 0.5;
      const large = Math.max(state.largeD, state.smallD, 2);
      const small = Math.max(1, Math.min(state.largeD, state.smallD));
      const ratio = Math.max(0.2, Math.min(0.85, small / large));
      const halfSmall = halfLarge * ratio;
      const left = w * 0.18;
      const right = w * 0.82;

      ctx.setLineDash([7, 4]);
      ctx.strokeStyle = 'rgba(224, 155, 50, 0.65)';
      ctx.beginPath();
      ctx.moveTo(left - 24, cy);
      ctx.lineTo(right + 24, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(left, cy - halfLarge);
      ctx.lineTo(right, cy - halfSmall);
      ctx.lineTo(right, cy + halfSmall);
      ctx.lineTo(left, cy + halfLarge);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 137, 123, 0.18)';
      ctx.fill();
      ctx.strokeStyle = '#20d6c2';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#f1f5f4';
      ctx.fillText('D₁', left - 20, cy + 4);
      ctx.fillText('D₂', right + 20, cy + 4);
      ctx.fillStyle = '#e09b32';
      ctx.fillText(`α = ? ° ′ ″  (${inAppLabel})`, cx, cy - halfLarge - 16);
    } else if (state.type === 'circlePart') {
      const rFull = Math.min(w, h) * 0.34;
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = 'rgba(32, 214, 194, 0.35)';
      ctx.beginPath();
      ctx.arc(cx, cy + 10, rFull, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = '#20d6c2';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy + 10, rFull, Math.PI * 1.18, Math.PI * 1.82);
      ctx.stroke();

      const ax = cx + Math.cos(Math.PI * 1.18) * rFull;
      const ay = cy + 10 + Math.sin(Math.PI * 1.18) * rFull;
      const bx = cx + Math.cos(Math.PI * 1.82) * rFull;
      ctx.strokeStyle = '#e09b32';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, ay);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, ay);
      ctx.lineTo(cx, cy + 10 - rFull);
      ctx.stroke();

      ctx.fillStyle = '#e09b32';
      ctx.fillText(`D = ? mm  (${inAppLabel})`, cx, cy + 10 + rFull + 22);
      ctx.fillStyle = '#f1f5f4';
      ctx.fillText(`W = ${state.chord}  |  h = ${state.height}`, cx, ay + 18);
    } else if (state.type === 'holeDivision') {
      const outer = Math.min(w, h) * 0.36;
      const pcdR = outer * 0.72;
      const n = Math.min(36, Math.max(2, state.holes || 8));

      ctx.fillStyle = 'rgba(0, 137, 123, 0.1)';
      ctx.strokeStyle = 'rgba(32, 214, 194, 0.45)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, outer, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#20d6c2';
      ctx.beginPath();
      ctx.arc(cx, cy, pcdR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const pts = [];
      for (let i = 0; i < n; i++) {
        const a = -Math.PI * 0.5 + (i / n) * Math.PI * 2;
        const hx = cx + Math.cos(a) * pcdR;
        const hy = cy + Math.sin(a) * pcdR;
        pts.push({ x: hx, y: hy });
        ctx.fillStyle = '#020c0e';
        ctx.strokeStyle = i <= 1 ? '#e09b32' : '#20d6c2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(hx, hy, n > 18 ? 4 : 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      if (pts.length >= 2) {
        ctx.strokeStyle = '#e09b32';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.stroke();
        ctx.fillStyle = '#e09b32';
        ctx.fillText('S = ? mm', (pts[0].x + pts[1].x) * 0.5 + 32, (pts[0].y + pts[1].y) * 0.5 - 10);
      }
      ctx.fillStyle = '#f1f5f4';
      ctx.fillText(`N = ${n}  (${inAppLabel})`, cx, cy + 4);
    }
  }

  function switchLabCalculator(calcKey) {
    currentCalc = calcKey;
    document.querySelectorAll('.lab-tab').forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.calc === calcKey);
    });
    renderLab();
  }

  // ==========================================================================
  // PLATFORM DETECTION & DOWNLOAD HUB
  // ==========================================================================
  function detectVisitorPlatform() {
    const ua = navigator.userAgent || '';
    if (/android/i.test(ua)) return 'android';
    if (/iPad|iPhone|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return 'ios';
    }
    if (/Win/i.test(navigator.platform) || /Windows/i.test(ua)) return 'windows';
    return 'android';
  }

  function getPlatformIconSVG(id) {
    if (id === 'android') {
      return '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 00-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 001 18h22a10.78 10.78 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/></svg>';
    }
    if (id === 'windows') {
      return '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 5.5L10.5 4.4V11.5H3V5.5ZM11.5 4.2L21 2.8V11.5H11.5V4.2ZM3 12.5H10.5V19.6L3 18.5V12.5ZM11.5 12.5H21V21.2L11.5 19.8V12.5Z"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16.37 12.7c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.34-.14-2.64.8-3.32.8-.69 0-1.74-.78-2.86-.76-1.46.02-2.82.86-3.57 2.17-1.54 2.67-.39 6.6 1.09 8.75.73 1.05 1.59 2.23 2.72 2.19 1.1-.04 1.52-.7 2.85-.7 1.32 0 1.7.7 2.86.68 1.18-.02 1.93-1.07 2.64-2.13.85-1.23 1.19-2.43 1.21-2.49-.03-.01-2.3-.88-2.32-3.47zM14.2 6.32c.59-.72.99-1.71.88-2.71-.85.04-1.91.57-2.52 1.28-.54.63-1.02 1.65-.9 2.62.96.07 1.94-.48 2.54-1.19z"/></svg>';
  }

  function renderDownloadHub() {
    const detected = detectVisitorPlatform();
    const isAr = currentLang === 'ar';
    const platMap = CONFIG.platforms || {};
    const order = ['android', 'windows', 'ios'];

    const detectedPlat = platMap[detected];
    const detectedNameEl = document.getElementById('detectedOsName');
    if (detectedNameEl && detectedPlat) {
      detectedNameEl.textContent = `${detectedPlat.name} (${detectedPlat.fileName})`;
    }

    // Update Hero Smart Button
    const heroTitle = document.getElementById('heroOsTitle');
    const heroSub = document.getElementById('heroOsSub');
    if (heroTitle && detectedPlat) {
      heroTitle.textContent = isAr
        ? `تحميل نسخة ${detectedPlat.name}`
        : `Download for ${detectedPlat.name}`;
      heroSub.textContent = `${detectedPlat.fileName} · v${CONFIG.version}+${CONFIG.buildNumber}`;
    }

    document.querySelectorAll('.quick-plat-chip').forEach((chip) => {
      chip.classList.toggle('is-detected', chip.dataset.platformJump === detected);
    });

    const grid = document.getElementById('platformsGrid');
    if (!grid) return;

    grid.innerHTML = order
      .map((key) => {
        const p = platMap[key];
        if (!p) return '';
        const isRec = key === detected;
        const recLabel = isAr ? 'مناسب لجهازك' : 'Recommended';
        const dlLabel = isAr ? `تحميل ${p.name}` : `Download ${p.name}`;
        const guideLabel = isAr ? 'خطوات التثبيت والتشغيل' : 'Installation Guide';

        return `
          <article class="platform-card ${isRec ? 'is-recommended' : ''}" id="plat-${p.id}">
            ${isRec ? `<span class="plat-rec-badge">${recLabel}</span>` : ''}
            <div class="plat-head">
              <div class="plat-icon">${getPlatformIconSVG(p.id)}</div>
              <div>
                <h3>${p.name}</h3>
                <p>${isAr ? p.subtitleAr : p.subtitleEn}</p>
              </div>
            </div>
            <div class="plat-meta-list">
              <div class="plat-meta-row">
                <span>${isAr ? 'الإصدار' : 'Version'}</span>
                <strong>v${CONFIG.version} (Build ${CONFIG.buildNumber})</strong>
              </div>
              <div class="plat-meta-row">
                <span>${isAr ? 'المعرّف' : 'Package'}</span>
                <strong>${p.packageId}</strong>
              </div>
              <div class="plat-meta-row">
                <span>${isAr ? 'المتطلبات' : 'Requires'}</span>
                <strong>${p.minOs}</strong>
              </div>
              <div class="plat-meta-row">
                <span>${isAr ? 'اسم الملف' : 'File'}</span>
                <strong>${p.fileName}</strong>
              </div>
            </div>
            <div class="plat-actions">
              <a href="${p.url}" class="plat-download-btn" data-download-platform="${p.id}" download="${p.fileName}">
                <span>↓</span>
                <span>${dlLabel}</span>
              </a>
              <button type="button" class="plat-guide-btn" data-guide-platform="${p.id}">${guideLabel}</button>
            </div>
          </article>
        `;
      })
      .join('');

    grid.querySelectorAll('[data-guide-platform]').forEach((btn) => {
      btn.addEventListener('click', () => openInstallModal(btn.dataset.guidePlatform));
    });

    grid.querySelectorAll('[data-download-platform]').forEach((link) => {
      link.addEventListener('click', (e) => handleDownloadClick(e, link.dataset.downloadPlatform, link));
    });
  }

  async function handleDownloadClick(e, platformId, anchorEl) {
    const p = CONFIG.platforms?.[platformId];
    if (!p) return;
    const url = p.url || '';
    const isSameOriginLocal =
      (location.protocol === 'http:' || location.protocol === 'https:') && url.startsWith('./');

    if (!isSameOriginLocal) {
      // Allow external releases or file:// direct downloads to proceed cleanly
      return;
    }

    e.preventDefault();
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) {
        const temp = document.createElement('a');
        temp.href = url;
        temp.download = p.fileName;
        document.body.appendChild(temp);
        temp.click();
        temp.remove();
      } else {
        openMissingBuildModal(p);
      }
    } catch {
      // Fall back to direct anchor navigation on any unexpected error
      window.location.href = anchorEl.href;
    }
  }

  function openModal({ badge, title, bodyHtml, actionsHtml }) {
    const backdrop = document.getElementById('infoModal');
    document.getElementById('modalBadge').textContent = badge;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    document.getElementById('modalActions').innerHTML = actionsHtml;
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    const backdrop = document.getElementById('infoModal');
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
  }

  function openInstallModal(platformId) {
    const p = CONFIG.platforms?.[platformId];
    if (!p) return;
    const isAr = currentLang === 'ar';
    const steps = isAr ? p.stepsAr : p.stepsEn;

    openModal({
      badge: `${p.name.toUpperCase()} // INSTALLATION`,
      title: isAr ? `طريقة تثبيت ورشة على ${p.name}` : `How to Install WARSHA on ${p.name}`,
      bodyHtml: `
        <p>${isAr ? p.subtitleAr : p.subtitleEn}</p>
        <ol>${steps.map((s) => `<li>${s}</li>`).join('')}</ol>
      `,
      actionsHtml: `
        <a href="${p.url}" class="btn btn-primary" download="${p.fileName}">${isAr ? 'بدء التحميل' : 'Start Download'}</a>
        <button type="button" class="btn btn-ghost" onclick="document.getElementById('modalCloseBtn').click()">${isAr ? 'إغلاق' : 'Close'}</button>
      `
    });
  }

  function openMissingBuildModal(p) {
    const isAr = currentLang === 'ar';
    openModal({
      badge: `${p.name.toUpperCase()} // PACKAGE PENDING`,
      title: isAr ? `ملف نسخة ${p.name} جاهز للرفع` : `${p.name} Build Slot Ready`,
      bodyHtml: isAr
        ? `
          <p>لم يتم وضع ملف الإصدار في مجلد التحميلات بعد. لكي يبدأ التحميل فورًا للزوار:</p>
          <div class="modal-code-box">ويبسايت/downloads/${p.fileName}</div>
          <p style="margin-top:12px">أو ضع رابط GitHub Release المباشر لهذا النظام داخل ملف <code>downloads-config.js</code>.</p>
        `
        : `
          <p>No binary is placed in the downloads folder for this platform yet. Drop your build at:</p>
          <div class="modal-code-box">downloads/${p.fileName}</div>
          <p style="margin-top:12px">Or update the direct release URL inside <code>downloads-config.js</code>.</p>
        `,
      actionsHtml: `
        <a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noopener" class="btn btn-primary">${isAr ? 'طلب النسخة عبر واتساب' : 'Request via WhatsApp'}</a>
        <button type="button" class="btn btn-ghost" onclick="document.getElementById('modalCloseBtn').click()">${isAr ? 'حسنًا' : 'Got it'}</button>
      `
    });
  }

  // ==========================================================================
  // UI PREVIEW MOCKUPS INTERACTION (MOBILE & WINDOWS DESKTOP)
  // ==========================================================================
  function bindPreviewMockups() {
    document.querySelectorAll('.device-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.device;
        document.querySelectorAll('.device-btn').forEach((b) => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        document.getElementById('mobileMockup')?.classList.toggle('is-active', target === 'mobile');
        document.getElementById('desktopMockup')?.classList.toggle('is-active', target === 'desktop');
      });
    });

    const previewStrip = document.getElementById('mobilePreviewStrip');
    const stripTexts = {
      gears: 'الحلزوني · Gleason · السير · الكاتينة · الدودة',
      lathe: 'قانون السلبة (° ′ ″) · قطر جزء من الدائرة',
      drill: 'تقسيم الثقوب · حساب قطر الداير PCD'
    };

    document.querySelectorAll('.app-mock-card').forEach((card) => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.app-mock-card').forEach((c) => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        if (previewStrip) {
          previewStrip.innerHTML = `<span>${stripTexts[card.dataset.mockTab] || ''}</span>`;
        }
      });
    });

    const winCardsGrid = document.getElementById('winCardsGrid');
    document.querySelectorAll('.win-nav-item').forEach((item) => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.win-nav-item').forEach((n) => n.classList.remove('is-active'));
        item.classList.add('is-active');
        const tab = item.dataset.winTab;
        if (!winCardsGrid) return;

        if (tab === 'home') {
          winCardsGrid.innerHTML = `
            <div class="win-glow-card"><img src="./assets/gears.jpg" alt="التروس"><div class="win-card-overlay"><strong>${currentLang === 'ar' ? 'التروس' : 'Gears'}</strong><small>${currentLang === 'ar' ? 'كل حسابات التروس' : 'All gear tools'}</small></div></div>
            <div class="win-glow-card"><img src="./assets/lathe.jpg" alt="المخرطة"><div class="win-card-overlay"><strong>${currentLang === 'ar' ? 'المخرطة' : 'Lathe'}</strong><small>${currentLang === 'ar' ? 'حسابات المخرطة والتشغيل' : 'Turning tools'}</small></div></div>
            <div class="win-glow-card"><img src="./assets/drill.jpg" alt="المثقاب"><div class="win-card-overlay"><strong>${currentLang === 'ar' ? 'المثقاب' : 'Drill'}</strong><small>${currentLang === 'ar' ? 'حسابات الثقوب والبنط' : 'Drilling tools'}</small></div></div>
          `;
        } else {
          const subset = TOOLS_DATA.filter((t) => t.dept === tab).slice(0, 3);
          winCardsGrid.innerHTML = subset
            .map(
              (t) => `
              <div class="win-glow-card">
                <img src="${t.image}" alt="${t.titleAr}">
                <div class="win-card-overlay">
                  <strong>${currentLang === 'ar' ? t.titleAr : t.titleEn}</strong>
                  <small class="mono-val">${t.tag}</small>
                </div>
              </div>
            `
            )
            .join('');
        }
      });
    });
  }

  // ==========================================================================
  // TILT EFFECT, SCROLL TELEMETRY, LANGUAGE SWITCH & INIT
  // ==========================================================================
  function bindTiltCards() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  function applyLanguage(lang) {
    currentLang = lang;
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.dir = isAr ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const value = I18N[lang]?.[key];
      if (value !== undefined) {
        if (value.includes('<strong>')) el.innerHTML = value;
        else el.textContent = value;
      }
    });

    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.querySelector('.lang-code').textContent = isAr ? 'EN' : 'AR';
    }

    renderToolsGrid();
    renderLab();
    renderDownloadHub();
    syncStageControlsUI(document.querySelector('.stage-tab.is-active')?.dataset.scene || 'gears');
    Hero3D && Hero3D.refreshHUD();
  }

  function initScrollEffects() {
    const header = document.getElementById('siteHeader');
    const bar = document.getElementById('scrollProgressBar');
    const travel = document.getElementById('axisTravelValue');

    const update = () => {
      const y = window.scrollY || 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, (y / max) * 100));
      if (bar) bar.style.width = `${pct.toFixed(1)}%`;
      if (travel) travel.textContent = `${pct.toFixed(1).padStart(5, '0')} mm`;
      header?.classList.toggle('is-scrolled', y > 24);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
  }

  function init() {
    // Version tags from config
    const vText = `v${CONFIG.version}+${CONFIG.buildNumber}`;
    const hp = document.getElementById('headerVersionPill');
    const ht = document.getElementById('heroVersionTag');
    const fr = document.getElementById('footerReleaseInfo');
    if (hp) hp.textContent = vText;
    if (ht) ht.textContent = vText;
    if (fr) fr.textContent = `WARSHA ${vText}`;

    // Department filters
    document.querySelectorAll('[data-dept-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-dept-filter]').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentDeptFilter = btn.dataset.deptFilter;
        renderToolsGrid();
      });
    });

    // Lab tabs & reset
    document.querySelectorAll('.lab-tab').forEach((tab) => {
      tab.addEventListener('click', () => switchLabCalculator(tab.dataset.calc));
    });
    document.getElementById('labResetBtn')?.addEventListener('click', () => {
      labValues[currentCalc] = { ...LAB_DEFS[currentCalc].defaults };
      renderLab();
    });

    // Language toggle
    document.getElementById('langToggle')?.addEventListener('click', () => {
      applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });

    // Mobile drawer
    const drawer = document.getElementById('mobileDrawer');
    const toggleDrawer = (open) => {
      drawer?.classList.toggle('is-open', open);
      drawer?.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.getElementById('menuToggle')?.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    document.getElementById('menuToggle')?.addEventListener('click', () => toggleDrawer(true));
    document.getElementById('drawerClose')?.addEventListener('click', () => toggleDrawer(false));
    drawer?.addEventListener('click', (e) => {
      if (e.target === drawer || e.target.closest('a')) toggleDrawer(false);
    });

    // Modal close handlers
    document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
    document.getElementById('infoModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'infoModal') closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    bindStageControls();
    bindPreviewMockups();
    renderToolsGrid();
    renderLab();
    renderDownloadHub();
    initScrollEffects();

    window.addEventListener('resize', () => {
      computeAndDrawLab();
    });

    // Dismiss calibration preloader smoothly
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
      preloader?.classList.add('is-done');
      document.body.classList.remove('is-loading');
    }, 520);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
