/**
 * COTC Unified Icon Registry
 * 
 * Single source of truth for all icon mappings across the application.
 * Consolidates icon implementations from:
 * - uiClasses.js (stat icons)
 * - markdownParser.js (shared icons)
 * - UnifiedSearchPage.vue (stat mappings)
 * - SkillCharacterCard.vue (element/weapon icons)
 * 
 * Supports 171+ official COTC Wiki icons including:
 * - Stats (8 basic + variations)
 * - Buffs (85 types)
 * - Debuffs (40 types)
 * - Status Effects (46 types)
 * - Elements (6 types + locked versions)
 * - Weapons (8 types + locked versions)
 */

import { paths } from './pathUtils.js'

// Performance: Lazy-loaded icon cache
const iconCache = new Map()

/**
 * Icon Categories for organization and auto-detection
 */
const IconCategory = {
  STAT: 'stat',
  BUFF: 'buff',
  DEBUFF: 'debuff',
  STATUS: 'status',
  ELEMENT: 'element',
  WEAPON: 'weapon',
  TYPE: 'type',
  COMMON: 'common'
}

/**
 * Base stat icons (8 core stats)
 * Maps normalized stat names to wiki-icon files
 */
const STAT_ICONS = {
  // Physical stats
  'hp': 'HP.png',
  'health': 'HP.png',
  'sp': 'SP.png',
  'mana': 'SP.png',
  'patk': 'PhysAtk.png',
  'physatk': 'PhysAtk.png',
  'physical_attack': 'PhysAtk.png',
  'pdef': 'PhysDef.png',
  'physdef': 'PhysDef.png',
  'physical_defense': 'PhysDef.png',
  
  // Elemental stats
  'eatk': 'ElemAtk.png',
  'elematk': 'ElemAtk.png',
  'elemental_attack': 'ElemAtk.png',
  'edef': 'ElemDef.png',
  'elemdef': 'ElemDef.png',
  'elemental_defense': 'ElemDef.png',
  
  // Other stats
  'crit': 'Critical.png',
  'critical': 'Critical.png',
  'crit_rate': 'Critical.png',
  'spd': 'Speed.png',
  'speed': 'Speed.png',
  'accuracy': 'Accuracy.png',
  'acc': 'Accuracy.png',
  'evasion': 'Evasion.png',
  'eva': 'Evasion.png'
}

/**
 * Buff effect icons (85 types from wiki-icons)
 * Maps effect names to buff icon files
 */
