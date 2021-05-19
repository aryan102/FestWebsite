var Activity = require("../models/activity");

var mongoose = require("mongoose");

mongoose.connect("localhost:27017/fest2");
// var pro= new Activity() so by doing this we store 1 Activity of SCHEMA "Activity" in variable pro....but here we have 
//done the same thing in array so that we can use loop.
var activities = [
    new Activity({
        imagePath: "https://www.colleges-fenway.org/wp-content/uploads/2018/08/College-fest-480x237.jpg",
        title: "Golf Pit Game",
        description: "A fun activity where players get chance to experience a mini golf tour!",
        price: 80
    }),
    new Activity({
        imagePath: "https://tse2.mm.bing.net/th?id=OIP.RdxO_gKsh7pqX81RHNZMEwHaE8&pid=Api&P=0&w=251&h=168",
        title: "Aim and Win",
        description: "Try to throw as many balls in cups as possible and win exciting prizes! ",
        price: 70
    }),
    new Activity({
        imagePath: "https://tse1.mm.bing.net/th?id=OIP.o4t0F8XBFS7KPf2hfWnk2QHaLH&pid=Api&P=0&w=300&h=300",
        title: "Throw Balloons",
        description: "Throw Balloong in rings to earn points. The one with highest point wins!",
        price: 45
    }),
    new Activity({
        imagePath: "https://tse4.mm.bing.net/th?id=OIP.D9bz54G0JE95LdAOj8zpUQHaFj&pid=Api&P=0&w=215&h=162",
        title: "Solve the maze",
        description: "Enter through a long and confusing and try to solve it in minimum time!",
        price: 110
    }),
    new Activity({
        imagePath: "hhttps://tse4.mm.bing.net/th?id=OIP.p-rJgvKaX3HwLLsfNlMC9QHaFi&pid=Api&P=0&w=210&h=158",
        title: "Darting and winning",
        description: "Aim the dart at right position to get maximum points and win lots of prizes!",
        price: 85
    }),
    new Activity({
        imagePath: "https://tse4.mm.bing.net/th?id=OIP.xLe-pTiJ70NL5eIS2howtwHaJ3&pid=Api&P=0&w=300&h=300",
        title: "Castle of Cups",
        description: "Try to construct a castle of cups in least time!",
        price: 65
    }),
    new Activity({
        imagePath: "https://tse1.mm.bing.net/th?id=OIP.tH3cISdyIN5RIaiQut05kQHaDt&pid=Api&P=0&w=314&h=158",
        title: "Bowling",
        description: "A great Bowling with various twists!",
        price: 130
    }),
    new Activity({
        imagePath: "https://tse2.mm.bing.net/th?id=OIP.ePetN9DPqaeeCpakQvo2eQHaD4&pid=Api&P=0&w=298&h=157",
        title: "Giant Uno",
        description: "A Big UNO game with great number of players and different twists",
        price: 95
    }),

];
//array of Activity name is Activities
//looping is done over all Activities but as we know that node is a-synchronous so when we save a particular Activity 
var c=0;
for (var i = 0; i < activities.length; i++) {
    activities[i].save(function(err, result) {
        c++;
        console.log("saved successfully!");
        if(c==activities.length){
            mongoose.disconnect();
        }
    });
}
