[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org)

<h1 align="center">Next.js ❤️ Boilerplate</h1>

<div align="center">
  

An [**Next.js**](https://github.com/zeit/next.js/), [**MongoDB**](https://www.mongodb.com/), [**TypeScript**](https://www.typescriptlang.org/) and [**TailwinCSS**](https://tailwindcss.com/) web application, designed with simplicity for learning and real-world applicability.


</div>

<h2 align="center">Features</h2>

<div align="center">

🐇 Fast and light without [bulky](https://bundlephobia.com/result?p=express@4.17.1), [slow](https://github.com/fastify/benchmarks#benchmarks) Express.js.

✨ Full [API Routes](https://nextjs.org/blog/next-9#api-routes) implementation and 👻 Serverless ready


💋 [KISS](https://en.wikipedia.org/wiki/KISS_principle): No fancy stuff like GraphQL, SASS, Redux, etc.

📙 Can be adapted to any databases besides MongoDB

</div>

<h3 align="center">:lock: Authentication and Account</h3>

<div align="center">

- [x] Session-based authentication ([Iron-session](https://github.com/vvo/iron-session))
- [x] Sign up/Log in/Sign out API
- [x] Authentication via email/password
- [] Password change
- [] Password reset via email

</div>

<h3 align="center">Development</h3>

Start the development server by running `yarn dev` or `npm run dev`.

<h2 align="center">Deployment</h2>

This project can be deployed [anywhere Next.js can be deployed](https://nextjs.org/docs/deployment). Make sure to set the environment variables using the options provided by your cloud/hosting providers.

After building using `npm run build`, simply start the server using `npm run start`.

You can also deploy this with serverless providers given the correct setup.