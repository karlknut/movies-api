const express = require("express");
const swaggerUI = require("swagger-ui-express");
const yamljs = require("yamljs");
const cors = require("cors");
const swaggerDocument = yamljs.load("./docs/swagger.yaml");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const movies = [
  {
    id: 1,
    name: "El Camino: Breaking Bad",
    description:
      "The action of the criminal drama film 'El Camino: Breaking Bad' takes place immediately after the events of shown in the series finale. At the center of the story is Jesse Pinkman, who finds himself in a difficult situation. Despite the fact that criminal activity is already behind him, the past continues to haunt Jesse.",
  },
  {
    id: 2,
    name: "I Am Legend",
    description:
      "It is set in New York City after a vaccine, which was originally created to cure cancer, has wiped out most of manking, leaving Neville as the last human in New York, other than nocturnal mutants. Neville is immune to the virus, and he works to develop a cure while defending himself against the hostile mutants.",
  },
  {
    id: 3,
    name: "Shrek 2",
    description:
      "Shrek 2 takes place following the events of the first film, with Shrek and Donkey meeting Fiona's parents as her zealous Fairy Godmother, who wants Fiona to marry her son Prince Charming, plots to destroy Shrek and Fiona's marriage.",
  },
  {
    id: 4,
    name: "Se7en",
    description:
      "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives. A film about two homicide detectives' (Morgan Freeman and Brad Pitt) desperate hunt for a serial killer who justifies his crimes as absolution for the world's ignorance of the Seven Deadly Sins.",
  },
  {
    id: 5,
    name: "Crank",
    description:
      "The plot centres on a British hitman based in Los Angeles named Chev Chelios who is poisoned and must keep his adrenaline flowing constantly in order to keep himself alive. He does so by various methods including taking drugs and getting into fights, while he tries to track down the man who poisoned him.",
  },
  {
    id: 6,
    name: "Forrest Gump",
    description:
      "Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His 'mama' teaches him the ways of life and leaves him to choose his destiny.",
  },
  {
    id: 7,
    name: "Howl's Moving Castle",
    description:
      "A love story between an 18-year-old girl named Sophie, cursed by a witch into an old woman's body, and a magician named Howl. Under the curse, Sophie sets out to seek her fortune, which takes her to Howl's strange moving castle.",
  },
  {
    id: 8,
    name: "Ponyo",
    description:
      "A young boy named Sosuke rescues a goldfish named Ponyo, and they embark on a fantastic journey of friendship before Ponyo's father forces her to return to the sea. Ponyo's desire to be human upsets the balance of nature and only Ponyo's mother can restore nature's balance and make Ponyo's dreams come true.",
  },
  {
    id: 9,
    name: "Spirited Away",
    description:
      "When her parents undergo a mysterious transformation, Chihiro must fend for herself as she encounters strange spirits, assorted creatures and a grumpy sorceress who seeks to prevent her from returning to the human world. 10-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park.",
  },
  {
    id: 10,
    name: "The Matrix",
    description:
      "It depicts a dystopian future in which humanity is unknowingly trapped inside a simulated reality, the Matrix, which intelligent machines have created to distract humans while using their bodies as an energy source.",
  },
  {
    id: 11,
    name: "Taxi",
    description:
      "Taxi is a 2004 American action-comedy film directed by Tim Story and starring Queen Latifah, Jimmy Fallon, Gisele Bündchen, Jennifer Esposito, and Ann-Margret. An incompetent New York City police officer is banned from driving and comes to rely on a talented taxi driver to help him solve a series of bank robberies.",
  },
  {
    id: 12,
    name: "LOVE",
    description:
      "Veronika on neljandat kuud rase ja kolmandat kuud joomatsüklis. Veronika armastatu Fred on endine kriminaal, keda naine on joomingu käigus pussitanud. Veronika teine hea sõber, homoseksuaalne Ivo on kindel, et just see naine on tema elu armastus, kahjuks küll vales kehas. Nende kolme päevad mööduvad tsüklijoodikute seltsis, kellega koos ei näe nad siin ilmas millelgi suuremat mõtet ega pea vajalikuks seetõttu kellelegi ennast tõestada.",
  },
  {
    id: 13,
    name: "Mina Olin Siin",
    description:
      "17-aastane Rass liigub seltskonnas, kus alkohol, uimastid, purunenud perekonnad ja poolelijäänud koolid on rutiin. Rass on kindel, et tema rabeleb sellest välja, kuigi loota on tal ainult endale – ema on surnud, isa võõraks jäänud, tüdruksõber Säde töötu. Rass aga on armastuse, truuduse ja usaldatavuse nimel valmis ka kriminaalsel teel raha hankima. Kui ta oma sulist äripartnerile suure summa võlgu jääb, tundub narkoärikas Olari pakkumine väljapääsuna. Ent esimesele viieteistkümnele annusele järgneb juba palju suurema koguse müümise nõue, mis paiskab Rassi, ta poolvenna Mõssa ja sõbra Janari otseteed allmaailma julma tegelikkusse.",
  },
  {
    id: 14,
    name: "Tenet",
    description:
      "This is a science fiction-action-thriller film starring John David Washington, Robert Pattinson, Elizabeth Debicki, and Kenneth Branagh, among others. It's the story of a secret agent who learns to manipulate the flow of time to prevent an attack from the future that threatens to annihilate the present.",
  },
  {
    id: 15,
    name: "Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit.",
  },
  {
    id: 16,
    name: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
  },
  {
    id: 17,
    name: "The Silence of the Lambs",
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
  },
  {
    id: 18,
    name: "The Godfather",
    description:
      "It is the first installment in The Godfather trilogy. The story, spanning from 1945 to 1955, chronicles the Corleone family under patriarch Vito Corleone (Brando), focusing on the transformation of his youngest son, Michael Corleone (Pacino), from reluctant family outsider to ruthless mafia boss.",
  },
  {
    id: 19,
    name: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more. A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac state.",
  },
  {
    id: 20,
    name: "Interstellar",
    description:
      "Interstellar is about Earth's last chance to find a habitable planet before a lack of resources causes the human race to go extinct. The film's protagonist is Cooper (Matthew McConaughey), a former NASA pilot who is tasked with leading a mission through a wormhole to find a habitable planet in another galaxy.",
  },
];

