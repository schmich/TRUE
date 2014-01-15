module.exports = [
  {
    name: 'Hello, world!',
    script: '"Hello, "[^$~][,]#%"!"',
    input: 'world',
    description: ''
  },
  {
    name: 'Factorial',
    script: '[$1=$[\\%1\\]?~[$1-f;!*]?]f:\n10f;!.',
    description: 'Prints 10!'
  },
  {
    name: 'Even/odd',
    script: '[$2/2*=]even:\n[even;!~]odd:\n6even;!.',
    description: 'Computes parity using integer math.'
  },
  {
    name: 'Even/odd',
    script: '[$0=$[1_\\@%]?~[1-odd;!]?]even:\n[$0=$[0\\@%]?~[1-even;!]?]odd:\n6even;!.',
    description: 'Computes parity using mutual recursion.'
  },
  {
    name: 'Quine',
    script: '["\'[,34,$!34,\'],!"]\'[,34,$!34,\'],!',
    description: 'A program that prints its own source code.'
  },
  {
    name: 'Primes up to 100',
    script: "99 9[1-$][\\$@$@$@$@\\/*=[1-$$[%\\1-$@]?0=[\\$.' ,\\]?]?]#",
    description: 'Prints all primes between 0 and 100.'
  },
  {
    name: 'strrev',
    script: '0[^$~][]#%[$][,]#%',
    input: 'hello',
    description: 'Prints the input text in reverse.'
  },
  {
    name: 'strlen',
    script: '0[^~][1+]#.',
    input: 'hello',
    description: 'Prints the length of the input text.'
  },
  {
    name: 'ABCs',
    script: '27 [1-$][$91\\-,]#',
    description: 'Prints the alphabet A-Z.'
  },
  {
    name: 'Simple add',
    script: '[[$][1-\\1+\\]#%]add:\n5 7add;!.',
    description: 'Implements addition using only increment (+1) and decrement (-1) operations.'
  },
  {
    name: 'Parse integer',
    script: '[$$47>\\58\\>&]d:\n[0[^d;!][\\10*\\48-+]#%]r:\nr;!r;!+.',
    input: '32 10',
    description: 'Reads two integers from input and adds them.'
  },
  {
    name: 'Read all input',
    script: '0[^$~][]#%',
    input: 'hello',
    description: 'Reads all input onto the stack, terminated with a zero.'
  },
  {
    name: 'Palindrome',
    script: '[0[^$~][]#%]r:\n[1[$ø0=~][1+]#1-]l:\n[1_a:l;!1-b:0t:\n [b;t;>][b;øt;1+ø=a;&a:b;1-b:t;1+t:]#\na;]p:\nr;!p;!$["yes"]?~["no"]?',
    input: 'amanaplanacanalpanama',
    description: 'Determines whether the input text is a palindrome or not. Makes heavy use of variables.'
  },
  {
    name: 'Star square',
    script: "[1+$[1-$]['*,]#%%]b: { draws top/bottom border }\n[$$1=$[\"*\"%%]?~[ { handle corner case of size 1 }\n b;! { draw top border }\n $$1-[1-$] { for each open row }\n  [\\10,'*,$1-[1-$][' ,]#%\\'*,] { print open row }\n  #%%10, { print trailing newline }\n b;! { draw bottom border }\n]?]d:\n7d;!",
    description: 'Draws a 7x7 ASCII square made of stars.'
  }
];

