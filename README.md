# Occura Plugin: highlighting word occurrences

### Why another plugin?
I ran into an issue where the key combination: Ctrl+Shift+I doesn't open the Developer Tool Console on one of my Windows workstations :( 
So I decided to create a simple plugin that will allow users to open the Developer Tool Console by clicking a button on the toolbar, 
running a command, or using a custom keyboard shortcut.
I hope this plugin can help other users as well.
### Features
- You simply double-click on a word and see the other occurrences of the word (or the selected part of it) highlighted.

  ![изображение](https://github.com/user-attachments/assets/164e0b3e-e02c-4903-abd5-a4006a931200)

- In the settings, you can specify the highlight color, hotkeys for quickly enabling/disabling the plugin, and the display of the number of matches found in the Status bar.

  ![изображение](https://github.com/user-attachments/assets/e6f33f63-a39b-4997-bae3-ba7cfa9c5b66)

#### Installing the plugin
- Open Obsidian settings
- Go to Community Plugins
- Select Browse and search for Devtools console enabler Plugin
- Install the plugin
- Look through "Installed plugins" and enable Devtools console enabler (toggle)


#### Manually installing the plugin
- Copy over `main.js` and `manifest.json` to your vault `/path/to/your/vault/.obsidian/plugins/obsidian-dev-console-plugin/`.
- Enable plugins in Obsidian settings
- Enable Devtools console enabler Plugin in the Community Plugins tab

#### License
[MIT](https://choosealicense.com/licenses/mit/)

#### Author
[Alexey Sedoykin](https://www.linkedin.com/in/sedoykin/)