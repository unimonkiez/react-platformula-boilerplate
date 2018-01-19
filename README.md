# react-platformula-boilerplate

## Installations
* `git clone THIS_GIT_UTL`
* `npm i` (or `yarn`)
* For android
  * Install android sdk
    * Remember to set `ANDROID_HOME`
    * Add `tools` and `platform-tools` to your `$PATH`

### development
* `npm run start:web` - Start website on [localhost:8090](http://localhost:8090).
* `npm run start:android` - Install and start watch server.
***Remember, only live reload work right now, do not use hot reload.***  
Basically runs these two commands -
  * `npm run install:android:debug` - Installs the debug app, which takes bundle from server.
  * `npm run serve:android` - watching `src/` for file changes and serves the bundle.
