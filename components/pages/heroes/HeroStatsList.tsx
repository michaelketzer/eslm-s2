import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import { HeroListStats } from "../../gameParser";
import HeroAvatar from "../index/HeroAvatar";
import { heroIdMap } from "../index/Heroes";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

interface Props {
    list: HeroListStats[];
}

const heroNames = {
    abaddon: "Abaddon",
    abyssal_underlord: "Underlord",
    alchemist: "Alchemist",
    ancient_apparition: "Ancient Apparition",
    antimage: "Anti-Mage",
    arc_warden: "Arc Warden",
    axe: "Axe",
    bane: "Bane",
    batrider: "Batrider",
    beastmaster: "Beastmaster",
    bloodseeker: "Bloodseeker",
    bounty_hunter: "Bounty Hunter",
    brewmaster: "Brewmaster",
    bristleback: "Bristleback",
    broodmother: "Broodmother",
    centaur: "Centaur Warrunner",
    chaos_knight: "Chaos Knight",
    chen: "Chen",
    clinkz: "Clinkz",
    crystal_maiden: "Crystal Maiden",
    dark_seer: "Dark Seer",
    dark_willow: "Dark Willow",
    dazzle: "Dazzle",
    death_prophet: "Death Prophet",
    disruptor: "Disruptor",
    doom_bringer: "Doom",
    dragon_knight: "Dragon Knight",
    drow_ranger: "Drow Ranger",
    earth_spirit: "Earth Spirit",
    earthshaker: "Earthshaker",
    elder_titan: "Elder Titan",
    ember_spirit: "Ember Spirit",
    enchantress: "Enchantress",
    enigma: "Enigma",
    faceless_void: "Faceless Void",
    furion: "Nature's Prophet",
    grimstroke: "Grimstroke",
    gyrocopter: "Gyrocopter",
    huskar: "Huskar",
    invoker: "Invoker",
    jakiro: "Jakiro",
    juggernaut: "Juggernaut",
    keeper_of_the_light: "Keeper of the Light",
    kunkka: "Kunkka",
    legion_commander: "Legion Commander",
    leshrac: "Leshrac",
    lich: "Lich",
    life_stealer: "Lifestealer",
    lina: "Lina",
    lion: "Lion",
    lone_druid: "Lone Druid",
    luna: "Luna",
    lycan: "Lycan",
    magnataur: "Magnus",
    mars: "Mars",
    medusa: "Medusa",
    meepo: "Meepo",
    mirana: "Mirana",
    monkey_king: "Monkey King",
    morphling: "Morphling",
    naga_siren: "Naga Siren",
    necrolyte: "Necrophos",
    nevermore: "Shadow Fiend",
    night_stalker: "Night Stalker",
    nyx_assassin: "Nyx Assassin",
    obsidian_destroyer: "Outworld Devourer",
    ogre_magi: "Ogre Magi",
    omniknight: "Omniknight",
    oracle: "Oracle",
    pangolier: "Pangolier",
    phantom_assassin: "Phantom Assassin",
    phantom_lancer: "Phantom Lancer",
    phoenix: "Phoenix",
    puck: "Puck",
    pudge: "Pudge",
    pugna: "Pugna",
    queenofpain: "Queen of Pain",
    rattletrap: "Clockwerk",
    razor: "Razor",
    riki: "Riki",
    rubick: "Rubick",
    sand_king: "Sand King",
    shadow_demon: "Shadow Demon",
    shadow_shaman: "Shadow Shaman",
    shredder: "Timbersaw",
    silencer: "Silencer",
    skeleton_king: "Wraith King",
    skywrath_mage: "Skywrath Mage",
    slardar: "Slardar",
    slark: "Slark",
    snapfire: "Snapfire",
    sniper: "Sniper",
    spectre: "Spectre",
    spirit_breaker: "Spirit Breaker",
    storm_spirit: "Storm Spirit",
    sven: "Sven",
    techies: "Techies",
    templar_assassin: "Templar Assassin",
    terrorblade: "Terrorblade",
    tidehunter: "Tidehunter",
    tinker: "Tinker",
    tiny: "Tiny",
    treant: "Treant Protector",
    troll_warlord: "Troll Warlord",
    tusk: "Tusk",
    undying: "Undying",
    ursa: "Ursa",
    vengefulspirit: "Vengeful Spirit",
    venomancer: "Venomancer",
    viper: "Viper",
    visage: "Visage",
    void_spirit: "Void Spirit",
    warlock: "Warlock",
    weaver: "Weaver",
    windrunner: "Windranger",
    winter_wyvern: "Winter Wyvern",
    wisp: "Io",
    witch_doctor: "Witch Doctor",
    zuus: "Zeus",
};  

function heroSort({picks: a}: HeroListStats, {picks: b}: HeroListStats): number {
    return b - a;
}

export default function HeroStatsList({list}: Props): ReactElement {
    return <motion.div variants={container} initial={'hidden'} animate={'show'}>
        <div className={'heroListGrid'}>
            {list.sort(heroSort).map(({id, picks, wins}) => <motion.div variants={item} key={id}>
                <div className={'rowContainer'}>
                    <div className={'avatar'}>
                        <HeroAvatar heroClass={heroIdMap[id]} prefix={'h'}/>
                    </div>
                    <div className={'name'}>
                        {heroNames[heroIdMap[id]]}
                    </div>
                    <div className={'stats'}>{wins}/{picks}</div>
                    <div className={'stats'}>{Math.round((wins*100)/picks)}%</div>
                </div>
            </motion.div>)}
        </div>

        <style jsx>{`
            .heroListGrid {
                max-width: 1200px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 1fr;
                grid-row-gap: 15px;
            }    

            .rowContainer {
                display: grid;
                grid-template-columns: 80px 1fr 55px 55px;
                align-items: center;
                grid-column-gap: 25px;
                background-color: var(--page-bg);
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.4);
                padding: 4px 12px;
            }

            .avatar {
                width: 80px;
            }

            .stats {
                text-align: right;
            }
        `}</style>
    </motion.div>;
}