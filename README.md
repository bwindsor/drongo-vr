# drongo-vr
A VR experiment using Javascript and [A-frame](https://aframe.io/) to make [DrongO](https://new.drongo.org.uk/)-related things fly around the scene.

## Development
1. Clone the git repository
2. `npm install` to install dependencies
3. `npm run watch` will open the page and automatically refresh on changes (uses [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)) 

## Deployment
1. `npm run build` will package everything into the `dist` folder. You also need `index.html` from the top level folder.
2. Start an http server with these files in (e.g. with [http-server](https://www.npmjs.com/package/http-server))

## Playing
* Looking at a DrongO for over 100ms will 'kill' it
* Looking at the red circle on the floor for over 3 seconds will reset the game
* When all DrongOs are killed, the game will automatically reset after a certain timeout