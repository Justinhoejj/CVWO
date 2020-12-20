# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tasks =Task.create([
    {
        title: 'Second task',
        body: 'Second body',
        done: false,
        due: Date.parse('30 December 2020')

    },
    {
        title:'Third task',
        body:'Third body',
        done: false,
        due: Date.parse('30 December 2020')    
    }

])

tags=Tag.create([
    {
        name:'tag1'
    },
    {
        name:'tag2'
    }
])

taggings=Tagging.create([
    {
        task: tasks.first, #first task on this page
        tag: tags.first     #first tag on this page
    },
    {
        task: tasks.first,
        tag: tags.last
    }
])