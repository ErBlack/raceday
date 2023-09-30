import { preloadImage } from './preload-image';

/**
 * @type {HTMLImageElement[]}
 */
export let CITY;
/**
 * @type {HTMLImageElement[]}
 */
export let CARS;

/**
 * @type {HTMLImageElement[]}
 */
export let SIGNS;

export const GEAR = [
    '/raceday/assets/g_n.png',
    '/raceday/assets/g_1.png',
    '/raceday/assets/g_2.png',
    '/raceday/assets/g_3.png',
    '/raceday/assets/g_4.png',
    '/raceday/assets/g_5.png',
    '/raceday/assets/g_6.png',
    '/raceday/assets/g_7.png',
];

export const RPM = [
    '/raceday/assets/rpm_0.png',
    '/raceday/assets/rpm_1.png',
    '/raceday/assets/rpm_2.png',
    '/raceday/assets/rpm_3.png',
    '/raceday/assets/rpm_4.png',
    '/raceday/assets/rpm_5.png',
    '/raceday/assets/rpm_6.png',
    '/raceday/assets/rpm_7.png',
    '/raceday/assets/rpm_8.png',
];

export const SPEED = [
    '/raceday/assets/s_0.png',
    '/raceday/assets/s_1.png',
    '/raceday/assets/s_2.png',
    '/raceday/assets/s_3.png',
    '/raceday/assets/s_4.png',
    '/raceday/assets/s_5.png',
    '/raceday/assets/s_6.png',
    '/raceday/assets/s_7.png',
    '/raceday/assets/s_8.png',
    '/raceday/assets/s_9.png',
];

export const preloadAssets = () => {
    CITY = [
        '/raceday/assets/city_1.png',
        '/raceday/assets/city_2.png',
        '/raceday/assets/city_3.png',
        '/raceday/assets/city_4.png',
    ].map(src => Object.assign(new Image(), { src }));

    CARS = [
        '/raceday/assets/car_1.png',
        '/raceday/assets/car_2.png',
        '/raceday/assets/car_3.png',
        '/raceday/assets/car_4.png',
    ].map(src => Object.assign(new Image(), { src }));

    SIGNS = ['/raceday/assets/start.png', '/raceday/assets/finish.png'].map(src => Object.assign(new Image(), { src }));

    [...GEAR].forEach(preloadImage);
};
