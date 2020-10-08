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

    static createCompetition(name, year, image) {
        return postFetch('/competition', {
            'name': inputSanitize(name),
            'year': inputSanitize(year),
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

    static getUserHorsesPast(login: string) {
        return getFetch(`/owning/${login}/horses/past`).catch((error) => {
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

    static getOwner(passport) {
        return getFetch(`/horse/${passport}/owner`).catch((error) => {
            console.error(error);
        });
    }

    static getPastOwners(passport) {
        return getFetch(`/horse/${passport}/owners/past`).catch((error) => {
            console.error(error);
        });
    }

    static setOwning(login, passport) {
        return postFetch(`/owner/user/${login}/horse/${passport}`).catch((error) => {
            console.error(error);
        });
    }

    static setTraining(login, passport) {
        return postFetch(`/train/user/${login}/horse/${passport}`).catch((error) => {
            console.error(error);
        });
    }

    static getTrainingForHorse(passport) {
        return getFetch(`/train/horse/${passport}`).catch((error) => {
            console.error(error);
        });
    }

    static getTrainingForUser(login) {
        return getFetch(`/train/user/${login}`).catch((error) => {
            console.error(error);
        });
    }

    static getCompetition(name) {
        return getFetch(`/competition/${name}`).catch((error) => {
            console.error(error);
        });
    }

    static getCompetitionList(start, end) {
        return getFetch(`/competitions/${start}/${end}`).catch((error) => {
            console.error(error);
        });
    }

    static getCompetitionMembers(name) {
        return getFetch(`/competition/${name}/members`).catch((error) => {
            console.error(error);
        });
    }
}
