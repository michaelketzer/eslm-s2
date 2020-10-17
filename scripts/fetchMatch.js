const fetch = require('node-fetch');
const chalk = require('chalk');
const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
    .command('id', 'The match id you want to download', {
        year: {
            description: 'The match that should be downloaded',
            type: 'number',
        }
    })
    .help()
    .demandOption(['id'], 'Please specify the matchid with --id you want to download')
    .alias('help', 'h')
    .argv;


const downloadFile = (async (matchId) => {
    console.log(chalk.blueBright('Requesting match with id', matchId));
    const res = await fetch('https://api.stratz.com/api/v1/match/' + matchId);
    if(res.ok) {
        const fileStream = fs.createWriteStream(__dirname + '/../data/matchDetails/' + matchId + '.json' );
        fileStream.on('error', function(err) {
            console.log(chalk.red('Error creating write stream', err));
        });

        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on("error", (err) => {
                console.log(chalk.red('Failed loading match', matchId, err));
                reject(err);
            });
            fileStream.on("finish", function() {
                console.log(chalk.green('Finished loading match for', matchId));
                resolve();
            });
        });
    } else {
        console.log(chalk.red('Skipped match', matchId, 'with response code', res.status));
    }
});


downloadFile(argv.id);
/*
const data = JSON.parse(fs.readFileSync(__dirname + '/../data/matches.json'));
const game = data.find(({match_1, match_2}) => match_1 === null || match_2 === null);

if(game.match_1 === null) {
    game.match_1 = argv.id;
} else {
    game.match_2 = argv.id;
}

fs.writeFileSync(__dirname + '/../data/matches.json', JSON.stringify(data));
*/