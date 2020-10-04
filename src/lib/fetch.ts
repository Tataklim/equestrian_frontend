import {PATH} from './consts';

export const postFetch = (path: string, body: object = {}) => {
    return fetch(PATH + path, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    }).catch((error) => {
        console.error(error);
    });
};

export const getFetch = (path : string) => {
    return fetch(PATH + path, {
        method: 'GET',
        mode: 'cors',
    }).catch((error) => {
        console.error(error);
    });
};

export const deleteFetch = (path : string) => {
    return fetch(PATH + path, {
        method: 'DELETE',
        mode: 'cors',
    }).catch((error) => {
        console.error(error);
    });
};

export const putFetch = (path : string, body : object = {}) => {
    return fetch(PATH + path, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    }).catch((error) => {
        console.error(error);
    });
};

export const postImageFetch = (path : string, body: any) => {
    return fetch(PATH + path, {
        method: 'POST',
        mode: 'cors',
        body: body,
    }).catch((error) => {
        console.error(error);
    });
};

/**
 * PATCH
 * @static
 * @param {string} path
 * @param {Object} body
 * @return {Promise<Response>}
 */
export const patchFetch = (path = '/', body = {}) => {
    return fetch(PATH + path, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    }).catch((error) => {
        console.error(error);
    });
}
