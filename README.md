# N.D.-2

Žinau, kad mano kodas atrodo ir veikia ne įdealiai, bet kiek išėjo stengiausiai rašyti tvarkingai.


## Trumpai apie veikimą

Duomenų rikiavimas veikia paspaudus ant stulpelio pavadinimo. Pirmą kart nuo a iki z (1-9), antrą kart spaudžiant atvirkščiai.

Dropdown atfiltruoja pagal lytį. Pasirinkus vieną iš varijantų (pvz. Male) ir parikiavus duomenis - turi rikiuoti tik "Male" (neatsiras "Female").

Kadangi užsižioplinau darydama rikiavimą, nelabai turėjau laiko antram filtrui tai padariau paprastesnį (kiek labiau statišką) paieškos. Ieškomi duomenys yra tik iš atvaizduojamos lentelės dalies. Panaudojus pikiavimą ar lyties filtrą paieškos laukelis išvalomas. 

Puslapiavimą padariau su "Prev" ir "Next". Jeigu yra žiūrimas pvz. 10 puslapis ir pafiltruojama pagal lytį, atvaizduojamas paskutinis tos lyties puslapis (pvz. Male bus 5 puslapis).



### Klausimai ###

1. (script.js 81 eilutė)
Kiek radau pavysdzių, sort() funkcijos ife yra rašoma pvz. a.first_name
Aš first_name išsisaugau į sortTitle, bet a.sortTitle neveikia.
Gal prastai googlinau, bet neradau, kad kas rašytų ne su tašku.
Man suveikė a[sortTitle]
Visais atvėjais kai parametras yra įrašomas į kintamąjį ir paduodamas kintamasis reik dėti skliaustus, o ne tašką ar aš kai ką praleidau ir negerai padariau?

2. (workshop.html 12-25 eilutės)
Ar darant "teisingai" galima visus dropdown, search ir next dėti per HTML? Ar juos reiktų sukurti per JS?
Jeigu paduodu tuščią data puslapyje yra matomi visi filtravimo ir puslapiavimo dalykai, bet erorų nerodo.

3. (script.js 155 eilutė)
Funkciją whichData() naudoja dvi aukščiau esančios funkcijos (prevPage() ir nextPage()).
Buvau pagalvojus į this.lastUsedFilter įrašyti patį masyvą (this.sortedData arba this.filteredData). Kodas atrodytų gražiau, nes nebereiktų whichData() funkcijos. Kaip reiktų daryti dirbant su daugiau funkcijų ir kodo (geriau įsirašyti masyvą, kad kodas liktų švaresnis ar naudoti if-elseif-else)?

4. Gal šiaip kokių pastebėjimų?
Kur panaudota "bloga praktika" ar nutolta nuo es6? 