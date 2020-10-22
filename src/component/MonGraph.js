/*
-Nom : Bastien Boulanger DA : 1838295
- Nom de la classe : MonGraph (mon graphique)
- Cette classe est le graphique qui est afficher a la fin du programme, elle contient un tableau de node, un tableau de edge, un nombre de node recus en paramettre, un nombre de edge recus
    en parammetre et une note.
*/
class MonGraph {

    /*
    - Constructeur de MonGraph
    - Construit le graphique et appele une focntion qui initialise alératoirement le tableau de node et de edges
    - nombreDeNodeParam : le nombre de node (doit etre plus grand ou egale a 0) || nombreDeCouleurParam : le nombre de couleur (doit etre entre 1 et 8)
    - Les variables qui sont dans le state sont : le tableau de node, le tableau de edge,  le nombre de nodes desirer (recus en paramettre), le nombre de couleurs a utiliser (recus aussi en 
        paramettre) et la note du graphique (calculer avec une methode)
    */
    constructor(nombreDeNodeParam, nombreDeCouleurParam) {
        this.tableauDeNode = [];
        this.tableauDeEdge = [];
        this.nombreDeNode = nombreDeNodeParam;
        this.nombreDeCouleur = nombreDeCouleurParam;
        this.note = 0;
        this.initialiserTableaux();
    }
    
    /*
    - InitialiserTableaux
    - Initialise le tableau de node et de edges alératoirement
    - Aucun parametre d'entrer (null)
    - Aucun parametre  de retour (null)
    */
    initialiserTableaux() {
        //initialise les variables
        var tableauDeNode = [];
        var tableauDeEdge = [];
        var nombreMinEdge = this.nombreDeNode - 1;
        var nombreMaxEdge = (this.nombreDeNode * (this.nombreDeNode - 1) / 2);
        var Couleurs = ["#e04141", "#e09c41", "#e0df41", "#7be041", "#41e0c9", "#C853C1", "#444FB1", "#FFFFFF"];
        //initialise les nodes avec des couleurs (color) et des groupes (groupe) aleatoire
        for (var i = 0; i < this.nombreDeNode; i++) {
            var groupeCouleur = Math.floor(Math.random() * this.nombreDeCouleur);
            tableauDeNode.push({ id: i, label: "Node " + (i + 1), color: Couleurs[groupeCouleur], groupe: groupeCouleur, isinit: false });
        }
        //Fait les edge minimum entre chaque node
        for (var j = 0; j < nombreMinEdge; j++) {
            tableauDeEdge.push({ from: j, to: j + 1 });
        }
        //Fait Des liens selon le nombre de liens maximum que le graphique pourrais contenir
        var edgeRestante = nombreMaxEdge - nombreMinEdge;
        var edgeAFaire = Math.floor(Math.random() * edgeRestante);
        var nodeMere;
        var nodeALier;
        //cette variable sert a verifier si le lien entre les deux nodes existe deja (true si la verification a passer, false si le lien ne peu pas etre fait (ne peu pas etre repeter))
        var verif = true;
        for (var y = 0; y <= edgeAFaire; y++) {
            nodeMere = Math.floor(Math.random() * this.nombreDeNode);
            nodeALier = Math.floor(Math.random() * this.nombreDeNode);
            for(var x = 0; x < tableauDeEdge.length; x++){
                //verification si on peu faire le lien
                if((tableauDeEdge[x].from === nodeMere && tableauDeEdge[x].to === nodeALier) || (tableauDeEdge[x].from === nodeALier && tableauDeEdge[x].to === nodeMere)){
                    verif = false;
                }
            }
            if (nodeMere !== nodeALier && verif) {
                tableauDeEdge.push({ from: nodeMere, to: nodeALier });
            }
        }
        //insere les tableaux dans l'object monGraph
        this.tableauDeNode = tableauDeNode;
        this.tableauDeEdge = tableauDeEdge;

    }

    /*
    - randomiserCouleur
    - Permet de randomiser les couleurs dans le tableaux de nodes (est utiliser lorsqu'on crée des copies d'une node mais on ne veu pas qu'elle garde les memes couleurs)
    - Aucun parametre d'entrer (null)
    - Aucun parametre  de retour (null)
    */
    randomiserCouleur(){
        var Couleurs = ["#e04141", "#e09c41", "#e0df41", "#7be041", "#41e0c9", "#C853C1", "#444FB1", "#FFFFFF"];
        var groupeCouleur;
        this.tableauDeNode.forEach(node => {
            groupeCouleur = Math.floor(Math.random() * this.nombreDeCouleur);
            node.color = Couleurs[groupeCouleur];
            node.groupe = groupeCouleur;
        });
    }

    /*
    - verifieNoteDuGraph
    - Donne une note au graphique de la classe en pourcentage (100 etant la meilleur note et 0 la pire)
    - Aucun parametre d'entrer (null)
    - Aucun parametre  de retour (null)
    */
    verifieNoteDuGraph(){
        //Ce code fonctionne en comptant le nombre de faute (plus il y a de faute, moins la note va etre )
        var faute = 0;
        this.tableauDeEdge.forEach(lien => {
            if(this.tableauDeNode[lien.from].groupe === this.tableauDeNode[lien.to].groupe){
                faute++;
            }
        });
        if(faute === 0){
            this.note = 100;
        }
        //Produit croiser : Le nombre de edge qui sont reussi sur le nombre de edge total --> transformer en pourcentage
        else{
            this.note = (this.tableauDeEdge.length - faute) * 100 / this.tableauDeEdge.length;
        }
    }
}
export default MonGraph;