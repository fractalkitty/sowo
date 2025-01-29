//RC creativecoding jam 1-29-25
let stepStatus = 'start';
let maze;
let slug;



function setup(){
  makeMaze()
  updateRoom();
  noCanvas();
}

function makeMaze() {
  maze = {
    start: {
      description:
        "You sit at the edge of a trail, and just within sight is a delicious rotten leaf - across the trail. ",
      choices: {
        left: "Cross the trail.",
        right: "Seek a bridge."
      },
      results: {
        left: "end1",
        right: "log1"
      }
    },
    log1: {
      description:
        "Up the trail you find a log that extends across the trail. ",
      choices: {
        above: "Cross on top of the log.",
        below: "Cross next to the log."
      },
      results: {
        above: "end1",
        below: "leafChoice"
      }
    },
    leafChoice: {
      description: "You make it across, but there is a poison oak leaf closer now.",
      choices: {
        leaf: "Glide back to the other leaf over that rise.",
        oak: "Go for the poison oak"
      },
      results: {
        leaf: "path2",
        oak: "eatOak"
      }
    },
    eatOak: {
      description: "The poison oak is deliciously rotting. When you are full you realize a dry wind is picking up.",
      choices: {
        bark: "Make your way to that bark over there.",
        home: "Go back across the log your home."
      },
      results: {
        bark: "barkhome",
        home: "end3"
      }
    },
    barkhome: {
      description: "You make it to the bark. It is moist and there is soft moss underneath. You realize there is a mysterious slime network here. Do you follow it?",
      choices: {
        stay: "Stay put - it's dry out there.",
        go: "Follow the mystery."
      },
      results: {
        stay: "end4",
        go: "network"
      }
    },
    network: {
      description: "You follow the slime network branch under the beds of moss. You find a fork in the trail.",
      choices: {
        rightP: "Go toward the sunny trail.",
        leftP: "Follow the trail into a hollowed out log."
      },
      results: {
        rightP: "end3",
        leftP: "toFight"
      }
    },
    toFight: {
      description: "The log is dark and you are suddenly slapped by a slimy tail.",
      choices: {
        fight: "Slap and dance with all your heart.",
        run: "Run away!"
      },
      results: {
        fight: "romance",
        run: "end5"
      }
    },
    romance: {
      description: "As you dance and slap you realize that you are fighting with another banana slug. ",
      choices: {
        love: "It's love at second slap. Make a move.",
        run: "Run away!"
      },
      results: {
        fight: "end6",
        run: "win"
      }
    },
    //romance
    win: {
      description: "Congratulations! You've successfully realized that life is best lived in solitary contemplation. ",
      choices: {
        restart: "Play again?",
        end: "End game"
      },
      results: {
        restart: "start",
        end: "start"
      }
    },
    lose: {
      description: "Game Over! The maze has claimed another victim.",
      choices: {
        restart: "Try again?",
        end: "End game"
      },
      results: {
        restart: "start",
        end: "start"
      }
    },
    end1: {
      description: random([
        "A hiker comes along and steps on you.",
        "A bike comes along and runs you over.",
        "A raven flies down the trail and decides to makes you a toy.",
        "A passerby picks you up for an amateur potions exercise."
      ]),
      choices: {
        restart: "Try again?",
        end: "End game"
      },
      results: {
        restart: "start",
        end: "start"
      }
    },
    end2: {
      description: random([
        "You find a viewpoint on a bush, but a Barred owlet finds you.",
        "Climbing to the viewpoint on the fern was fine, but the fox was not. "
      ]),
      choices: {
        restart: "Try again?",
        end: "End game"
      },
      results: {
        restart: "start",
        end: "start"
      }
    },
    end3: {
      description: random([
        "The wind is dry, you are slow, the racoon is not. ",
        "The wind is so dry. You are so thirsty and feel shrunken. You lose your way and get eaten by a passing bear. "
      ]),
      choices: {
        restart: "Try again?",
        end: "End game"
      },
      results: {
        restart: "start",
        end: "start"
      }
    },
    end4: {
      description: random([
        "A millipede stumbles into your hiding place and eats you.",
        "An elk steps on you bark shelter and crushes you. "
      ]),
      choices: {
        restart: "Try again?",
        end: "End game"
      },
      results: {
        restart: "start",
        end: "start"
      }
    },
    end5: {
      description: random([
        "You retreat only to find that you have backed into the teeth of a fox.",
        "You run away at a slug's pace right into a badger's den."
      ]),
      choices: {
        restart: "Try again?",
        end: "End game"
      },
      results: {
        restart: "start",
        end: "start"
      }
    },end6: {
      description: random([
        "Love hurts, especially when you are rejected.",
        "This other slug want nothing to do with you - you have misinterpretted the dance and are heartbroken."
      ]),
      choices: {
        restart: "Try again?",
        end: "End game"
      },
      results: {
        restart: "start",
        end: "start"
      }
    },
    path2: {
      description: random([
        "You think you know the way, but realize quickly you are lost.",
        "Uh oh - where is that leaf again?"
      ]),
      choices: {
        slide: "Go back to the poison oak. ",
        viewpoint: "Try to find a higher viewpoint."
      },
      results: {
        slide: "eatOak",
        viewpoint: "end2"
      }
    }
  };
}

function updateRoom() {
  const descriptionEl = document.getElementById('description');
  const button1 = document.getElementById('button1');
  const button2 = document.getElementById('button2');
  
  descriptionEl.textContent = maze[stepStatus].description;
  
  const choices = Object.keys(maze[stepStatus].choices);
  button1.textContent = maze[stepStatus].choices[choices[0]];
  button2.textContent = maze[stepStatus].choices[choices[1]];
}

function makeChoice(choice) {
  stepStatus = maze[stepStatus].results[choice];
  updateRoom();
}

// Set up button click handlers
document.getElementById('button1').addEventListener('click', () => {
  makeChoice(Object.keys(maze[stepStatus].choices)[0]);
});

document.getElementById('button2').addEventListener('click', () => {
  makeChoice(Object.keys(maze[stepStatus].choices)[1]);
});