const actors = [
    /// El Camino
    {
        id: 1,
        actors: "Aaron Paul"
    },
    {
        id: 2,
        actors: "Jonathan Banks"
    },
    {
        id: 3,
        actors: "Matt Jones"
    },
    {
        id: 4,
        actors: "Charles Baker"
    },
    {
        id: 5,
        actors: "Todd Terry"
    },
    {
        id: 6,
        actors: "Julie Pearl"
    },
    {
        id: 7,
        actors: "Larry Hankin"
    },
    {
        id: 8,
        actors: "Jesse Plemons"
    },
    {
        id: 9,
        actors: "Tess Harper"
    },
    {
        id: 10,
        actors: "Michael Bofshever"
    },
    {
        id: 11,
        actors: "Scott Shepherd"
    },
    {
        id: 12,
        actors: "Robert Forster"
    },
    /// I Am Legend
    {
        id: 13,
        actors: "Will Smith"
    },
    {
        id: 14,
        actors: "Alice Braga"
    },
    {
        id: 15,
        actors: "Charlie Tahan"
    },
    {
        id: 16,
        actors: "Salli Richardson-Whitfield"
    },
    {
        id: 17,
        actors: "Willow Smith"
    },
    {
        id: 18,
        actors: "Mike Patton"
    },
    {
        id: 19,
        actors: "Sal Lizard"
    },
    {
        id: 20,
        actors: "Darrell Foster"
    },
    {
        id: 21,
        actors: "Dash Mihok"
    },
    {
        id: 22,
        actors: "Joanna Numata"
    },
    /// Shrek 2
    {
        id: 23,
        actors: "Mike Myers"
    },
    {
        id: 24,
        actors: "Eddie Murphy"
    },
    {
        id: 25,
        actors: "Cameron Diaz"
    },
    {
        id: 26,
        actors: "Julie Andrews"
    },
    {
        id: 27,
        actors: "Antonio Banderas"
    },
    {
        id: 28,
        actors: "John Cleese"
    },
    {
        id: 29,
        actors: "Rupert Everett"
    },
    {
        id: 30,
        actors: "Jennifer Saunders"
    },
    {
        id: 31,
        actors: "Larry King"
    },
    {
        id: 32,
        actors: "Mark Moseley"
    },
    {
        id: 33,
        actors: "Conrad Vernon"
    },
    /// Se7en
    {
        id: 34,
        actors: "Morgan Freeman"
    },
    {
        id: 35,
        actors: "Brad Pitt"
    },
    {
        id: 36,
        actors: "Kevin Spacey"
    },
    {
        id: 37,
        actors: "Gwyneth Paltrow"
    },
    {
        id: 38,
        actors: "John Cassini"
    },
    {
        id: 39,
        actors: "R. Lee Ermey"
    },
    {
        id: 40,
        actors: "Endre Hules"
    },
    {
        id: 41,
        actors: "Richard Roundtree"
    },
    /// Crank
    {
        id: 42,
        actors: "Jason Statham"
    },
    {
        id: 43,
        actors: "Amy Smart"
    },
    {
        id: 44,
        actors: "Carlos Sanz"
    },
    {
        id: 45,
        actors: "Jose Pablo Cantillo"
    },
    {
        id: 46,
        actors: "Efren Ramirez"
    },
    {
        id: 47,
        actors: "Dwight Yoakam"
    },
    {
        id: 48,
        actors: "Reno Wilson"
    },
    {
        id: 49,
        actors: "Edi Gathegi"
    },
    {
        id: 50,
        actors: "Glenn Howerton"
    },
    {
        id: 51,
        actors: "Keone Young"
    },
    {
        id: 52,
        actors: "Valerie Rae Miller"
    },
    /// Forrest Gump
    {
        id: 53,
        actors: "Tom Hanks"
    },
    {
        id: 54,
        actors: "Robin Wright"
    },
    {
        id: 55,
        actors: "Gary Sinise"
    },
    {
        id: 56,
        actors: "Sally Field"
    },
    {
        id: 57,
        actors: "Bob Penny"
    },
    {
        id: 58,
        actors: "Actor Name1"
    },
    {
        id: 59,
        actors: "Sam Anderson"
    },
    {
        id: 60,
        actors: "Actor Name2"
    },
    {
        id: 61,
        actors: "Margo Moorer"
    },
    {
        id: 62,
        actors: "Siobhan Fallon Hogan"
    },
    /// Holws moving castle
    {
        id: 63,
        actors: "Chieko Baishô"
    },
    {
        id: 64,
        actors: "Takuya Kimura"
    },
    {
        id: 65,
        actors: "Tatsuya Gashûin"
    },
    {
        id: 66,
        actors: "Ryûnosuke Kamiki"
    },
    {
        id: 67,
        actors: "Akio Ôtsuka"
    },
    {
        id: 68,
        actors: "Haruko Katô"
    },
    {
        id: 69,
        actors: "Christian Bale"
    },
    {
        id: 70,
        actors: "Lauren Bacall"
    },
    {
        id: 71,
        actors: "Jean Simmons"
    },
    {
        id: 72,
        actors: "Billy Crystal"
    },
    /// Ponyo
    {
        id: 73,
        actors: "Cate Blanchett"
    },
    {
        id: 74,
        actors: "Matt Damon"
    },
    {
        id: 75,
        actors: "Liam Neeson"
    },
    {
        id: 76,
        actors: "Yûki Amami"
    },
    {
        id: 77,
        actors: "Tomoko Yamaguchi"
    },
    {
        id: 78,
        actors: "Kazushige Nagashima"
    },
    {
        id: 79,
        actors: "Yuria Nara"
    },
    {
        id: 80,
        actors: "Rumi Hiiragi"
    },
    {
        id: 81,
        actors: "George Tokoro"
    },
    {
        id: 82,
        actors: "Kazuko Yoshiyuki"
    },
    /// Spirited Away
    {
        id: 83,
        actors: "Daveigh Chase"
    },
    {
        id: 84,
        actors: "Suzanne Pleshette"
    },
    {
        id: 85,
        actors: "Miyu Irino"
    },
    {
        id: 86,
        actors: "Rumi Hiiragi"
    },
    {
        id: 87,
        actors: "Mari Natsuki"
    },
    {
        id: 88,
        actors: "Tatsuya Gashûin"
    },
    {
        id: 89,
        actors: "Ryûnosuke Kamiki"
    },
    {
        id: 90,
        actors: "Yô Ôizumi"
    },
    {
        id: 91,
        actors: "Bunta Sugawara"
    },
    /// Matrix
    {
        id: 92,
        actors: "Keanu Reeves"
    },
    {
        id: 93,
        actors: "Laurence Fishburne"
    },
    {
        id: 94,
        actors: "Carrie-Anne Moss"
    },
    {
        id: 95,
        actors: "Hugo Weaving"
    },
    {
        id: 96,
        actors: "Gloria Foster"
    },
    {
        id: 97,
        actors: "Joe Pantoliano"
    },
    {
        id: 98,
        actors: "Marcus Chong"
    },
    {
        id: 99,
        actors: "Julian Arahanga"
    },
    {
        id: 100,
        actors: "Matt Doran"
    },
    {
        id: 101,
        actors: "Belinda McClory"
    },
    /// Taxi
    {
        id: 102,
        actors: "Samy Naceri"
    },
    {
        id: 103,
        actors: "Frédéric Diefenthal"
    },
    {
        id: 104,
        actors: "Manuela Gourary"
    },
    {
        id: 105,
        actors: "Marion Cotillard"
    },
    {
        id: 106,
        actors: "Bernard Farcy"
    },
    {
        id: 107,
        actors: "Emma Wiklund"
    },
    {
        id: 108,
        actors: "Guy Quang"
    },
    {
        id: 109,
        actors: "Dan Herzberg"
    },
    {
        id: 110,
        actors: "Edouard Montoute"
    },
    /// love
    {
        id: 111,
        actors: "Marek"
    },
    {
        id: 112,
        actors: "Veronika"
    },
    {
        id: 113,
        actors: "Fred"
    },
    {
        id: 114,
        actors: "Veronika poeg"
    },
    /// Mina olin siin
    {
        id: 115,
        actors: "Rasmus Kaljujärv"
    },
    {
        id: 116,
        actors: "Doris Tislar"
    },
    {
        id: 117,
        actors: "Marilyn Jurman"
    },
    {
        id: 118,
        actors: "Hele Kõre"
    },
    {
        id: 119,
        actors: "Tambet Tuisk"
    },
    {
        id: 120,
        actors: "Margus Prangel"
    },
    {
        id: 121,
        actors: "Johannes Naan"
    },
    {
        id: 122,
        actors: "Märt Avandi"
    },
    {
        id: 123,
        actors: "Nikolai Bentsler"
    },
    /// Tenet
    {
        id: 124,
        actors: "John David Washington"
    },
    {
        id: 125,
        actors: "Robert Pattinson"
    },
    {
        id: 126,
        actors: "Juhan Ulfsak"
    },
    {
        id: 127,
        actors: "Elizabeth Debicki"
    },
    {
        id: 128,
        actors: "Andrew Howard"
    },
    {
        id: 129,
        actors: "Martin Donovan"
    },
    {
        id: 130,
        actors: "Clémence Poésy"
    },
    {
        id: 131,
        actors: "Dimple Kapadia"
    },
    {
        id: 132,
        actors: "Michael Caine"
    },
    {
        id: 133,
        actors: "Jeremy Theobald"
    },
    /// Shawshank Redemption
    {
        id: 134,
        actors: "Tim Robbins"
    },
    {
        id: 135,
        actors: "Morgan Freeman"
    },
    {
        id: 136,
        actors: "William Sadler"
    },
    {
        id: 137,
        actors: "Bob Gunton"
    },
    {
        id: 138,
        actors: "Clancy Brown"
    },
    {
        id: 139,
        actors: "Mark Rolston"
    },
    {
        id: 140,
        actors: "James Whitmore"
    },
    {
        id: 141,
        actors: "Larry Brandenburg"
    },
    /// Inception
    {
        id: 142,
        actors: "Leonardo DiCaprio"
    },
    {
        id: 143,
        actors: "Joseph Gordon-Levitt"
    },
    {
        id: 144,
        actors: "Actor Name3"
    },
    {
        id: 145,
        actors: "Elliot Page"
    },
    {
        id: 146,
        actors: "Ken Watanabe"
    },
    {
        id: 147,
        actors: "Tom Hardy"
    },
    {
        id: 148,
        actors: "Dileep Rao"
    },
    {
        id: 149,
        actors: "Cillian Murphy"
    },
    {
        id: 150,
        actors: "Tom Berenger"
    },
    {
        id: 151,
        actors: "Marion Cotillard"
    },
    /// Silence of the Lambs
    {
        id: 152,
        actors: "Jodie Foster as Clarice Starling"
    },
    {
        id: 153,
        actors: "Anthony Hopkins as Dr. Hannibal Lecter"
    },
    {
        id: 154,
        actors: "Kasi Lemmons as Ardelia Mapp"
    },
    {
        id: 155,
        actors: "Scott Glenn as Jack Crawford"
    },
    {
        id: 156,
        actors: "Anthony Heald as Dr. Frederick Chilton"
    },
    {
        id: 157,
        actors: "Frankie Faison as Barney"
    },
    {
        id: 158,
        actors: "Stuart Rudin as Miggs"
    },
    {
        id: 159,
        actors: "Brooke Smith as Catherine Martin"
    },
    /// Godfather
    {
        id: 160,
        actors: "Marlon Brando"
    },
    {
        id: 161,
        actors: "Al Pacino"
    },
    {
        id: 162,
        actors: "James Caan"
    },
    {
        id: 163,
        actors: "Diane Keaton"
    },
    {
        id: 164,
        actors: "Richard S. Castellano"
    },
    {
        id: 165,
        actors: "Robert Duvall"
    },
    {
        id: 166,
        actors: "John Marley"
    },
    {
        id: 167,
        actors: "Al Lettieri"
    },
    {
        id: 168,
        actors: "Abe Vigoda"
    },
    {
        id: 169,
        actors: "Talia Shire"
    },
    /// Fight Club
    {
        id: 170,
        actors: "Brad Pitt as Tyler Durden"
    },
    {
        id: 171,
        actors: "Edward Norton as Narrator"
    },
    {
        id: 172,
        actors: "Meat Loaf as Robert Paulsen"
    },
    {
        id: 173,
        actors: "Helena Bonham Carter as Marla Singer"
    },
    {
        id: 174,
        actors: "Rachel Singer as Chloe"
    },
    /// Interstellar
    {
        id: 175,
        actors: "Matthew McConaughey"
    },
    {
        id: 176,
        actors: "Anne Hathaway"
    },
    {
        id: 177,
        actors: "Jessica Chastain"
    },
    {
        id: 178,
        actors: "John Lithgow"
    },
    {
        id: 179,
        actors: "David Oyelowo"
    },
    {
        id: 180,
        actors: "Collette Wolfe"
    },
    {
        id: 181,
        actors: "Francis X. McCarthy"
    },
    {
        id: 182,
        actors: "Andrew Borba"
    },
    {
        id: 183,
        actors: "William Devane"
    },
    {
        id: 184,
        actors: "David Gyasi"
    },
    {
        id: 185,
        actors: "Casey Affleck"
    },
];

