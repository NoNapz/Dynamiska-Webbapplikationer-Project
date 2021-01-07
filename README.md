# W-Project
Dynamiska webb

-- Project Desc --

Front-end requirements:
Make a user-friendly interface that opens immediately when the server is
running and http://localhost:XXX is entered in the browser. We shouldn't have
to look for the html page in your folder structure.
Each type of user; the consumer and the contributor should be directed to the
layout that concerns their tasks based on their permissions. The super admin
should be able to navigate to all layouts.
You have the freedom to choose the design you imagine for such a Q&A
engine, but make sure it’s easy to navigate and that information/actions are
where a user would “expect” them to be.

Other:
Be sure to name variables, objects, methods/functions so that they reflect this
task of Q&A, questions, answers etc. We don't want to see anything about, for
example, products, cars job ads or other irrelevant things.
Remember to enter the source (links or what lectures) from which you got
inspiration for your code.
Try unzipping and running your zipped node.js project before submitting it.
After the teacher unzips the submitted zipped node.js project, it must be
possible to open and run through node server.js and/or through npm run
server. If not, you will automatically fail.

G Task: (3p)
There are a limited number of contributors pre-selected for answering
questions, hence the number of contributors must be pre-determined. This
provides a clear distinction between consumers and contributors.
NOTE: The different users should login with different permissions. Follow this
tutorial for tips on how to manage sessions with Node.js and Express:

https://codeforgeek.com/manage-session-using-node-js-express-4/


- Project flow - 

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

<!-- * COMPLETE --> TODO: Actually ban
• I should be able to block a user (i.e. consumer or contributor) for misconduct. In this scenario, when that user attempts to login they should not be able to login and should read somewhere that their account has been blocked.

<!-- * COMPLETE -->
• I should be able to manage contributors (i.e. add contributor, delete contributor and update contributor information).

Further functionality for contributor:

<!-- * COMPLETE --> TODO: Dynamically
• I should be able to label a question as duplicate.

<!-- * COMPLETE -->
• More than one contributor can add answers to the same question.

Further functionality for consumer:

FIXME:
• I should be able to up-vote/down-vote an answer to my question.

TODO:

Likes: create, and remove likes, one like/user.
Styling: THEN WE ARE FUCKING DONE!
