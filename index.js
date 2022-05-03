const express = require("express");
const swaggerUI = require("swagger-ui-express");
const yamljs = require("yamljs");
const swaggerDocument = yamljs.load("./docs/swagger.yaml");
const app = express();
const port = 8080;

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
    name: "Matrix",
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
  if (!req.body.name || !req.body.description) {
    return res.status(400).send({ error: "One or all params are missing" });
  }
  let movie = {
    id: movies.length + 1,
    name: req.body.name,
    description: req.body.description,
  };

  movies.push(movie);

  res
    .status(201)
    .location(`${getBaseUrl(req)}/movies/${movies.length}`)
    .send(movie);
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`API up at: http://localhost:${port}`);
});

function getBaseUrl(req) {
  return req.connection && req.connection.encrypted
    ? "https"
    : "http" + `://${req.headers.host}`;
}
