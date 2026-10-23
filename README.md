# Classroom Chat

Brauseripõhine vestlusleht, mis kasutab sõnumite lugemiseks ja saatmiseks välist StudentDB API-t.

## Võimalused

- Kasutajanime küsimine lehe avamisel.
- Sõnumite saatmine ja vestlusajaloo kuvamine.
- Automaatne värskendus iga viie sekundi järel.
- Ühenduse oleku kuvamine ning saatmisnupu ajutine lukustamine.

## Käivitamine

Projekt kasutab tavalist HTML-i ja JavaScripti; pakette ega buildi vaja ei ole.

Käivita repositooriumi kaustas kohalik staatiline veebiserver, näiteks Python 3 abil:

```sh
python -m http.server 8000
```

Ava [http://localhost:8000](http://localhost:8000) ja sisesta kasutajanimi.

## API

[script.js](script.js) failis määratud `API_URL` osutab aadressile:

```text
https://tinkr.tech/sdb/projekt2/db
```

`GET` loeb sõnumid ja `POST` saadab objekti väljadega `user`, `text` ja `timestamp`.

Serveripoolset koodi selles repositooriumis pole. Vestluse toimimiseks peab väline teenus olema kättesaadav ja lubama brauseri päringuid. Kohalik veebiserver teenindab ainult kasutajaliidese faile.

## Failid

- [index.html](index.html) — vestluse vaade ja kujundus.
- [script.js](script.js) — API päringud, värskendamine ja vormi töötlemine.