const movieActors = [
    {
        movieId: 1,
        actorId: 1,
        role: "Jesse"
    },
    {
        movieId: 1,
        actorId: 2,
        role: "Mike"
    },
    {
        movieId: 1,
        actorId: 3,
        role: "Badger"
    },
    {
        movieId: 1,
        actorId: 4,
        role: "Skinny Pete"
    },
    {
        movieId: 1,
        actorId: 5,
        role: "SAC Ramey"
    },
    {
        movieId: 1,
        actorId: 6,
        role: "ADA Suzanne Ericsen"
    },
    {
        movieId: 1,
        actorId: 7,
        role: "Old Joe"
    },
    {
        movieId: 1,
        actorId: 8,
        role: "Todd"
    },
    {
        movieId: 1,
        actorId: 9,
        role: "Mrs. Pinkman"
    },
    {
        movieId: 1,
        actorId: 10,
        role: "Mr. Pinkman"
    },
    {
        movieId: 1,
        actorId: 11,
        role: "Casey"
    },
    {
        movieId: 1,
        actorId: 12,
        role: "Ed"
    },
    {
        movieId: 2,
        actorId: 13,
        role: "Robert Neville"
    },
    {
        movieId: 2,
        actorId: 14,
        role: "Anna"
    },
    {
        movieId: 2,
        actorId: 15,
        role: "Ethan"
    },
    {
        movieId: 2,
        actorId: 16,
        role: "Zoe Neville"
    },
    {
        movieId: 2,
        actorId: 17,
        role: "Marley Neville"
    },
    {
        movieId: 2,
        actorId: 18,
        role: "Creatures"
    },
    {
        movieId: 2,
        actorId: 19,
        role: "NYC Evacuee"
    },
    {
        movieId: 2,
        actorId: 20,
        role: "Mike - Military Escort"
    },
    {
        movieId: 3,
        actorId: 21,
        role: "Alpha Male"
    },
    {
        movieId: 3,
        actorId: 22,
        role: "Alpha Female"
    },
    {
        movieId: 3,
        actorId: 23,
        role: "Shrek"
    },
    {
        movieId: 3,
        actorId: 24,
        role: "Donkey"
    },
    {
        movieId: 3,
        actorId: 25,
        role: "Puss In Princess Fiona"
    },
    {
        movieId: 3,
        actorId: 26,
        role: "Queen"
    },
    {
        movieId: 3,
        actorId: 27,
        role: "Puss In Boots"
    },
    {
        movieId: 3,
        actorId: 28,
        role: "King"
    },
    {
        movieId: 3,
        actorId: 29,
        role: "Prince Charming"
    },
    {
        movieId: 3,
        actorId: 30,
        role: "Fairy Godmother"
    },
    {
        movieId: 3,
        actorId: 31,
        role: "Ugly Stepsister"
    },
    {
        movieId: 3,
        actorId: 32,
        role: "Mirror"
    },
    {
        movieId: 3,
        actorId: 33,
        role: "Gingerbread Man"
    },
    {
        movieId: 4,
        actorId: 34,
        role: "Somerset"
    },
    {
        movieId: 4,
        actorId: 35,
        role: "Mills"
    },
    {
        movieId: 4,
        actorId: 36,
        role: "John Doe"
    },
    {
        movieId: 4,
        actorId: 37,
        role: "Tracy"
    },
    {
        movieId: 4,
        actorId: 38,
        role: "Officer Davis"
    },
    {
        movieId: 4,
        actorId: 39,
        role: "Police Captain"
    },
    {
        movieId: 4,
        actorId: 40,
        role: "Cab Driver"
    },
    {
        movieId: 4,
        actorId: 41,
        role: "Talbot"
    },
    {
        movieId: 5,
        actorId: 42,
        role: "Chev Chelios"
    },
    {
        movieId: 5,
        actorId: 43,
        role: "Eve"
    },
    {
        movieId: 5,
        actorId: 44,
        role: "Carlito"
    },
    {
        movieId: 5,
        actorId: 45,
        role: "Verona"
    },
    {
        movieId: 5,
        actorId: 46,
        role: "Kaylo"
    },
    {
        movieId: 5,
        actorId: 47,
        role: "Doc Miles"
    },
    {
        movieId: 5,
        actorId: 48,
        role: "Orlando"
    },
    {
        movieId: 5,
        actorId: 49,
        role: "Haitian Cabbie"
    },
    {
        movieId: 5,
        actorId: 50,
        role: "Doctor"
    },
    {
        movieId: 5,
        actorId: 51,
        role: "Don Kim"
    },
    {
        movieId: 5,
        actorId: 52,
        role: "Chocolate"
    },
    {
        movieId: 6,
        actorId: 53,
        role: "Forrest Gump"
    },
    {
        movieId: 6,
        actorId: 54,
        role: "Jenny Curran"
    },
    {
        movieId: 6,
        actorId: 55,
        role: "Lietenant Dan Taylor"
    },
    {
        movieId: 6,
        actorId: 56,
        role: "Mrs. Gump"
    },
    {
        movieId: 6,
        actorId: 57,
        role: "Crony"
    },
    {
        movieId: 6,
        actorId: 58,
        role: "Actor Role1"
    },
    {
        movieId: 6,
        actorId: 59,
        role: "Principal"
    },
    {
        movieId: 6,
        actorId: 60,
        role: "Actor Role2"
    },
    {
        movieId: 6,
        actorId: 61,
        role: "Louise"
    },
    {
        movieId: 6,
        actorId: 62,
        role: "School Bus Driver"
    },
    {
        movieId: 7,
        actorId: 63,
        role: "Sofî"
    },
    {
        movieId: 7,
        actorId: 64,
        role: "Hauru"
    },
    {
        movieId: 7,
        actorId: 65,
        role: "Karushifâ"
    },
    {
        movieId: 7,
        actorId: 66,
        role: "Marukuru"
    },
    {
        movieId: 7,
        actorId: 67,
        role: "Kokuô"
    },
    {
        movieId: 7,
        actorId: 68,
        role: "Sariman"
    },
    {
        movieId: 7,
        actorId: 69,
        role: "Howl"
    },
    {
        movieId: 7,
        actorId: 70,
        role: "Witch of the Waste"
    },
    {
        movieId: 7,
        actorId: 71,
        role: "Grandma Sophie"
    },
    {
        movieId: 7,
        actorId: 72,
        role: "Calcifer"
    },
    {
        movieId: 8,
        actorId: 73,
        role: "Gran Mamare"
    },
    {
        movieId: 8,
        actorId: 74,
        role: "Kôichi"
    },
    {
        movieId: 8,
        actorId: 75,
        role: "Fujimoto"
    },
    {
        movieId: 8,
        actorId: 76,
        role: "Granmamare"
    },
    {
        movieId: 8,
        actorId: 77,
        role: "Risa"
    },
    {
        movieId: 8,
        actorId: 78,
        role: "Koichi"
    },
    {
        movieId: 8,
        actorId: 79,
        role: "Ponyo"
    },
    {
        movieId: 8,
        actorId: 80,
        role: "Fujin"
    },
    {
        movieId: 8,
        actorId: 81,
        role: "Fujimoto"
    },
    {
        movieId: 8,
        actorId: 82,
        role: "Toki"
    },
    {
        movieId: 9,
        actorId: 83,
        role: "Chihiro"
    },
    {
        movieId: 9,
        actorId: 84,
        role: "Yubaba"
    },
    {
        movieId: 9,
        actorId: 85,
        role: "Haku"
    },
    {
        movieId: 9,
        actorId: 86,
        role: "Chihiro Ogino"
    },
    {
        movieId: 9,
        actorId: 87,
        role: "Yubaba"
    },
    {
        movieId: 9,
        actorId: 88,
        role: "Aogaeru"
    },
    {
        movieId: 9,
        actorId: 89,
        role: "Bô"
    },
    {
        movieId: 9,
        actorId: 90,
        role: "Bandai-gaeru"
    },
    {
        movieId: 9,
        actorId: 91,
        role: "Kamajî"
    },
    {
        movieId: 10,
        actorId: 92,
        role: "Neo"
    },
    {
        movieId: 10,
        actorId: 93,
        role: "Morpheus"
    },
    {
        movieId: 10,
        actorId: 94,
        role: "Trinity"
    },
    {
        movieId: 10,
        actorId: 95,
        role: "Agent Smith"
    },
    {
        movieId: 10,
        actorId: 96,
        role: "Oracle"
    },
    {
        movieId: 10,
        actorId: 97,
        role: "Cypher"
    },
    {
        movieId: 10,
        actorId: 98,
        role: "Tank"
    },
    {
        movieId: 10,
        actorId: 99,
        role: "Apoc"
    },
    {
        movieId: 10,
        actorId: 100,
        role: "Mouse"
    },
    {
        movieId: 10,
        actorId: 101,
        role: "Switch"
    },
    {
        movieId: 11,
        actorId: 102,
        role: "Daniel Morales"
    },
    {
        movieId: 11,
        actorId: 103,
        role: "Émilien Coutant-Kerbalec"
    },
    {
        movieId: 11,
        actorId: 104,
        role: "Camille Coutant-Kerbalec"
    },
    {
        movieId: 11,
        actorId: 105,
        role: "Lilly Bertineau"
    },
    {
        movieId: 11,
        actorId: 106,
        role: "Commissaire Gibert"
    },
    {
        movieId: 11,
        actorId: 107,
        role: "Petra"
    },
    {
        movieId: 11,
        actorId: 108,
        role: "Pizza Joe Motorcyclist"
    },
    {
        movieId: 11,
        actorId: 109,
        role: "Paulo"
    },
    {
        movieId: 11,
        actorId: 110,
        role: "Alain"
    },
    {
        movieId: 12,
        actorId: 111,
        role: "Marek"
    },
    {
        movieId: 12,
        actorId: 112,
        role: "Veronika"
    },
    {
        movieId: 12,
        actorId: 113,
        role: "Fred"
    },
    {
        movieId: 12,
        actorId: 114,
        role: "Veronika poeg"
    },
    {
        movieId: 13,
        actorId: 115,
        role: "Rass"
    },
    {
        movieId: 13,
        actorId: 116,
        role: "Hanna"
    },
    {
        movieId: 13,
        actorId: 117,
        role: "Säde"
    },
    {
        movieId: 13,
        actorId: 118,
        role: "Renita"
    },
    {
        movieId: 13,
        actorId: 119,
        role: "Olar"
    },
    {
        movieId: 13,
        actorId: 120,
        role: "Mõssa"
    },
    {
        movieId: 13,
        actorId: 121,
        role: "Janar"
    },
    {
        movieId: 13,
        actorId: 122,
        role: "Aivo"
    },
    {
        movieId: 13,
        actorId: 123,
        role: "Talis"
    },
    {
        movieId: 14,
        actorId: 124,
        role: "Protagonist"
    },
    {
        movieId: 14,
        actorId: 125,
        role: "Neil"
    },
    {
        movieId: 14,
        actorId: 126,
        role: "Passenger"
    },
    {
        movieId: 14,
        actorId: 127,
        role: "Kat"
    },
    {
        movieId: 14,
        actorId: 128,
        role: "Driver"
    },
    {
        movieId: 14,
        actorId: 129,
        role: "Fay"
    },
    {
        movieId: 14,
        actorId: 130,
        role: "Barbara"
    },
    {
        movieId: 14,
        actorId: 131,
        role: "Priya"
    },
    {
        movieId: 14,
        actorId: 132,
        role: "Crosby"
    },
    {
        movieId: 14,
        actorId: 133,
        role: "Steward"
    },
    {
        movieId: 15,
        actorId: 134,
        role: "Andy Dufresne"
    },
    {
        movieId: 15,
        actorId: 135,
        role: "Ellis Boyd 'Red' Redding"
    },
    {
        movieId: 15,
        actorId: 136,
        role: "Heywood"
    },
    {
        movieId: 15,
        actorId: 137,
        role: "Warden Norton"
    },
    {
        movieId: 15,
        actorId: 138,
        role: "Captain Hadley"
    },
    {
        movieId: 15,
        actorId: 139,
        role: "Bogs Diamond"
    },
    {
        movieId: 15,
        actorId: 140,
        role: "Brooks Hatlen"
    },
    {
        movieId: 15,
        actorId: 141,
        role: "Skeet"
    },
    {
        movieId: 16,
        actorId: 142,
        role: "Cobb"
    },
    {
        movieId: 16,
        actorId: 143,
        role: "Arthur"
    },
    {
        movieId: 16,
        actorId: 144,
        role: "Actor Role3"
    },
    {
        movieId: 16,
        actorId: 145,
        role: "Ariadne"
    },
    {
        movieId: 16,
        actorId: 146,
        role: "Saito"
    },
    {
        movieId: 16,
        actorId: 147,
        role: "Eames"
    },
    {
        movieId: 16,
        actorId: 148,
        role: "Yusuf"
    },
    {
        movieId: 16,
        actorId: 149,
        role: "Robert Fischer"
    },
    {
        movieId: 16,
        actorId: 150,
        role: "Browning"
    },
    {
        movieId: 16,
        actorId: 151,
        role: "Mal"
    },
    {
        movieId: 17,
        actorId: 152,
        role: "Clarice Starling"
    },
    {
        movieId: 17,
        actorId: 153,
        role: "Dr. Hannibal Lecter"
    },
    {
        movieId: 17,
        actorId: 154,
        role: "Ardelia Mapp"
    },
    {
        movieId: 17,
        actorId: 155,
        role: "Jack Crawford"
    },
    {
        movieId: 17,
        actorId: 156,
        role: "Dr. Frederick Chilton"
    },
    {
        movieId: 17,
        actorId: 157,
        role: "Barney"
    },
    {
        movieId: 17,
        actorId: 158,
        role: "Miggs"
    },
    {
        movieId: 17,
        actorId: 159,
        role: "Catherine Martin"
    },
    {
        movieId: 18,
        actorId: 160,
        role: "Don Vito Corleone"
    },
    {
        movieId: 18,
        actorId: 161,
        role: "Michael"
    },
    {
        movieId: 18,
        actorId: 162,
        role: "Sonny"
    },
    {
        movieId: 18,
        actorId: 163,
        role: "Kay Adams"
    },
    {
        movieId: 18,
        actorId: 164,
        role: "Clemenza"
    },
    {
        movieId: 18,
        actorId: 165,
        role: "Tom Hagen"
    },
    {
        movieId: 18,
        actorId: 166,
        role: "Jack Woltz"
    },
    {
        movieId: 18,
        actorId: 167,
        role: "Sollozzo"
    },
    {
        movieId: 18,
        actorId: 168,
        role: "Tessio"
    },
    {
        movieId: 18,
        actorId: 169,
        role: "Connie"
    },
    {
        movieId: 19,
        actorId: 170,
        role: "Tyler Durden"
    },
    {
        movieId: 19,
        actorId: 171,
        role: "Narrator"
    },
    {
        movieId: 19,
        actorId: 172,
        role: "Robert Paulsen"
    },
    {
        movieId: 19,
        actorId: 173,
        role: "Marla Singer"
    },
    {
        movieId: 19,
        actorId: 174,
        role: "Chloe"
    },
    {
        movieId: 20,
        actorId: 175,
        role: "Cooper"
    },
    {
        movieId: 20,
        actorId: 176,
        role: "Brand"
    },
    {
        movieId: 20,
        actorId: 177,
        role: "Murph"
    },
    {
        movieId: 20,
        actorId: 178,
        role: "Donald"
    },
    {
        movieId: 20,
        actorId: 179,
        role: "School Principal"
    },
    {
        movieId: 20,
        actorId: 180,
        role: "Ms. Hanley"
    },
    {
        movieId: 20,
        actorId: 181,
        role: "Boots"
    },
    {
        movieId: 20,
        actorId: 182,
        role: "Smith"
    },
    {
        movieId: 20,
        actorId: 183,
        role: "Williams"
    },
    {
        movieId: 20,
        actorId: 184,
        role: "Romilly"
    },
    {
        movieId: 20,
        actorId: 185,
        role: "Tom"
    },

];

