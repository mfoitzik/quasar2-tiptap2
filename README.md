# Simplicity Editor Tiptap Quasar (simplicity-editor-tiptap-quasar)

Basic WYSIWYG Editor using TQuasar 2 / Vue 3 / TipTap 2 Configured for Typescript and Vue's Composition API

## What this project does
This project basically implements the basic examples that are on the TipTap site at [https://www.tiptap.dev/examples/default] within a Quasar Framework project.

I have added a few custom extensions to provide the capability of Font Color, Font Size and Font Background Color.

This is just meant to be a starter.

## IMPORTANT DISCLAIMERS
To get this to work I had to add a resolutions property to the package.json file telling it to use vue 3.1.4. Because of this I believe you need to use yarn instead of npm to install the dependencies (I do not think that npm looks at the resolutions property). Without adding this the editor was not displaying.

Also, there are several "eslint-disable-next-line" comments throughout that I had to put in to get rid of some eslint errors. I still need to figure out what is going on there.

## Clone the repository
```bash
git clone https://github.com/mfoitzik/quasar2-tiptap2.git
```

### Install the dependencies (use yarn!)
```bash
yarn install
```

### Start the dev server
```bash
quasar dev
```
## Please support the projects that make this project possible
### Me
I am building some commercial stuff so if you want to support me, just help spread the word about [SimplicityBlocks.com], [SimplicityBuilder.com], or just [follow me on twitter](https://twitter.com/MikeFoitzik) to keep up with me.

The following are listed in alphabetical order as I think for this particular project they are all equally important.
### ProseMirror
ProseMirror is the "engine" under the hood of the TipTap project.

Support ProseMirror at: [https://marijnhaverbeke.nl/fund/]
### Quasar Framework
Quasar Framework is an awesome framework built on top of Vue.js that provides UI components as well as many other features that simplify building a Vue.js project.

Support the Quasar Framework project at: [https://github.com/sponsors/rstoenescu]
### TipTap
TipTap is the headless editor framework for web artisans. 

Support TipTap at: [https://github.com/sponsors/ueberdosis]
### Vue.js
Vue is a progressive framework for building user interfaces.

Support Vue at: [https://vuejs.org/support-vuejs/]

