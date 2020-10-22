import React from 'react';
import Graph from "react-graph-vis";
import MonGraph from './MonGraph';
import _ from 'lodash';

//Les variables qui sont utiliser partout dans cette classes:
/*
- tableauDeGraphs : est le tableau qui contient chaque graph ainsi que sa note
- generation : est le nombre de generation qui on ete requises pour trouver un gagnant
- nbNodes : est le nombre de nodes que l'on veut dans nos graphiques
- nbCouleurs : est le nombre de couleurs que l'on veut dans nos graphiques
*/
let tableauDeGraphs = [];
let generation = 0;
let nbNodes = 8;
let nbCouleurs = 5;

/*
-Nom : Bastien Boulanger DA : 1838295
- Nom de la classe : GestionGraphs (gestion des graphiques)
- Cette classe s'occupe de la gestion de chaques graphiques; de l'instanciation de chaque graphique, du systeme de selection naturelle, du systeme de reproduction,  du systeme de mutation et
    du systeme pour trouver un gagnant
*/
class GestionGraphs extends React.Component {
    /*
    - Constructeur de GestionGraphs
    - Le Constructeur de la classe gestionGraphs s'occupe de creer le nombre de graphiques desirer, puis de trouver un gagnant (un graphique dont la note est de 100), si il ne trouve pas de 
        gagnant, il va continuer de boucler en appelant les methodes pour selectionner la population et pour reproduire jusqu'a se qu'il trouve un gagnant
    - On doit passer un nombre de graph dans les props
    - La variable qui est dans le state est un gagnant qui est trouver a la fin de la construction de la classe
    */
    constructor(props) {
        super(props);
        this.state = {
            gagnant: null
        }
        this.creationDesGraphs();
        var generationtemp = 0;
        var vainceur = this.trouverLeGagnant();
        //On boucle ici pour trouver le gagnant
        if (vainceur === null) {
            do {
                this.selectionNaturel();
                this.reproduction();
                vainceur = this.trouverLeGagnant();
                generationtemp++;
            } while (vainceur === null)
        }
        generation = generationtemp;
        this.state.gagnant = vainceur;
    }

   /*
    - creationDesGraphs
    - Cree chaque graphique a partir d'un graphique mere, ils ont les memes edges mais les couleurs sont randomiser
    - Aucun parametre d'entrer (null)
    - Aucun parametre  de retour (null)
    */
    creationDesGraphs() {
        if (this.props.nbGraphs !== null) {
            var graphique;
            var graphMere = new MonGraph(nbNodes, nbCouleurs);
            for (var i = 0; i < this.props.nbGraphs; i++) {
                //On change la couleur du graphique mere et on change la note du graphique pour qu'elle soit représentative des nouvelles couleurs
                graphMere.randomiserCouleur();
                graphMere.verifieNoteDuGraph();
                graphique = {
                    //Ici, on fait un deep clone des tableaux du graphiques mere sinon on va referrer toujours au memes tableaux lorsqu'on change la couleur du tableau mere
                    nodes: _.cloneDeep(graphMere.tableauDeNode),
                    edges: _.cloneDeep(graphMere.tableauDeEdge),
                };
                tableauDeGraphs.push({ graph: graphique, note: graphMere.note });
            }
        }
    }

    /*
    - render
    - S'occupe de l'affichage du gagnant
    - Aucun parametre d'entrer (null)
    - Retourne un tableau de code html qui affiche le gagnant et generation
    */
    render() {
        if (this.props.nbGraphs == null) {
            return null;
        }

        var options = {
            layout: {
                hierarchical: false
            },
            edges: {
                color: "#000000"
            }
        };
        var retour = [null];
        retour.push(<h1>Voici le gangant! il a ete trouver a la generation : {generation}</h1>)
        retour.push(<p>la note du graph est de : {this.state.gagnant.note} %</p>);
        retour.push(<Graph graph={this.state.gagnant.graph} options={options} style={{ height: "640px" }} />);
        return retour;
    }

     /*
    - trouverLeGagnant
    - S'occupe de trouver le gagnant
    - Aucun parametre d'entrer (null)
    - Retourne le graphique et la note du graphique
    */
    trouverLeGagnant() {
        for (var i = 0; i < tableauDeGraphs.length; i++) {
            if (tableauDeGraphs[i].note === 100) {
                return tableauDeGraphs[i];
            }
        }
        return null;
    }

