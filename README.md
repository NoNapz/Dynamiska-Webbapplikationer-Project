# W-Project
--------------------------Dynamiska webb ------------------------------- 
By: Robin Hellström (h19robhe@du.se) and David Thiman (h19davth@du.se)
------------------------------------------------------------------------

Hello, we've decided to keep our project as a "one-page" design 
to ease up the navigation for the users.

The project was pretty overwhelming but we achived our goals!
T'Was an intesting challenge to say the least, we learnt a lot in the process.

We tackled this problem in a good way by sketching a kanban board 
and drawing a database diagram (UML) from it. Then we created our 
mock-up for the actual layout of the project. We then kicked off 
the project by implementing sessions, logging in and registration 
functionality. And based on starting a session, we can easily save 
the user in our VUE and back-end. And from there perform operations 
based on the logged in user's session. Because sessions were new to 
both of us, it was the most difficult but also most facilitating part 
to get ready first to get the rest of the project running smoothly.

The most complex part besides Sessions was getting likes / dislikes 
to work. In principle, it sounds really simple, we then realized how 
much a functioning like / dislike system really needs. We must have 
a user ID, post ID / response ID and save it in our database to prevent 
users from liking / disliking multiple times. But after we found a 
solution to the problem, the project went on quickly again.

The results was better than we expected, we hope you like it as much
as we do. 

The combination of VUE, Jquery and SQLite felt pretty "scuffed",
but as mentioned above we learnt a lot doing this!

Cheers!

We decided to modify some of the points to suit our project 
but still be within the "scope" of the goals.

SUPER ADMINS:
Username: Tass Password: ABC123
Username: Hyena Password ABC123

CONTRIBUTROS
Username: ContributorLAD Password: ABC123
Username: HelpzOut Password: ABC123

CONSUMERS:
Username: FutureSucks Password: ABC123
Username: Davbin Password: ABC123
Username: Toxic Password: ABC123


-------THINGS WE'VE USED TO COMPLETE THE PROJECT-----------

GENERAL:
HTML 
CSS (responsive design)
Bootstrap
Node
Vue
Jquery
SQLite(3)

DEPENDECYS USED:
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "nodemon": "^2.0.6",
    "passport": "^0.4.1",
    "sqlite": "^4.0.18",
    "sqlite3": "^5.0.0"

------------------------------------------------------------

-- Project Desc -- Project flow - 

-As Consumer- (Ask questions and consume information (answers))

<!-- * COMPLETE -->
• I should be able to login as a consumer.

<!-- * COMPLETE -->
• I should be able to administer my questions i.e. add, delete and update them. The data that each question has is: question title, the question text, date/time when it was created and the category that the question falls under.
(You have to think about database design, for example: qsID which is a primary key, unique and automatically enumerated).

<!-- * COMPLETE -->
• I should also be able to see a list of FAQ (frequently asked questions) returned as a result of a search query (linked to category).

<!-- * COMPLETE -->
• I should be able to view all my questions.

<!-- * COMPLETE -->
• Once a contributor has added an answer to my question, I should be able to see it below my question.

-As Contributor- (Provide information (answers) to questions)

<!-- * COMPLETE -->
• I should be able to login as contributor.

<!-- * COMPLETE -->
• I should be able to see a list of questions classified by category.

<!-- * COMPLETE -->
• Under each question there should be a place for me to add my answer with my username and answer text. The date/time should be appended automatically.

<!-- * COMPLETE -->
• I should also be able to update my answer or delete it.

<!-- * COMPLETE -->
• The consumer should be able to see the answer I have provided to their question.

-As Super Admin- (See a list of all questions and administer the questions and the users)

<!-- * COMPLETE -->
I should be able to login as super admin.

<!-- * COMPLETE -->
• Under each question I should be able to see all answers related to it. For both the questions and answers I should be able to see all related information: user, 
text and date/time. For answers, I should be able to view up-votes/down-votes (see further functionality requirements below).

<!-- * COMPLETE -->
• I should be able to block a user (i.e. consumer or contributor) for misconduct. In this scenario, when that user attempts to login they should not be able to login and should read somewhere that their account has been blocked.

<!-- * COMPLETE -->
• I should be able to manage contributors (i.e. add contributor, delete contributor and update contributor information).

Further functionality for contributor:

<!-- * COMPLETE -->
• I should be able to label a question as duplicate.

<!-- * COMPLETE -->
• More than one contributor can add answers to the same question.

Further functionality for consumer:

<!-- * COMPLETE -->
• I should be able to up-vote/down-vote an answer to my question.
