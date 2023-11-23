import { useState, useEffect } from 'react';

const facts = [
  {
    fact: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    movie: 'Jobs',
  },
  {
    fact: "I'm not in this world to live up to your expectations and you're not in this world to live up to mine.",
    movie: 'Bruce Almighty',
  },
  {
    fact: "It's hard to beat a person who never gives up.",
    movie: 'The Sandlot',
  },
  {
    fact: "Some people can't believe in themselves until someone else believes in them first.",
    movie: 'Good Will Hunting',
  },
  {
    fact: "You've got a dream. You gotta protect it. When people can't do something themselves, they're gonna tell you that you can't do it. You want something? Go get it.",
    movie: 'The Pursuit of Happyness',
  },
  {
    fact: "Don't ever let somebody tell you you can't do something.",
    movie: 'The Pursuit of Happyness',
  },
  {
    fact: 'Carpe Diem. Seize the day, boys. Make your lives extraordinary.',
    movie: 'Dead Poets Society',
  },
  {
    fact: 'Just keep swimming.',
    movie: 'Finding Nemo',
  },
  {
    fact: 'Life is like a box of chocolates. You never know what you’re gonna get.',
    movie: 'Forrest Gump',
  },
  {
    fact: "Do not pity the dead, Harry. Pity the living, and above all, those who live without love.",
    movie: 'Harry Potter and the Deathly Hallows: Part 2',
  },
  {
    fact: "It’s not who you are underneath. It’s what you do that defines you.",
    movie: 'Batman Begins',
  },
  {
    fact: 'Do what people say you cannot do!',
    movie: 'The Curious Case of Benjamin Button',
  },
  {
    fact: 'Never let the fear of striking out keep you from playing the game.',
    movie: 'Cinderella Man',
  },
  {
    fact: 'I wish I knew back then what I know now.',
    movie: 'The Shawshank Redemption',
  },
  {
    fact: 'Get busy living, or get busy dying.',
    movie: 'The Shawshank Redemption',
  },
  {
    fact: 'If you build it, he will come.',
    movie: 'Field of Dreams',
  },
  {
    fact: 'Courage is not the absence of fear but rather the judgement that something is more important than fear.',
    movie: 'The Prince of Egypt',
  },
  {
    fact: "You're gonna need a bigger boat.",
    movie: 'Jaws',
  },
  {
    fact: "I’m also just a girl, standing in front of a boy, asking him to love her.",
    movie: 'Notting Hill',
  },
  {
    fact: 'To infinity and beyond!',
    movie: 'Toy Story',
  },
  {
    fact: 'After all, tomorrow is another day!',
    movie: 'Gone with the Wind',
  },
  {
    fact: "Fasten your seatbelts. It's going to be a bumpy night.",
    movie: 'All About Eve',
  },
  {
    fact: 'I feel the need - the need for speed!',
    movie: 'Top Gun',
  },
  {
    fact: 'What we do in life echoes in eternity.',
    movie: 'Gladiator',
  },
  {
    fact: 'Great men are not born great, they grow great.',
    movie: 'The Godfather',
  },
  {
    fact: 'Nobody puts Baby in a corner.',
    movie: 'Dirty Dancing',
  },
  {
    fact: 'Adventure is out there!',
    movie: 'Up',
  },
  {
    fact: 'What if I fall? Oh darling, but what if you fly?',
    movie: 'Erin Brockovich',
  },
  {
    fact: 'I wish there was a way to know you\'re in the good old days before you\'ve actually left them.',
    movie: 'The Office',
  },
  {
    fact: "I don’t have to win, I just don’t want to lose.",
    movie: 'Rush',
  },
  {
    fact: 'Keep your friends close, but your enemies closer.',
    movie: 'The Godfather Part II',
  },
  {
    fact: 'I love the smell of napalm in the morning.',
    movie: 'Apocalypse Now',
  },
  {
    fact: "Life moves pretty fast. If you don't stop and look around once in a while, you could miss it.",
    movie: 'Ferris Bueller’s Day Off',
  },
];



export default function MovieFacts() {

  const [fact, setFact] = useState(facts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * facts.length);
      setFact(facts[index]);
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="movie-fact flex flex-col w-full gap-4">
      <p className='text-white text-lg font-semibold'>"{fact.fact}"</p>
      <p className='text-white text-md'>- {fact.movie}</p>
    </div>
  );

}
