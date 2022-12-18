export interface ISetting {
    /**
     * Enable AI or not.
     */
    enable_ai: string;

    /**
     * Open AI API key.
     */
    api_key: string;
}

export interface ISettingFormData extends ISetting {
}

export interface ISettings {
    /**
     * Is settings loading.
     */
    loadingSettings: boolean;

    /**
     * Is settings saving.
     */
    settingsSaving: boolean;

    /**
     * SettingsPage Form data.
     */
    form: ISettingFormData;
}
