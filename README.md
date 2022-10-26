# STOCK ANALYSIS WEBAPP

## TECH STACK USED

- DATABASE: PostgreSQL
- DATA API Script: Python
- BACKEND SERVER: NodeJS
- FRONTEND: Angular

## SETUP

1. Make a PostgreSQL database on your system, say named "zenskar".
2. Install python libraries: ```psycopg2``` and ```nsepy```
3. Change the database conection line in ```data.py``` and according to your postgresql database, which include ```dbname```, ```host```, ```port```, ```user```, etc.
4. Run "```data.py --start <start_date> --end <end_date>```" to download the nse stocks data, create a table in existing database and insering the data received, where start and end flags are optional (default values of which are set to "2021-01-01" and "2021-01-10" respectively, following "yyyy-mm-dd" format).
5. After data is inserted in database, go to "backend" folder and change ```db.js``` file, which is a config file for database connection, similar to the python file step.
6. Run ```npm install``` for both backend and frontend folders seperately.
7. Start the backend server using ```node index``` in one terminal.
8. Start the fronted angular app using ```ng serve``` in another terminal.
9. The app will be deployed at ```localhost:4200```. 

## WEBAPP

The webapp consists of four components, three used for analysis and one is the dashboard/home component. Analysis is available via forms which accepts stock, start date and end date as inputs and prints and graphs the close prices of that period.

There is also an option to view close prices of 10 popular stocks for a single date. The list of available dates are provided to choose from.

And lastly, Similar to close prices, one can also see high and low prices of a stock for a similar period.




