export const Climbs = {
	Boulder: Symbol(1),
	Sport: Symbol(2),
	Trad: Symbol(3),
}

export function training(type){
  if (type == Climbs.Boulder){
    return [ {
      "role": "system",
      "content": "You are a program that reads input about rock climbing routes and creates \
        a SQL query based upon the input. You will search a dataset called 'boulders'. \
        If a user queries about anything other than boulders, return an error. Break down the input into components of location, stars (which will never be greater than 4), grade, num_reviews\
        height (never larger than 30 feet), protection (number of pads needed), pitches (never more than 1), and keywords to search the climbs description for."
    },
    {
      "role": "user",
      "content": "highly rated crimpy highball boulders in the Buttermilks"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM boulders WHERE description LIKE '%crimpy%' AND stars > 3 AND height > 25 AND location LIKE '%Buttermilks%';"
    },
    {
      "role": "user",
      "content": "Dynamic highly rated boulders in Castle Rock"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM boulders WHERE description LIKE '%dynamic%' AND stars > 3 AND location LIKE '%Castle Rock%';"
    },
    
    {
      "role": "user",
      "content": "Bouldering problems with lots of pockets in Hueco Tanks"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM boulders WHERE description LIKE '%pockets%' AND location LIKE '%Hueco Tanks%';"
    },
    {
      "role": "user",
      "content": "Most popular climbs in Joshua Tree"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM boulders WHERE num_reviews > 50 AND location LIKE '%Joshua Tree%';"
    },
    ];
  }else if (type == Climbs.Sport){
    return [ {
      "role": "system",
      "content": "You are a program that reads input about sport climbing routes and creates \
        a SQL query based upon the input. You will search a dataset called 'sport'. \
        If a user queries about anything other than routes, return an error. Break down the input into components of location, stars (which will never be greater than 4), grade, num_reviews\
        height, pitches, protection, and keywords to search the climbs description for."
    },
    {
      "role": "user",
      "content": "Beginner-friendly sport climbs in Smith Rock"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM sport WHERE grade LIKE '5.6%' OR grade LIKE '5.7%' OR grade LIKE '5.8%' AND location LIKE '%Smith Rock%';"
    },
    {
      "role": "user",
      "content": "Overhung sport routes in Pinnacles"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM sport WHERE description LIKE '%overhung%' AND location LIKE '%Pinnacles%';"
    },
    {
      "role": "user",
      "content" : "sport crack climbs in owens river gorge"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM sport WHERE description LIKE '%crack%' AND location LIKE '%Owens River Gorge%';"
    }]
  }else if (type == Climbs.Trad){
    return [ {
      "role": "system",
      "content": "You are a program that reads input about trad climbing routes and creates \
        a SQL query based upon the input. You will search a dataset called 'trad'. \
        If a user queries about anything other than routes, return an error. Break down the input into components of location, stars (which will never be greater than 4), grade, num_reviews\
        height, pitches, protection, and keywords to search the climbs description for."
    },
    {
      "role": "user",
      "content": "Long multi-pitch trad routes in Red River Gorge"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM trad WHERE pitches > 4 AND location LIKE '%Red River Gorge%';"
    },
    {
      "role": "user",
      "content": "> 3.5 stars trad slab climbs in Yosemite"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM trad WHERE description LIKE '%slab%' AND stars > 3.5 AND location LIKE '%Yosemite%';"
    }]
  }
}






