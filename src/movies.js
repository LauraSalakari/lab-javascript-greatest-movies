// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(movies) {
    let allDir = movies.map((elem) => {
        return elem.director;
    })

    return allDir;
}

// refactoring into an ES6 function! + making it just one line
// const getAllDirectors = (movies) => {
//     return movies.map((elem) => elem.director)
// }

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?
function uniqueDirectors(movies) {
    let dirs = getAllDirectors(movies);
    let unique = [];

    dirs.forEach((dir) => {
        if (unique.indexOf(dir) == -1) {
            unique.push(dir)
        }
    })

    return unique;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(arr) {
    let spielberg = arr.filter((elem) => {
        return (elem.director == "Steven Spielberg" && elem.genre.indexOf("Drama") != -1);
    })

    return spielberg.length;
}

// //ES6 refactoring
// const howManyMovies = (arr) => {
//     return arr.filter((elem) => elem.director == "Steven Spielberg" && elem.genre.includes("Drama")).length;
// }


// Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(arr) {
    // alternatively you could just do 
    // if(!movies.length) return 0;
    // and then no if block

    if (arr != '') {
        let ratings = arr.reduce((acc, elem) => {
            // to remove the below if block
            // return acc + (elem.rate || 0);
            // if elem.rate is undefined, the statement after or will be run!

            if (elem.rate != undefined) {
                return acc + elem.rate;
            }
            else {
                return acc;
            }

        }, 0)

        return Number((ratings / arr.length).toFixed(2));
    }
    else {
        return 0;
    }

}

// Iteration 4: Drama movies - Get the average of Drama Movies

// function dramaMoviesRate(arr) {
//     if (arr != '') {
//         let movies = 0;

//         let ratings = arr.reduce((acc, elem) => {
//             if (elem.genre.includes("Drama")) {
//                 movies++;
//                 return acc + elem.rate
//             }
//             else {
//                 return acc;
//             }
//         }, 0)

//         if (movies != 0) {
//             return Math.round((ratings / movies) * 100) / 100;
//         }
//         else {
//             return 0;
//         }
//     }
// }


//refactioring to ES6, plus making use of previous code
const dramaMoviesRate = (movies) => {
    let dramaMovies = movies.filter((movie) => {
        return movie.genre.includes("Drama");
    })

    return ratesAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(arr) {
    if (arr != '') {
        let movies = JSON.parse(JSON.stringify(arr));

        movies.sort((a, b) => {
            if (a.year > b.year) {
                return 1;
            }
            else if (a.year < b.year) {
                return -1;
            }
            else {
                if (a.title > b.title) {
                    return 1;
                }
                else if (a.title < b.title) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        })

        return movies;
    }
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(arr) {
    let titles = arr.map((elem) => {
        return elem.title;
    })

    titles.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        else if (b > a) {
            return -1;
        }
        else {
            return 0;
        }
    })

    if (titles.length > 20) {
        titles.splice(20);
    }
    return titles;

}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(arr) {
    let movies = JSON.parse(JSON.stringify(arr));

    movies.forEach((elem) => {
        let hasHour = elem.duration.includes('h');
        let hasMin = elem.duration.includes('min');
        if (!hasMin) {
            elem.duration = Number(elem.duration.slice(0, -1)) * 60;
        }
        else if (!hasHour) {
            elem.duration = Number(elem.duration.slice(0, -3));
        }
        else {
            let time = elem.duration.split(' ');
            time[0] = Number(time[0].slice(0, -1));
            time[1] = Number(time[1].slice(0, -3));
            elem.duration = time[0] * 60 + time[1];
        }
    })

    return movies;
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

function bestYearAvg(arr) {
    if (arr != '') {
        let collection = [];
        arr.forEach((elem) => {
            if (collection.filter((a) => { return a[0] == elem.year }).length == 0) {
                collection.push([elem.year, elem.rate, 1])
            }
            else {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i][0] == elem.year) {
                        collection[i][1] += elem.rate;
                        collection[i][2]++;
                        break;
                    }
                }
            }
        })

        collection.forEach((elem) => {
            elem.push(elem[1] / elem[2]);
        })

        collection.sort((a, b) => {
            if (a[3] > b[3]) {
                return -1;
            }
            else if (a[3] < b[3]) {
                return 1;
            }
            else {
                if (a[0] > b[0]) {
                    return 1;
                }
                else if (a[0] < b[0]) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        })

        return `The best year was ${collection[0][0]} with an average rate of ${collection[0][3]}`

    }
    else {
        return null;
    }
}


// alt solution 

// const bestYearAvg = (movies) => {
//     if(!movies.length) return null;

//     let yearlyMovies = {};

//     movies.forEach((movie) => {
//         if(movie.year in yearlyMovies){
//             yearlyMovies[movie.year].push(movie);
//         }
//         else{
//             yearlyMovies[movie.year] = [];
//             yearlyMovies[movie.year].push(movie);
//         }
//     })

//     let highestRating = 0;
//     let highestYear = 0;

//     for (let year in yearlyMovies){
//         let average = ratesAverage(yearlyMovies[year]);
//         if (average > highestRating){
//             highestRating = average;
//             highestYear = year;
//         }
//     }

//     return `The best year was ${highestYear} with an average rate of ${highestRating}`;
// }