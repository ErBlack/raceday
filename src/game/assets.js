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
};
