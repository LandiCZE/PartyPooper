# Party Games -- MVP Spec

## Přehled

**Party Games** je mobile-first webová aplikace určená pro hraní
společenských her během večírků, chat a oslav. Aplikace bude hostovaná
na **GitHub Pages**, poběží čistě na frontendu a nebude vyžadovat
backend.

### Cíle

-   Mobile-first UX
-   Jednoduché ovládání jednou rukou
-   Offline použití po prvním načtení (PWA v budoucnu)
-   Snadné přidávání nových her
-   Hostování na GitHub Pages

------------------------------------------------------------------------

# Technologie

-   React
-   TypeScript
-   Vite
-   React Router
-   Tailwind CSS
-   GitHub Pages

------------------------------------------------------------------------

# MVP

## Domovská obrazovka

Zobrazí seznam dostupných her.

-   🍺 Nikdy jsem
-   👑 King's Cup
-   🎯 Picolo
-   🤔 Pravda nebo úkol
-   🙋 Kdo z vás...
-   😂 Nejpravděpodobněji...
-   💬 Would You Rather

Každá hra se otevře na vlastní obrazovce.

------------------------------------------------------------------------

# Hry

## 🍺 Nikdy jsem

### Popis

Zobrazuje náhodné výroky typu:

> Nikdy jsem neusnul na přednášce.

### Funkce

-   Náhodná karta
-   Žádné opakování do vyčerpání balíčku
-   Tlačítko **Další**

Datový soubor:

`data/never.json`

------------------------------------------------------------------------

## 👑 King's Cup

Virtuální balíček 52 karet.

Každá karta obsahuje:

-   hodnotu
-   obrázek
-   pravidlo

Po dobrání všech karet nabídne restart balíčku.

Datový soubor:

`data/king.json`

------------------------------------------------------------------------

## 🎯 Picolo

Náhodné úkoly inspirované aplikací Picolo.

Příklady:

-   Všichni pijí.
-   Ten, kdo dnes přišel poslední, pije.
-   Kdo má nejvíce sourozenců, pije.

Kategorie:

-   Jednotlivec
-   Dvojice
-   Skupina
-   Hlasování
-   Minihra

Datový soubor:

`data/picolo.json`

------------------------------------------------------------------------

## 🤔 Pravda nebo úkol

Náhodně vybírá mezi:

-   Pravda
-   Úkol

Datové soubory:

-   `data/truth.json`
-   `data/dare.json`

------------------------------------------------------------------------

## 🙋 Kdo z vás...

Příklady:

-   Kdo z vás už někdy spal venku?
-   Kdo z vás nikdy nebyl u moře?
-   Kdo z vás umí hrát na hudební nástroj?

Hráči odpovídají sami.

Datový soubor:

`data/who.json`

------------------------------------------------------------------------

## 😂 Nejpravděpodobněji...

Příklady:

-   Kdo z vás nejspíš usne jako první?
-   Kdo z vás zapomene peněženku?
-   Kdo z vás skončí na tanečním parketu jako poslední?

Ostatní hlasují ukázáním na vybraného člověka.

Datový soubor:

`data/most-likely.json`

------------------------------------------------------------------------

## 💬 Would You Rather

Každá karta obsahuje dvě možnosti.

Příklad:

> Co bys radši?

-   Nikdy nepoužívat internet
-   Nikdy nesledovat televizi

Hráči si zvolí jednu možnost.

Datový soubor:

`data/would-you-rather.json`

------------------------------------------------------------------------

# Struktura projektu

``` text
src/
├── components/
├── games/
│   ├── never/
│   ├── king/
│   ├── picolo/
│   ├── truth-or-dare/
│   ├── who/
│   ├── most-likely/
│   └── would-you-rather/
├── data/
├── utils/
├── App.tsx
└── main.tsx
```

------------------------------------------------------------------------

# UX

Každá hra používá stejné rozložení:

-   Tlačítko Zpět
-   Název hry
-   Obsah karty
-   Tlačítko Další

------------------------------------------------------------------------

# Design

-   Dark mode
-   Velká tlačítka
-   Velké písmo
-   Zaoblené karty
-   Jemné animace přechodu mezi kartami

------------------------------------------------------------------------

# Budoucí rozšíření

-   ⚡ Výzvy
-   🎲 Kategorie
-   🧠 Kvízy
-   🎵 Hádej písničku
-   🎬 Hádej film
-   ⏱️ Časovače
-   🏆 Bodování
-   🌍 Více jazyků
-   📱 PWA
-   🔊 Zvuky
-   🎨 Motivy

------------------------------------------------------------------------

# Priorita implementace

1.  Založení projektu
2.  Společné UI komponenty
3.  Nikdy jsem
4.  King's Cup
5.  Picolo
6.  Pravda nebo úkol
7.  Kdo z vás...
8.  Nejpravděpodobněji...
9.  Would You Rather

------------------------------------------------------------------------

# Definice hotového MVP

-   Všechny hry jsou funkční.
-   Data jsou načítána z JSON souborů.
-   Aplikace je responzivní.
-   Funguje na mobilu.
-   Je nasazená na GitHub Pages.
-   Přidání nové hry znamená pouze vytvoření nového modulu a datového
    souboru.
