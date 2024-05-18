# Cryptocurrency Dashboard

This web application provides a dashboard for viewing and managing cryptocurrency data. Users can explore cryptocurrency information, perform searches, apply filters, and visualize data using charts.

## Features

- **Dashboard**: View cryptocurrency data in a tabular format.
- **Search**: Search for cryptocurrencies by name or ID.
- **Sorting**: Sort cryptocurrency data by various attributes.
- **Filtering**: Apply filters based on rank, price, and other criteria.
- **Pagination**: Navigate through multiple pages of cryptocurrency data.
- **Chart Visualization**: View cryptocurrency data using charts for better insights.
- **Delete Functionality**: Delete selected cryptocurrencies.
- **Export Data**: Export cryptocurrency data.
- **Responsive Design**: Ensure proper display on different devices and screen sizes.

## Technologies Used

- **ReactJS**: Frontend JavaScript library for building user interfaces.
- **Axios**: HTTP client for making API requests.
- **CSS**: Styling the components.
- **Coinlore API**: Source of cryptocurrency data.

## Project Structure

The project follows a structured organization with separate components for the table, pagination, filter, chart, etc. Here's the directory structure:

src/
|-- components/
| |-- Table/
| | |-- Table.js
| | |-- Table.css
| |-- Pagination/
| | |-- Pagination.js
| |-- Filter/
| | |-- Filter.js
| |-- SortIcon/
| | |-- SortIcon.js
| |-- Chart/
| | |-- Chart.js
|-- App.js
|-- index.js

## API Usage

This project fetches cryptocurrency data from the Coinlore API. The API endpoint used is:

  - https://api.coinlore.net/api/tickers/

## Credits

  - Icons made by Freepik from www.flaticon.com.

## License

  - This project is licensed under the MIT License.
