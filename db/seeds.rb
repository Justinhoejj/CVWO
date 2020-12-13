# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
task = Task.create([
    { title:'first task on list',
      body: 'First body stuff describing first task'
    },
    { title:'2 second task on list',
      body: 'Second body stuff describing second task'},
    { title:'third seeded on list',
      body: '3 third body stuff describing third task'}
])