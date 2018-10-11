const dbService = require('./service/queries');
const _ = require('lodash');

/**
 * Description of the action goes here
 * @param  {String} params.searchString=value Description of the parameter goes here
 */
async function searchForClientInfo(state, event, params) {
  console.log(params.searchString);
  // Check if the search string is an email or domain name
  const emailRegeX = /([a-z0-9]*@[a-z0-9]*[.][a-z0-9]*)/;
  let clientDetail = null;
  if (params.searchString.match(emailRegeX)) {
    // Search as Email
    const rows = await dbService.fetchClientDetailsByEmail(params.searchString);
    console.log(rows);
    if (rows.length > 0) {
      clientDetail = {
        ...rows[0],
        plugins: rows[0].plugins
          .map(plugin => dbService.plugins[plugin])
          .join(',')
      };
      console.log(clientDetail);
    } else {
      clientDetail = null;
    }
  } else {
    // search as domain
  }
  return {
    ...state,
    clientDetail
  };
}

async function showListOfPlugins(state, event) {
  // const plugins = _.map(dbService.plugins, (value, key) => ({
  //   id: key,
  //   name: value
  // }));
  const plugins = [
    {
      id: 1,
      name: 'Cricket'
    },
    {
      id: 2,
      name: 'Football'
    },
    {
      id: 3,
      name: 'BasketBall'
    }
  ];
  // const dataToBeRendered = {
  //   text: 'Please select the plugins list',
  //   choices: plugins
  // };
  console.log(plugins);
  // await event.reply('choice', dataToBeRendered);
  await event.reply('#select', { plugins });
}

async function fetchClientsWithNoEmails(state, event) {
  console.log(event.payload);
  const result = await dbService.fetchClientsWithNoEmailList(event.payload);
  const dataToBeSent = {
    text: result.rows.map(row => row['domain']).join(','),
    choices: [
      {
        id: 1,
        name: 'Do you want to get some more data'
      },
      {
        id: 2,
        name: 'No I am done..'
      }
    ]
  };
  await event.reply('choice', dataToBeSent);
}

async function handleUserChoice(state, event) {
  console.log(event.payload);
  const isDone = event.payload == 2 ? true : false;
  return {
    ...state,
    isDone
  };
}

module.exports = {
  searchForClientInfo,
  fetchClientsWithNoEmails,
  showListOfPlugins,
  handleUserChoice
};
