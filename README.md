# toplist-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Set API and locales (cs/sk/en) before build for production in .env file
```
VUE_APP_NODE_ENV=development
VUE_APP_API_HOST=https://profi.toplist.cz/api
VUE_APP_PROFI_URL=https://profi.toplist.cz
VUE_APP_I18N_LOCALE=cs
VUE_APP_I18N_FALLBACK_LOCALE=cs
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### After build
In /dist folder will be generated all the files. Just put them onto internet.

```plantuml
Bob -> Alice : hello
Alice -> Bob : hi
```

