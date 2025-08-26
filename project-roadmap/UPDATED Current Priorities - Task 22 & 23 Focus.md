---
title: UPDATED Current Priorities - Task 22 & 23 Focus
type: note
permalink: project-roadmap/updated-current-priorities-task-22-23-focus
---

# UPDATED Current Priorities - Task 22 & 23 Focus

## 🎯 CORRECTED ROADMAP (2025-08-25)

**NOTE**: Previous roadmap notes in Basic Memory were OUTDATED. Current priorities come from `docs/task.md` which is the single source of truth.

## Current Priority Sequence

### **Task 22: Icon Registry Refactoring** - CURRENT HIGH PRIORITY
**Status**: Ready for Implementation  
**Priority**: HIGH - Critical technical debt elimination

**Critical Technical Debt**:
- **4 duplicate implementations** with inconsistent icon mappings across components
- **Scale underestimated**: Only handling 8 basic stats vs 171+ available buff/debuff/status icons
- **Performance issues**: 1,803 skills need proper icon support
- **Inconsistent fallbacks**: Some components have error handling, others don't

**Conflicting Implementations**:
1. `uiClasses.js`: Uses `wiki-icons/PhysAtk.png`
2. `UnifiedSearchPage.vue`: Uses `wiki-icons/Buff_Phys._Atk._Up.png` (CONFLICT!)
3. `SkillCharacterCard.vue`: Uses `elements/` and `weapons/` paths
4. `markdownParser.js`: Uses `sharedIcons` mapping with different logic

**Implementation Plan**:
- Create `/src/utils/iconRegistry.js` as single source of truth
- Support all icon categories: Stats, Buffs (85), Debuffs (40), Status Effects (46)
- Effect detection: Analyze skill descriptions to suggest appropriate icons
- Migration: Replace all 4 duplicate implementations systematically
- Performance optimization: Lazy loading and caching

### **Task 23: Unified Tagging System Consolidation** - NEXT PRIORITY  
**Status**: Ready for Implementation (**Depends on Task 22**)
**Priority**: MEDIUM - Cross-category search and BotL classification fixes

**Critical Problems**:
1. **Cross-category search broken**: Cannot find `dark_res_down` across both skills and accessories
2. **BotL misclassified**: Should be subtypes of active/passive, not separate category  
3. **Multiple competing tagging systems** causing fragmentation
4. **Effect taxonomy gaps**: Same effects tagged differently in skills vs accessories

**Implementation Plan**:
- Consolidate tag systems into single registry with unified effect vocabulary
- Create cross-category taxonomy: Same effect names for skills + accessories
- Fix BotL classification: Restructure as subtypes with proper metadata
- Enable unified search: "Find all dark_res_down sources" across both categories

## Dependencies
- Task 23 depends on Task 22 completion
- Effects need both unified tags AND icons
- Both are foundational for advanced search capabilities

## Timeline
- Task 22: 2-3 weeks (Phase 1 of major refactoring)
- Task 23: 2-3 weeks (Phase 2 of major refactoring, after Task 22)

---

**IMPORTANT**: This note replaces outdated roadmap information. Always check `docs/task.md` for current priorities.