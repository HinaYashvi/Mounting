var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'index',
  },
  {
    path: '/internet/',
    url: './internet.html',
    name: 'internet',
  }, 
  {
    path: '/message/:showMessage/',
    url: './message.html?showMessage={{showMessage}}',
    name: 'message',
  }  
];
