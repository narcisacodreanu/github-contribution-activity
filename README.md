# GitHub Contribution Activity App

Application that hits the GitHub GraphQL API and retrieves your GitHub contribution activity. Displays the activity using the `react-calendar-heatmap` library.

Built with [Remix](https://remix.run/docs).

<img width="1664" alt="Screen Shot 2024-02-07 at 7 33 49 PM" src="https://github.com/narcisacodreanu/github-contribution-activity/assets/10314636/1dbcdb81-3eed-4fe1-baf7-f877c7b1dac4">

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
