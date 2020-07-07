import {environment} from '../../environments/environment';
import {tokens_key, apiUrl} from '../const';

export class Util {

    static getUri(url) {
        if (!url) {
            return '';
        }
        const parser = document.createElement('a');
        parser.href = url;
        return parser.pathname.replace(environment.basename, '');
    }

    constructor() {
    }
}
