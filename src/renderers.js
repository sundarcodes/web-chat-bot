module.exports = {
  '#login-form': data => [{ typing: true, type: 'login_prompt' }],
  choice: data => ({
    text: data.text,
    quick_replies: data.choices.map(choice => `<${choice.id}> ${choice.name}`),
    typing: data.typing || '2s'
  }),
  sendText: text => ({
    text,
    typing: '2s'
  }),
  '#select': data => ({
    text: 'Select option',
    type: 'botpress-multi-select',
    data: { slots: data }
  })
};
