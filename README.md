# Exo cockpit - Composant sous forme de class : compteur de likes

Après la découverte du state et des composants sous forme de classe, place à la pratique !

## Objectif
Créer un compteur de likes ❤️

## Nouvelles notions
### [State](https://fr.reactjs.org/docs/state-and-lifecycle.html)

On place dans le state les données qui servent à paramétrer le JSX, si les données changent le JSX sera re-déssiné.

### [Composant sous forme de classe](https://fr.reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class)

On transforme nos composant sous forme de classse pour leur ajouter un state.


## Étapes 
---

### 1 - Mise en place du projet

Mettre en place le [modèle React](https://github.com/O-clock-Lara/React-Modele) dans le dossier de cet exercice.

---
### 2 - Créer la clé `nbLikes` dans le state de App

On va placer le nombre de likes dans le state pour que si cette valeur change le composant soit redessiné.
Il faudra pour ça passer le composant App sous forme de classe.

<details>
  <summary>Étape guidée</summary>

  1. Transformer App en classe :
  - Créez une classe ES6 appelée App qui étend React.Component.
  - Ajoutez une méthode vide appelée `render`
  - Déplacez le return du JSX dans la méthode `render`
  - Supprimez la déclaration désormais vide de la fonction.

  2. Ajoutez un state
  - Ajoutez une méthode `constructor` qui prend un paramètre `props`
  - Dans ce constructeur : 
    - appelez le constructeur parent en lui donnant en argument le paramètre `props` reçu.
    - Déclarez une propriété de classe appelée `state` et stockez dedans un objet qui contient une clé `nbLikes` et une valeur initiale de `0`.

</details>

<details>
  <summary>Solution</summary>

  ```js
  import React from 'react';
  import PlusOneButton from '../PlusOneButton';
  import LikesDisplay from '../LikesDisplay';
  import './styles.scss';

  class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        nbLikes: 0,
      };
    }

    render() {
      return (
        <div className="app">
          <PlusOneButton />
          <LikesDisplay />
        </div>
      );
    }
  }

  export default App;
```
</details>

---
### 3 - Utiliser la valeur de `nbLikes` du state pour le rendu 

Notre rendu initial doit être dépendant du state, il faut que le composant `LikesDisplay` n'affiche pas `0` en dur mais bien la valeur du state.

<details>
  <summary>Étape guidée</summary>

  1. Dans `App` : 
  - recuperer la valeur de `nbLikes` en destructurant le state
  - la donner via une props à `LikesDisplay`

  2. Dans `LikesDisplay` :
  - recuperez la props `nbLikes`
  - faire la validation avec `propTypes`
  - l'utiliser pour l'affichage dans le JSX

</details>

<details>
  <summary>Solution</summary>

  Dans App :
  ```js
  render() {
    const { nbLikes } = this.state;

    return (
      <div className="app">
        <PlusOneButton />
        <LikesDisplay nbLikes={nbLikes} />
      </div>
    );
  }
```

Dans LikesDisplay :
```js
  import PropTypes from 'prop-types';

  function LikesDisplay({ nbLikes }) {
    return (
      <div className="nblikes">
        {nbLikes} &#9829;
      </div>
    );
  }

  LikesDisplay.propTypes = {
    nbLikes: PropTypes.number.isRequired,
  };
```

</details>

---
### 4 - Modifier la valeur de la clé `nbLikes` dans le state en réponse à une interaction.

Au clic sur le bouton, on veut modifier la valeur de nbLikes dans le state.

<details>
  <summary>Étape guidée</summary>

  1. Dans `App` : 
  - préparer une méthode qui utilisera `this.setState` pour planifier un nouveau rendu avec la valeur du state incrémentée de 1.
  - ne pas oublier le bind du `this` de cette méthode.
  - faire passer cette méthode via une props appelée `incrementNbLikes` au composant `PlusOneButton`

  2. Dans `PlusOneButton` :
  - recuperez la props `incrementNbLikes`
  - faire la validation avec `propTypes`
  - l'executer dans le handler du `onClick` du boutton.

</details>

<details>
  <summary>Solution</summary>

  Dans App :
  ```js
  constructor(props) {
    super(props);

    this.state = {
      nbLikes: 0,
    };

    this.incrementNbLikes = this.incrementNbLikes.bind(this);
  }

  incrementNbLikes() {
    const { nbLikes } = this.state;

    this.setState({
      nbLikes: nbLikes + 1,
    });
  }

  render() {
    const { nbLikes } = this.state;

    return (
      <div className="app">
        <PlusOneButton incrementNbLikes={this.incrementNbLikes} />
        <LikesDisplay nbLikes={nbLikes} />
      </div>
    );
  }
```

Dans PlusOneButton :
```js
  import PropTypes from 'prop-types';

  function PlusOneButton({ incrementNbLikes }) {
    return (
      <button
        type="button"
        onClick={() => {
          incrementNbLikes();
        }}
      >
        +1
      </button>
    );
  }

  PlusOneButton.propTypes = {
    incrementNbLikes: PropTypes.func.isRequired,
  };
```

</details>

---

### 5 - Etapes bonus

Ajoutez les boutons : +5, reset et -1

---
---

# Exo cockpit - Composant controllé

Après la découverte des composants controllés, place à la pratique !

## Objectif
Créer un input controlé pour saisir un nombre de likes. 

Un input HTML stocke sa valeur dans le DOM. On a déjà la valeur de nbLikes dans le state.
=> stockage à 2 endroits = risque de conflit
Donc on va controller notre input par le state !

## Nouvelles notions
### [Composant controllé](https://fr.reactjs.org/docs/forms.html#controlled-components)

## Étapes 
---

### 1 - Controle en lecture

On va transmettre la valeur de nbLikes au composant qui contient l'input, et l'input utilise cette prop pour son attribut "value"

<details>
  <summary>Étape guidée</summary>

  1. Dans le composant qui contient le state : 
  - Transmettre la valeur de `nbLikes` (récupérée en déstructurant le state) au composant qui contient l'input via une prop

  2. Dans le composant qui contient l'input :  
  - récuperer cette prop
  - faire la validation du type avec les propTypes
  - utiliser cette prop pour définir la valeur de l'attribut `value` de l'input

  A ce stade, c'est normal que la saisie de caractères dans l'input ne fonctionne pas (notre input est read-only).
  On peut avoir dans la console un warning "You provided a `value` prop to a form field without an `onChange` handler" 

</details>

<details>
  <summary>Solution</summary>

  Dans `App.js` : 
  ```js
  <LikesInput nbLikes={nbLikes} />
  ```

  Dans `LikesInput.js` : 
  ```js
  import PropTypes from 'prop-types';

  function LikesInput({ nbLikes }) {
    return (
      <input
        type="text"
        name="nbLikesInput"
        className="input"
        value={nbLikes}
      />
    );
  }

  LikesInput.propTypes = {
    nbLikes: PropTypes.number.isRequired,
  };
  ```

</details>

---

### 2 - Controle en écriture

On écoute l'événement change de l'input et on y réagit en modifiant la valeur dans le state, ce qui provoquera un nouveau rendu et donc une mise à jour de la valeur de l'input.

<details>
  <summary>Étape guidée</summary>

  1. Dans le composant qui contient le state :
  - préparer une méthode qui utilisera `this.setState` pour planifier un nouveau rendu avec une nouvelle valeur du state recue en paramètre
  - ne pas oublier le bind du `this` de cette méthode
  - faire passer cette méthode via une prop au composant qui contient l'input

  2. Dans le composant qui contient l'input :
  - recuperez la fonction reçue en props
  - faire la validation avec `propTypes`
  - l'executer dans le handler du `onChange` du input

</details>

<details>
  <summary>Solution</summary>

  Dans `App.js` : 
  ```js
  constructor(props) {
    ...

    this.setNbLikes = this.setNbLikes.bind(this);
  }

  setNbLikes(newValue) {
    this.setState({
      nbLikes: Number(newValue),
    });
  }
  ```

  Dans `LikesInput.js` : 
  ```js
  import PropTypes from 'prop-types';
  import './styles.scss';

  function LikesInput({ nbLikes, setNbLikes }) {
    return (
      <input
        type="text"
        name="nbLikesInput"
        className="input"
        value={nbLikes}
        onChange={(e) => {
          setNbLikes(e.target.value);
        }}
      />
    );
  }

  LikesInput.propTypes = {
    nbLikes: PropTypes.number.isRequired,
    setNbLikes: PropTypes.func.isRequired,
  }; 
  ```

</details>
