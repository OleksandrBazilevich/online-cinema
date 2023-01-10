- JWT Auththorization
- SSG & ISR
- Reusable components
- Infinity Scroll
- Admin Panel
- Responsive layout
- Search with debounce
- SEO optimization
- Chart
- Statistics
- Full typing
- Good perfomance

## Status

Completed

## Project Screenshots
### Desktop
![Screenshot](/assets/home.png)
![Screenshot](/assets/discovery.png)
![Screenshot](/assets/stats1.png)

### Mobile
![Screenshot](/assets/home(mobile).png)

## Installation and Setup Instructions

Clone down repo. Create .env for client and server. You will need `node` and `yarn` installed globally on your machine.

#### .env for server:
NODE_ENV=`production or development`

MONGO_URI=`your MongoDB uri`

JWT_SECRET=`your jwt secret key`

PORT=`4200 or the one you like`

#### Installation for server:

`yarn`

#### To Build:

`yarn build`  

#### To Start:

`yarn start`

##### URL

`localhost:<PORT>/`  




#### .env for client:
REACT_APP_URL=`http://localhost:3000`

REACT_APP_SERVER_URL=`http://localhost:4200`

REACT_APP_ENV=`production or development`

#### Installation for client:

`yarn`

#### To Build (you need server api for it):

`yarn build`  

#### To Start:

`yarn start`

##### To Visit App:

`localhost:3000/`  



## Technologies and their usage
## Client
- **TypeScript**
    - Static typing
- **Next.js**
    - Routing
    - SEO
    - SSR, SSG, ISR
    - Image optimization
- **TanStack Query** 
    - Fetching, caching, synchronizing and updating server state
- **Redux Toolkit**
    - Authorization implementation
- **TailwindCSS & SCSS**
    - Styling
- **Video.js**
    - Video player

## Server
- **TypeScript**
    - Static typing
- **Nest.js**
    - base
- **JWT** 
    - Authorizathion
- **Mongoose**
    - MongoDB object modeling
- **Typegoose**
    - Defining Mongoose models using TypeScript classes
- **Multer**
    - Uploading files
- **class-validator**
    - automatically validating incoming requests



## Perfomance 
![Screenshot](/assets/perfomance-lighthouse.png)
