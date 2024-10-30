import { Plugin} from 'obsidian';
import {DevConsoleEnablerSettingTab, DevConsoleEnablerPluginSettings, DEFAULT_SETTINGS} from 'src/settings'
import {parseHotkeyString} from 'src/utils'

declare const electronWindow: {
	toggleDevTools: () => void;
};

export default class DevConsoleEnablerPlugin extends Plugin {
	settings: DevConsoleEnablerPluginSettings;
	keyHandler: (evt: KeyboardEvent) => void;
	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('bug-off', 'Show/hide dev-tools console', (evt: MouseEvent) => {
			electronWindow.toggleDevTools();
		});

		this.addCommand({
			id: 'show-hide-devtools-console',
			name: 'Show/hide dev-tools console',
			callback: () => {
				electronWindow.toggleDevTools();
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DevConsoleEnablerSettingTab(this.app, this));

		// Initialize the key handler
		this.updateKeyHandler();
	}

	onunload() {
		window.removeEventListener('keydown', this.keyHandler, true);
	}
	// Toggle DevConsole
	toggleDevConsole() {
		electronWindow.toggleDevTools();
	}
	updateKeyHandler() {
		if (this.keyHandler) {
			window.removeEventListener('keydown', this.keyHandler, true);
		}

		const hotkey = parseHotkeyString(this.settings.devConsoleEnablerHotKey);

		this.keyHandler = (evt: KeyboardEvent) => {
			const evtKey = evt.key.toUpperCase();

			// Normalize special keys (e.g., "ArrowUp" -> "UP")
			const normalizedKey = evtKey.replace('ARROW', '');

			const modifiersMatch =
				evt.ctrlKey === hotkey.modifiers.ctrlKey &&
				evt.shiftKey === hotkey.modifiers.shiftKey &&
				evt.altKey === hotkey.modifiers.altKey &&
				evt.metaKey === hotkey.modifiers.metaKey;

			if (modifiersMatch && normalizedKey === hotkey.key) {
				evt.preventDefault();
				evt.stopPropagation();
				this.toggleDevConsole();
				return false;
			}
		};

		window.addEventListener('keydown', this.keyHandler, true);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

