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

    static createHorse(passport, moniker, sex, lear, country, breed, birth, image, passport_image, login) {
        return postFetch('/horse', {
            'passport': inputSanitize(passport),
            'moniker': inputSanitize(moniker),
            'sex': sex,
            'lear': inputSanitize(lear),
            'country': inputSanitize(country),
            'breed': inputSanitize(breed),
            'birth': inputSanitize(birth),
            'image': inputSanitize(image),
            'passport_image': inputSanitize(passport_image),
            'login': inputSanitize(login),
        }).catch((error) => {
            console.error(error);
        });
    }

    static getUserHorses(login: string) {
        return getFetch(`/owning/${login}/horses`).catch((error) => {
            console.error(error);
        });
    }

    static getHorses(start, end) {
        return getFetch(`/horses/${start}/${end}`).catch((error) => {
            console.error(error);
        });
    }

    static getUsers(start, end) {
        return getFetch(`/users/${start}/${end}`).catch((error) => {
            console.error(error);
        });
    }

    static getHorse(passport) {
        return getFetch(`/horse/${passport}`).catch((error) => {
            console.error(error);
        });
    }

    static getUser(login) {
        return getFetch(`/user/${login}`).catch((error) => {
            console.error(error);
        });
    }
}
