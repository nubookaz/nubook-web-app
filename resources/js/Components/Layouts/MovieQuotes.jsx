import { useState, useEffect } from 'react';

const quotes = [
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    character: 'Steve Jobs',
    movie: 'Jobs',
  },
  {
    quote:
      "I'm not in this world to live up to your expectations and you're not in this world to live up to mine.",
    character: 'Bruce Nolan',
    movie: 'Bruce Almighty',
  },
  {
    quote: "It's hard to beat a person who never gives up.",
    character: 'Babe Ruth',
    movie: 'The Sandlot',
  },
  {
    quote:
      "Some people can't believe in themselves until someone else believes in them first.",
    character: 'Sean Maguire',
    movie: 'Good Will Hunting',
  },
  {
    quote:
      "You've got a dream. You gotta protect it. When people can't do something themselves, they're gonna tell you that you can't do it. You want something? Go get it.",
    character: 'Chris Gardner',
    movie: 'The Pursuit of Happyness',
  },
  {
    quote: "Don't ever let somebody tell you you can't do something.",
    character: 'Chris Gardner',
    movie: 'The Pursuit of Happyness',
  },
  {
    quote: 'Carpe Diem. Seize the day, boys. Make your lives extraordinary.',
    character: 'John Keating',
    movie: 'Dead Poets Society',
  },
  {
    quote: 'Just keep swimming.',
    character: 'Dory',
    movie: 'Finding Nemo',
  },
  {
    quote: 'Life is like a box of chocolates. You never know what you’re gonna get.',
    character: 'Forrest Gump',
    movie: 'Forrest Gump',
  },
  {
    quote: "Do not pity the dead, Harry. Pity the living, and above all, those who live without love.",
    character: 'Albus Dumbledore',
    movie: 'Harry Potter and the Deathly Hallows: Part 2',
  },
  {
    quote: "It’s not who you are underneath. It’s what you do that defines you.",
    character: 'Rachel Dawes',
    movie: 'Batman Begins',
  },
  {
    quote: 'Do what people say you cannot do!',
    character: 'Christopher',
    movie: 'The Curious Case of Benjamin Button',
  },
  {
    quote: 'Never let the fear of striking out keep you from playing the game.',
    character: 'John Hancock',
    movie: 'Cinderella Man',
  },
  {
    quote: 'I wish I knew back then what I know now.',
    character: 'Andy',
    movie: 'The Shawshank Redemption',
  },
  {
    quote: 'Get busy living, or get busy dying.',
    character: 'Andy',
    movie: 'The Shawshank Redemption',
  },
  {
    quote: 'If you build it, he will come.',
    character: 'Shoeless Joe Jackson',
    movie: 'Field of Dreams',
  },
  {
    quote:
      'Courage is not the absence of fear but rather the judgement that something is more important than fear.',
    character: 'Ambrose Redmoon',
    movie: 'The Prince of Egypt',
  },
  {
    quote: "You're gonna need a bigger boat.",
    character: 'Police Chief Martin Brody',
    movie: 'Jaws',
  },
  {
    quote: "I’m also just a girl, standing in front of a boy, asking him to love her.",
    character: 'Anna Scott',
    movie: 'Notting Hill',
  },
  {
    quote: 'To infinity and beyond!',
    character: 'Buzz Lightyear',
    movie: 'Toy Story',
  },
  {
    quote: 'After all, tomorrow is another day!',
    character: 'Scarlett O’Hara',
    movie: 'Gone with the Wind',
  },
  {
    quote: "Fasten your seatbelts. It's going to be a bumpy night.",
    character: 'Margo Channing',
    movie: 'All About Eve',
  },
  {
    quote: 'I feel the need - the need for speed!',
    character: 'Maverick and Goose',
    movie: 'Top Gun',
  },
  {
    quote: 'What we do in life echoes in eternity.',
    character: 'Maximus',
    movie: 'Gladiator',
  },
  {
    quote: 'Great men are not born great, they grow great.',
    character: 'The Godfather',
    movie: 'The Godfather',
  },
  {
    quote: 'Nobody puts Baby in a corner.',
    character: 'Johnny',
    movie: 'Dirty Dancing',
  },
  {
    quote: 'Adventure is out there!',
    character: 'Charles Muntz',
    movie: 'Up',
  },
  {
    quote: 'What if I fall? Oh darling, but what if you fly?',
    character: 'Erin Brockovich',
    movie: 'Erin Brockovich',
  },
  {
    quote: 'I wish there was a way to know you\'re in the good old days before you\'ve actually left them.',
    character: 'Andy',
    movie: 'The Office',
  },
  {
    quote: "I don’t have to win, I just don’t want to lose.",
    character: 'James Hunt',
    movie: 'Rush',
  },
  {
    quote: 'Keep your friends close, but your enemies closer.',
    character: 'Michael Corleone',
    movie: 'The Godfather Part II',
  },
  {
    quote: 'I love the smell of napalm in the morning.',
    character: 'Lieutenant Colonel Bill Kilgore',
    movie: 'Apocalypse Now',
  },
  {
    quote: "Life moves pretty fast. If you don't stop and look around once in a while, you could miss it.",
    character: 'Ferris Bueller',
    movie: 'Ferris Bueller’s Day Off',
  },
];



function MovieQuotes() {

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[index]);
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="movie-quote flex flex-col h-full gap-4">
      <p className='text-white text-sm mb-2 h-[80%]'>"{quote.quote}"</p>
      <p className='text-white text-sm h-[20%]'>- {quote.character}, {quote.movie}</p>
    </div>
  );

}

export default MovieQuotes;