# ugram-h2020-team-08

## Accéder à l'app

Le lien de l'API : https://ugramapi-env.eba-gaezbxp2.us-east-2.elasticbeanstalk.com.

Le lien de l'APP : https://ugram-app.s3.us-east-2.amazonaws.com/index.html.

Les 2 serveurs se déploient automatiquement lorsque l'on push sur master.

N'oubliez pas de précisez le *index.html* à la fin du lien de l'app où vous ne pourrez pas  y accéder.
Comme nous utilisons un certificat non signé et que nous n'avons pas de nom de domaine (qui sont payants) il est nécessaire de d'abord se rendre sur le lien de l'API et d'accepter le certificat https avant de se rendre sur l'app.

Voici comment accepter le certificat sous Firefox.
Ici, cliquez sur "Advanced".
![](https://i.imgur.com/OvJmvMq.png)

Maintenant cliquez sur "Accept the risk and continue".
![](https://i.imgur.com/C7WmjnW.png)

Une fois le certificat activé vous pouvez vous rendre sur l'app avec votre navigateur.

Si vous n'arrivez pas à accepter le certificat, essayez sur un autre navigateur ou lancez le front en local avec `npm install && npm start` dans le dossier *app* qui arrive à utiliser l'API en http classique.

## Log sur Sentry et Cloudwatch

Le backend hébergé sur Elastic Beanstalk possède des logs sur Cloudwatch.
![](https://i.imgur.com/PFd6S5T.png)

Le frontend hébergé sur S3 possède des logs avec Sentry.
![](https://i.imgur.com/fa8CdyT.png)

## API Documentation

Pour voir la documentation dynamique de l'API, vous pouvoir vous rendre sur https://ugramapi-env.eba-gaezbxp2.us-east-2.elasticbeanstalk.com/documentation

## Les différentes features

* On peut s'enregistrer ou se connecter à l'application via les formulaires d'accueil.
* On peut se connnecter via Google sur la page de login.

* On peut se déconnecter avec le bouton "Logout" dans la barre de navigation.
* Dans la barre de recherche on peut trouver un user ou un post par hashtag ou description.

* Dans le header, un bouton à droite de la searchbar est disponible. On peut voir à l'intérieur nos notifications en cliquant dessus. Si des notifications n'ont pas encore été lus, alors le nombre de notifications non lus s'affiche dans un cercle rouge. Les notifications passent à "lu" une fois qu'on clique sur le bouton.

Page Home :
* On peut voir la liste des utilisateurs et se rendre sur leur profil en cliquant dessus.
* On peut voir la liste de toutes les publications (et leur détails en cliquant dessus).

Page Profil :
* On peut éditer les données de son profil via le bouton "Edit account".
* On peut supprimer son compte via le bouton "Delete account".
* On peut créer un post avec le bouton "Upload a picture".
* On peut consulter ses posts et leurs détails en cliquant dessus.

Visualisation de publication :
* On peut y ajouter un commentaire, qui se retrouvera en haut des autres.
* On peut like ou dislike une publication (si l'on clique à nouveau sur notre réaction cela l'enlève).

Les fonctionnalités de 15 points :
* Lorsque l'on upload une image, on peut choisir d'utiliser la webcam (5 points).
* Lorsque l'on fait une recherche dans la barre en haut, un autocomplete est disponible qui propose les username et les hashtags qui match (5 points).
* Dans le bouton avec une étoile dans le header, on peut y retrouver les 5 hashtags les plus populaires (5 points).
