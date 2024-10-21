import { App, PluginSettingTab, Setting } from 'obsidian';
import type DevConsoleEnablerPlugin from 'main';


export interface DevConsoleEnablerPluginSettings {
    devConsoleEnablerHotKey:string;
}

export const DEFAULT_SETTINGS: DevConsoleEnablerPluginSettings = {
    devConsoleEnablerHotKey:'',
}

export class DevConsoleEnablerSettingTab extends PluginSettingTab {
    plugin: DevConsoleEnablerPlugin;

    constructor(app: App, plugin: DevConsoleEnablerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Hotkey')
            .setDesc('Click and press the desired hotkey combination')
            .addText(text => {
                text
                    .setPlaceholder('Click and press hotkey')
                    .setValue(this.plugin.settings.devConsoleEnablerHotKey);

                // Add focus event listener to clear the input when focused
                text.inputEl.addEventListener('focus', () => {
                    text.inputEl.value = '';
                });

                // Add blur event listener to restore the hotkey if input is empty
                text.inputEl.addEventListener('blur', () => {
                    if (!text.inputEl.value) {
                        text.setValue(this.plugin.settings.devConsoleEnablerHotKey);
                    }
                });

                // Add keydown listener to capture hotkey
                text.inputEl.addEventListener('keydown', async (event: KeyboardEvent) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const hotkey = this.captureHotkey(event);
                    text.setValue(hotkey);

                    // Update plugin settings
                    this.plugin.settings.devConsoleEnablerHotKey = hotkey;
                    await this.plugin.saveSettings();
                    this.plugin.updateKeyHandler();
                });
            });
    }
    // Helper method to capture hotkey from event
    captureHotkey(event: KeyboardEvent): string {
        const keys = [];

        if (event.ctrlKey || event.metaKey) keys.push('Mod');
        if (event.shiftKey) keys.push('Shift');
        if (event.altKey) keys.push('Alt');

        const key = event.key.toUpperCase();

        // Exclude modifier keys themselves
        if (!['CONTROL', 'SHIFT', 'ALT', 'META'].includes(key)) {
            keys.push(key);
        }

        return keys.join('+');
    }
}