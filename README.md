# Project Description
<div style="text-align:justify">

This project is the source code of movie stream portal web application written by using **React.JS**, 
**TypeScript**, **Okta Authorization and Authentication with JWT**, **Spring Boot**, 
**JPA**, **Hibernate**, **HTML**, **JavaScript** and **MySQL**. 
We can design Okta-Authorization-end to have two types of users in this application, 
and they may be named as "admin" and "user" or "customer."
An unregistered user is able to:

- watch all the movie trailers
- view a list of all added movies on the platform(database)
- categorize the list of all added movies with respect to their genres, years and IMDB rating
- view a list of all reviews for any added movies on the platform(database)

A registered/customer/user additionally is able to:

- watch a movie
- add/delete any movies to/from their watchlist
- view the list of movies they have watched already in their history tab
- leave a review and rating for the movie
- leave a query for the admins to get a response

And an admin additionally is able to

+ add a new movie
+ change any movies
+ remove any movies
+ answer to the queries sent by the users/customers

</div>

## [Application Architecture]()
<div style="text-align:justify">

This application architecture is based on the regular **Spring MVC**.
Our controllers will handle our web requests.
We have a service layer that provides our business logic and the repository provides our database access.
And we used React.JS with typescript for our frontend/UI.
For user authentication/registration, we use **Okta** Service.
Simply, according to the Okta's authentication, the user/admin has corresponding functionalities,
that we discussed above.

<div align="center">
    <img src="https://github.com/korhanertancakmak/MovieWebApplication/blob/master/images/01.png" alt="image01">
</div>

</div>

## [Getting Started]()
### [Clone the Repository]()
<div style="text-align:justify">

````shell
git clone https://github.com/korhanertancakmak/MovieWebApplication.git
cd MovieWebApplication
````
</div>

### [Set Up MySQL Database]()
<div style="text-align:justify">

Run the following scripts in the `01-database/Scripts` folder in your **MySQL** environment:

