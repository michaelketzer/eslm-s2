import {promises as fs} from 'fs';
import { GroupMatch } from '../pages';
import JSONbig from 'json-bigint';
import SteamID from 'steamid';


//#region <interface>
interface PickBan {
    isPick: boolean;
    heroId: number;
    order: number;
    bannedHeroId: number;
    isRadiant: boolean;
    playerIndex: number;
    wasBannedSuccessfully: boolean;
}

export interface HeroPlayer {
    matchId: number;
    playerSlot: number;
    heroId: number;
    steamAccountId: number;
    isRadiant: boolean;
    numKills: number;
    numDeaths: number;
    numAssists: number;
    leaverStatus: number;
    numLastHits: number;
    numDenies: number;
    goldPerMinute: number;
    experiencePerMinute: number;
    level: number;
    gold: number;
    goldSpent: number;
    heroDamage: number;
    towerDamage: number;
    isRandom: boolean;
    lane: number;
    intentionalFeeding: boolean;
    role: number;
    imp: number;
    award: number;
    item0Id: number;
    item1Id: number;
    item3Id: number;
    item4Id: number;
    behavior: number;
    heroHealing: number;
    roamLane: number;
    isVictory: boolean;
    networth: number;
    neutral0Id: number;
    imp2: number
}

export interface LeagueMatch {
    id: number;
    didRadiantWin: boolean;
    durationSeconds: number;
    startDateTime: number;
    clusterId: number;
    firstBloodTime: number;
    lobbyType: number;
    numHumanPlayers: number;
    gameMode: number;
    replaySalt: number;
    isStats: boolean;
    avgImp: number;
    parsedDateTime: number;
    statsDateTime: number;
    leagueId: number;
    radiantTeamId: number;
    direTeamId: number;
    seriesId: number;
    gameVersionId: number;
    regionId: number;
    sequenceNum: number;
    rank: number;
    bracket: number;
    endDateTime: number;
    analysisOutcome: number;
    predictedOutcomeWeight: number;
    pickBans: Array<PickBan>;
    players: Array<HeroPlayer>;
}
export interface Stats {
    teams: {
        [x: string]: {
            won: number;
            total: number;
            points: number;
        };
    };

    matches: {
        [x: number]: {
            duration: number;
            teamA: number[];
            teamB: number[];
            winner: number;
            direTeamId: number;
            radiantTeamId: number;
            netTeamA: number;
            date: number;
            netTeamB: number;
            pointsA: number;
            pointsB: number;
        }
    }
}

const loadedMatches: {[x: string]: LeagueMatch} = {};
//#endregion

const sortFn = ({playerIndex: a}, {playerIndex: b}) => a - b;

export async function parseGames(): Promise<Stats> {
    const filenames = await fs.readdir('./data/matchDetails/');
    const stats: Stats = {
        matches: {},
        teams: {},
    };
    
    for(const filename of filenames) {
        if(filename.endsWith('.DS_Store')) {
            continue;
        }
        let data: LeagueMatch | null = null;
        const id = filename.substring(0, filename.length - 5);
        if(loadedMatches[id]) {
            data = loadedMatches[id];
        } else {
            const file = await fs.readFile('./data/matchDetails/' + filename, 'utf8');
            data = JSONbig.parse(file);
            loadedMatches[id] = data;
        }

        if(!data) {
            continue;
        }
        const wonA = data.didRadiantWin;
        stats.teams[data.radiantTeamId] = {
            won: (stats.teams[data.radiantTeamId]?.won || 0) + (wonA ? 1 : 0),
            total: (stats.teams[data.radiantTeamId]?.total || 0) + 1,
            points: (stats.teams[data.radiantTeamId]?.points || 0) + (wonA ? 3 : 0),
        };
        stats.teams[data.direTeamId] = {
            won: (stats.teams[data.direTeamId]?.won || 0) + (wonA ? 0 : 1),
            total: (stats.teams[data.direTeamId]?.total || 0) + 1,
            points: (stats.teams[data.direTeamId]?.points || 0) + (wonA ? 0 : 3),
        };

        stats.matches[data.id] = {
            duration: data.durationSeconds,
            radiantTeamId: data.radiantTeamId,
            direTeamId: data.direTeamId,
            date: data.startDateTime || null,
            teamA: data.pickBans.sort(sortFn).reduce((acc, {isPick, isRadiant, heroId}) => {
                if(isPick && isRadiant) {
                    acc.push(heroId);
                }
                return acc;
            }, []),
            teamB: data.pickBans.sort(sortFn).reduce((acc, {isPick, isRadiant, heroId}) => {
                if(isPick && !isRadiant) {
                    acc.push(heroId);
                }
                return acc;
            }, []),
            winner: wonA ? data.radiantTeamId : data.direTeamId,
            netTeamA: data.players.reduce((acc, {isRadiant, networth}) => {
                if(isRadiant) {
                    acc += networth;
                }
                return acc;
            }, 0),
            netTeamB: data.players.reduce((acc, {isRadiant, networth}) => {
                if(!isRadiant) {
                    acc += networth;
                }
                return acc;
            }, 0),
            pointsA: data.players.reduce((acc, {isRadiant, numDeaths}) => acc + (!isRadiant ? numDeaths : 0), 0),
            pointsB: data.players.reduce((acc, {isRadiant, numDeaths}) => acc + (isRadiant ? numDeaths : 0), 0),
        }
    }

    return stats;
}

