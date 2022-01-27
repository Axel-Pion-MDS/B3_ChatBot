import Bot from './class/Bot';
import Chat from './class/Chat';
import './index.scss';

const bots = [{
  name: 'Maengdok',
  actions: [
    {
      title: 'Help',
      cmd: ['help', 'Help', 'h', 'aide', 'Aide'],
      async action() {
        return ` 
          - <strong>help</strong> / <strong>aide</strong> : Get available commands
          <br>
          - <strong>dice</strong> / <strong>dés</strong> : Get a random number from 0 to 100
          <br>
          - <strong>MyDigitalSchool</strong> : Get the address of My Digital School
          <br> 
          - <strong>movie</strong> title / <strong>film</strong> titre : Get the informations about a movie from its title
          <br>
          <small>e.g: movie interstellar</small>
        `;
      }
    },
    {
      title: 'Dice',
      cmd: ['dice', 'Dice', 'dés', 'Dés', 'roll', 'Roll'],
      async action() {
        return `${(Math.floor(Math.random() * (100)))}`;
      }
    },
    {
      title: 'Common Command',
      cmd: ['MyDigitalSchool'],
      async action() {
        return `
          11, rue de Cambrai
          <br>
          Parc du Pont de Flandre
          <br>
          Bâtiment 33
          <br>
          75019 Paris
        `;
      }
    },
    {
      title: 'Movie',
      cmd: ['Movie', 'movie', 'Film', 'film'],
      param: 'title',
      async action(title) {
        return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=d8798360&t=${title}`)
          .then((res) => res.json())
          .then((dataReturn) => `
            <img src="${dataReturn.Poster}" />
            <h4>${dataReturn.Title}</h4>
            <p>${dataReturn.Year}, Genre: ${dataReturn.Genre}</p>
            <h6>Actors:</h6>
            <p>${dataReturn.Actors}</p>
            <h6>Plot:</h6>
            <p>${dataReturn.Plot}</p>
            <h6>Awards:</h6>
            <p>${dataReturn.Awards}</p>
          `)
          .catch(() => 'Unknown movie.');
      }
    }
  ]
},
{
  name: 'Haneul',
  actions: [
    {
      title: 'Help',
      cmd: ['help', 'Help', 'h', 'aide', 'Aide'],
      async action() {
        return ` 
            - <strong>help</strong> / <strong>aide</strong> : Get available commands
            <br>
            - <strong>sky</strong> / <strong>ciel</strong> : Get a fact about the SKY acronym in South Korea
            <br>
            - <strong>MDS</strong> : Get a fact about My Digital School
            <br>
            - <strong>nasa</strong> / <strong>mars</strong> : Get a random picture of Mars
          `;
      }
    },
    {
      title: 'Sky',
      cmd: ['sky', 'Sky', 'ciel', 'Ciel'],
      async action() {
        return `
            Savez-vous, qu'en Corée du Sud l'acronyme SKY fait références aux trois plus grands universités coréennes ?<br>
            <a href="https://fr.wikipedia.org/wiki/SKY_(universit%C3%A9s)" style="color:white;" target="_blank">SKY</a>
          `;
      }
    },
    {
      title: 'Common Command',
      cmd: ['MDS'],
      async action() {
        return `
            Guess I'm gonna leave that school for a new one.
          `;
      }
    },
    {
      title: 'Random Mars picture',
      cmd: ['Nasa', 'nasa', 'NASA', 'mars', 'Mars'],
      async action() {
        return fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=u3uLrHJ0V4OBaLx12k1Oeo815osfmwqll0GZsYZs')
          .then((res) => res.json())
          .then((dataReturn) => {
            const rndm = Math.floor(Math.random() * (dataReturn.photos.length));
            return `
            <img src="${dataReturn.photos[rndm].img_src}" width="100%" height="100%" alt="nasaPicture">
            <br>
            <a href="${dataReturn.photos[rndm].img_src}" style="color:white;" target="_blank">Taille réelle</a>
            `;
          })
          .catch(() => 'Couldn\'t fetch image from Mars.');
      }
    }
  ]
},
{
  name: 'Sinhwa',
  actions: [
    {
      title: 'Help',
      cmd: ['help', 'Help', 'h', 'aide', 'Aide'],
      async action() {
        return ` 
            - <strong>help</strong> / <strong>aide</strong> : Get available commands
            <br>
            - <strong>trigram</strong> / <strong>bagua</strong> : Get a picture of a Ba Gua
            <br>
            - <strong>mds</strong>: Get the URL of the school
            <br>
            - <strong>food</strong> country / <strong>plat</strong> country : Get a picture of a random dish made in the wanted country
            <br>
            <small>e.g: food korean</small>
          `;
      }
    },
    {
      title: 'Trigram',
      cmd: ['trigram', 'Trigram', 'trigramme', 'Trigramme', 'bagua', 'BaGua', 'ba gua', 'Ba Gua'],
      async action() {
        return `
           <img src="https://static.blog4ever.com/2010/09/435235/artimage_435235_3165434_201101180501259.jpg" width="100%" height="100%">
           <br>
           <a href="https://static.blog4ever.com/2010/09/435235/artimage_435235_3165434_201101180501259.jpg" style="color:white;" target="_blank">Full Size</a>
          `;
      }
    },
    {
      title: 'Common Command',
      cmd: ['mds'],
      async action() {
        return `
            <a href="https://www.mydigitalschool.com/" target="_blank">My Digital School website</a>
          `;
      }
    },
    {
      title: 'Random Country Food',
      cmd: ['food', 'Food', 'recette', 'nourriture', 'Nourriture', 'plat', 'Plat'],
      param: 'country',
      async action(country) {
        return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=34d18592e33e441eada162bf7d27d881&cuisine=${country}`)
          .then((res) => res.json())
          .then((dataReturn) => {
            const rndm = Math.floor(Math.random() * (dataReturn.results.length));
            return `
            <strong>${dataReturn.results[rndm].title}</strong>
            <br>
            <img src="${dataReturn.results[rndm].image}" width="100%" height="100%" alt="countryFood">
            <br>
            <a href="${dataReturn.results[rndm].image}" style="color:white;" target="_blank">Full Size</a>
            `;
          })
          .catch(() => 'Couldn\'t fetch food from that country.');
      }
    }
  ]
}];

const contacts = bots.map((contact) => new Bot(contact));
export default new Chat(contacts);