const BUFF_ICONS = {
  // Basic stat buffs
  'phys_atk_up': 'Buff_Phys._Atk._Up.png',
  'physical_attack_up': 'Buff_Phys._Atk._Up.png',
  'patk_up': 'Buff_Phys._Atk._Up.png',
  'elem_atk_up': 'Buff_Elem._Atk._Up.png',
  'elemental_attack_up': 'Buff_Elem._Atk._Up.png',
  'eatk_up': 'Buff_Elem._Atk._Up.png',
  'phys_def_up': 'Buff_Phys._Def._Up.png',
  'physical_defense_up': 'Buff_Phys._Def._Up.png',
  'pdef_up': 'Buff_Phys._Def._Up.png',
  'elem_def_up': 'Buff_Elem._Def._Up.png',
  'elemental_defense_up': 'Buff_Elem._Def._Up.png',
  'edef_up': 'Buff_Elem._Def._Up.png',
  'crit_up': 'Buff_Crit._Up.png',
  'critical_up': 'Buff_Crit._Up.png',
  'spd_up': 'Buff_Spd._Up.png',
  'speed_up': 'Buff_Spd._Up.png',
  
  // HP/SP buffs
  'hp_barrier': 'Buff_HP_Barrier.png',
  'hp_shield': 'Buff_HP_Barrier.png',
  'sp_stock': 'Buff_SP_Stock.png',
  'sp_recovery': 'Buff_SP_Stock.png',
  'sp_regen': 'Buff_SP_Stock.png',
  'sp_cost_down': 'Buff_SP_Cost_Down.png',
  'bp_recovery_up': 'Buff_BP_Recovery_Up.png',
  'bp_regen': 'Buff_BP_Recovery_Up.png',
  
  // Damage type buffs
  'dmg_up': 'Buff_Dmg._Up.png',
  'damage_up': 'Buff_Dmg._Up.png',
  'fire_dmg_up': 'Buff_Fire_Dmg._Up.png',
  'ice_dmg_up': 'Buff_Ice_Dmg._Up.png',
  'lightning_dmg_up': 'Buff_Lightning_Dmg._Up.png',
  'wind_dmg_up': 'Buff_Wind_Dmg._Up.png',
  'light_dmg_up': 'Buff_Light_Dmg._Up.png',
  'dark_dmg_up': 'Buff_Dark_Dmg._Up.png',
  
  // Weapon damage buffs
  'sword_dmg_up': 'Buff_Sword_Dmg._Up.png',
  'dagger_dmg_up': 'Buff_Dagger_Dmg._Up.png',
  'axe_dmg_up': 'Buff_Axe_Dmg._Up.png',
  'bow_dmg_up': 'Buff_Bow_Dmg._Up.png',
  'staff_dmg_up': 'Buff_Staff_Dmg._Up.png',
  'polearm_dmg_up': 'Buff_Polearm_Dmg._Up.png',
  'fan_dmg_up': 'Buff_Fan_Dmg._Up.png',
  'tome_dmg_up': 'Buff_Tome_Dmg._Up.png',
  
  // Resistance buffs
  'fire_res_up': 'Buff_Fire_Res._Up.png',
  'ice_res_up': 'Buff_Ice_Res._Up.png',
  'lightning_res_up': 'Buff_Lightning_Res._Up.png',
  'wind_res_up': 'Buff_Wind_Res._Up.png',
  'light_res_up': 'Buff_Light_Res._Up.png',
  'dark_res_up': 'Buff_Dark_Res._Up.png',
  'elem_res_up': 'Buff_Elem._Res._Up.png',
  'all_elem_res_up': 'Buff_All_Elem._Res._Up.png',
  'all_phys_res_up': 'Buff_All_Phys._Res._Up.png',
  
  // Weapon resistance buffs
  'sword_res_up': 'Buff_Sword_Res._Up.png',
  'dagger_res_up': 'Buff_Dagger_Res._Up.png',
  'axe_res_up': 'Buff_Axe_Res._Up.png',
  'bow_res_up': 'Buff_Bow_Res._Up.png',
  'staff_res_up': 'Buff_Staff_Res._Up.png',
  'polearm_res_up': 'Buff_Polearm_Res._Up.png',
  'fan_res_up': 'Buff_Fan_Res._Up.png',
  'tome_res_up': 'Buff_Tome_Res._Up.png',
  
  // Special buffs
  'thiefs_evasion': "Buff_Thief's_Evasion.png",
  'thief_evasion': "Buff_Thief's_Evasion.png",
  'vim_and_vigor': 'Buff_Vim_and_Vigor.png',
  'evade_phys': 'Buff_Evade_Phys._Atk.png',
  'evade_elem': 'Buff_Evade_Elem._Atk.png',
  'counter_phys': 'Buff_Counter_Phys.png',
  'counter_elem': 'Buff_Counter_Elem.png',
  'intercept_phys': 'Buff_Intercept_Phys.png',
  'intercept_elem': 'Buff_Intercept_Elem.png',
  'null_phys': 'Buff_Null_Phys.png',
  'null_all': 'Buff_Null_All.png',
  'repel_phys_elem': 'Buff_Repel_Phys._Elem.png',
  
  // Status immunity buffs
  'null_poison': 'Buff_Null_Poison.png',
  'null_blindness': 'Buff_Null_Blindness.png',
  'null_paralysis': 'Buff_Null_Paralysis.png',
  'null_sleep': 'Buff_Null_Sleep.png',
  'null_silence': 'Buff_Null_Silence.png',
  'null_terror': 'Buff_Null_Terror.png',
  'null_weakness': 'Buff_Null_Weakness.png',
  'null_bleeding': 'Buff_Null_Bleeding.png',
  
  // Advanced buffs
  'dominance': 'Buff_Dominance.png',
  'tenacity': 'Buff_Tenacity.png',
  'unsinkable': 'Buff_Unsinkable.png',
  'second_wind': 'Buff_Second_Wind.png',
  'shield_regen': 'Buff_Shield_Regen.png',
  'steadfast_defense': 'Buff_Steadfast_Defense.png',
  'opportune_attack': 'Buff_Opportune_Attack.png',
  'dead_aim': 'Buff_Dead_Aim.png',
  'deathwish': 'Buff_Deathwish.png',
  'berserk_mode': 'Buff_Berserk_Mode.png',
  'encore': 'CotC_Buff_Encore.png',
  'rehabilitate': 'CotC_Buff_Rehabilitate.png'
}