1. [Create movieApp Tables](https://github.com/korhanertancakmak/MovieWebApplication/blob/master/01-database/Scripts/MOVIEAPP_CREATE_TABLES.sql)
2. [Fill the tables with samples part-I](https://github.com/korhanertancakmak/MovieWebApplication/blob/master/01-database/Scripts/MOVIEAPP_DUMP_MOVIES_S1.sql)
3. [Fill the tables with samples part-II](https://github.com/korhanertancakmak/MovieWebApplication/blob/master/01-database/Scripts/MOVIEAPP_DUMP_MOVIES_S2.sql)

</div>

### [Set Up App Integration on Okta Account]()
<div style="text-align:justify">

* Go to [Okta.com](https://developer.okta.com/) and sign up for a free account.
    + No credit cards required
    + Supports 1000 users for free
* In Okta developer account, Add person under Directory > People with these credentials:
    + User type: `User`
    + First name: `Test`
    + Last name: `User`
    + Username: `testuser@mymovieapp.com`
    + Password (Set by admin): `abc123!`
* After confirming the new user has been created, click on Create App Integration under Applications. 
    + Sign-in method: `OIDC - OpenID Connect`
    + Application-type: `Single-Page Application`
    + App Integration name: `MyMovieApp`
    + Grant type: `Authorization Code`
    + Sign-in redirect URIs: `http://localhost:3000/login/callback`
    + Sign-out redirect URIs: `http://localhost:3000`
    + Trusted Origins: `http://localhost:3000`
    + Assignments > Controlled access: `Allow everyone in your organization to access`
    + Enable immediate access: `Enable immediate access with Federation Broker Mode`
* Once you save above, we will get a client ID:

<div align="center">
    <img src="https://github.com/korhanertancakmak/MovieWebApplication/blob/master/images/02.png" alt="image02">
</div>

* Create `admin` user under Directory > People with these credentials:
    + User type: `User`
    + First name: `Admin`
    + Last name: `User`
    + Username: `adminuser@mymovieapp.com`
    + Password (Set by admin): `abc123!`
* Go ahead Directory > Profile Editor, click on `MyMovieApp` Profile, add a new attribute (role/userType):
    + Data type: `string`
    + Display name: `User Type`
    + Variable name: `userType`
    + Description: `leave default`
    + Enum: `leave default`
    + Attribute length: `leave default`
    + Attribute required: `leave default`
    + Scope: `leave default`
* Click on `Mappings` of `MyMovieApp` Profile under `Profile Editor`, from `okta user profile` to `appuser` mapping:
    + Add `user.userType => userType` by applying mapping on user creation and update, this must be green!.
    + Save and apply updates now.
* Click on `Mappings` of `MyMovieApp` Profile under `Profile Editor`, from `appuser` to `okta user profile` mapping:
    + Add `appuser.userType => userType` by applying mapping on user create only, this may be yellow!.
    + Save and apply updates now.
* Go ahead Security > API > default Authorization Server, and edit it, click on Claims tab, add a new claim:
    + Name: `userType`
    + Include in token type: `leave default`
    + Value type: `leave default`
    + Value: `(appuser != null) ? appuser.userType : app.clientId`
    + Disable claim: `leave default`
    + Include in: `leave default`
* Go ahead Directory > People > Admin User > Profile tab, edit it only:
    + User Type: `admin`
* Go ahead Directory > Groups, create two groups:
    + Name: `MovieApp Admins`
    + Description: `Admins in the movie application`
    + User Type: `leave default`
    + Name: `MovieApp Users`
    + Description: `Users in the movie application`
    + User Type: `leave default`
* Go ahead Directory > Groups > Rules, create two rules:
    + Name: `MovieApp Admin to Add`
    + IF: `Use Okta Expression Language (Advanced) => user.userType == 'admin' AND user.userType != ''`
    + THEN Assign to: `MovieApp Admins`
    + Name: `MovieApp Users to Add`
    + IF: `Use Okta Expression Language (Advanced) => user.userType == '' OR user.userType == 'user'`
    + THEN Assign to: `MovieApp Users`
* Go ahead Applications > Applications > Sign On Policy, add rule:
    + Rule Name: `MovieApp Users and Admins`
    + Who does this rule apply to: `The following groups and users: MovieApp Admins - MovieApp Users`
    + all other fields: `leave default`
* Go ahead Directory > Self-Service Registration, and enable it:
    + Assign to group: `MovieApp Users`
    + Activation requirements: `User must verify email address to be activated`
    + Default redirect: Custom URL: `http://localhost:3000`
    + all other fields: `leave default`
</div>

### [Run the Spring-boot(Backend) Application]()
<div style="text-align:justify">

First, we need to modify `DotenvFile.env` file under `02-backend` folder accordingly:

````shell
DB_URL=jdbc:mysql://localhost:3306/movie_application_database
DB_USERNAME=<your-username>
DB_PASSWORD=<your-password>

OKTA_ISSUER=https://<your-okta-domain>/oauth2/default
OKTA_CLIENT_ID=<your-client-id>
FRONTEND_URL=http://localhost:3000/
````

Rename it to `.env` and, use **Maven** to build and start the **Spring Boot** application:

````shell
export $(cat .env | xargs) && mvn spring-boot:run
````

You can access the application's backend API by navigating to `http://localhost:8080`
</div>

### [Run the React(Frontend) Application]()
<div style="text-align:justify">

First, we need to modify `DotenvFile.env` file under `02-backend` folder accordingly:

````shell
REACT_APP_API = 'http://localhost:8080'
REACT_APP_OKTA_CLIENT_ID = '<your-client-id>'
REACT_APP_OKTA_ISSUER = 'https://<your-okta-domain>/oauth2/default'
REACT_APP_OKTA_REDIRECT_URI = 'https://localhost:3000/login/callback'
````

Rename it to `.env` and, use **npm** to install dependencies and start the **React** application:

````shell
npm install
npm start
````

You can access the application by navigating to `http://localhost:3000`
</div>

### [Some frames from the Application]()
<div style="text-align:justify">



</div>

### [License]()
<div style="text-align:justify">

This project is licensed under the MIT License -
see the [LICENSE](https://github.com/korhanertancakmak/JobPortalWebApplication/blob/master/LICENSE) file for details.
</div>