# three-glslify-example

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

![screenshot](http://i.imgur.com/mu8kbLG.jpg)

[(click for demo)](http://mattdesl.github.io/three-glslify-example/)

A simple example of modular shaders in ThreeJS with [glslify](https://github.com/stackgl/glslify). Uses [glsl-halftone](https://github.com/stackgl/glsl-halftone), [glsl-hash-blur](https://github.com/stackgl/glsl-hash-blur), and [glsl-checker](https://github.com/mattdesl/glsl-checker).

To run:

```sh
# clone repo
git clone https://github.com/mattdesl/three-glslify-example.git
cd three-glslify-example

# install deps
npm install

# start dev server
npm run start
```

Now open [http://localhost:9966/](http://localhost:9966/) and start making changes to [index.js](index.js), [frag.glsl](frag.glsl) or [vert.glsl](vert.glsl) to see changes reloaded in the browser.

To build the production release:

```sh
npm run build
```

This will create a `bundle.js` for your static site.

See the `scripts` field of [package.json](package.json) to integrate this into your own workflow. This is also specifying browserify transforms with a `"browserify"` field (not recommended for modules, but useful for applications), and Babelify configuration with a [.babelrc](./.babelrc) file.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/three-glslify-example/blob/master/LICENSE.md) for details.