/**
 * Debuff effect icons (40 types from wiki-icons)
 * Maps debuff names to debuff icon files
 */
const DEBUFF_ICONS = {
  // Basic stat debuffs
  'phys_atk_down': 'Debuff_Phys._Atk._Down.png',
  'patk_down': 'Debuff_Phys._Atk._Down.png',
  'elem_atk_down': 'Debuff_Elem._Atk._Down.png',
  'eatk_down': 'Debuff_Elem._Atk._Down.png',
  'phys_def_down': 'Debuff_Phys._Def._Down.png',
  'pdef_down': 'Debuff_Phys._Def._Down.png',
  'elem_def_down': 'Debuff_Elem._Def._Down.png',
  'edef_down': 'Debuff_Elem._Def._Down.png',
  'crit_down': 'Debuff_Crit._Down.png',
  'spd_down': 'Debuff_Spd._Down.png',
  'speed_down': 'Debuff_Spd._Down.png',
  'max_hp_down': 'Debuff_Max._HP_Down.png',
  
  // Damage type debuffs
  'fire_dmg_down': 'Debuff_Fire_Dmg._Down.png',
  'ice_dmg_down': 'Debuff_Ice_Dmg._Down.png',
  'lightning_dmg_down': 'Debuff_Lightning_Dmg._Down.png',
  'wind_dmg_down': 'Debuff_Wind_Dmg._Down.png',
  'light_dmg_down': 'Debuff_Light_Dmg._Down.png',
  'dark_dmg_down': 'Debuff_Dark_Dmg._Down.png',
  
  // Resistance debuffs
  'fire_res_down': 'Debuff_Fire_Res._Down.png',
  'ice_res_down': 'Debuff_Ice_Res._Down.png',
  'lightning_res_down': 'Debuff_Lightning_Res._Down.png',
  'wind_res_down': 'Debuff_Wind_Res._Down.png',
  'light_res_down': 'Debuff_Light_Res._Down.png',
  'dark_res_down': 'Debuff_Dark_Res._Down.png',
  'elem_res_down': 'Debuff_Elem._Res._Down.png',
  'all_elem_res_down': 'Debuff_All_Elem._Res._Down.png',
  'all_phys_res_down': 'Debuff_All_Phys._Res._Down.png',
  
  // Weapon damage/resistance debuffs
  'sword_dmg_down': 'Debuff_Sword_Dmg._Down.png',
  'sword_res_down': 'Debuff_Sword_Res._Down.png',
  'dagger_dmg_down': 'Debuff_Dagger_Dmg._Down.png',
  'dagger_res_down': 'Debuff_Dagger_Res._Down.png',
  'axe_dmg_down': 'Debuff_Axe_Dmg._Down.png',
  'axe_res_down': 'Debuff_Axe_Res._Down.png',
  'bow_dmg_down': 'Debuff_Bow_Dmg._Down.png',
  'bow_res_down': 'Debuff_Bow_Res._Down.png',
  'staff_dmg_down': 'Debuff_Staff_Dmg._Down.png',
  'staff_res_down': 'Debuff_Staff_Res._Down.png',
  'polearm_dmg_down': 'Debuff_Polearm_Dmg._Down.png',
  'polearm_res_down': 'Debuff_Polearm_Res._Down.png',
  'fan_dmg_down': 'Debuff_Fan_Dmg._Down.png',
  'fan_res_down': 'Debuff_Fan_Res._Down.png',
  'tome_dmg_down': 'Debuff_Tome_Dmg._Down.png',
  'tome_res_down': 'Debuff_Tome_Res._Down.png'
}

/**
 * Status effect icons (46 types from wiki-icons)
 * Maps status effect names to status icon files
 */
