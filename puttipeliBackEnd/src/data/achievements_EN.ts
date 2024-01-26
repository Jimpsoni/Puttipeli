const data = [
  {
    name: "MCBETH",
    description: "Reach over 900 points in a game of Jyly",
    condition: "Points > 900"
  },
  {
    name: "Pro tourille MARS",
    description: "Reach over 800 points in a game of Jyly",
    condition: "Points > 800"
  },
  {
    name: "Kyllä tuolla kisoja voittaa",
    description: "Reach over 700 points in a game of Jyly",
    condition: "Points > 700"
  },
  {
    name: "Voi olla tyytyväinen",
    description: "Reach over 600 points in a game of Jyly",
    condition: "Points > 600"
  },
  {
    name: "Lämmittelykierros",
    description: "Reach over 500 points in a game of Jyly",
    condition: "Points > 500"
  },
  {
    name: "Saha",
    description: "Alternate between 10m and 7m or lower for six straight rounds",
    condition: "Putts made [≤2, 5, ≤2, 5, ≤2, 5]"
  },
  {
    name: "Rataputtaaja",
    description: "Make at least 15/20 of first putts",
    condition: "First putts made ≥ 15"
  },
  {
    name: "Jylyttäjä",
    description: "Make at most 5/20 of first putts",
    condition: "First putts made ≤ 5"
  },
  {
    name: "Loppukiri",
    description: "Score over 100 points MORE on the last 10 rounds then on the first 10 rounds",
    condition: "Last 10 round points > (First 10 round points + 100)"
  },
  {
    name: "Väsähti",
    description: "Score over 100 points LESS on the last 10 rounds then on the first 10 rounds",
    condition: "Last 10 round points < (First 10 round points - 100)"
  },
]

export default data
