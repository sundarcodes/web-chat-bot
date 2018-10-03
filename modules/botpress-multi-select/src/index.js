export const Plugin = ({ slots, id, onSendData }) => {
  console.log('Plugin view');
  const handleChange = e => {
    onSendData({
      type: 'text',
      text: `Selected ${e.target.value} date-time`,
      data: { date: e.target.value, messageId: id }
    });
  };

  return (
    <select onChange={handleChange}>
      {(slots || []).map((slot, i) => (
        <option value={slot.id} key={slot.id}>
          {slot.name}
        </option>
      ))}
    </select>
  );
};

export const Entry = () => {
  console.log('Select initialized');
  return <div>Hello World</div>;
}; // Could be used for initialization

if (typeof window !== 'undefined') {
  window.botpress = window.botpress || {};
  window.botpress['botpress-multi-select'] = { Plugin, Entry };
}