app.get("/movies", (req, res) => {
    res.send(movies);
    res.send(actors);
    res.send(movieActors);
});

app.get("/movies/:id", (req, res) => {
    if (typeof movies[req.params.id - 1] && actors[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Movie not found" });
  }

    res.send(movies[req.params.id - 1]);
    res.send(actors[req.params.id - 1]);
    res.send(movieActors[req.params.id - 1]);
});

app.post("/movies", (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.actors) {
    return res.status(400).send({ error: "One or all params are missing" });
  }
  let movie = {
    id: movies.length + 1,
    name: req.body.name,
    description: req.body.description,
    actors: req.body.actors,
  };

  movies.push(movie);

  res
    .status(201)
    .location(`${getBaseUrl(req)}/movies/${movies.length}`)
    .send(movie);
});

app.delete("/movies/:id", (req, res) => {
    if (typeof movies[req.params.id - 1] && actors[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Movie has not been found" });
  }

    movies.splice(req.params.id - 1, 1);
    actors.splice(req.params.id - 1, 1);
    movieActors.splice(req.params.id - 1, 1);

  res.status(204).send({ error: "No content" });
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`API up at: http://localhost:${port}/movies`);
});

function getBaseUrl(req) {
  return req.connection && req.connection.encrypted
    ? "https"
    : "http" + `://${req.headers.host}`;
}
