import Bot from './class/Bot';
import Chat from './class/Chat';
import './index.scss';

const Pokedex = require('pokedex-promise-v2');

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
          - <strong>pokedex</strong> name / <strong>pokemon</strong> name : Get the sprite of a wanted Pokemon
          <br>
          <small>e.g: pokedex eevee</small>
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
      cmd: ['MDS', 'mds', 'MyDigitalSchool'],
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
      title: 'Pokedex',
      cmd: ['Pokedex', 'pokedex', 'Pokemon', 'pokemon', 'Pokémon', 'pokémon'],
      async action(pokemon) {
        return new Promise((resolve, reject) => {
          const P = new Pokedex();
          P.getPokemonByName(pokemon) // with Promise
            .then((response) => {
              const img = `<img src="${response.sprites.front_default}" alt="pokeSprite">`;
              resolve(img);
            })
            .catch((error) => {
              reject(error);
            });
        });
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
      cmd: ['MDS', 'mds', 'MyDigitalSchool'],
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
      title: 'Random Mars picture',
      cmd: ['Nasa', 'nasa', 'NASA', 'mars', 'Mars'],
      async action() {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          const token = 'u3uLrHJ0V4OBaLx12k1Oeo815osfmwqll0GZsYZs';
          try {
            request.open('GET', `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${token}`);

            request.onload = () => {
              const result = JSON.parse(request.response);
              if (request.status >= 200 && request.status < 400) {
                const getImg = result
                  .photos[Math.floor(Math.random() * (result.photos.length))]
                  .img_src;
                const img = `
                    <img src="${getImg}" width="300" height="200" alt="nasaPicture">
                    <br>
                    <a href="${getImg}" style="color:white;" target="_blank">Taille réelle</a>
                  `;
                resolve(img);
              }
            };
            request.send();
          } catch (error) {
            reject(error);
          }
        });
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
           <img src="https://static.blog4ever.com/2010/09/435235/artimage_435235_3165434_201101180501259.jpg" width="200" height="200">
           <br>
           <a href="https://static.blog4ever.com/2010/09/435235/artimage_435235_3165434_201101180501259.jpg" style="color:white;" target="_blank">Full Size</a>
          `;
      }
    },
    {
      title: 'Common Command',
      cmd: ['MDS', 'mds', 'MyDigitalSchool'],
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
      title: 'Random Country Food',
      cmd: ['food', 'Food', 'recette', 'nourriture', 'Nourriture', 'plat', 'Plat'],
      async action(country) {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          const token = '34d18592e33e441eada162bf7d27d881';
          try {
            request.open('GET', `https://api.spoonacular.com/recipes/complexSearch?apiKey=${token}&cuisine=${country}`, true);

            request.onload = () => {
              const result = JSON.parse(request.response);
              if (request.status >= 200 && request.status < 400) {
                const getRandom = Math.floor(Math.random() * (result.results.length));
                const getImg = result.results[getRandom].image;
                const getTitle = result.results[getRandom].title;

                const msg = `
                    <strong>${getTitle}</strong>
                    <br>
                    <img src="${getImg}" width="300" height="200" alt="countryFood">
                    <br>
                    <a href="${getImg}" style="color:white;" target="_blank">Full Size</a>
                  `;
                resolve(msg);
              }
            };
            request.send();
          } catch (error) {
            reject(error);
          }
        });
      }
    }
  ]
}];

const contacts = bots.map((contact) => new Bot(contact));
export default new Chat(contacts);
