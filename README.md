# MyflixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6, and runs on Node v16.17.1.

This is the frontend of an app built to run on the Express.js server located [here](https://github.com/bentleyjensen/movie-api), which is backed by a MongoDB database. A separate frontend was also built in React.js.

As of this writing, it is deployed on Github Pages, and can be accessed [here](https://bentleyjensen.github.io/myflix-client-angular/)

## Development server

I was unable to get dotenv to work appropriately, so the API_URL is hardcoded in `src/app/fetch-api-data.service.ts`. You can change this to match the appropriate server before starting the project.

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Documentation

Documentation is automatically generated via [typedoc](https://typedoc.org/). To build documentation, run `npm run docgen` or `npx typedoc`. The resulting documentation can be found in the 'Docs' folder in the project root.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
