# ugram-h2020-team-08

## Accéder à l'app

Le lien de l'API : https://ugram-api.eba-b2ikdsse.us-east-2.elasticbeanstalk.com.

Le lien de l'APP : https://ugram-app.s3.us-east-2.amazonaws.com/index.html.

N'oubliez pas de précisez le *index.html* à la fin du lien de l'app où vous ne pourrez pas  y accéder.
Comme nous utilisons un certificat non signé et que nous n'avons pas de nom de domaine (qui sont payants) il est nécessaire de d'abord se rendre sur le lien de l'API et d'accepter le certificat avant de se rendre sur l'app.

Voici comment accepter le certificat sous Firefox.
Ici, cliquez sur "Advanced".
![](https://i.imgur.com/OvJmvMq.png)

Maintenant cliquez sur "Accept the risk and continue".
![](https://i.imgur.com/C7WmjnW.png)

Une fois le certificat activé vous pouvez vous rendre sur l'app avec votre navigateur.

## Log sur Sentry et Cloudwatch

Le backend hébergé sur Elastic Beanstalk possède des logs sur Cloudwatch.
![](https://i.imgur.com/PFd6S5T.png)

Le frontend hébergé sur S3 possède des logs avec Sentry.
![](https://i.imgur.com/fa8CdyT.png)

## API Documentation

Vous trouverez la documentation de l'API [ici](https://github.com/GLO3112-classrooms/ugram-h2020-team-08/wiki/API-Documentation).

## Les différentes features

* On peut s'enregistrer ou se connecter à l'application via les formulaires d'accueil.
* On peut se connnecter via Google sur la page de login.

* On peut se déconnecter avec le bouton "Logout" dans la barre de navigation.
* Dans la barre de recherche on peut trouver un user ou un post par hashtag ou description.

Page Home :
* On peut voir la liste des utilisateurs et se rendre sur leur profil en cliquant dessus.
* On peut voir la liste de toutes les publications (et leur détails en cliquant dessus).

Page Profil :
* On peut éditer les données de son profil via le bouton "Edit account".
* On peut supprimer son compte via le bouton "Delete account".
* On peut créer un post avec le bouton "Upload a picture".
* On peut consulter ses posts et leurs détails en cliquant dessus.
