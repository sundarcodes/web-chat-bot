const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '',
    user: '',
    password: '',
    database: ''
  }
});
const _ = require('lodash');

const loadAllPlugin = async () => knex('plugin_master').select('id', 'name');

let plugins = {};
initialize = async () => {
  const pluginList = await loadAllPlugin();
  _.each(pluginList, plugin => {
    plugins[plugin['id']] = plugin['name'];
  });
};

initialize().then(() => {});

const fetchClientDetailsByEmail = async email => {
  return knex('client_with_emails')
    .join('email_master', 'client_with_emails.id', 'email_master.client_id')
    .whereRaw('email_master.email like ?', [email])
    .select('domain', 'company_name', 'tech_spend', 'plugins');
};

const fetchClientsWithNoEmailList = async pluginId => {
  return knex.raw(
    `select * from client_with_no_emails where plugins @> ARRAY[${pluginId}] limit 10`
  );
};

module.exports = {
  fetchClientDetailsByEmail,
  plugins,
  fetchClientsWithNoEmailList
};
