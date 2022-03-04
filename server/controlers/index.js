const compliments = [
  "Gee, you're a smart cookie!",
  'Cool shirt!',
  'Your Javascript skills are stellar.',
];

module.exports = {
  getCompliments: (req, res) => {
    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];
    res.status(200).send(randomCompliment);
  },
  addCompliments: (req, res) => {
    try {
      const { compliment } = req.body;
      compliments.unshift(compliment);
      res.status(200).send(compliments);
    } catch (error) {
      console.log(error);
    }
  },
  deleteCompliment: (req, res) => {
    console.log(req.params);
    compliments.splice(req.params.id, 1);
    res.status(200).send(compliments);
  },
  getAllCompliments: (req, res) => {
    res.status(200).send(compliments);
  },
  getSingleCompliment: (req, res) => {
    compliments.forEach((item, index) => {
      if (index === Number(req.params.id)) {
        res.status(200).send({ compliment: item, index });
      }
    });
  },
  updateCompliment: (req, res) => {
    const { index, compliment } = req.body;
    compliments[index] = compliment;
    res.status(200).send(compliments);
  },
};