export interface HeroStats {
    picks: {
        games: number;
        won: number;
        phase1: number;
        phase2: number;
        phase3: number;
    };
    bans: {
        games: number;
        phase1: number;
        phase2: number;
        phase3: number;
    };
}

export function requireHeroStats(heroId: number, stats: {[x: string]: HeroStats}): HeroStats {
    if(!stats[heroId]) {
        stats[heroId] = {
            picks: {
                games: 0,
                won: 0,
                phase1: 0,
                phase2: 0,
                phase3: 0,
            },
            bans: {
                games: 0,
                phase1: 0,
                phase2: 0,
                phase3: 0,
            },
        };
    }

    return stats[heroId];
}

export function getPhase(order: number, gameVersion: number): number {
    if(gameVersion <= 131) {
        return order < 12 ? 1 : (order < 18 ? 2 : 3);
    }
    return order < 8 ? 1 : (order < 18 ? 2 : 3);
}


function parsePickBans(match: LeagueMatch, teamId: number, dataObj: {[x: string]: HeroStats}): void {
    const {pickBans, radiantTeamId, didRadiantWin} = match;
    const wasRadiant = teamId === radiantTeamId;
    const won = didRadiantWin === wasRadiant;

    pickBans.forEach(({order, isPick, heroId, isRadiant}) => {
        const stats = requireHeroStats(heroId, dataObj);
        const type = isPick ? 'picks' : 'bans';
        if((isPick && wasRadiant === isRadiant) || (!isPick && wasRadiant !== isRadiant)) {
            stats[type].games = stats[type].games + 1;
            if(type === 'picks') {
                stats[type].won = stats[type].won + (won ? 1 : 0);
            }
            const phase = getPhase(order, match.gameVersionId);
            if(phase === 1) {
                stats[type].phase1 = stats[type].phase1 + 1;
            } else if(phase === 2) {
                stats[type].phase2 = stats[type].phase2 + 1;
            } else {
                stats[type].phase3 = stats[type].phase3 + 1;
            }
        }
    });
}

export function topPickBansParser(matches: GroupMatch[], teamId: number): {[x: string]: HeroStats} {
    return matches.reduce<{[x: string]: HeroStats}>((acc, match) => {
        loadedMatches[match.match_1] && parsePickBans(loadedMatches[match.match_1], teamId, acc);
        loadedMatches[match.match_2] && parsePickBans(loadedMatches[match.match_2], teamId, acc);
        return acc;
    }, {});
}

export interface PlayerHeroStats {
    [x: string]: {
        [x: string]: {
            won: number;
            games: number;
        };
    };
}


export function requirePlayerHeroStats(playerId: number, heroId: number, stats: PlayerHeroStats): PlayerHeroStats[0][0] {
    if(!stats[playerId]) {
        stats[playerId] = {};
    }

    if(!stats[playerId][heroId]) {
        stats[playerId][heroId] = {
            won: 0,
            games: 0,
        };
    }

    return stats[playerId][heroId];
}

function parsePlayerPicks(match: LeagueMatch, teamId: number, dataObj: PlayerHeroStats): void {
    const {players, radiantTeamId, didRadiantWin} = match;
    const wasRadiant = teamId === radiantTeamId;
    const won = didRadiantWin === wasRadiant;

    players.forEach(({steamAccountId, heroId, isRadiant}) => {
        var sid = new SteamID(`[U:1:${steamAccountId}]`);
        if(wasRadiant === isRadiant) {
            const stats = requirePlayerHeroStats(sid.getSteamID64(), heroId, dataObj);
            stats.games = stats.games + 1;
            stats.won = stats.won + (won ? 1 : 0);
        }
    });
}

export function playerTopHeroesForTeam(matches: GroupMatch[], teamId: number): PlayerHeroStats {
    return matches.reduce<PlayerHeroStats>((acc, match) => {
        loadedMatches[match.match_1] && parsePlayerPicks(loadedMatches[match.match_1], teamId, acc);
        loadedMatches[match.match_2] && parsePlayerPicks(loadedMatches[match.match_2], teamId, acc);
        return acc;
    }, {});
}
