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
    actors:
      "Aaron Paul as Jesse, Jonathan Banks as Mike, Matt Jones as Badger, Charles Baker as Skinny Pete, Todd Terry as SAC Ramey, Julie Pearl as ADA Suzanne Ericsen, Larry Hankin as Old Joe, Jesse Plemons as Todd, Gloria Sandoval as Sonia, Tess Harper as Mrs. Pinkman, Michael Bofshever as Mr. Pinkman, Scott Shepherd as Casey, Robert Forster as Ed",
  },
  {
    id: 2,
    name: "I Am Legend",
    description:
      "It is set in New York City after a vaccine, which was originally created to cure cancer, has wiped out most of manking, leaving Neville as the last human in New York, other than nocturnal mutants. Neville is immune to the virus, and he works to develop a cure while defending himself against the hostile mutants.",
    actors:
      "Will Smith as Robert Neville, Alice Braga as Anna, Charlie Tahan as Ethan, Salli Richardson-Whitfield as Zoe Neville, Willow Smith as Marley Neville, Darrell Foster as Mike - Military Escort, Dash Mihok as Alpha Male, Joanna Numata as Alpha Female",
  },
  {
    id: 3,
    name: "Shrek 2",
    description:
      "Shrek 2 takes place following the events of the first film, with Shrek and Donkey meeting Fiona's parents as her zealous Fairy Godmother, who wants Fiona to marry her son Prince Charming, plots to destroy Shrek and Fiona's marriage.",
    actors:
      "Mike Myers as Shrek, Eddie Murphy as Donkey, Cameron Diaz as Princess Fiona, Julie Andrews as Queen, Antonio Banderas as Puss In Boots, John Cleese as King, Rupert Everett as Prince Charming, Jennifer Saunders as Fairy Godmother, Larry King as Ugly Stepsister, Mark Moseley as Mirror, Conrad Vernon as Gingerbread Man",
  },
  {
    id: 4,
    name: "Se7en",
    description:
      "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives. A film about two homicide detectives' (Morgan Freeman and Brad Pitt) desperate hunt for a serial killer who justifies his crimes as absolution for the world's ignorance of the Seven Deadly Sins.",
    actors:
      "Morgan Freeman as Somerset, Brad Pitt as Mills, Kevin Spacey as John Doe, Gwyneth Paltrow as Tracy, John Cassini as Officer Davis, R. Lee Ermey as Police Captain, Endre Hules as Cab Driver, Richard Roundtree as Talbot",
  },
  {
    id: 5,
    name: "Crank",
    description:
      "The plot centres on a British hitman based in Los Angeles named Chev Chelios who is poisoned and must keep his adrenaline flowing constantly in order to keep himself alive. He does so by various methods including taking drugs and getting into fights, while he tries to track down the man who poisoned him.",
    actors:
      "Jason Statham as Chev Chelios, Amy Smart as Eve, Carlos Sanz as Carlito, Jose Pablo Cantillo as Verona, Efren Ramirez as Kaylo, Dwight Yoakam as Doc Miles, Reno Wilson as Orlando, Edi Gathegi as Haitian Cabbie, Glenn Howerton as Doctor, Keone Young as Don Kim, Valerie Rae Miller as Chocolate",
  },
  {
    id: 6,
    name: "Forrest Gump",
    description:
      "Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His 'mama' teaches him the ways of life and leaves him to choose his destiny.",
    actors:
      "Tom Hanks as Forrest Gump, Robin Wright as Jenny Curran, Gary Sinise as Lietenant Dan Taylor, Sally Field as Mrs. Gump, Bob Penny as Crony, Sam Anderson as Principal, Margo Moorer as Louise, Siobhan Fallon Hogan as School Bus Driver",
  },
  {
    id: 7,
    name: "Howl's Moving Castle",
    description:
      "A love story between an 18-year-old girl named Sophie, cursed by a witch into an old woman's body, and a magician named Howl. Under the curse, Sophie sets out to seek her fortune, which takes her to Howl's strange moving castle.",
    actors:
      "Chieko Baishô as Sofî, Takuya Kimura as Hauru, Tatsuya Gashûin as Karushifâ, Ryûnosuke Kamiki as Marukuru, Akio Ôtsuka as Kokuô, Haruko Katô as Sariman, Christian Bale as Howl, Lauren Bacall as Witch of the Waste, Jean Simmons as Grandma Sophie, Billy Crystal as Calcifer",
  },
  {
    id: 8,
    name: "Ponyo",
    description:
      "A young boy named Sosuke rescues a goldfish named Ponyo, and they embark on a fantastic journey of friendship before Ponyo's father forces her to return to the sea. Ponyo's desire to be human upsets the balance of nature and only Ponyo's mother can restore nature's balance and make Ponyo's dreams come true.",
    actors:
      "Cate Blanchett as Gran Mamare, Matt Damon as Kôichi, Liam Neeson as Fujimoto, Yûki Amami as Granmamare, Tomoko Yamaguchi as Risa, Kazushige Nagashima as Kôichi, Yuria Nara as Ponyo, Rumi Hiiragi as Fujin, George Tokoro as Fujimoto, Kazuko Yoshiyuki as Toki",
  },
  {
    id: 9,
    name: "Spirited Away",
    description:
      "When her parents undergo a mysterious transformation, Chihiro must fend for herself as she encounters strange spirits, assorted creatures and a grumpy sorceress who seeks to prevent her from returning to the human world. 10-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park.",
    actors:
      "Daveigh Chase as Chihiro, Suzanne Pleshette as Yubaba, Miyu Irino as Haku, Rumi Hiiragi as Chihiro Ogino, Mari Natsuki as Yubaba, Tatsuya Gashûin as Aogaeru, Ryûnosuke Kamiki as Bô, Yô Ôizumi as Bandai-gaeru, Bunta Sugawara as Kamajî",
  },
  {
    id: 10,
    name: "The Matrix",
    description:
      "It depicts a dystopian future in which humanity is unknowingly trapped inside a simulated reality, the Matrix, which intelligent machines have created to distract humans while using their bodies as an energy source.",
    actors:
      "Keanu Reeves as Neo, Laurence Fishburne as Morpheus, Carrie-Anne Moss as Trinity, Hugo Weaving as Agent Smith, Gloria Foster as Oracle, Joe Pantoliano as Cypher, Marcus Chong as Tank, Julian Arahanga as Apoc, Matt Doran as Mouse, Belinda McClory as Switch",
  },
  {
    id: 11,
    name: "Taxi",
    description:
      "Taxi is a 2004 American action-comedy film directed by Tim Story and starring Queen Latifah, Jimmy Fallon, Gisele Bündchen, Jennifer Esposito, and Ann-Margret. An incompetent New York City police officer is banned from driving and comes to rely on a talented taxi driver to help him solve a series of bank robberies.",
    actors:
      "Samy Naceri as Daniel Morales, Frédéric Diefenthal as Émilien Coutant-Kerbalec, Manuela Gourary as Camille Coutant-Kerbalec, Marion Cotillard as Lilly Bertineau, Bernard Farcy as Commissaire Gibert, Emma Wiklund as Petra, Guy Quang as Pizza Joe Motorcyclist, Dan Herzberg as Paulo, Edouard Montoute as Alain",
  },
  {
    id: 12,
    name: "LOVE",
    description:
      "Veronika on neljandat kuud rase ja kolmandat kuud joomatsüklis. Veronika armastatu Fred on endine kriminaal, keda naine on joomingu käigus pussitanud. Veronika teine hea sõber, homoseksuaalne Ivo on kindel, et just see naine on tema elu armastus, kahjuks küll vales kehas. Nende kolme päevad mööduvad tsüklijoodikute seltsis, kellega koos ei näe nad siin ilmas millelgi suuremat mõtet ega pea vajalikuks seetõttu kellelegi ennast tõestada.",
    actors:
      "Veronika as Veronika, Fred as Fred, Veronika poeg as Veronika poeg",
  },
  {
    id: 13,
    name: "Mina Olin Siin",
    description:
      "17-aastane Rass liigub seltskonnas, kus alkohol, uimastid, purunenud perekonnad ja poolelijäänud koolid on rutiin. Rass on kindel, et tema rabeleb sellest välja, kuigi loota on tal ainult endale – ema on surnud, isa võõraks jäänud, tüdruksõber Säde töötu. Rass aga on armastuse, truuduse ja usaldatavuse nimel valmis ka kriminaalsel teel raha hankima. Kui ta oma sulist äripartnerile suure summa võlgu jääb, tundub narkoärikas Olari pakkumine väljapääsuna. Ent esimesele viieteistkümnele annusele järgneb juba palju suurema koguse müümise nõue, mis paiskab Rassi, ta poolvenna Mõssa ja sõbra Janari otseteed allmaailma julma tegelikkusse.",
    actors:
      "Rasmus Kaljujärv as Rass, Doris Tislar as Hanna, Marilyn Jurman as Säde, Hele Kõre as Renita, Tambet Tuisk as Olar, Margus Prangel as Mõssa, Johannes Naan as Janar, Märt Avandi as Aivo, Nikolai Bentsler as Talis",
  },
  {
    id: 14,
    name: "Tenet",
    description:
      "This is a science fiction-action-thriller film starring John David Washington, Robert Pattinson, Elizabeth Debicki, and Kenneth Branagh, among others. It's the story of a secret agent who learns to manipulate the flow of time to prevent an attack from the future that threatens to annihilate the present.",
    actors:
      "John David Washington as Protagonist, Robert Pattinson as Neil, Juhan Ulfsak as Passenger, Elizabeth Debicki as Kat, Andrew Howard as Driver, Martin Donovan as Fay, Clémence Poésy as Barbara, Dimple Kapadia as Priya, Michael Caine as Crosby, Jeremy Theobald as Steward",
  },
  {
    id: 15,
    name: "Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit.",
    actors:
      "Tim Robbins as Andy Dufresne, Morgan Freeman as Ellis Boyd 'Red' Redding, William Sadler as Heywood, Bob Gunton as Warden Norton, Gil Bellows as Tommy, Clancy Brown as Captain Hadley, Mark Rolston as Bogs Diamond, James Whitmore as Brooks Hatlen, Larry Brandenburg as Skeet",
  },
  {
    id: 16,
    name: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    actors:
      "Leonardo DiCaprio as Cobb, Joseph Gordon-Levitt as Arthur, Elliot Page as Ariadne, Ken Watanabe as Saito, Tom Hardy as Eames, Dileep Rao as Yusuf, Cillian Murphy as Robert Fischer, Tom Berenger as Browning, Marion Cotillard as Mal",
  },
  {
    id: 17,
    name: "The Silence of the Lambs",
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    actors:
      "Jodie Foster as Clarice Starling, Anthony Hopkins as Dr. Hannibal Lecter, Kasi Lemmons as Ardelia Mapp, Scott Glenn as Jack Crawford, Anthony Heald as Dr. Frederick Chilton, Frankie Faison as Barney, Stuart Rudin as Miggs, Brooke Smith as Catherine Martin",
  },
  {
    id: 18,
    name: "The Godfather",
    description:
      "It is the first installment in The Godfather trilogy. The story, spanning from 1945 to 1955, chronicles the Corleone family under patriarch Vito Corleone (Brando), focusing on the transformation of his youngest son, Michael Corleone (Pacino), from reluctant family outsider to ruthless mafia boss.",
    actors:
      "Marlon Brando as Don Vito Corleone, Al Pacino as Michael, James Caan as Sonny, Diane Keaton as Kay Adams, Richard S. Castellano as Clemenza, Robert Duvall as Tom Hagen, John Marley as Jack Woltz, Al Lettieri as Sollozzo, Abe Vigoda as Tessio, Talia Shire as Connie",
  },
  {
    id: 19,
    name: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more. A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac state.",
    actors:
      "Brad Pitt as Tyler Durden, Edward Norton as Narrator, Meat Loaf as Robert Paulsen, Helena Bonham Carter as Marla Singer, Rachel Singer as Chloe",
  },
  {
    id: 20,
    name: "Interstellar",
    description:
      "Interstellar is about Earth's last chance to find a habitable planet before a lack of resources causes the human race to go extinct. The film's protagonist is Cooper (Matthew McConaughey), a former NASA pilot who is tasked with leading a mission through a wormhole to find a habitable planet in another galaxy.",
    actors:
      "Matthew McConaughey as Cooper, Anne Hathaway as Brand, Jessica Chastain as Murph, John Lithgow as Donald, David Oyelowo as School Principal, Collette Wolfe as Ms. Hanley, Francis X. McCarthy as Boots, Andrew Borba as Smith, William Devane as Williams, David Gyasi as Romilly, Casey Affleck as Tom",
  },
];

app.get("/movies", (req, res) => {
  res.send(movies);
});

app.get("/movies/:id", (req, res) => {
  if (typeof movies[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Movie not found" });
  }

  res.send(movies[req.params.id - 1]);
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
  if (typeof movies[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Movie has not been found" });
  }

  movies.splice(req.params.id - 1, 1);

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
