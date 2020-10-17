import { ReactElement, ReactNode } from "react";
import HeroAvatar from "../index/HeroAvatar";
import { heroIdMap } from "../index/Heroes";


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

export default function HeroRow({id, pos, addition= <div />}: {id: string; pos: number; addition?: ReactNode}): ReactElement {
    const shortName = heroIdMap[id];

    return <>
        <div className={'pos'}>{pos}.</div>
        <div className={'avatar'}>
            <HeroAvatar heroClass={shortName} prefix={'h'}/>
        </div>
        <div className={'name'}>
            {heroNames[shortName]}
        </div>

        {addition}

        <style jsx>{`
            .pos {
                text-align: right;
                color: var(--yellow-accent);
            }

            .avatar {
                height: 30px;
                border-radius: 4px;
                width: 56px;
            }

            .name {
                font-size: .9rem;
            }
        `}</style>
    </>;
}
