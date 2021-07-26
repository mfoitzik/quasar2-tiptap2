# Simplicity Editor Tiptap Quasar (simplicity-editor-tiptap-quasar)

Basic WYSIWYG Editor using TQuasar 2 / Vue 3 / TipTap 2 Configured for Typescript and Vue's Composition API

## What this project does
This project basically implements the examples on the TipTap site at [https://www.tiptap.dev/examples/default] within a Quasar Framework project.

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

