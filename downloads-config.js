/**
 * ============================================================================
 * إعدادات روابط التحميل وتفاصيل الإصدار - تطبيق ورشة (WARSHA)
 * ============================================================================
 *
 * الطريقة 1 (بدون تعديل هذا الملف):
 *   ضع ملفاتك داخل مجلد `downloads/` بنفس الأسماء:
 *     - downloads/warsha-android.apk
 *     - downloads/warsha-windows.zip
 *     - downloads/warsha-ios.ipa
 *
 * الطريقة 2 (استخدام روابط GitHub Releases أو روابط مباشرة):
 *   استبدل قيمة `url` لكل منصة بالرابط المباشر (مثل رابط GitHub Release).
 */

window.WARSHA_CONFIG = {
  appNameAr: 'ورشة',
  appNameEn: 'WARSHA',
  version: '1.2.3',
  buildNumber: 6,
  releaseDate: '2026-11',
  whatsappNumber: '201207847099',
  whatsappDisplay: '01207847099',

  platforms: {
    android: {
      id: 'android',
      name: 'Android',
      subtitleAr: 'الهواتف والتابلت · ملف APK مباشر',
      subtitleEn: 'Phones & Tablets · Direct APK',
      fileName: 'warsha-android.apk',
      url: 'https://github.com/khaledelsayed33333/warsha-website/releases/download/v1.2.3%2B6/warsha-android.apk',
      packageId: 'com.example.division_app',
      minOs: 'Android 5.0+ (API 21)',
      arch: 'ARM64 / Universal APK',
      sizeAr: 'جاهز لوضع APK',
      sizeEn: 'Drop APK in downloads/',
      status: 'available', // 'available' | 'coming-soon'
      stepsAr: [
        'اضغط على زر تحميل نسخة Android لتنزيل ملف warsha-android.apk.',
        'افتح الملف بعد اكتمال التحميل، وإذا طلب النظام الإذن فعّل «السماح بالتثبيت من هذا المصدر».',
        'سجّل دخولك برقم الموبايل أو بحساب Google ثم أرسل طلب الاعتماد للإدارة.'
      ],
      stepsEn: [
        'Click Download Android to save warsha-android.apk on your device.',
        'Open the downloaded APK and allow "Install from unknown sources" if prompted.',
        'Sign in with your phone number or Google account and wait for admin approval.'
      ]
    },

    windows: {
      id: 'windows',
      name: 'Windows',
      subtitleAr: 'كمبيوتر ولابتوب · W A R S H A.exe',
      subtitleEn: 'Desktop & Laptop · W A R S H A.exe',
      fileName: 'warsha-windows.zip',
      url: 'https://github.com/khaledelsayed33333/warsha-website/releases/download/v1.2.3%2B6/warsha-windows.zip',
      packageId: 'W A R S H A.exe (Release x64)',
      minOs: 'Windows 10 / 11 (64-bit)',
      arch: 'x64 Desktop Native + Sidebar UI',
      sizeAr: 'جاهز لوضع حزمة Windows',
      sizeEn: 'Drop Windows ZIP in downloads/',
      status: 'available',
      stepsAr: [
        'نزّل ملف warsha-windows.zip وفك الضغط عنه في مجلد ثابت على جهازك.',
        'تأكد من وجود ملفات الـ DLL ومجلد data بجانب ملف التشغيل.',
        'شغّل W A R S H A.exe واستمتع بواجهة سطح المكتب مع القائمة الجانبية السريعة.'
      ],
      stepsEn: [
        'Download warsha-windows.zip and extract all contents into a permanent folder.',
        'Keep all DLL files and the data folder alongside the executable.',
        'Launch W A R S H A.exe to use the dedicated Windows desktop sidebar layout.'
      ]
    },

    ios: {
      id: 'ios',
      name: 'iOS',
      subtitleAr: 'iPhone و iPad · حزمة IPA / App Store',
      subtitleEn: 'iPhone & iPad · IPA / TestFlight',
      fileName: 'warsha-ios.ipa',
      url: './downloads/warsha-ios.ipa',
      packageId: 'com.example.divisionApp',
      minOs: 'iOS 15.0 أو أحدث',
      arch: 'arm64 · iPhone & iPad',
      sizeAr: 'جاهز لوضع IPA أو رابط TestFlight',
      sizeEn: 'Drop IPA or set TestFlight URL',
      status: 'coming-soon',
      stepsAr: [
        'نزّل حزمة warsha-ios.ipa (أو افتح رابط TestFlight / التوقيع المعتمد عند إضافته).',
        'ثبّت الحزمة باستخدام أداة التوقيع المعتمدة (AltStore / Sideloadly / Apple Enterprise).',
        'من الإعدادات ← عام ← إدارة الجهاز (VPN & Device Management) وثّق شهادة التطبيق وابدأ.'
      ],
      stepsEn: [
        'Download warsha-ios.ipa (or open the configured TestFlight / Store link).',
        'Install via your signing method (TestFlight, AltStore, Sideloadly, or Enterprise MDM).',
        'Trust the developer profile under Settings → General → VPN & Device Management.'
      ]
    }
  }
};
