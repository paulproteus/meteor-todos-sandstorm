// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  // On Sandstorm, create demo data differently.
  if (process.env.SANDSTORM === "1") {
    var Fs = Npm.require('fs');
    if (Fs.existsSync('/var/initialized')) {
      return;
    } else {
      if (Lists.find().count() === 0) {
        Lists.insert({
          name: "My List",
          incompleteCount: 0});
      }
      Fs.writeFileSync('/var/initialized', '', 'utf-8');
      return;
    }
  }
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Meteor Principles",
       items: ["Data on the Wire",
         "One Language",
         "Database Everywhere",
         "Latency Compensation",
         "Full Stack Reactivity",
         "Embrace the Ecosystem",
         "Simplicity Equals Productivity"
       ]
      },
      {name: "Languages",
       items: ["Lisp",
         "C",
         "C++",
         "Python",
         "Ruby",
         "JavaScript",
         "Scala",
         "Erlang",
         "6502 Assembly"
         ]
      },
      {name: "Favorite Scientists",
       items: ["Ada Lovelace",
         "Grace Hopper",
         "Marie Curie",
         "Carl Friedrich Gauss",
         "Nikola Tesla",
         "Claude Shannon"
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    _.each(data, function(list) {
      var list_id = Lists.insert({name: list.name,
        incompleteCount: list.items.length});

      _.each(list.items, function(text) {
        Todos.insert({listId: list_id,
                      text: text,
                      createdAt: new Date(timestamp)});
        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
});
