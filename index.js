const http = require('http'); // import http from 'http';
const countries = require("./countries.json");

const Countries = () => countries;

const CountrySearch = (parts) => {
    return countries.filter(country => {
        return country.name.toLowerCase().includes(parts[1].toLowerCase());
    });
};

const Country = (parts) => {
    return countries.filter(country => {
        return country.name.toLowerCase() === parts[1].toLowerCase();
    })[0];
};

const PopulationGreaterThan = (parts) => {
    return countries.filter(country => {
        return country.population > parseInt(parts[1])
    })
};

const endpoints = {
    "countries": Countries,
    "countrysearch": CountrySearch,
    "country": Country,
    "population": PopulationGreaterThan
};

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    let responseObj = {};
    const parts = request.url.substr(1).split('/');

    if (endpoints[parts[0]]) {
        responseObj = endpoints[parts[0]](parts);
    }

    response.end(JSON.stringify(responseObj));
}).listen("8080");