    /*
    - selectionNaturel
    - Me monke 🐵, me strong 🐵, me live 🐵, other monke weak 🐵, I KILL 🙊, now me alone monke cause me strongest
    - Aucun parametre d'entrer (null)
    - Aucun parametre  de retour (null)
    */
    selectionNaturel() {
        //Ici, on rend le tableau en ordre de la plus grande note a la plus petit
        tableauDeGraphs.sort((a, b) => b.note - a.note);
        //On coupe le tableau au quart de sa taille
        tableauDeGraphs = tableauDeGraphs.slice(0, Math.round(tableauDeGraphs.length / 4));
    }

    /*
    - repoduction
    - OMG THEY HAVE THE SEXX?!?! 😳😳😳😳🍑🍆💧💧💧 THATS ILLEGAL
    - Aucun parametre d'entrer (null)
    - Aucun parametre  de retour (null)
    */
    reproduction() {
        //initialisation de toutes les variables
        //le nombre de bebe qu'il faut faire pour reatteindre le nombre de population qu'on avait au debut
        var nombreDeBebe = this.props.nbGraphs - tableauDeGraphs.length;
        var mamanumber;
        var papanumber;
        var mama;
        var papa;
        var bebe;
        var bebeModificationPapa;
        var mutation;
        for (var i = 0; i < nombreDeBebe; i++) {
            do {
                //choisi deux graphiques dans le tableaux de graphique jusqu'a se qu'il ne soit pas les memes.
                mamanumber = Math.floor(Math.random() * tableauDeGraphs.length);
                papanumber = Math.floor(Math.random() * tableauDeGraphs.length);
                mama = tableauDeGraphs[mamanumber];
                papa = tableauDeGraphs[papanumber].graph;
            } while (papanumber === mamanumber);
            //On clone la maman dans le bebe
            bebe = _.cloneDeep(mama);
            //ici, on trouve le numero de la node qui va etre transferer de la mere au pere dans l'enfant
            bebeModificationPapa = Math.floor(Math.random() * tableauDeGraphs[0].graph.nodes.length);
            var Couleurs = ["#e04141", "#e09c41", "#e0df41", "#7be041", "#41e0c9", "#C853C1", "#444FB1", "#FFFFFF"];
            bebe.graph.nodes[bebeModificationPapa].groupe = papa.nodes[bebeModificationPapa].groupe;
            bebe.graph.nodes[bebeModificationPapa].color = Couleurs[bebe.graph.nodes[bebeModificationPapa].groupe];
            //Debut de la section des mutations
            mutation = Math.floor(Math.random() * 100);
            //Une chance sur 100 de muter toutes les edges pour qu'ils deviennent une ligne (sinon l'algoritme peut creer un tableau de graphique
            // qui n'a aucune réponse possible peu importe comment on modifie les couleurs)
            if(mutation === 50){
                bebe.graph.edges = [];
                for (var j = 0; j < bebe.graph.nodes.length - 1; j++) {
                    bebe.graph.edges.push({ from: j, to: j + 1 });
                }
            }
            //12 pourcent de chance de muter avec les couleurs
            if(mutation < 13){
                this.mutation(bebe);
            }
            //fin de la section des mutations et insert le bebe dans le tableau de graphiques
            tableauDeGraphs.push(bebe);
        }
    }

    /*
    - mutation
    - 🐵❤🐵 -->  reproduction --> 🐵🐵🐵🐵🐵🐵🐸 <- there is 1 impostor among us
    - On change la couleur aléatoirement de chaque nodes selon le nombre de couleurs choisi plus haut et on recalcule la note du graphique
    - Recois un graphique qui contient un graphique et une note (MonGraph)
    - Aucun parametre  de retour (null)
    */
    mutation(mutant){
        var Couleurs = ["#e04141", "#e09c41", "#e0df41", "#7be041", "#41e0c9", "#C853C1", "#444FB1", "#FFFFFF"];
        var groupeCouleur;
        mutant.graph.nodes.forEach(node => {
            groupeCouleur = Math.floor(Math.random() * nbCouleurs);
            node.color = Couleurs[groupeCouleur];
            node.groupe = groupeCouleur;
        });
        var faute = 0;
        mutant.graph.edges.forEach(lien => {
            if(mutant.graph.nodes[lien.from].groupe === mutant.graph.nodes[lien.to].groupe){
                faute++;
            }
        });
        if(faute === 0){
            mutant.note = 100;
            mutant.graph.note = 100
        }
        else{
            mutant.note = (mutant.graph.edges.length - faute) * 100 / mutant.graph.edges.length;
            mutant.graph.note = (mutant.graph.edges.length - faute) * 100 / mutant.graph.edges.length;
        }
    }
}
export default GestionGraphs;