const STATUS_ICONS = {
  // Basic status effects
  'poison': 'CotC_Status_Poison.png',
  'blindness': 'CotC_Status_Blindness.png',
  'blind': 'CotC_Status_Blindness.png',
  'silence': 'CotC_Status_Silence.png',
  'sleep': 'CotC_Status_Sleep.png',
  'terror': 'CotC_Status_Terror.png',
  'paralysis': 'Status_Paralysis.png',
  'weakness': 'Status_Weakness.png',
  
  // Elemental status effects
  'corrosion': 'Status_Corrosion.png',
  'frostbite': 'Status_Frostbite.png',
  'shock': 'Status_Shock.png',
  'combust': 'Status_Combust.png',
  'combustion': 'Status_Combust.png',
  'enchant': 'Status_Enchant.png',
  
  // Advanced status effects
  'hemorrhage': 'Status_Hemorrhage.png',
  'bleeding': 'Status_Hemorrhage.png',
  'charm': 'Status_Charm.png',
  'provoke': 'Status_Provoke.png',
  'intimidate': 'Status_Intimidate.png',
  'countdown': 'Status_Countdown.png',
  'fatal_sentence': 'Status_Fatal_Sentence.png',
  'divine_aura': 'Status_Divine_Aura.png',
  'reckless_rage': 'Status_Reckless_Rage.png',
  'slow_feet': 'Status_Slow_Feet.png',
  
  // Lock effects
  'phys_atk_lock': 'Status_Phys._Atk._Lock.png',
  'elem_atk_lock': 'Status_Elem._Atk._Lock.png',
  'miss_phys': 'Status_Miss_Phys._Attack.png',
  'miss_elem': 'Status_Miss_Elem._Attack.png',
  'cant_switch': "Status_Can't_Switch.png",
  
  // BP/SP effects
  'bp_down': 'Status_BP_Down.png',
  'bp_prohibition': 'Status_BP_Prohibition.png',
  'sp_sap': 'Status_SP_Sap.png',
  'sp_damage_back_row': 'Status_SP_Damage_When_Moving_to_Back_Row.png',
  'hp_damage_back_row': 'Status_HP_Damage_When_Moving_to_Back_Row.png',
  
  // Special effects
  'cover': 'Status_Cover.png',
  'life_absorption_barrier': 'Status_Life_Absorption_Barrier.png'
}

/**
 * Element type icons (6 elements + locked versions)
 * Maps element names to element icon files
 */
const ELEMENT_ICONS = {
  'fire': 'Type_Fire.png',
  'ice': 'Type_Ice.png',
  'lightning': 'Type_Lightning.png',
  'thunder': 'Type_Lightning.png',
  'wind': 'Type_Wind.png',
  'light': 'Type_Light.png',
  'dark': 'Type_Dark.png',
  
  // Locked versions
  'fire_locked': 'Type_Fire_Locked.png',
  'ice_locked': 'Type_Ice_Locked.png',
  'lightning_locked': 'Type_Lightning_Locked.png',
  'wind_locked': 'Type_Wind_Locked.png',
  'light_locked': 'Type_Light_Locked.png',
  'dark_locked': 'Type_Dark_Locked.png'
}

/**
 * Weapon type icons (8 weapons + locked versions)
 * Maps weapon names to weapon icon files
 */
const WEAPON_ICONS = {
  'sword': 'Type_Swords.png',
  'swords': 'Type_Swords.png',
  'dagger': 'Type_Daggers.png',
  'daggers': 'Type_Daggers.png',
  'axe': 'Type_Axes.png',
  'axes': 'Type_Axes.png',
  'bow': 'Type_Bows.png',
  'bows': 'Type_Bows.png',
  'staff': 'Type_Staves.png',
  'staves': 'Type_Staves.png',
  'polearm': 'Type_Polearms.png',
  'polearms': 'Type_Polearms.png',
  'spear': 'Type_Polearms.png',
  'fan': 'Type_Fans.png',
  'fans': 'Type_Fans.png',
  'tome': 'Type_Tomes.png',
  'tomes': 'Type_Tomes.png',
  
  // Locked versions
  'sword_locked': 'Type_Swords_Locked.png',
  'dagger_locked': 'Type_Daggers_Locked.png',
  'axe_locked': 'Type_Axes_Locked.png',
  'bow_locked': 'Type_Bows_Locked.png',
  'staff_locked': 'Type_Staves_Locked.png',
  'polearm_locked': 'Type_Polearms_Locked.png',
  'fan_locked': 'Type_Fans_Locked.png',
  'tome_locked': 'Type_Tomes_Locked.png'
}

/**
 * Common icons used throughout the app
 */
