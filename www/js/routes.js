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
    path: '/message_page/:showMessage/',
    url: './message_page.html?showMessage={{showMessage}}',
    name: 'message_page',
  }  
];
