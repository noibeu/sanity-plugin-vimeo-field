# Sanity Plugin Vimeo Field (v4 Compatible)

Retrieve Vimeo video data via the API with an access token and store it in Sanity.

![Sanity Plugin Vimeo Field Preview](https://github.com/marco-land/sanity-plugin-vimeo-field/assets/24410335/b1bd4b87-4575-4669-9ea8-a704806a9532)

## Installation

```sh
yarn install sanity-plugin-vimeo-field-v4
# or npm
npm install sanity-plugin-vimeo-field-v4
```

ℹ This is a **Sanity Studio** v4 plugin (fully backward compatible with existing schemas)

**Requirements:**
- Node.js ≥ 20
- Sanity Studio v4

## Configuration

Add your Vimeo access token to your `.env`

```sh
SANITY_STUDIO_VIMEO_ACCESS_TOKEN="YOUR_ACCESS_TOKEN"
```

Add the plugin to your Sanity configuration

```ts
// `sanity.config.ts` / `sanity.config.js`:
import {defineConfig} from 'sanity'
import {vimeoField} from 'sanity-plugin-vimeo-field-v4'

export default defineConfig({
  // ...
  plugins: [
    // ...
    vimeoField({
      accessToken: process.env.SANITY_STUDIO_VIMEO_ACCESS_TOKEN,
    }),
  ],
})
```

## Usage

```ts
// … your schema
defineField({
  title: 'Vimeo',
  name: 'vimeo',
  type: 'vimeo',
  // Optional: Extend the default fields, see below for more information
  options: {
    fields: ['metadata'],
  },
})
```

## Options

By default the plugin stores the fields `name`, `pictures`, `files` and `play`, but you can extend (not overwrite) the fields through the options. Please be sure to add fields as an array of strings. See the [vimeo response documentation](https://developer.vimeo.com/api/reference/response/video) for a list of available fields.

## Migration from v3

This plugin is 100% compatible with existing Sanity v3 schemas. No changes are required to your existing field definitions:

```ts
// Your existing schema works as-is
defineField({
  title: 'Id video Vimeo',
  name: 'vimeo',
  type: 'vimeo',
  options: {
    fields: ['duration'],
  },
})
```

Simply:
1. Ensure you have Node.js ≥ 20
2. Update your `sanity.config.ts` to import from `sanity-plugin-vimeo-field-v4`
3. Upgrade Sanity to v4
4. Everything else works exactly the same!

## License

[MIT](LICENSE) © Marco Land

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