const COMMON_ICONS = {
  'accessory': 'Accessory.png',
  'awakening_iv': 'Awakening_IV.png',
  'awakening_4': 'Awakening_IV.png',
  'flag': 'Flag.png',
  'unknown': 'Type_Unknown.png',
  'blocked': 'Type_Blocked.png'
}

/**
 * Normalize a string for icon lookup
 * @param {string} str - String to normalize
 * @returns {string} Normalized string
 */
function normalizeKey(str) {
  if (!str) return ''
  return str.toString()
    .toLowerCase()
    .replace(/[.\s-]+/g, '_')  // Replace dots, spaces, hyphens with underscore
    .replace(/[''`]/g, '')      // Remove apostrophes
    .replace(/__+/g, '_')       // Remove duplicate underscores
    .trim()
}

/**
 * Get icon path for a given category and key
 * @param {string} category - Icon category (stat, buff, debuff, etc.)
 * @param {string} key - Icon key to lookup
 * @param {boolean} locked - Whether to get locked version (for elements/weapons)
 * @returns {string|null} Full icon path or null if not found
 */
function getIconByCategory(category, key, locked = false) {
  if (!key) return null
  
  const normalizedKey = normalizeKey(key)
  const lockedSuffix = locked ? '_locked' : ''
  let iconFile = null
  
  switch (category) {
    case IconCategory.STAT:
      iconFile = STAT_ICONS[normalizedKey]
      break
    case IconCategory.BUFF:
      iconFile = BUFF_ICONS[normalizedKey]
      break
    case IconCategory.DEBUFF:
      iconFile = DEBUFF_ICONS[normalizedKey]
      break
    case IconCategory.STATUS:
      iconFile = STATUS_ICONS[normalizedKey]
      break
    case IconCategory.ELEMENT:
      iconFile = ELEMENT_ICONS[normalizedKey + lockedSuffix] || ELEMENT_ICONS[normalizedKey]
      break
    case IconCategory.WEAPON:
      iconFile = WEAPON_ICONS[normalizedKey + lockedSuffix] || WEAPON_ICONS[normalizedKey]
      break
    case IconCategory.COMMON:
      iconFile = COMMON_ICONS[normalizedKey]
      break
  }
  
  if (iconFile) {
    // Cache the result for performance
    const cacheKey = `${category}:${normalizedKey}${lockedSuffix}`
    if (!iconCache.has(cacheKey)) {
      iconCache.set(cacheKey, paths.images(`wiki-icons/${iconFile}`))
    }
    return iconCache.get(cacheKey)
  }
  
  return null
}

/**
 * Smart icon detection - analyzes text to suggest appropriate icon
 * @param {string} text - Text to analyze (skill name, description, etc.)
 * @returns {Object} Object with suggested icon path and detected category
 */
function detectIcon(text) {
  if (!text) return { icon: null, category: null }
  
  const normalized = normalizeKey(text)
  
  // Check each category in priority order
  const categories = [
    IconCategory.STATUS,
    IconCategory.BUFF,
    IconCategory.DEBUFF,
    IconCategory.ELEMENT,
    IconCategory.WEAPON,
    IconCategory.STAT,
    IconCategory.COMMON
  ]
  
  for (const category of categories) {
    const icon = getIconByCategory(category, normalized)
    if (icon) {
      return { icon, category }
    }
  }
  
  // Advanced detection for compound effects
  if (normalized.includes('_up') || normalized.includes('boost')) {
    // Try as buff
    const buffKey = normalized.replace('boost', 'up')
    const icon = getIconByCategory(IconCategory.BUFF, buffKey)
    if (icon) return { icon, category: IconCategory.BUFF }
  }
  
  if (normalized.includes('_down') || normalized.includes('drain')) {
    // Try as debuff
    const debuffKey = normalized.replace('drain', 'down')
    const icon = getIconByCategory(IconCategory.DEBUFF, debuffKey)
    if (icon) return { icon, category: IconCategory.DEBUFF }
  }
  
  return { icon: null, category: null }
}

/**
 * Get stat icon path (backwards compatibility)
 * @param {string} statType - Type of stat
 * @returns {string|null} Icon path or null
 */
export function getStatIcon(statType) {
  return getIconByCategory(IconCategory.STAT, statType)
}

/**
 * Get buff icon path
 * @param {string} buffType - Type of buff
 * @returns {string|null} Icon path or null
 */
export function getBuffIcon(buffType) {
  return getIconByCategory(IconCategory.BUFF, buffType)
}

/**
 * Get debuff icon path
 * @param {string} debuffType - Type of debuff
 * @returns {string|null} Icon path or null
 */
export function getDebuffIcon(debuffType) {
  return getIconByCategory(IconCategory.DEBUFF, debuffType)
}

/**
 * Get status effect icon path
 * @param {string} statusType - Type of status effect
 * @returns {string|null} Icon path or null
 */
export function getStatusIcon(statusType) {
  return getIconByCategory(IconCategory.STATUS, statusType)
}

/**
 * Get element icon path
 * @param {string} element - Element name
 * @param {boolean} locked - Whether to get locked version
 * @returns {string|null} Icon path or null
 */
export function getElementIcon(element, locked = false) {
  return getIconByCategory(IconCategory.ELEMENT, element, locked)
}

/**
 * Get weapon icon path
 * @param {string} weapon - Weapon name
 * @param {boolean} locked - Whether to get locked version
 * @returns {string|null} Icon path or null
 */
export function getWeaponIcon(weapon, locked = false) {
  return getIconByCategory(IconCategory.WEAPON, weapon, locked)
}

/**
 * Get common icon path
 * @param {string} iconName - Common icon name
 * @returns {string|null} Icon path or null
 */
export function getCommonIcon(iconName) {
  return getIconByCategory(IconCategory.COMMON, iconName)
}

/**
 * Analyze skill/effect tags and return matching icons
 * @param {Array<string>} tags - Array of tags to analyze
 * @returns {Array<Object>} Array of icon objects with path and category
 */
export function getIconsForTags(tags) {
  if (!tags || !Array.isArray(tags)) return []
  
  const icons = []
  const seen = new Set()
  
  for (const tag of tags) {
    const result = detectIcon(tag)
    if (result.icon && !seen.has(result.icon)) {
      icons.push(result)
      seen.add(result.icon)
    }
  }
  
  return icons
}

/**
 * Legacy support - get icon path by any name
 * Tries to intelligently detect the icon category
 * @param {string} iconName - Icon name to lookup
 * @returns {string|null} Icon path or null
 */
export function getIcon(iconName) {
  const result = detectIcon(iconName)
  return result.icon
}

/**
 * Get all available icons in a category
 * @param {string} category - Icon category
 * @returns {Object} Map of normalized keys to icon paths
 */
export function getIconsInCategory(category) {
  let iconMap = {}
  let sourceMap = null
  
  switch (category) {
    case IconCategory.STAT:
      sourceMap = STAT_ICONS
      break
    case IconCategory.BUFF:
      sourceMap = BUFF_ICONS
      break
    case IconCategory.DEBUFF:
      sourceMap = DEBUFF_ICONS
      break
    case IconCategory.STATUS:
      sourceMap = STATUS_ICONS
      break
    case IconCategory.ELEMENT:
      sourceMap = ELEMENT_ICONS
      break
    case IconCategory.WEAPON:
      sourceMap = WEAPON_ICONS
      break
    case IconCategory.COMMON:
      sourceMap = COMMON_ICONS
      break
  }
  
  if (sourceMap) {
    for (const [key, file] of Object.entries(sourceMap)) {
      iconMap[key] = paths.images(`wiki-icons/${file}`)
    }
  }
  
  return iconMap
}

/**
 * Clear the icon cache (useful for development)
 */
export function clearIconCache() {
  iconCache.clear()
}

/**
 * Get cache statistics
 * @returns {Object} Cache statistics
 */
export function getIconCacheStats() {
  return {
    size: iconCache.size,
    entries: Array.from(iconCache.keys())
  }
}

// Export icon categories for use in components
export { IconCategory }

// Export main registry for direct access if needed
export const IconRegistry = {
  STAT_ICONS,
  BUFF_ICONS,
  DEBUFF_ICONS,
  STATUS_ICONS,
  ELEMENT_ICONS,
  WEAPON_ICONS,
  COMMON_ICONS
}

// Default export with all functions
export default {
  getIcon,
  getStatIcon,
  getBuffIcon,
  getDebuffIcon,
  getStatusIcon,
  getElementIcon,
  getWeaponIcon,
  getCommonIcon,
  getIconsForTags,
  detectIcon,
  getIconsInCategory,
  clearIconCache,
  getIconCacheStats,
  IconCategory,
  IconRegistry
}