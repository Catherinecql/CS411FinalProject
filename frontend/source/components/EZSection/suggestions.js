const suggestions = [
  {
    "course code": "CS",
    "title": 100,
    "instructors": "Gunter, E"
  },
  {
    "course code": "CS",
    "title": 101,
    "instructors": "Davis, N"
  },
  {
    "course code": "CS",
    "title": 105,
    "instructors": "Harris, A"
  },
  {
    "course code": "CS",
    "title": 125,
    "instructors": "Challen, G"
  },
  {
    "course code": "CS",
    "title": 126,
    "instructors": "Evans, G"
  },
  {
    "course code": "CS",
    "title": 173,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 196,
    "instructors": "Challen, G"
  },
  {
    "course code": "CS",
    "title": 199,
    "instructors": "Chapman, W"
  },
  {
    "course code": "CS",
    "title": 210,
    "instructors": "Cunningham, R"
  },
  {
    "course code": "CS",
    "title": 233,
    "instructors": "Herman, G"
  },
  {
    "course code": "CS",
    "title": 241,
    "instructors": "Angrave, L"
  },
  {
    "course code": "CS",
    "title": 242,
    "instructors": "Woodley, M"
  },
  {
    "course code": "CS",
    "title": 357,
    "instructors": "Silva, M"
  },
  {
    "course code": "CS",
    "title": 361,
    "instructors": "Sinha, S"
  },
  {
    "course code": "CS",
    "title": 397,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 398,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 410,
    "instructors": "Zhai, C"
  },
  {
    "course code": "CS",
    "title": 411,
    "instructors": "Parameswaran, A"
  },
  {
    "course code": "CS",
    "title": 412,
    "instructors": "Han, J"
  },
  {
    "course code": "CS",
    "title": 413,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 418,
    "instructors": "Shaffer, E"
  },
  {
    "course code": "CS",
    "title": 419,
    "instructors": "Shaffer, E"
  },
  {
    "course code": "CS",
    "title": 420,
    "instructors": "Snir, M"
  },
  {
    "course code": "CS",
    "title": 421,
    "instructors": "Misailovic, S"
  },
  {
    "course code": "CS",
    "title": 424,
    "instructors": "Sha, L"
  },
  {
    "course code": "CS",
    "title": 425,
    "instructors": "Gupta, I"
  },
  {
    "course code": "CS",
    "title": 426,
    "instructors": "Adve, V"
  },
  {
    "course code": "CS",
    "title": 427,
    "instructors": "Xie, T"
  },
  {
    "course code": "CS",
    "title": 433,
    "instructors": "Adve, S"
  },
  {
    "course code": "CS",
    "title": 438,
    "instructors": "Roy Choudhury, R"
  },
  {
    "course code": "CS",
    "title": 439,
    "instructors": "Roy Choudhury, R"
  },
  {
    "course code": "CS",
    "title": 440,
    "instructors": "Fleck, M"
  },
  {
    "course code": "CS",
    "title": 446,
    "instructors": "Koyejo, O"
  },
  {
    "course code": "CS",
    "title": 447,
    "instructors": "Hockenmaier, J"
  },
  {
    "course code": "CS",
    "title": 450,
    "instructors": "Solomonik, E"
  },
  {
    "course code": "CS",
    "title": 461,
    "instructors": "Cunningham, R"
  },
  {
    "course code": "CS",
    "title": 465,
    "instructors": "Bailey, B"
  },
  {
    "course code": "CS",
    "title": 468,
    "instructors": "Yao, M"
  },
  {
    "course code": "CS",
    "title": 473,
    "instructors": "Har-Peled, S"
  },
  {
    "course code": "CS",
    "title": 483,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 484,
    "instructors": "Kale, L"
  },
  {
    "course code": "CS",
    "title": 493,
    "instructors": "Woodley, M"
  },
  {
    "course code": "CS",
    "title": 494,
    "instructors": "Woodley, M"
  },
  {
    "course code": "CS",
    "title": 497,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 499,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 510,
    "instructors": "Zhai, C"
  },
  {
    "course code": "CS",
    "title": 513,
    "instructors": "Ludaescher, B"
  },
  {
    "course code": "CS",
    "title": 522,
    "instructors": "Rosu, G"
  },
  {
    "course code": "CS",
    "title": 524,
    "instructors": "Agha, G"
  },
  {
    "course code": "CS",
    "title": 536,
    "instructors": "Iyer, R"
  },
  {
    "course code": "CS",
    "title": 541,
    "instructors": "Nicol, D"
  },
  {
    "course code": "CS",
    "title": 548,
    "instructors": "Fu, W"
  },
  {
    "course code": "CS",
    "title": 549,
    "instructors": "Hummel, J"
  },
  {
    "course code": "CS",
    "title": 556,
    "instructors": "Olson, L"
  },
  {
    "course code": "CS",
    "title": 563,
    "instructors": "Bates, A"
  },
  {
    "course code": "CS",
    "title": 571,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 584,
    "instructors": "Mitra, S"
  },
  {
    "course code": "CS",
    "title": 597,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 598,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 599,
    "instructors": ""
  },
  {
    "course code": "CS",
    "title": 225,
    "instructors": "Beckman, A"
  },
  {
    "course code": "CS",
    "title": 225,
    "instructors": "Fagen-Ulmschneider, W"
  },
  {
    "course code": "CS",
    "title": 296,
    "instructors": "Beckman, A"
  },
  {
    "course code": "CS",
    "title": 296,
    "instructors": "Fagen-Ulmschneider, W"
  },
  {
    "course code": "CS",
    "title": 374,
    "instructors": "Chekuri, C"
  },
  {
    "course code": "CS",
    "title": 374,
    "instructors": "Kindratenko, V"
  },
  {
    "course code": "CS",
    "title": 436,
    "instructors": "Caesar, M"
  },
  {
    "course code": "CS",
    "title": 481,
    "instructors": "Jacobson, S"
  },
  {
    "course code": "CS",
    "title": 491,
    "instructors": "Beckman, A"
  },
  {
    "course code": "CS",
    "title": 491,
    "instructors": "Shang, J"
  },
  {
    "course code": "CS",
    "title": 498,
    "instructors": "Bambenek, J"
  },
  {
    "course code": "CS",
    "title": 498,
    "instructors": "Campbell, R"
  },
  {
    "course code": "CS",
    "title": 498,
    "instructors": "Kesan, J"
  },
  {
    "course code": "CS",
    "title": 591,
    "instructors": "Adve, V"
  },
  {
    "course code": "CS",
    "title": 591,
    "instructors": "Misailovic, S"
  },
  {
    "course code": "CS",
    "title": 591,
    "instructors": "Padua, D"
  }
]


export default suggestions;

