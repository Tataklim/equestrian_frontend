import {postFetch, getFetch, deleteFetch, putFetch, postImageFetch} from './fetch';
import {inputSanitize} from './inputSanitize';

export default class Api {
    static signUp(login, name, country, sex, birth, image) {
        console.log(inputSanitize(login))
        return postFetch('/user', {
            'name': inputSanitize(name),
            'login': inputSanitize(login),
            'country': inputSanitize(country),
            'sex': sex,
            'birth': inputSanitize(birth),
            'image': inputSanitize(image),
        }).catch((error) => {
            console.error(error);
        });
    }

    static getUserHorses(login: string) {
        return getFetch(`/owning/${login}/horses`).catch((error) => {
            console.error(error);
        });
    }
}
