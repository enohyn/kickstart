'use strict';

var routes = require('next-routes')();

routes.add('/campaigns/new', '/campaigns/new').add('/campaigns/:address', '/campaigns/show').add('/campaigns/:address/requests', '/campaigns/requests/index').add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVEsQUFBZDs7QUFFQSxPQUNDLEFBREQsSUFDSyxBQURMLGtCQUNzQixBQUR0QixrQkFFQyxBQUZELElBRUssQUFGTCx1QkFFMkIsQUFGM0IsbUJBR0MsQUFIRCxJQUdLLEFBSEwsZ0NBR29DLEFBSHBDLDZCQUlDLEFBSkQsSUFJSyxBQUpMLG9DQUl3QyxBQUp4Qzs7QUFNQSxPQUFPLEFBQVAsVUFBZSxBQUFmIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9zaGF5b2sva2lja3N0YXJ0In0=