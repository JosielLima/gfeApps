## ADDED Requirements

### Requirement: Página Home usa tema claro com design system existente do projeto

A rota raiz (`/`) SHALL renderizar com background branco (`--color-bg-primary`), usando exclusivamente os tokens existentes do projeto (brand, fg, bg, border). Nenhum token do tema dark "Cartographer's Edge" SHALL ser aplicado na Home.

#### Scenario: Background da página é branco

- **WHEN** o usuário acessa a rota `/`
- **THEN** o background da página renderiza como `#ffffff` (bg-primary)

#### Scenario: AppHeader usa tema claro

- **WHEN** o header é renderizado
- **THEN** tem background branco com `border-bottom: 1px solid #E6E6E6`

---

### Requirement: Seção Hero usa Expedition Indigo como background

A seção hero SHALL usar `#4338CA` (brand-700) como background sólido com texto branco. Nenhum gradiente SHALL ser aplicado.

#### Scenario: Hero exibe background indigo sólido

- **WHEN** a seção hero é renderizada
- **THEN** o background é `#4338CA` sem gradiente

#### Scenario: Hero exibe todos os elementos de texto corretos

- **WHEN** a seção hero é exibida
- **THEN** exibe: label uppercase "APPS TRACK · 12 CHALLENGES", `<h1>` "Expedition: Josiel Lima" e tagline "Mapping the technical landscape through brutalist iteration"

---

### Requirement: Challenge Cards usam tema claro com codificação de dificuldade por cor

Cada `<ChallengeCard>` SHALL usar background `#FAFAFA` com `border: 1px solid #E6E6E6`. Os badges de dificuldade SHALL seguir o esquema: Starter=lime, Mid=indigo, Senior=violet, Nightmare=red.

#### Scenario: Card default exibe tema claro

- **WHEN** um ChallengeCard é renderizado sem hover
- **THEN** background é `#FAFAFA`, borda `#E6E6E6`, texto título `#171717`

#### Scenario: Badge Starter usa lime accent

- **WHEN** um card de dificuldade "Starter" é exibido
- **THEN** o badge tem background `#CCFF00` com texto `#171717`

#### Scenario: Badge Mid usa indigo

- **WHEN** um card de dificuldade "Mid" é exibido
- **THEN** o badge tem background `#EEF2FF` com texto `#4338CA`

#### Scenario: Badge Senior usa violet

- **WHEN** um card de dificuldade "Senior" é exibido
- **THEN** o badge tem background `#DDD6FE` com texto `#5B21B6`

#### Scenario: Badge Nightmare usa red

- **WHEN** um card de dificuldade "Nightmare" é exibido
- **THEN** o badge tem background `#FEE2E2` com texto `#DC2626`

#### Scenario: Card hover eleva sem sombra

- **WHEN** o mouse está sobre um ChallengeCard
- **THEN** o card aplica `background: #F4F4F5`, `border-color: #A3A3A3` e `transform: translateY(-2px)` sem `box-shadow`

---

### Requirement: AppFooter usa tema neutro claro

O `<AppFooter>` SHALL usar background `#FAFAFA` com `border-top: 1px solid #E6E6E6`. Valores de status SHALL ser exibidos em `#4338CA` (brand-700).

#### Scenario: Footer usa background neutro

- **WHEN** o AppFooter é renderizado
- **THEN** background é `#FAFAFA` com border-top `1px solid #E6E6E6`

#### Scenario: Footer exibe valores em brand color

- **WHEN** os valores "OPERATIONAL", "BRAZIL", "UTC-3" são exibidos
- **THEN** são renderizados em `#4338CA` (brand-700)
