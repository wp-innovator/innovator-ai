/**
 * External dependencies.
 */
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: window.innovatorAi.apiKey,
});

export const openai = new OpenAIApi(configuration);

export const defaultConfigTextGenerator = {
    model: 'text-davinci-003',
    temperature: 0.7,
    max_tokens: 2049, // max-limit = 2049
    top_p: 1,
    best_of: 1,
    echo: true,
};
