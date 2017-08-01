# Payroll calculator exercise

## Scope
- Create a generic payslip calculator as well as the ability to generate an adhoc payslip (rather than a payroll run)
- Payslip to include the features: gross and net income per pay period, employer super contribution based on a variable percentage per pay period, tax paid per pay period
- Limit amount of super that can be applied to 50% or less of salary
- It's a responsive website (would work on a phone's browser)
- Ability to print payslip

## Assumptions
- Tax table data is public information, that could be made available via a public api (currently this table is a stub in Mulesoft anypoint)
- We've gone back in time to 2012/2013 and any tax tables created for subsequent years haven't been created yet and could be anything
- Pay periods are set per calendar month. This is currently limited to three months in the past and three months in the future (although can be configured)
- No fields are required, any part of the calculator can be used without the others, limiting it to functionality based solely on what is entered

## To run app

To setup your machine, you just need first to get node and npm installed and **git clone** this repo.
This has been tested with node 5.11.0 and 6.11.2, as well as npm 3.10.10 and 4.4.1

Then you can run:

    ## Install gulp globally
    npm install -g gulp

    ## Install all the dependencies locally (to run from the repo root)
    npm install

    ## Start the server - this will watch changes to the files defined to be watched in gulpfile.js
    ## and stream the changes back to the browser
    npm start

    ## Run jest unit tests directly
    npm test

Alternatively, you can double click the index.html file and run it locally ;)
