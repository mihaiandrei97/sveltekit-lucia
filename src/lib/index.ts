
import {PUBLIC_BASE_URL} from "$env/static/public";
// place files you want to import through the `$lib` alias in this folder.
export function getBaseURL(){
    return PUBLIC_BASE_URL || 'http://localhost:5173';
}