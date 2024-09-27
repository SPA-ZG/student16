StudySync App

URL aplikacije: https://studysync-623e7.web.app/

interpolation/one-way binding - da - src/components/TasksHeader.vue, :3, :4 (izravno prikazuje props koje dobije od roditeljske komponente, u kodu ima jos dosta primjera)

two-way binding - da - src/views/NewTask.vue, :6, :9 ... (korisnik upisuje podatke koji se istovremeno prikazuju na sučelju, a i updatea se njihova vrijednost...v-model)

methods - da - src/views/TasksPage.vue, :80, src/views/NewTask.vue, :49 itd. (metode se mogu pronaći i u još nekim fileovima)

computed properties - da - src/views/TasksPage.vue, :77 (state usera)

barem jedan scoped style - da - src/views/TasksPage.vue, :113, src/components/TasksHeader.vue :25 itd.

koristiti barem jedan lifecycle hook - da - created hook - src/views/TasksPage.vue, : 37 za dohvat podataka prije mountanja instance

routing (više stranica) - da - src/router/index.js, :8, :33

aplikacija mora biti bookmarkable, tako da rade linkovi (ne samo na root, već i moj-web.com/stranica1, moj-web.com/stranica2) - da - na kraju su koraci za provjeru - src/router/index.js, :33, :39, src/views/TasksPage.vue :12 (ovaj link ima na jos par mjesta)

dinamičko usmjeravanje s 404 stranicom ("catch all") - da - src/router/index.js :25

(barem) dvije komponente:
komponenta bez stanja, koristiti properties  - da - src/components/TaskInfo.vue :29, src/components/TasksHeader.vue, :11
komponenta sa stanjem - da - src/views/TasksPage.vue :30, src/views/NewTask.vue :36 itd.

barem jedna komponenta mora emitirati barem jedan event - da - src/components/TaskInfo.vue :34 (javlja da se promijenilo stanje dovrsenosti pojedinog zadatka), src/components/TasksHeader.vue, :17 itd.

store (Pinia) - da - src/stores/auth.js, src/stores/private.js, primjer koristenja: src/views/LoginPage.vue :29, a ima je na jos par mjesta

asinkroni dohvat podataka s backenda - da - koristim firestore za db, src/views/TasksPage.vue, :52 :54 itd.
 

UPUTE:
npm install
npm run serve

Ovo je kao neki planer labosa za studente. 
Responzivna je i deployana aplikacija nema nikakve ispise u console, lokalno ima warning koji je tu jer naglasava da je apl pokrenuta lokalno. Možete se prijaviti kao "JohnDoe", već ima nekih podataka u bazi. Možete stvoriti i svoj račun samim unosom nekog drugog imena (prijava je jednostavna, bez lozinke jer nije baš bitno za lab)

Kad ste prijavljeni kao JohnDoe, možete klikom na finish/completed button mijenjati stanje zadatka...i na vrhu je prikazano koliko ste obavili zadataka. Odabirom NewTask opcije mozete stvoriti novi zadatak s jednostavnom formom. Na vrhu se nalazi Logout opcija. 

Za provjeru bookmarkinga mozete otici na stvaranje novog taska, a staviti u path https://studysync-623e7.web.app/tasks/D6raGuJwnvNFQTwnOXRT kako bi vas vratilo na zadatke JohnDoea. Ako upisete nesto bezveze kao https://studysync-623e7.web.app/tasks/D6raGuJwnvNFQTwnOXRT/bilosta odvede vas na NotFound page....al ako ste nelogirani, dakle na početnoj stranici i upisujete random path, bit ćete vraćeni na login stranicu, a ne na NotFound jer još niste prijavljeni.


