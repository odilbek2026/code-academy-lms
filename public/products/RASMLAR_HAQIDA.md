# Mahsulot rasmlari — shu papkaga qo'ying

Coin Shop'dagi har bir mahsulot uchun rasmni shu papkaga, **aynan quyidagi nom bilan** qo'ying
(kengaytmasi `.jpg` bo'lishi shart — boshqa kengaytma ishlatsangiz, `lib/shopData.js` dagi
mos qatordagi yo'lni ham o'zgartiring, masalan `.png`ga).

| Fayl nomi         | Mahsulot                        |
|--------------------|----------------------------------|
| `phone.jpg`        | Smartfon                         |
| `laptop.jpg`       | Noutbuk                          |
| `headphones.jpg`   | Simsiz naushnik                  |
| `smartwatch.jpg`   | Smart soat                       |
| `keyboard.jpg`     | Mexanik klaviatura               |
| `mouse.jpg`        | Gaming sichqoncha                |
| `monitor.jpg`      | Monitor                          |
| `chair.jpg`        | Gaming kreslo                    |
| `mic.jpg`          | Mikrofon                         |
| `webcam.jpg`       | Web kamera                       |
| `ssd.jpg`          | SSD disk (1TB)                   |
| `powerbank.jpg`    | Power Bank                       |
| `usb.jpg`          | USB Flash (128GB)                |
| `tablet.jpg`       | Planshet                         |
| `coupon.jpg`       | Kurs kuponi (50% chegirma)       |
| `premium.jpg`      | Premium a'zolik (1 oy)           |

## Muhim eslatmalar

- Fayllarni to'g'ridan-to'g'ri shu `public/products/` papkaga qo'ying (ichida yana papka
  yaratmang), chunki kod ularni `/products/phone.jpg` kabi to'g'ridan-to'g'ri manzil orqali chaqiradi.
- Rasm hali qo'yilmagan mahsulotlar hech qanday xato bermaydi — ular avvalgidek chiroyli
  rangli ikonka bilan ko'rinishda davom etadi (`ProductCard.jsx` avtomatik fallback qiladi).
- Tavsiya etilgan o'lcham: kamida 600×400px, kvadratga yaqin yoki gorizontal (16:9 yoki 4:3)
  nisbat eng yaxshi ko'rinadi, chunki karta balandligi 112px (h-28) va to'liq eniga cho'ziladi.
- Fayl hajmini judayam katta qilmang (tavsiya: 200–400 KB atrofida, JPEG sifat ~80%) — sahifa
  tezligini saqlash uchun.

Rasmni qo'ygandan so'ng serverni qayta ishga tushirish shart emas — `npm run dev` ishlab
turgan bo'lsa, sahifani yangilashingiz kifoya.
