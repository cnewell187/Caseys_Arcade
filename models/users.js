var users = [{
  name: 'Bilbert',
  email: 'ChillyBeans@herp.com',
  age: 73,
},
{
  name:'Earl',
  email: 'myNameIsEarl@karma.com',
  age: 36,
}];

module.exports = {

  findAll: function(){
    return users;
  },

  find: function(index){
    return users[index];
  },

  add: function(user){
    users.push(user);
  },

  delete: function(index){
    users.splice(index, 1);
  },
}
