# Read this first!
This repository is a template repository for our technical interview, so create your own project using this guide:

[Github - Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

An alternative is to download the code and create a new repository using a different VCS provider (gitlab / Azure repos). **Do not fork this repository.**

When you have completed the tasks, please share the repository link with us. We will review your submission before the interview.

Good luck! 😊

<br />

# frontend-coding-task

## Tech stack
This is a basic [React](https://reactjs.org/) 18 application set up with [SWR](https://swr.vercel.app/) for data fetching, [Formik](https://formik.org/docs/overview) for handling form state and [styled-components](https://styled-components.com/docs) for CSS-in-JS.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Tasks
You can include additional npm packages to solve the tasks, but please include a justification for each package you choose to include.

### Refactor the codebase
Organize the code better with a focus on readability and reusability.

### Implement validation for the forms
Before we allow the user to submit the forms for Claims and Covers, we should validate that the values are correct.
If there are any issues with the values in the form, the user should see a message indicating which field(s) has errors and what the error is.
In addition to validating the data types, the following rules should be implemented:

* Claim
  * DamageCost cannot exceed 100.000
* Cover
  * StartDate cannot be in the past
  * Total insurance period cannot exceed 1 year
* All text fields should have a maximum of 25 characters
* No fields can be empty

### Add some unit tests
This repository is set up with Jest and React Testing Library, but there is only a single unit test in this repository.
Implement some additional unit test and focus on the validation logic.


### Form state after submit and delete
After submitting a new Claim/Cover or deleting a Claim/cover, you currently have to refresh the page to view the updated list of Claims/Covers.
Make it so that the list automatically updates after changes are made.


### Error handling
Currently, if any API request fails, it will silently fail and the user will be unaware of any potential issues.
If any network requests fail, we should throw an error.
But we don't want to crash the application if an error is thrown, instead we should display a human readable error message to the user and log the real error message. (a `console.log()` will do for now.)

### Link the two forms together
When submitting a Claim, a `coverId` is expected.
Let the user select a Cover when creating a new Claim and include that coverId in the request to the backend when submitting new Claims.
In the list of Claims, there should be a new column with a link to a separate page which displays all information regarding that cover. The new page can have the following route: `/covers/:coverId`


## Full stack tasks
### Connect to the 'backend-coding-task' API
Run the provided API locally and use it as the backend API for this frontend application. There are some CORS issues which must be solved for this to work.

### Get available Claim types and Cover types from the backend
In the backend we have enums for ClaimType and CoverType. We would like to use those values in the frontend as well.
Set up endpoints for them in the backend and fetch them in the frontend. The 'Type' fields in the forms should be replaced with a dropdown containing the values from the backend.
