export function getContacts() {
  console.log('i was fired');
  return [
    {
      id: 1,
      first: 'Your',
      last: 'Name',
      avatar: 'https://placekitten.com/g/200/200',
      twitter: 'your_handle',
      notes: 'Some notes',
      favorite: true,
    },
  ];
}
