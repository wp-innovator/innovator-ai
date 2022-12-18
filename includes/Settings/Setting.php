<?php

namespace WpInnovator\InnovatorAi\Settings;

class Setting {

	/**
	 * @var string
	 */
	public const SETTING_META_KEY = 'innovator_ai_settings';

	/**
	 * @var string ChatGPT API key.
	 */
	private string $api_key;

	/**
	 * @return string
	 */
	public function get_api_key(): string {
		return $this->api_key;
	}

	/**
	 * @param string $api_key
	 *
	 * @return self
	 */
	public function set_api_key( string $api_key ): Setting {
		$this->api_key = $api_key;

		return $this;
	}
}
